import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { loadProgress, saveProgress, emptyState } from '../lib/progress';

const AuthContext = createContext(null);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchProfile(userId) {
  if (!supabase) return null;
  // Trigger database membuat baris profil tepat setelah signup; beri satu kesempatan
  // singkat bila baris belum terlihat (jaringan/trigger lambat).
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { data, error } = await supabase.from('profiles').select('id, full_name, email, is_premium, created_at').eq('id', userId).maybeSingle();
    if (error) {
      console.error('Profil tidak dapat dimuat.', error.message);
      return null;
    }
    if (data) return data;
    await wait(600);
  }
  return null;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [progress, setProgress] = useState(emptyState);
  const userId = session?.user?.id || null;
  const userIdRef = useRef(null);

  const applyProgress = useCallback((next) => {
    setProgress(next);
    if (userIdRef.current) saveProgress(userIdRef.current, next);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!userIdRef.current) return null;
    const next = await fetchProfile(userIdRef.current);
    if (next) setProfile(next);
    return next;
  }, []);

  // 1. Muat sesi awal + pantau perubahan login/logout.
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session ?? null);
      if (!data.session) setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession) {
        setProfile(null);
        setProgress(emptyState);
        setLoading(false);
      }
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  // 2. Saat user berubah: ambil profil + progres lokal user tersebut.
  useEffect(() => {
    userIdRef.current = userId;
    if (!userId) return;
    setLoading(true);
    let active = true;
    const localProgress = loadProgress(userId);
    setProgress(localProgress);
    fetchProfile(userId).then((next) => {
      if (!active) return;
      setProfile(next);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [userId]);

  // 3. Supabase Realtime: begitu is_premium berubah (mis. dibayar dari HP),
  //    laptop langsung tahu tanpa refresh.
  useEffect(() => {
    if (!supabase || !userId) return undefined;
    const channel = supabase
      .channel(`profil-${userId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` },
        (payload) => {
          setProfile((current) => (current ? { ...current, ...payload.new } : payload.new));
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const signIn = useCallback(async (email, password) => {
    if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  }, []);

  const signUp = useCallback(async ({ email, password, fullName, grade }) => {
    if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, grade } },
    });
    if (error) throw new Error(error.message);
    if (data.user?.id) {
      const base = loadProgress(data.user.id);
      saveProgress(data.user.id, { ...base, grade });
    }
    // Bila konfirmasi email diaktifkan di dashboard Supabase, session masih kosong.
    return { needsEmailConfirmation: !data.session };
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  const updateFullName = useCallback(async (fullName) => {
    if (!supabase || !userId) throw new Error('Belum masuk.');
    const { error } = await supabase.from('profiles').update({ full_name: fullName }).eq('id', userId);
    if (error) throw new Error(error.message);
    setProfile((current) => (current ? { ...current, full_name: fullName } : current));
  }, [userId]);

  const setGrade = useCallback((grade) => {
    if (![1, 2, 3].includes(grade)) return;
    applyProgress({ ...progress, grade });
  }, [applyProgress, progress]);

  const saveDraft = useCallback((draft) => {
    applyProgress({ ...progress, draft });
  }, [applyProgress, progress]);

  const recordRun = useCallback((run, topicKey) => {
    applyProgress({
      ...progress,
      history: [run, ...progress.history],
      completedTopics: [...new Set([...progress.completedTopics, topicKey])],
      draft: null,
    });
  }, [applyProgress, progress]);

  const resetProgress = useCallback(() => {
    applyProgress({ ...emptyState, grade: progress.grade });
  }, [applyProgress, progress.grade]);

  const value = useMemo(() => {
    const history = progress.history;
    return {
      configured: isSupabaseConfigured,
      loading,
      user: session?.user ?? null,
      profile,
      isPremium: Boolean(profile?.is_premium),
      grade: progress.grade,
      progress,
      history,
      totalStars: history.reduce((sum, item) => sum + item.stars, 0),
      bestScore: history.length ? Math.max(...history.map((item) => item.score)) : 0,
      displayName: profile?.full_name || session?.user?.email?.split('@')[0] || 'Teman',
      signIn,
      signUp,
      signOut,
      refreshProfile,
      updateFullName,
      setGrade,
      saveDraft,
      recordRun,
      resetProgress,
    };
  }, [
    loading, session, profile, progress, signIn, signUp, signOut, refreshProfile,
    updateFullName, setGrade, saveDraft, recordRun, resetProgress,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus dipakai di dalam <AuthProvider>.');
  return context;
}
