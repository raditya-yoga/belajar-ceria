import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';

const items = [
  { to: '/', icon: 'home', label: 'Beranda', end: true },
  { to: '/progres', icon: 'monitoring', label: 'Progres' },
  { to: '/profil', icon: 'face_3', label: 'Profil' },
];

export default function BottomNav() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-purple-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Navigasi utama"
    >
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-1 px-3 py-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex min-h-[56px] flex-col items-center justify-center rounded-2xl ${isActive ? 'bg-lilac text-purple' : 'text-muted'}`
            }
          >
            <Icon name={item.icon} className="text-[22px]" />
            <span className="text-xs font-extrabold">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
