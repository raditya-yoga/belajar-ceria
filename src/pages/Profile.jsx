import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import PageLoader from '../components/PageLoader';
import { useAuth } from '../context/AuthContext';
import { usePremium } from '../context/PremiumContext';
import { PREMIUM_PRICE_LABEL } from '../data/subjects';

export default function Profile() {
  const { user, loading, profile, isPremium, grade, displayName, totalStars, history, updateFullName, setGrade, resetProgress, signOut } = useAuth();
  const { openUpgradeModal } = usePremium();
  const navigate = useNavigate();
  const [name, setName] = useState(displayName);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  if (loading) return (
    <Layout>
      <PageLoader label="Memuat profil…" />
    </Layout>
  );
  if (!user) return <Navigate to="/login" replace />;

  async function saveProfile(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const trimmed = name.trim();
      if (trimmed.length < 2) throw new Error('Nama panggilan minimal 2 huruf.');
      if (trimmed !== displayName) await updateFullName(trimmed);
      setGrade(grade);
      setMessage('Profil tersimpan.');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    navigate('/', { replace: true });
  }

  return (
    <Layout>
      <section className="fade-in mx-auto max-w-2xl">
        <div className="rounded-[2rem] bg-white p-6 shadow-card sm:p-9">
          <div className="text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-[1.75rem] bg-[#ffe8d9] font-display text-4xl font-bold text-orange">
              {displayName.slice(0, 1).toUpperCase()}
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold">Profil Belajar</h1>
            <p className="mt-1 font-semibold text-muted">{profile?.email || user.email}</p>
            <span
              className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-extrabold ${
                isPremium ? 'bg-[#e9f9df] text-[#369000]' : 'bg-[#eee5ff] text-purple'
              }`}
            >
              <Icon name={isPremium ? 'workspace_premium' : 'lock'} className="text-[18px]" />
              {isPremium ? 'Akun Premium aktif' : 'Akun Gratis'}
            </span>
          </div>

          <form onSubmit={saveProfile} className="mt-7">
            <label htmlFor="edit-name" className="mb-2 block text-sm font-extrabold">Nama panggilan</label>
            <input
              id="edit-name"
              maxLength={24}
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="focus-ring h-14 w-full rounded-2xl border-2 border-purple-100 px-4 text-lg font-bold"
            />

            <fieldset className="mt-6">
              <legend className="mb-3 text-sm font-extrabold">Kelas</legend>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((value) => (
                  <label key={value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="grade"
                      value={value}
                      checked={grade === value}
                      onChange={() => setGrade(value)}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-purple-100 font-display text-lg font-bold text-muted transition peer-checked:border-purple peer-checked:bg-lilac peer-checked:text-purple">
                      Kelas {value}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {message && (
              <p className="mt-5 flex items-center gap-2 rounded-2xl bg-[#eefbf0] p-3 text-sm font-semibold text-[#2f7a00]">
                <Icon name="check_circle" className="text-[18px]" /> {message}
              </p>
            )}
            {error && (
              <p className="mt-5 flex items-center gap-2 rounded-2xl bg-[#fff1f5] p-3 text-sm font-semibold text-[#b03b60]">
                <Icon name="error" className="text-[18px]" /> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="btn-press mt-6 min-h-12 w-full rounded-full bg-purple font-extrabold text-white shadow-purple disabled:opacity-60"
            >
              {busy ? 'Menyimpan…' : 'Simpan Profil'}
            </button>
          </form>

          {!isPremium && (
            <div className="mt-7 rounded-[1.5rem] bg-[#f5efff] p-5">
              <p className="flex items-center gap-2 font-display text-lg font-bold">
                <Icon name="workspace_premium" className="text-[22px] text-purple" /> Buka semua materi
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted">
                Topik 2 & 3 di setiap pelajaran masih terkunci. Sekali bayar {PREMIUM_PRICE_LABEL}, semua langsung terbuka.
              </p>
              <button
                type="button"
                onClick={() => openUpgradeModal('Buka semua topik lewat QRIS, sekali bayar untuk akun ini.')}
                className="btn-press mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#c45100] font-extrabold text-white shadow-[0_5px_0_#873500]"
              >
                <Icon name="qr_code_2" className="text-[21px]" /> Buka Premium {PREMIUM_PRICE_LABEL}
              </button>
            </div>
          )}

          <div className="mt-7 rounded-2xl bg-canvas p-4">
            <p className="flex items-center gap-2 font-extrabold">
              <Icon name="shield_lock" className="text-[20px] text-purple" /> Tentang datamu
            </p>
            <p className="mt-1 text-sm font-semibold leading-6 text-muted">
              Akun dan status premium tersimpan di database Supabase. Nama panggilanmu, kelas, dan riwayat latihan
              tersimpan di browser ini. Total {history.length} latihan dan {totalStars} bintang tercatat.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="mt-5 min-h-12 w-full rounded-full border-2 border-[#ffdce7] bg-white font-extrabold text-[#cf4e75]"
          >
            Hapus semua progres
          </button>
          <button type="button" onClick={handleSignOut} className="mt-3 min-h-12 w-full rounded-full font-extrabold text-muted hover:bg-canvas">
            Keluar dari akun
          </button>
        </div>
      </section>

      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" role="dialog" aria-modal="true">
          <div className="fade-in w-full max-w-sm rounded-[2rem] bg-white p-7 text-center shadow-2xl">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#fff1f5] text-[#d64b78]">
              <Icon name="delete_sweep" className="text-[34px]" />
            </span>
            <h2 className="mt-3 font-display text-xl font-bold">Hapus semua progres?</h2>
            <p className="mt-2 font-semibold text-muted">Riwayat latihan dan bintang di perangkat ini akan dihapus. Status premium tidak terpengaruh.</p>
            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  setConfirmReset(false);
                  setMessage('Progres belajar sudah dihapus.');
                }}
                className="min-h-12 rounded-full bg-coral font-extrabold text-white"
              >
                Ya, hapus progres
              </button>
              <button type="button" onClick={() => setConfirmReset(false)} className="min-h-12 rounded-full border-2 border-purple-100 font-extrabold text-purple">
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
