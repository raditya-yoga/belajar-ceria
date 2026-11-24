import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePremium } from '../context/PremiumContext';
import AudioPlayer from './AudioPlayer';
import Icon from './Icon';

const navLinkClass = ({ isActive }) =>
  `rounded-full px-5 py-2.5 text-sm font-extrabold transition ${
    isActive ? 'bg-purple text-white shadow-[0_3px_0_#491cc5]' : 'text-ink hover:bg-purple/10'
  }`;

export default function Navbar() {
  const { user, profile, isPremium, totalStars, grade } = useAuth();
  const { openUpgradeModal } = usePremium();
  const location = useLocation();
  const navigate = useNavigate();

  function goSubjects() {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    } else {
      document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-purple-100/80 bg-[#fdf7ff]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 text-left" aria-label="Ke beranda">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple text-white shadow-[0_4px_0_#491cc5]">
            <Icon name="auto_stories" className="text-[25px]" />
          </span>
          <span className="truncate font-display text-lg font-bold leading-tight text-purple sm:text-xl">Belajar Ceria</span>
        </Link>

        {user ? (
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi desktop">
            <NavLink to="/" end className={navLinkClass}>Beranda</NavLink>
            <button type="button" onClick={goSubjects} className="rounded-full px-5 py-2.5 text-sm font-extrabold text-ink transition hover:bg-purple/10">
              Mata Pelajaran
            </button>
            <NavLink to="/progres" className={navLinkClass}>Progres</NavLink>
          </nav>
        ) : (
          <span className="hidden text-sm font-extrabold text-purple sm:block">Sahabat belajar kelas 1–3</span>
        )}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow px-3 py-2 text-sm font-extrabold text-[#574400] shadow-[0_3px_0_#ecc306] sm:px-4">
                <Icon name="star" className="text-xl" /> {totalStars}
              </span>
              <button
                type="button"
                onClick={() => (isPremium ? navigate('/profil') : openUpgradeModal('Buka semua topik dan latihan dengan akun Premium.'))}
                className={`hidden items-center gap-1.5 rounded-full px-3 py-2 text-xs font-extrabold sm:inline-flex ${
                  isPremium ? 'bg-[#e9f9df] text-[#369000]' : 'bg-[#eee5ff] text-purple'
                }`}
                title={isPremium ? 'Akun Premium aktif' : 'Klik untuk membuka semua materi'}
              >
                <Icon name={isPremium ? 'workspace_premium' : 'lock'} className="text-[17px]" />
                {isPremium ? 'Premium' : 'Gratis'}
              </button>
              <Link
                to="/profil"
                className="flex h-10 items-center gap-2 rounded-full bg-white px-2.5 shadow-[0_4px_12px_rgba(95,59,218,.08)] sm:px-3"
                aria-label={`Profil ${profile?.full_name || 'belajar'}`}
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffe6db] text-orange">
                  <Icon name="face_3" className="text-xl" />
                </span>
                <span className="hidden text-sm font-extrabold text-ink sm:block">Kelas {grade}</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="min-h-10 rounded-full px-3 py-2 text-sm font-extrabold text-purple hover:bg-purple/10 sm:px-4">
                Masuk
              </Link>
              <Link
                to="/login?daftar=1"
                className="btn-press inline-flex min-h-10 items-center gap-1.5 rounded-full bg-purple px-4 py-2 text-sm font-extrabold text-white shadow-[0_4px_0_#491cc5]"
              >
                Daftar gratis
              </Link>
            </>
          )}
          <AudioPlayer compact={!user} />
        </div>
      </div>
    </header>
  );
}
