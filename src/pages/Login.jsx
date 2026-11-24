import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

const grades = [1, 2, 3];

export default function Login() {
  const { user, configured, signIn, signUp, setGrade } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get('daftar') ? 'daftar' : 'masuk');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGradeChoice] = useState(2);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  function switchMode(next) {
    setMode(next);
    setError('');
    setNotice('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setNotice('');
    setBusy(true);
    try {
      if (mode === 'daftar') {
        if (fullName.trim().length < 2) throw new Error('Nama panggilan minimal 2 huruf.');
        const { needsEmailConfirmation } = await signUp({
          email: email.trim(),
          password,
          fullName: fullName.trim(),
          grade,
        });
        if (needsEmailConfirmation) {
          setNotice('Akun dibuat. Cek kotak masuk email untuk mengonfirmasi, lalu masuk kembali.');
          setMode('masuk');
        } else {
          setGrade(grade);
          navigate('/', { replace: true });
        }
      } else {
        await signIn(email.trim(), password);
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-xl">
        <Link to="/" className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-extrabold text-muted hover:bg-white">
          <Icon name="arrow_back" className="text-[20px]" /> Kembali ke beranda
        </Link>

        <section className="fade-in rounded-[2rem] bg-white p-6 shadow-card sm:p-9">
          <div className="text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-lilac text-purple">
              <Icon name="auto_stories" className="text-[34px]" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
              {mode === 'daftar' ? 'Buat akun Belajar Ceria' : 'Masuk ke akunmu'}
            </h1>
            <p className="mt-2 text-sm font-semibold text-muted">
              {mode === 'daftar'
                ? 'Gratis untuk mulai. Progres belajarmu tersimpan di akun ini.'
                : 'Lanjutkan petualangan belajar dan kumpulkan bintang.'}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-canvas p-1">
            {[['masuk', 'Masuk'], ['daftar', 'Daftar']].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => switchMode(value)}
                className={`min-h-11 rounded-full text-sm font-extrabold transition ${
                  mode === value ? 'bg-purple text-white shadow-[0_3px_0_#491cc5]' : 'text-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {error && (
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-[#fff1f5] p-3 text-sm font-semibold text-[#b03b60]">
              <Icon name="error" className="mt-0.5 text-[18px]" /> {error}
            </p>
          )}
          {notice && (
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-[#eefbf0] p-3 text-sm font-semibold text-[#2f7a00]">
              <Icon name="mark_email_read" className="mt-0.5 text-[18px]" /> {notice}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {mode === 'daftar' && (
              <div>
                <label htmlFor="full-name" className="mb-1.5 block text-sm font-extrabold text-ink">Nama panggilan</label>
                <input
                  id="full-name"
                  maxLength={24}
                  required
                  autoComplete="given-name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Contoh: Bintang, Rara, atau Budi..."
                  className="focus-ring h-14 w-full rounded-2xl border-2 border-purple-100 px-4 text-base font-bold text-ink placeholder:text-[#aaa5b7]"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-extrabold text-ink">Email</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nama@email.com"
                className="focus-ring h-14 w-full rounded-2xl border-2 border-purple-100 px-4 text-base font-bold text-ink placeholder:text-[#aaa5b7]"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-extrabold text-ink">Kata sandi</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === 'daftar' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimal 6 karakter"
                className="focus-ring h-14 w-full rounded-2xl border-2 border-purple-100 px-4 text-base font-bold text-ink placeholder:text-[#aaa5b7]"
              />
            </div>

            {mode === 'daftar' && (
              <fieldset>
                <legend className="mb-2 text-sm font-extrabold text-ink">Kamu kelas berapa?</legend>
                <div className="grid grid-cols-3 gap-3">
                  {grades.map((value) => (
                    <label key={value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="grade"
                        value={value}
                        checked={grade === value}
                        onChange={() => setGradeChoice(value)}
                        className="peer sr-only"
                      />
                      <span className="flex min-h-[72px] flex-col items-center justify-center rounded-2xl border-2 border-purple-100 bg-white font-display text-xl font-bold text-muted shadow-[0_3px_0_#eee8fa] transition peer-checked:border-purple peer-checked:bg-lilac peer-checked:text-purple">
                        <span className="text-xs font-extrabold">KELAS</span>
                        {value}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <button
              type="submit"
              disabled={busy || !configured}
              className="btn-press mt-2 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#c45100] font-display text-lg font-bold text-white shadow-[0_6px_0_#873500] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? (
                <>
                  <Icon name="progress_activity" className="animate-spin text-[22px]" /> Memproses…
                </>
              ) : (
                <>
                  <Icon name={mode === 'daftar' ? 'person_add' : 'login'} className="text-[22px]" />
                  {mode === 'daftar' ? 'Daftar sekarang' : 'Masuk'}
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs font-semibold leading-6 text-muted">
            {mode === 'daftar' ? (
              <>Sudah punya akun? <button type="button" onClick={() => switchMode('masuk')} className="font-extrabold text-purple underline">Masuk di sini</button></>
            ) : (
              <>Belum punya akun? <button type="button" onClick={() => switchMode('daftar')} className="font-extrabold text-purple underline">Daftar gratis</button></>
            )}
          </p>
        </section>
      </div>
    </Layout>
  );
}
