# Belajar Ceria — React + Supabase + Mock QRIS

Aplikasi belajar anak kelas 1–3 SD. Versi statis lama (HTML + `app.js`) sudah dimigrasikan
ke **React (Vite)** dengan sistem langganan *freemium* yang **verifikasi otomatis tanpa admin**
dan **tanpa payment gateway pihak ketiga**: pembayaran disimulasikan lewat **QRIS dinamis**
yang di-scan dari kamera HP, lalu gembok materi di laptop terbuka sendiri melalui **Supabase Realtime**.

Dokumen rancangan: `alur_migrasi_react_supabase_mock_qris_otomatis.md`.
Kode lama untuk referensi: folder `legacy/` (tidak ikut di-build).

---

## 1. Menjalankan di komputer sendiri

```bash
npm install
cp .env.example .env      # lalu isi dua nilai di bawah
npm run dev               # buka http://localhost:5173
```

Isi `.env` dari dashboard Supabase → **Project Settings → API**:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Selama `.env` belum diisi, aplikasi tetap tampil dan menampilkan banner "Supabase belum dikonfigurasi"
(bukan layar putih).

Perintah lain:

```bash
npm run build     # build produksi ke dist/
npm run preview   # uji hasil build
```

## 2. Setup Supabase (urutan sesuai roadmap)

### Langkah 1 — Tabel, trigger, RLS, Realtime

1. Buat projek baru di <https://supabase.com>.
2. Buka **SQL Editor → New query**, tempel seluruh isi `supabase/schema.sql`, lalu **Run**.
   Skrip ini membuat tabel `profiles` & `transactions`, trigger akun baru, kebijakan RLS,
   dan mendaftarkan tabel `profiles` ke publikasi Realtime. Aman dijalankan ulang.
3. Pastikan **Authentication → Providers → Email** aktif. Untuk demo cepat, matikan
   *Confirm email* supaya pendaftaran langsung bisa dipakai login.

### Langkah 2 — Deploy Edge Functions

Cara A (CLI, disarankan):

```bash
npm install -g supabase
supabase login
supabase link --project-ref <project-ref-anda>
supabase functions deploy create-order
supabase functions deploy confirm-payment --no-verify-jwt
supabase functions deploy get-order       --no-verify-jwt
```

`SUPABASE_URL`, `SUPABASE_ANON_KEY`, dan `SUPABASE_SERVICE_ROLE_KEY` sudah tersedia otomatis
sebagai secret di Edge Function. Jika ingin memakai nama paket/harga lain, ubah objek `PACKAGES`
di `supabase/functions/create-order/index.ts` **dan** `PREMIUM_PRICE` di `src/data/subjects.js`.

Cara B (dashboard): **Edge Functions → Deploy a new function**, tempel isi `index.ts`,
lalu matikan *Enforce JWT verification* khusus untuk `confirm-payment` dan `get-order`
(pengaturan ada di `supabase/config.toml`).

### Langkah 3 — Isi `.env`, jalankan `npm run dev`, lalu uji alur QRIS

## 3. Uji coba scan QRIS (sesuai bagian 5 dokumen)

1. **Deploy dulu ke Vercel** (bagian 4) agar QR bisa dibuka HP di jaringan berbeda.
   Di `localhost`, modal QRIS menampilkan peringatan bahwa HP lain belum bisa membukanya.
2. Buka aplikasi di laptop → daftar akun → klik topik ke-2 atau ke-3 (bergembok).
3. Klik **Buka dengan Premium** → **Bayar dengan QRIS** → kode QR muncul berisi
   `https://domain-anda/bayar?order_id=...`.
4. Scan dengan kamera HP / Google Lens → halaman `/bayar` terbuka dengan detail Rp 25.000.
5. Tekan **Bayar Sekarang** → HP menampilkan "Pembayaran Berhasil", dan **1–2 detik kemudian**
   modal di laptop menutup sendiri dan semua materi premium terbuka tanpa refresh.

## 4. Deploy ke Vercel

