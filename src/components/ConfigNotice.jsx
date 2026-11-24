import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SUPABASE_CONFIG_HINT, isSupabaseConfigured } from '../lib/supabaseClient';
import Icon from './Icon';

/** Peringatan bila .env Supabase belum diisi, supaya tidak ada layar putih. */
export default function ConfigNotice() {
  const { configured } = useAuth();
  if (isSupabaseConfigured && configured) return null;

  return (
    <div className="mx-auto mb-5 flex max-w-7xl flex-col gap-2 rounded-[1.5rem] border-2 border-[#ffe1b3] bg-[#fff8ec] p-4 sm:flex-row sm:items-center sm:gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-yellow text-[#654f00]">
        <Icon name="key" className="text-[24px]" />
      </span>
      <div className="text-sm font-semibold leading-6 text-[#7a5f00]">
        <p className="font-display text-base font-bold">Supabase belum dikonfigurasi</p>
        <p>{SUPABASE_CONFIG_HINT}</p>
        <p className="mt-1 text-xs">
          Petunjuk lengkap ada di README.md dan supabase/schema.sql. Lihat juga{' '}
          <Link to="/bayar?order_id=contoh" className="underline">halaman /bayar</Link> untuk memeriksa tampilan checkout.
        </p>
      </div>
    </div>
  );
}
