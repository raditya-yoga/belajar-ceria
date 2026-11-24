// Supabase Edge Function: get-order
// Dipakai halaman /bayar (HP) untuk menampilkan nominal & status pesanan
// SEBELUM pembayaran dikonfirmasi. Tidak perlu login, tapi hanya mengembalikan
// data pesanan yang order_id-nya sudah diketahui (order_id bersifat rahasia/random).
//
// Deploy: supabase functions deploy get-order --no-verify-jwt

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
  if (req.method !== 'POST') return json({ error: 'Gunakan metode POST.' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceKey) return json({ error: 'Environment Supabase belum lengkap.' }, 500);

  try {
    const body = await req.json().catch(() => ({}));
    const orderId = typeof body?.order_id === 'string' ? body.order_id.trim() : '';
    if (!orderId) return json({ error: 'Tautan tidak lengkap: order_id tidak ditemukan.' }, 400);

    const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
    const { data, error } = await admin
      .from('transactions')
      .select('order_id, amount, status, created_at')
      .eq('order_id', orderId)
      .maybeSingle();
    if (error) throw error;
    if (!data) return json({ error: 'Pesanan tidak ditemukan atau tautan sudah tidak berlaku.' }, 404);

    return json(data);
  } catch (error) {
    console.error('get-order gagal:', error);
    return json({ error: `Gagal memuat pesanan: ${(error as Error)?.message ?? 'kesalahan tidak diketahui'}` }, 500);
  }
});