1. Push projek ini ke GitHub.
2. Di Vercel: **Add New → Project → Import Git Repository**.
3. Framework terdeteksi **Vite** (Build Command `npm run build`, Output `dist`).
4. Tambahkan Environment Variables: `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
   (untuk semua environment), lalu **Deploy**.
5. `vercel.json` sudah berisi rewrite SPA, sehingga `/bayar`, `/lesson/...`, `/progres`
   bisa dibuka langsung tanpa 404.

## 5. Struktur folder

```text
belajar-ceria/
├── public/assets/                     # gambar + mp3 (dipindah dari assets/ lama)
├── supabase/
│   ├── schema.sql                     # tabel, trigger, RLS, Realtime
│   ├── config.toml                    # pengaturan verify_jwt per function
│   └── functions/
│       ├── create-order/index.ts      # buat order_id unik (butuh login)
│       ├── confirm-payment/index.ts   # tandai paid + buka premium
│       └── get-order/index.ts         # baca detail tagihan di halaman HP
├── src/
│   ├── components/                    # Navbar, BottomNav, AudioPlayer, SubjectCard,
│   │                                  # QrisModal, Quiz, Layout, PageLoader, Icon, ConfigNotice
│   ├── pages/                         # Home, Login, Lesson, MobilePay (/bayar), Progress, Profile
│   ├── context/AuthContext.jsx        # sesi, profil, is_premium, listener Realtime, progres
│   ├── context/PremiumContext.jsx     # menyediakan satu QrisModal global
│   ├── data/subjects.js               # 6 mata pelajaran + 15 soal per mapel
│   ├── lib/supabaseClient.js          # klien Supabase + invokeFunction
│   ├── lib/progress.js                # progres lokal per akun
│   ├── lib/sfx.js                     # backsound + efek suara
│   ├── App.jsx / main.jsx / index.css
├── legacy/                            # app.js, index.html, styles.css versi lama (referensi)
├── tailwind.config.js                 # token warna/bayangan sama seperti CDN lama
└── vercel.json
```

## 6. Model akses

| Bagian | Akun Gratis | Akun Premium |
| --- | --- | --- |
| Topik 1 setiap mata pelajaran | ✅ | ✅ |
| Topik 2 & 3 (12 materi) | 🔒 modal QRIS | ✅ |
| Latihan 15 soal + pembahasan | hanya topik gratis | semua topik |
| Harga | — | Rp 25.000 sekali bayar |

Status premium **hanya** dibaca dari kolom `profiles.is_premium` (database), bukan dari browser.

## 7. Catatan keamanan

* `is_premium` tidak bisa diubah klien: `REVOKE UPDATE` pada tabel + `GRANT UPDATE (full_name)` saja
  (lihat `schema.sql` bagian D). Pembaruan hanya lewat `confirm-payment` yang memakai *service role key*.
* `transactions` hanya bisa dibaca pemiliknya; tidak ada policy INSERT/UPDATE dari klien.
* Nominal ditentukan di server (`PACKAGES`), klien tidak mengirim harga.
* `confirm-payment` sengaja tidak memverifikasi uang betulan karena **ini simulasi**:
  siapa pun yang tahu `order_id` (random, tidak mudah ditebak) bisa melunasi pesanan tersebut.
  Untuk produksi, ganti bagian bertanda `VERIFIKASI PEMBAYARAN` dengan webhook penyedia QRIS
  dan batasi agar hanya webhook itu yang boleh menandai `paid`.
* Progres belajar (riwayat, topik selesai, kelas) disimpan di `localStorage` per akun —
  sesuai rancangan yang hanya memakai 2 tabel.

## 8. Yang diverifikasi otomatis saat pengembangan

Alur berikut sudah diuji berjalan di browser (memakai tiruan Supabase lokal, kini sudah dihapus):

* daftar akun → profil dibuat trigger → beranda menyapa nama pengguna;
* akun gratis: topik 2 & 3 bergembok, halaman materi terkunci menampilkan ajakan upgrade;
* QRIS: `create-order` menghasilkan `order_id` unik berstatus `pending`, QR memuat
  URL `/bayar?order_id=...`;
* halaman HP `/bayar` memuat detail tagihan, tombol **Bayar Sekarang** memanggil
  `confirm-payment`, transaksi menjadi `paid` dan `is_premium` menjadi `true`;
* **realtime**: modal di tab "laptop" otomatis berubah menjadi "Pembayaran berhasil!" dan
  lencana navbar berubah Gratis → Premium tanpa refresh;
* latihan 15 soal: draf jawaban tersimpan, konfirmasi jumlah soal kosong, penilaian
  (5 benar dari 15 → nilai 33, 1 bintang) konsisten dengan daftar pembahasan;
* halaman Progres mencatat riwayat & bintang; halaman Profil mengubah nama (tersimpan ke
  tabel `profiles`) dan kelas, serta tombol keluar akun berfungsi.

Verifikasi terhadap **projek Supabase asli** perlu Anda lakukan sendiri setelah bagian 2
selesai, karena butuh kredensial projek Anda.
