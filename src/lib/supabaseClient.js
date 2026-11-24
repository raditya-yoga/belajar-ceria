import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** true bila .env sudah diisi dengan kredensial Supabase. */
export const isSupabaseConfigured = Boolean(url && anonKey && url.startsWith('http'));

/**
 * Klien Supabase (anon key, aman dipakai di browser karena dilindungi RLS).
 * Bernilai null bila .env belum diisi supaya aplikasi tetap tampil
 * dan menampilkan petunjuk konfigurasi, bukan layar putih.
 */
export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;

export const SUPABASE_CONFIG_HINT = [
  'Salin .env.example menjadi .env di folder projek, lalu isi:',
  'VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY (dashboard Supabase → Project Settings → API).',
  'Setelah itu jalankan ulang "npm run dev".',
].join(' ');

/** Panggil Edge Function dengan pesan error yang mudah dibaca. */
export async function invokeFunction(name, body) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi. ' + SUPABASE_CONFIG_HINT);
  const { data, error } = await supabase.functions.invoke(name, { body });
  if (error) {
    // Edge Function yang mengembalikan status != 2xx dibungkus sebagai error;
    // coba baca pesan JSON dari body respons agar pesannya informatif.
    let detail = error.message || 'Gagal memanggil server.';
    try {
      if (error.context?.json) {
        const payload = await error.context.json();
        if (payload?.error) detail = payload.error;
      }
    } catch {
      /* biarkan pesan default */
    }
    throw new Error(detail);
  }
  if (data?.error) throw new Error(data.error);
  return data;
}
