import Icon from './Icon';

/** Ditampilkan saat sesi Supabase masih dimuat, supaya halaman tidak
 *  sempat mengira pengguna belum login lalu melempar ke /login. */
export default function PageLoader({ label = 'Menyiapkan halaman…' }) {
  return (
    <div className="grid min-h-[45vh] place-items-center">
      <div className="text-center">
        <span className="pulse-soft mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-lilac text-purple">
          <Icon name="progress_activity" className="animate-spin text-[32px]" />
        </span>
        <p className="mt-4 text-sm font-extrabold text-muted">{label}</p>
      </div>
    </div>
  );
}
