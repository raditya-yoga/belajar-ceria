# Rencana Migrasi & Arsitektur Otomatis: Belajar Ceria (React + Supabase + Mock QRIS)

Dokumen ini merupakan rancangan teknis final untuk mengubah website statis **Belajar Ceria** menjadi aplikasi **React** dengan sistem langganan *freemium* yang diverifikasi **100% otomatis tanpa admin** dan **tanpa pendaftaran payment gateway pihak ketiga**. Simulasi pembayaran menggunakan generator **QRIS Dinamis mandiri** yang dapat di-scan langsung lewat kamera HP atau Google Lens.

## 1. Gambaran Arsitektur Sistem

* **Frontend:** React (menggunakan *bundler* Vite) untuk memecah logika dari `app.js` lama menjadi komponen-komponen modular.
* **Authentication:** Supabase Auth (Email & Password) untuk mengelola akun siswa atau orang tua.
* **Database & Realtime:** Supabase PostgreSQL untuk menyimpan profil user, status `is_premium`, serta riwayat transaksi, ditambah fitur **Supabase Realtime** agar gembok materi di layar laptop terbuka otomatis saat pembayaran di HP selesai.
* **Backend / Serverless:** Supabase Edge Functions untuk membuat pesanan baru (`create-order`) dan memvalidasi konfirmasi pembayaran (`confirm-payment`) secara aman di sisi server.
* **QRIS Simulator Mandiri:** Menggunakan *library* `qrcode.react` untuk membuat QR Code dinamis berisi tautan halaman pembayaran *mobile* (`/bayar?order_id=...`) yang bisa di-scan dari HP mana pun.

## 2. Pemetaan Struktur Folder (Migrasi dari File Lama)

Aset dan kode dari file projek lama (`belajar-ceria-main.zip`) dipetakan ke struktur projek React baru sebagai berikut:

```text
belajar-ceria-react/
├── public/
│   └── assets/                  # Pindahkan seluruh file .jpg dan .mp3 dari folder assets/ lama ke sini
│       ├── Funny Cartoon Kids Background Music For Videos.mp3
│       ├── achievement-student.jpg
│       ├── home-mascot.jpg
│       ├── lesson-student.jpg
│       ├── math-subject.jpg
│       ├── quiz-oranges.jpg
│       └── welcome-students.jpg
├── supabase/
│   └── functions/               # Kode backend serverless (Edge Functions)
│       ├── create-order/
│       │   └── index.ts         # Membuat order_id unik & menyimpan transaksi 'pending'
│       └── confirm-payment/
│           └── index.ts         # Memvalidasi order_id & mengubah is_premium = true secara otomatis
├── src/
│   ├── components/              # Pecahan tampilan UI dari app.js lama
│   │   ├── Navbar.jsx           # Navigasi + badge status akun (Gratis / Premium)
│   │   ├── AudioPlayer.jsx      # Kontrol musik latar anak-anak
│   │   ├── SubjectCard.jsx      # Kartu mata pelajaran (dengan ikon gembok jika terkunci)
│   │   └── QrisModal.jsx        # Pop-up modal yang menampilkan QRIS Dinamis & status menunggu bayar
│   ├── pages/                   # Halaman utama aplikasi
│   │   ├── Home.jsx             # Halaman depan (Beranda)
│   │   ├── Login.jsx            # Halaman Masuk & Daftar Akun
│   │   ├── Lesson.jsx           # Halaman Materi & Kuis Kelas 1-3 SD
│   │   └── MobilePay.jsx        # Halaman checkout khusus tampilan HP (route: /bayar)
│   ├── context/
│   │   └── AuthContext.jsx      # Menyimpan state user login, status is_premium, & listener Realtime
│   ├── lib/
│   │   └── supabaseClient.js    # Konfigurasi koneksi API URL & Anon Key Supabase
│   ├── App.jsx                  # Pengaturan rute halaman (/ , /login , /lesson , /bayar)
│   ├── index.css                # Styling dari styles.css lama + gaya tambahan
│   └── main.jsx                 # Entry point aplikasi React
├── index.html
└── package.json
```

## 3. Rancangan Database & Keamanan (Supabase)

Sistem hanya membutuhkan **2 tabel** di PostgreSQL Supabase (tanpa perlu Supabase Storage maupun halaman Admin):

### A. Tabel `profiles`
Menyimpan data akun dan status akses premium. Dibuat otomatis menggunakan *Database Trigger* setiap kali user baru mendaftar melalui Supabase Auth.

| Nama Kolom | Tipe Data | Default / Keterangan |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, terhubung ke `auth.users.id` |
| `full_name` | `text` | Nama siswa atau orang tua |
| `email` | `text` | Email terdaftar |
| `is_premium` | `boolean` | `false` (Otomatis berubah menjadi `true` setelah tombol bayar di HP diklik) |
| `created_at` | `timestamptz` | Waktu pembuatan akun |

*(Catatan: Aktifkan fitur **Realtime** pada tabel `profiles` di dashboard Supabase agar perubahan status langsung terkirim ke browser laptop).*

### B. Tabel `transactions`
Mencatat setiap kode QRIS yang dibuat agar satu QR Code hanya berlaku untuk satu transaksi valid.

| Nama Kolom | Tipe Data | Default / Keterangan |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `order_id` | `text` | Unique ID pesanan (contoh: `BC-1732440000-X9Y2`) |
| `user_id` | `uuid` | Foreign Key ke `profiles.id` |
| `amount` | `integer` | Nominal paket (contoh: `25000`) |
| `status` | `text` | `'pending'` (Berubah menjadi `'paid'` saat pembayaran dikonfirmasi) |
| `created_at` | `timestamptz` | Waktu pembuatan transaksi |

