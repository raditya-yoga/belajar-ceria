// Supabase Edge Function: create-order
// Membuat order_id unik lalu menyimpan transaksi berstatus 'pending'.
// Dijalankan dengan SERVICE ROLE KEY, sehingga klien tidak bisa memalsukan harga/status.
//
// Deploy: supabase functions deploy create-order

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Harga ditentukan di server. Klien hanya mengirim nama paket.
const PACKAGES: Record<string, { amount: number; label: string }> = {
  'premium-lifetime': { amount: 25000, label: 'Belajar Ceria Premium' },
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } });

/** Contoh: BC-1732440000-X9Y2 */
function generateOrderId() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 4; i += 1) suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `BC-${Math.floor(Date.now() / 1000)}-${suffix}`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
  if (req.method !== 'POST') return json({ error: 'Gunakan metode POST.' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !anonKey || !serviceKey) return json({ error: 'Environment Supabase belum lengkap.' }, 500);

  try {
    // 1. Pastikan pemanggil benar-benar user yang login (bukan anonim).
    const authHeader = req.headers.get('Authorization') ?? '';
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });
    const { data: authData, error: authError } = await userClient.auth.getUser();
    const user = authData?.user;
    if (authError || !user) return json({ error: 'Silakan masuk dulu untuk membuat pesanan.' }, 401);

    // 2. Validasi paket + tentukan nominal di server.
    const body = await req.json().catch(() => ({}));
    const packageId = typeof body?.package === 'string' ? body.package : 'premium-lifetime';
    const pack = PACKAGES[packageId];
    if (!pack) return json({ error: 'Paket tidak dikenal.' }, 400);

    const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

    // 3. Jaga-jaga bila trigger profil belum jalan: pastikan baris profil ada.
    await admin
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? null,
        },
        { onConflict: 'id', ignoreDuplicates: true },
      );

    // 4. Buat order unik (ulangi bila kebetulan bentrok).
    let orderId = generateOrderId();
    let inserted = null;
    for (let attempt = 0; attempt < 5 && !inserted; attempt += 1) {
      const { data, error } = await admin
        .from('transactions')
        .insert({ order_id: orderId, user_id: user.id, amount: pack.amount, status: 'pending' })
        .select('order_id, amount, status')
        .single();
      if (!error) {
        inserted = data;
        break;
      }
      if (error.code !== '23505') throw error; // 23505 = unique violation
      orderId = generateOrderId();
    }
    if (!inserted) return json({ error: 'Gagal membuat kode pesanan unik. Coba lagi.' }, 500);

    return json({
      order_id: inserted.order_id,
      amount: inserted.amount,
      status: inserted.status,
      package: packageId,
      label: pack.label,
    });
  } catch (error) {
    console.error('create-order gagal:', error);
    return json({ error: `Gagal membuat pesanan: ${(error as Error)?.message ?? 'kesalahan tidak diketahui'}` }, 500);
  }
});
