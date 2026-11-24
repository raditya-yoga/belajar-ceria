import Navbar from './Navbar';
import BottomNav from './BottomNav';
import ConfigNotice from './ConfigNotice';

export default function Layout({ children, footer = false }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <ConfigNotice />
        {children}
      </main>
      {footer && (
        <footer className="bg-[#f8f1ff] px-5 py-5 text-center text-xs font-semibold text-muted sm:flex sm:justify-between sm:px-8">
          <span>© 2026 Belajar Ceria · Sahabat belajar kelas 1–3 SD</span>
          <span className="mt-1 inline-block sm:mt-0">Belajar jadi seru setiap hari!</span>
        </footer>
      )}
      <BottomNav />
    </div>
  );
}
