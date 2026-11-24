// Supabase Edge Function: confirm-payment
// Dipanggil dari halaman HP (/bayar) setelah tombol "Bayar Sekarang" ditekan.
// Memvalidasi order_id masih 'pending', lalu membuka akses premium.
//
// PENTING: ini simulasi QRIS tanpa payment gateway, jadi fungsi ini tidak
// memverifikasi uang betulan. Untuk produksi, ganti bagian bertanda
// "VERIFIKASI PEMBAYARAN" dengan webhook dari penyedia QRIS.
//
// Deploy: supabase functions deploy confirm-payment --no-verify-jwt
// (JWT tidak wajib karena halaman pembayaran dibuka dari HP yang belum tentu login.)

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
    if (!orderId) return json({ error: 'order_id wajib dikirim.' }, 400);

    const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

    // 1. Cari transaksi + profil pemiliknya.
    const { data: trx, error: trxError } = await admin
      .from('transactions')
      .select('id, order_id, user_id, amount, status, created_at')
      .eq('order_id', orderId)
      .maybeSingle();
    if (trxError) throw trxError;
    if (!trx) return json({ error: 'Pesanan tidak ditemukan. Pastikan kamu membuka tautan yang benar.' }, 404);

    // 2. Idempotent: transaksi yang sudah 'paid' tetap memastikan premium aktif.
    if (trx.status === 'paid') {
      // VERIFIKASI PEMBAYARAN (produksi): di sini tempat memeriksa webhook QRIS.
      const { error: repremiumError } = await admin.from('profiles').update({ is_premium: true }).eq('id', trx.user_id);
      if (repremiumError) throw repremiumError;
      return json({ success: true, already_paid: true, order_id: trx.order_id, amount: trx.amount, status: 'paid' });
    }

    if (trx.status !== 'pending') return json({ error: `Pesanan ini berstatus '${trx.status}' dan tidak bisa dibayar.` }, 409);

    // 3. Tandai transaksi lunas.
    const { error: updateTrxError } = await admin
      .from('transactions')
      .update({ status: 'paid' })
      .eq('id', trx.id)
      .eq('status', 'pending'); // jaga dari dua klik bersamaan
    if (updateTrxError) throw updateTrxError;

    // 4. Buka akses premium user tersebut.
    //    Perubahan baris profiles inilah yang dikirim Supabase Realtime ke laptop.
    const { error: premiumError } = await admin.from('profiles').update({ is_premium: true }).eq('id', trx.user_id);
    if (premiumError) throw premiumError;

    return json({
      success: true,
      already_paid: false,
      order_id: trx.order_id,
      amount: trx.amount,
      status: 'paid',
      message: 'Pembayaran berhasil. Materi premium sudah terbuka di perangkat lain.',
    });
  } catch (error) {
    console.error('confirm-payment gagal:', error);
    return json({ error: `Gagal mengonfirmasi pembayaran: ${(error as Error)?.message ?? 'kesalahan tidak diketahui'}` }, 500);
  }
});
