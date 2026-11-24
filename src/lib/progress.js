// Progres belajar (riwayat latihan, topik selesai, draft jawaban, kelas)
// disimpan di localStorage dan dipisahkan per akun Supabase.
// Status premium TIDAK disimpan di sini — itu selalu dibaca dari database.

const PREFIX = 'belajar-ceria-v2';

export const emptyState = {
  grade: 2,
  history: [],
  completedTopics: [],
  draft: null,
};

const keyFor = (userId) => `${PREFIX}:${userId || 'tamu'}`;

export function loadProgress(userId) {
  if (!userId) return { ...emptyState };
  try {
    const raw = JSON.parse(localStorage.getItem(keyFor(userId)) || '{}');
    return {
      grade: [1, 2, 3].includes(raw.grade) ? raw.grade : 2,
      history: Array.isArray(raw.history) ? raw.history : [],
      completedTopics: Array.isArray(raw.completedTopics) ? raw.completedTopics : [],
      draft: raw.draft || null,
    };
  } catch (error) {
    console.warn('Data belajar tersimpan tidak dapat dibaca.', error);
    return { ...emptyState };
  }
}

export function saveProgress(userId, state) {
  if (!userId) return;
  try {
    localStorage.setItem(keyFor(userId), JSON.stringify(state));
  } catch (error) {
    console.error('Progres belajar tidak dapat disimpan.', error);
  }
}