### C. Aturan Keamanan (Row Level Security / RLS)
1. **Tabel `profiles`:** User hanya boleh membaca (`SELECT`) baris miliknya sendiri. User dilarang mengubah kolom `is_premium` langsung dari browser.
2. **Tabel `transactions`:** User hanya boleh membaca (`SELECT`) riwayat transaksinya sendiri.
3. **Hak Akses Edge Function:** Kedua fungsi (`create-order` dan `confirm-payment`) menggunakan `SUPABASE_SERVICE_ROLE_KEY` di sisi server sehingga pembaruan status transaksi dan pembukaan kunci premium tetap aman serta tervalidasi.

## 4. Alur Otomatis Mock QRIS & Supabase Realtime

```text
[Laptop: React App] 
   │  1. User klik "Beli Premium" -> panggil Edge Function `create-order`
   ▼
[Supabase Edge Function: create-order]
   │  2. Generate `order_id` unik & simpan ke tabel `transactions` (status: 'pending')
   ▼
[Laptop: QrisModal.jsx]
   │  3. Render QR Code berisi URL: https://domain-kamu.vercel.app/bayar?order_id=...
   │
   │  4. User scan QR Code menggunakan Kamera HP / Google Lens
   ▼
[HP: Halaman /bayar (MobilePay.jsx)]
   │  5. Tampil detail tagihan Rp 25.000 & tombol "Bayar Sekarang"
   │  6. User klik "Bayar Sekarang" -> panggil Edge Function `confirm-payment`
   ▼
[Supabase Edge Function: confirm-payment]
   │  7. Validasi `order_id` masih 'pending', lalu jalankan query otomatis:
   │     - UPDATE transactions SET status = 'paid'
   │     - UPDATE profiles SET is_premium = true
   ▼
[Database PostgreSQL] ──(8. Kirim sinyal Supabase Realtime)──► [Laptop: AuthContext.jsx]
                                                                    │
                                        9. Pop-up QRIS tertutup & gembok materi
                                           terbuka otomatis tanpa refresh halaman!
```

### Detail Penting Teknis:
* **Pencegahan Auto-Trigger Kamera:** URL pada QR Code sengaja diarahkan ke halaman tombol konfirmasi (`/bayar`) terlebih dahulu, bukan langsung mengeksekusi pembaruan database saat tautan dimuat. Hal ini mencegah fitur *link preview* otomatis pada kamera HP atau Google Lens melunaskan tagihan sebelum tombol benar-benar ditekan.
* **Sinkronisasi Lintas Perangkat:** Karena HP dan laptop menggunakan sesi browser yang berbeda, **Supabase Realtime** bertindak sebagai jembatan instan yang memberi tahu aplikasi di laptop begitu baris `profiles` milik user tersebut berubah di database.

## 5. Panduan Uji Coba & Presentasi (Scan Pakai HP)

Agar QR Code dapat diakses oleh perangkat HP yang memakai jaringan seluler maupun Wi-Fi berbeda, aplikasi React **wajib di-deploy secara online** (misalnya ke **Vercel**, gratis dan terhubung langsung dengan GitHub).

1. **Buka Aplikasi di Laptop:** Login menggunakan akun gratis, lalu klik salah satu materi kelas 1–3 SD yang terkunci.
2. **Munculkan QRIS:** Klik tombol upgrade pada modal hingga gambar **QRIS Dinamis** muncul di layar laptop.
3. **Scan dari HP:** Buka aplikasi **Kamera bawaan HP** atau **Google Lens / Chrome**, lalu arahkan ke kode QR di layar laptop dan buka tautan yang muncul.
4. **Konfirmasi Pembayaran:** Di layar HP akan muncul halaman pembayaran *Belajar Ceria* berisi detail paket dan nominal Rp 25.000. Tekan tombol **"Bayar Sekarang"**.
5. **Hasil Real-Time:** Layar HP menampilkan notifikasi *"Pembayaran Berhasil"*, dan dalam 1–2 detik layar laptop otomatis menutup jendela QRIS serta membuka seluruh materi premium.

## 6. Urutan Langkah Pengerjaan (Roadmap)

1. **Setup Supabase:** Buat projek baru di Supabase, jalankan skrip SQL untuk membuat tabel `profiles`, `transactions`, *trigger* akun baru, kebijakan RLS, serta aktifkan *Realtime* pada tabel `profiles`.
2. **Deploy Edge Functions:** Buat dan *deploy* fungsi `create-order` dan `confirm-payment` ke Supabase.
3. **Inisialisasi Projek React:** Buat projek Vite + React (`npm create vite@latest`), instal *library* pendukung (`@supabase/supabase-js`, `react-router-dom`, `qrcode.react`), lalu pindahkan seluruh aset dari `belajar-ceria-main/assets` ke `public/assets`.
4. **Migrasi Komponen & Halaman:** Pecah kode `app.js` lama ke dalam komponen `Navbar`, `AudioPlayer`, `SubjectCard`, serta halaman `Home`, `Login`, `Lesson`, dan `MobilePay` (`/bayar`).
5. **Deploy & Uji Coba:** Unggah projek ke GitHub, hubungkan ke **Vercel** untuk mendapatkan domain publik, lalu lakukan simulasi scan QRIS langsung menggunakan HP.