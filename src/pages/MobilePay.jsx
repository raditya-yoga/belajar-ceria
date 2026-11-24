import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { invokeFunction, isSupabaseConfigured, SUPABASE_CONFIG_HINT } from '../lib/supabaseClient';
import { successChime } from '../lib/sfx';

const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value || 0);

export default function MobilePay() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id') || '';
  const { configured } = useAuth();
  const [step, setStep] = useState('loading');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const loadOrder = useCallback(async () => {
    if (!orderId) {
      setError('Tautan pembayaran tidak lengkap (order_id tidak ditemukan).');
      setStep('error');
      return;
    }
    setStep('loading');
    setError('');
    try {
      const data = await invokeFunction('get-order', { order_id: orderId });
      setOrder(data);
      setStep(data.status === 'paid' ? 'paid' : 'ready');
    } catch (err) {
      setError(err.message);
      setStep('error');
    }
  }, [orderId]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setStep('error');
      setError(`Supabase belum dikonfigurasi. ${SUPABASE_CONFIG_HINT}`);
      return;
    }
    loadOrder();
  }, [loadOrder]);

  async function pay() {
    setStep('paying');
    setError('');
    try {
      const data = await invokeFunction('confirm-payment', { order_id: orderId });
      setOrder((current) => ({ ...current, ...data, status: 'paid' }));
      setStep('paid');
      successChime();
    } catch (err) {
      setError(err.message);
      setStep('ready');
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-10">
      <header className="bg-purple px-4 pb-8 pt-6 text-white">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <span className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
              <Icon name="auto_stories" className="text-[24px]" />
            </span>
            <span className="font-display text-lg font-bold">Belajar Ceria</span>
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-extrabold">Pembayaran QRIS</span>
        </div>
      </header>

      <main className="mx-auto -mt-5 max-w-md px-4">
        <div className="rounded-[2rem] bg-white p-5 shadow-[0_16px_40px_rgba(95,59,218,.12)] sm:p-7">
          {step === 'loading' && (
            <div className="py-12 text-center">
              <span className="pulse-soft mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-lilac text-purple">
                <Icon name="progress_activity" className="animate-spin text-[34px]" />
              </span>
              <p className="mt-4 font-display text-lg font-bold">Memeriksa pesanan…</p>
              <p className="mt-1 text-sm font-semibold text-muted">Sebentar ya, kami sedang mengambil detail tagihan.</p>
            </div>
          )}

          {(step === 'ready' || step === 'paying') && (
            <>
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fff4c9] text-[#9b7600]">
                  <Icon name="workspace_premium" className="text-[30px]" />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wide text-purple">Paket Premium</p>
                  <h1 className="font-display text-xl font-bold leading-tight text-ink">Semua Materi Belajar Ceria</h1>
                </div>
              </div>

              <dl className="mt-5 divide-y divide-purple-50 rounded-[1.5rem] bg-[#f8f5ff] px-4 py-2">
                {[
                  ['Kode pesanan', orderId],
                  ['Isi paket', '18 topik materi + semua latihan 15 soal'],
                  ['Masa berlaku', 'Selamanya untuk akunmu'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-4 py-3">
                    <dt className="text-xs font-extrabold uppercase tracking-wide text-muted">{label}</dt>
                    <dd className="max-w-[60%] break-words text-right text-sm font-bold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex items-baseline justify-between rounded-[1.5rem] bg-purple px-5 py-4 text-white">
                <span className="text-sm font-extrabold">Total bayar</span>
                <span className="font-display text-3xl font-bold">{rupiah(order?.amount ?? 25000)}</span>
              </div>

              {error && (
                <p className="mt-4 flex items-start gap-2 rounded-2xl bg-[#fff1f5] p-3 text-sm font-semibold text-[#b03b60]">
                  <Icon name="error" className="mt-0.5 text-[18px]" /> {error}
                </p>
              )}

              <button
                type="button"
                onClick={pay}
                disabled={step === 'paying' || !configured}
                className="btn-press mt-5 flex min-h-16 w-full items-center justify-center gap-2 rounded-full bg-green font-display text-lg font-bold text-white shadow-[0_6px_0_#3f9f00] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {step === 'paying' ? (
                  <>
                    <Icon name="progress_activity" className="animate-spin text-[24px]" /> Memproses pembayaran…
                  </>
                ) : (
                  <>
                    <Icon name="payments" className="text-[26px]" /> Bayar Sekarang
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs font-semibold leading-6 text-muted">
                Ini pembayaran <strong className="text-ink">simulasi QRIS</strong> untuk keperluan latihan.
                Setelah tombol ini ditekan, materi di layar laptopmu akan terbuka otomatis.
              </p>
            </>
          )}

          {step === 'paid' && (
            <div className="py-6 text-center">
              <span className="star-pop mx-auto grid h-20 w-20 place-items-center rounded-[1.75rem] bg-[#e9f9df] text-[#369000]">
                <Icon name="verified" className="text-[46px]" />
              </span>
              <h1 className="mt-4 font-display text-2xl font-bold text-ink">Pembayaran Berhasil!</h1>
              <p className="mt-2 font-semibold leading-6 text-muted">
                Terima kasih! Paket Premium untuk pesanan <strong className="break-all text-ink">{orderId}</strong> sudah aktif.
                Jendela QRIS di layar laptopmu akan menutup sendiri dalam 1–2 detik.
              </p>
              <div className="mt-5 rounded-[1.5rem] bg-[#f5efff] p-4 text-left">
                <p className="flex items-center gap-2 font-display font-bold text-ink">
                  <Icon name="info" className="text-[20px] text-purple" /> Langkah berikutnya
                </p>
                <ul className="mt-2 space-y-1.5 text-sm font-semibold text-muted">
                  <li>1. Lihat layar laptop — semua gembok materi sudah terbuka.</li>
                  <li>2. Kalau belum terbuka, muat ulang halaman laptop sekali.</li>
                </ul>
              </div>
              <Link
                to="/"
                className="btn-press mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-purple font-display text-lg font-bold text-white shadow-[0_6px_0_#491cc5]"
              >
                <Icon name="home" className="text-[22px]" /> Selesai
              </Link>
            </div>
          )}

          {step === 'error' && (
            <div className="py-6 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#fff1f5] text-[#d64b78]">
                <Icon name="link_off" className="text-[34px]" />
              </span>
              <h1 className="mt-4 font-display text-xl font-bold text-ink">Tautan pembayaran tidak valid</h1>
              <p className="mt-2 text-sm font-semibold leading-6 text-muted">{error}</p>
              <button
                type="button"
                onClick={loadOrder}
                className="btn-press mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-purple font-extrabold text-white shadow-[0_5px_0_#491cc5]"
              >
                <Icon name="refresh" className="text-[20px]" /> Coba periksa lagi
              </button>
              <Link to="/" className="mt-2 flex min-h-12 items-center justify-center rounded-full border-2 border-purple-100 font-extrabold text-purple">
                Kembali ke beranda
              </Link>
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-xs font-semibold text-muted">
          Belajar Ceria · sahabat belajar kelas 1–3 SD
        </p>
      </main>
    </div>
  );
}
