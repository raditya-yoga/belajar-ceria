import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../context/AuthContext';
import { invokeFunction, SUPABASE_CONFIG_HINT } from '../lib/supabaseClient';
import { PREMIUM_PACKAGE, PREMIUM_PRICE_LABEL } from '../data/subjects';
import { successChime } from '../lib/sfx';
import Icon from './Icon';

const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value || 0);

const BENEFITS = [
  'Semua topik (3 topik) di 6 mata pelajaran terbuka',
  'Semua latihan soal 15 butir + pembahasan',
  'Sekali bayar, berlaku selamanya di akunmu',
];

export default function QrisModal({ open, reason, onClose }) {
  const { configured, user, isPremium, refreshProfile } = useAuth();
  const [step, setStep] = useState('offer');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  // Setiap kali modal dibuka, mulai dari tawaran (bukan langsung membuat order).
  useEffect(() => {
    if (!open) return;
    setOrder(null);
    setError('');
    setStep(isPremium ? 'paid' : 'offer');
    // isPremium sengaja tidak dimasukkan: nilai saat modal dibuka sudah cukup.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Realtime: baris profiles berubah -> modal langsung menampilkan keberhasilan.
  useEffect(() => {
    if (!open) return;
    if (isPremium && step !== 'paid') {
      setStep('paid');
      successChime();
    }
  }, [isPremium, open, step]);

  // Cadangan bila Realtime terlambat/terblokir: cek ulang status tiap 4 detik.
  useEffect(() => {
    if (!open || step !== 'qr') return undefined;
    const timer = setInterval(() => {
      refreshProfile();
    }, 4000);
    return () => clearInterval(timer);
  }, [open, step, refreshProfile]);

  // Kunci scroll latar saat modal terbuka.
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const payUrl = useMemo(() => {
    if (!order?.order_id) return '';
    return `${window.location.origin}/bayar?order_id=${encodeURIComponent(order.order_id)}`;
  }, [order]);

  const isLocalhost = useMemo(() => ['localhost', '127.0.0.1'].includes(window.location.hostname), []);

  async function createOrder() {
    if (!user) {
      setError('Silakan masuk terlebih dahulu supaya pembayaran terhubung ke akunmu.');
      return;
    }
    setStep('creating');
    setError('');
    try {
      const data = await invokeFunction('create-order', { package: PREMIUM_PACKAGE });
      setOrder(data);
      setStep('qr');
    } catch (err) {
      setError(err.message);
      setStep('error');
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qris-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="fade-in safe-bottom max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-[2rem] bg-white p-6 shadow-2xl sm:rounded-[2rem] sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow px-3.5 py-1.5 text-xs font-extrabold text-[#654f00] shadow-[0_3px_0_#ecc306]">
            <Icon name="workspace_premium" className="text-[18px]" /> Belajar Ceria Premium
          </span>
          <button type="button" onClick={onClose} aria-label="Tutup" className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-canvas">
            <Icon name="close" className="text-[22px]" />
          </button>
        </div>

        {step === 'offer' && (
          <>
            <h2 id="qris-title" className="mt-4 font-display text-2xl font-bold leading-tight text-ink">
              Buka semua materi, sekali bayar
            </h2>
            {reason && <p className="mt-2 text-sm font-semibold text-muted">{reason}</p>}
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-purple">{PREMIUM_PRICE_LABEL}</span>
              <span className="text-sm font-bold text-muted">/ akun, selamanya</span>
            </p>
            <ul className="mt-5 space-y-2.5">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e9f9df] text-[#369000]">
                    <Icon name="check" className="text-[16px]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {!configured ? (
              <p className="mt-5 rounded-2xl bg-[#fff4c9] p-4 text-xs font-semibold leading-6 text-[#7a5f00]">
                Supabase belum dikonfigurasi. {SUPABASE_CONFIG_HINT}
              </p>
            ) : (
              <p className="mt-5 rounded-2xl bg-[#f5efff] p-4 text-xs font-semibold leading-6 text-muted">
                Pembayaran memakai <strong className="text-ink">QRIS simulasi</strong>. Setelah tombol bayar di HP ditekan,
                materi di layar ini terbuka otomatis tanpa refresh.
              </p>
            )}

            <button
              type="button"
              onClick={createOrder}
              disabled={!configured}
              className="btn-press mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-purple font-display text-lg font-bold text-white shadow-[0_6px_0_#491cc5,0_12px_24px_rgba(95,59,218,.2)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="qr_code_2" className="text-[24px]" /> Bayar dengan QRIS
            </button>
            <button type="button" onClick={onClose} className="mt-3 min-h-12 w-full rounded-full border-2 border-purple-100 font-extrabold text-purple">
              Nanti saja
            </button>
          </>
        )}

        {step === 'creating' && (
          <div className="py-14 text-center">
            <span className="pulse-soft mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-lilac text-purple">
              <Icon name="progress_activity" className="animate-spin text-[34px]" />
            </span>
            <p className="mt-4 font-display text-lg font-bold text-ink">Menyiapkan kode QRIS…</p>
            <p className="mt-1 text-sm font-semibold text-muted">Membuat pesanan unik untuk akunmu.</p>
          </div>
        )}

        {step === 'qr' && order && (
          <>
            <h2 id="qris-title" className="mt-4 font-display text-2xl font-bold leading-tight text-ink">
              Scan kode QRIS ini
            </h2>
            <p className="mt-1 text-sm font-semibold text-muted">
              Buka kamera HP atau Google Lens, arahkan ke kode di bawah, lalu tekan “Bayar Sekarang”.
            </p>
            <div className="mt-5 rounded-[1.75rem] border-2 border-dashed border-purple-200 bg-[#fbf9ff] p-4 text-center">
              <div className="mx-auto w-fit rounded-2xl bg-white p-3 shadow-[0_8px_20px_rgba(95,59,218,.12)]">
                <QRCodeSVG value={payUrl} size={196} level="M" marginSize={2} bgColor="#ffffff" fgColor="#2e293d" />
              </div>
              <p className="mt-3 font-display text-lg font-bold text-ink">{rupiah(order.amount)}</p>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Order {order.order_id}</p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#fff4c9] px-4 py-2.5 text-xs font-extrabold text-[#7a5f00]">
              <span className="pulse-soft h-2.5 w-2.5 rounded-full bg-[#d9a400]" />
              Menunggu pembayaran… halaman ini terbuka otomatis
            </div>

            <p className="mt-3 break-all rounded-xl bg-canvas px-3 py-2 text-center text-[11px] font-semibold text-muted">{payUrl}</p>

            {isLocalhost && (
              <p className="mt-3 rounded-2xl bg-[#fff1f5] p-3 text-[11px] font-semibold leading-5 text-[#b03b60]">
                Alamat masih <strong>localhost</strong>, jadi HP lain belum bisa membukanya. Deploy dulu ke Vercel
                (atau pakai tautan di bawah untuk mencoba di perangkat ini).
              </p>
            )}

            <Link
              to={`/bayar?order_id=${encodeURIComponent(order.order_id)}`}
              className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f5efff] px-5 font-extrabold text-purple shadow-[0_4px_0_#e4d7ff]"
            >
              <Icon name="open_in_new" className="text-[20px]" /> Buka halaman bayar di perangkat ini
            </Link>
            <button type="button" onClick={onClose} className="mt-2 min-h-11 w-full rounded-full text-sm font-extrabold text-muted hover:bg-canvas">
              Tutup, bayar nanti
            </button>
          </>
        )}

        {step === 'paid' && (
          <div className="py-6 text-center">
            <span className="star-pop mx-auto grid h-20 w-20 place-items-center rounded-[1.75rem] bg-[#e9f9df] text-[#369000]">
              <Icon name="verified" className="text-[46px]" />
            </span>
            <h2 id="qris-title" className="mt-4 font-display text-2xl font-bold text-ink">Pembayaran berhasil!</h2>
            <p className="mt-2 font-semibold leading-6 text-muted">
              Akunmu sekarang <strong className="text-ink">Premium</strong>. Semua materi dan latihan sudah terbuka.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-press mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-green font-display text-lg font-bold text-white shadow-[0_6px_0_#3f9f00]"
            >
              <Icon name="rocket_launch" className="text-[22px]" /> Mulai belajar
            </button>
          </div>
        )}

        {step === 'error' && (
          <div className="py-6 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#fff1f5] text-[#d64b78]">
              <Icon name="error" className="text-[34px]" />
            </span>
            <h2 id="qris-title" className="mt-4 font-display text-xl font-bold text-ink">QRIS gagal dibuat</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">{error}</p>
            <button type="button" onClick={createOrder} className="btn-press mt-5 min-h-12 w-full rounded-full bg-purple font-extrabold text-white shadow-[0_5px_0_#491cc5]">
              Coba lagi
            </button>
            <button type="button" onClick={onClose} className="mt-2 min-h-11 w-full rounded-full text-sm font-extrabold text-muted hover:bg-canvas">
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
