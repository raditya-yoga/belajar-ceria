// Konten mata pelajaran & bank soal (dipindahkan dari app.js lama).
// Setiap topik = [judul, deskripsi, "apa yang perlu diingat"].

export const subjects = [
  { id: 'indonesia', name: 'Bahasa Indonesia', short: 'Bahasa Indonesia', icon: 'menu_book', color: '#ff5d8f', pale: '#fff0f4', topics: [
    ['Mengenal Huruf', 'Yuk kenali huruf dan bunyinya! Huruf membantu kita membaca banyak hal di sekitar.', 'Huruf pertama dari kata “apel” adalah A.'],
    ['Membaca Kata', 'Gabungkan suku kata menjadi kata yang mudah dibaca.', 'BU + KU = BUKU.'],
    ['Cerita Pendek', 'Baca cerita dengan teliti, lalu temukan informasi penting di dalamnya.', 'Siapa tokoh dalam cerita? Apa yang ia lakukan?'],
  ] },
  { id: 'matematika', name: 'Matematika', short: 'Matematika', icon: 'calculate', color: '#38bdf8', pale: '#eaf8ff', topics: [
    ['Ayo Berhitung', 'Angka membantu kita menghitung benda dan kegiatan sehari-hari.', 'Ada 3 apel, lalu ditambah 2 apel. Semuanya ada 5 apel.'],
    ['Tambah & Kurang', 'Penjumlahan menggabungkan jumlah. Pengurangan mengambil sebagian.', '7 − 3 = 4. Kita bisa menghitung mundur dari angka 7.'],
    ['Bangun Datar', 'Bentuk ada di mana-mana. Perhatikan sisi dan sudutnya.', 'Bola memiliki bentuk seperti lingkaran jika dilihat dari depan.'],
  ] },
  { id: 'ipas', name: 'IPAS', short: 'IPAS', icon: 'science', color: '#58cc02', pale: '#effbe7', topics: [
    ['Tubuh Kita', 'Tubuh memiliki bagian-bagian yang membantu kita beraktivitas.', 'Mata digunakan untuk melihat. Telinga digunakan untuk mendengar.'],
    ['Hewan & Tumbuhan', 'Makhluk hidup tumbuh dan membutuhkan lingkungan yang baik.', 'Tumbuhan membutuhkan air dan cahaya matahari untuk tumbuh.'],
    ['Cuaca & Lingkungan', 'Cuaca dapat berubah. Kita bisa menjaga lingkungan setiap hari.', 'Saat hujan, kita memakai payung agar tidak basah.'],
  ] },
  { id: 'pancasila', name: 'Pendidikan Pancasila', short: 'Pancasila', icon: 'flag', color: '#c45100', pale: '#fff2e9', topics: [
    ['Aturan Baik', 'Aturan membantu kita hidup tertib, aman, dan saling menghargai.', 'Datang tepat waktu adalah contoh menaati aturan sekolah.'],
    ['Hidup Rukun', 'Kita berteman dengan banyak orang yang memiliki kesukaan berbeda.', 'Mendengarkan teman saat berbicara adalah sikap menghargai.'],
    ['Gotong Royong', 'Bekerja bersama membuat pekerjaan terasa lebih ringan.', 'Merapikan kelas bersama adalah contoh gotong royong.'],
  ] },
  { id: 'agama', name: 'Agama & Budi Pekerti', short: 'Agama & Budi Pekerti', icon: 'volunteer_activism', color: '#8d72ff', pale: '#f1edff', topics: [
    ['Kebiasaan Baik', 'Kebiasaan baik membuat diri kita dan orang di sekitar merasa nyaman.', 'Mengucapkan terima kasih saat dibantu adalah sikap terpuji.'],
    ['Jujur & Bertanggung Jawab', 'Kita berani berkata jujur dan menyelesaikan tugas dengan baik.', 'Jika tidak sengaja menumpahkan air, kita berkata jujur dan membantu membersihkan.'],
    ['Peduli Sesama', 'Kita dapat menunjukkan kasih sayang dengan membantu dan menghormati.', 'Membantu teman yang kesulitan adalah perbuatan baik.'],
  ] },
  { id: 'inggris', name: 'Bahasa Inggris', short: 'Bahasa Inggris', icon: 'translate', color: '#d59b00', pale: '#fff8dc', topics: [
    ['Warna', 'Belajar nama warna dalam bahasa Inggris lewat benda di sekitar.', 'Red artinya merah. The apple is red.'],
    ['Angka & Sapaan', 'Kita bisa menyapa teman dan menghitung dalam bahasa Inggris.', '“Hello!” artinya “Halo!”'],
    ['Buah & Hewan', 'Kenali nama buah dan hewan dalam bahasa Inggris.', 'Cat artinya kucing. Banana artinya pisang.'],
  ] },
];

export const mc = (question, options, answer, explanation) => ({ type: 'Pilihan ganda', question, options, answer, explanation });
export const tf = (question, answer, explanation) => ({ type: 'Benar atau salah', question, options: ['Benar', 'Salah'], answer, explanation });
export const short = (question, answer, explanation) => ({ type: 'Isian singkat', question, answer, explanation });
export const wordOrder = (question, answer, explanation) => ({ type: 'Susun kata', question, answer, explanation });
export const story = (question, options, answer, explanation) => ({ type: 'Soal cerita', question, options, answer, explanation });

export const questionSets = {
  indonesia: [
    mc('Huruf setelah B adalah ...', ['A', 'C', 'D'], 'C', 'Urutan huruf adalah A, B, C, D, dan seterusnya.'),
    tf('Kata “ibu” terdiri dari tiga huruf.', 'Benar', 'I-B-U terdiri dari tiga huruf.'),
    short('Lengkapi kata ini: B _ K U', 'u', 'Kata yang tepat adalah BUKU.'),
    mc('Kata yang dimulai dengan huruf M adalah ...', ['meja', 'sapi', 'bola'], 'meja', 'Meja diawali dengan huruf M.'),
    mc('Lawan kata “besar” adalah ...', ['tinggi', 'kecil', 'panjang'], 'kecil', 'Lawan kata besar adalah kecil.'),
    tf('Kata “mata” memiliki dua suku kata.', 'Benar', 'Kata mata dibaca ma-ta, jadi ada dua suku kata.'),
    mc('Kalimat yang diakhiri tanda tanya adalah ...', ['Siapa namamu?', 'Namaku Rani.', 'Ayo belajar.'], 'Siapa namamu?', 'Tanda tanya dipakai untuk mengakhiri kalimat pertanyaan.'),
    short('Huruf pertama pada kata “rumah” adalah ...', 'r', 'Kata rumah dimulai dengan huruf R.'),
    mc('Kata yang tepat untuk melengkapi: “Adik minum ...”', ['air', 'kursi', 'buku'], 'air', 'Kita minum air.'),
    tf('Kata “buku” dan “muku” memiliki arti yang sama.', 'Salah', 'Buku memiliki arti, sedangkan muku bukan kata yang tepat.'),
    mc('Manakah yang termasuk nama hewan?', ['kucing', 'pensil', 'piring'], 'kucing', 'Kucing adalah nama hewan.'),
    wordOrder('Susun suku kata “bo” dan “la” menjadi ...', 'bola', 'Bo + la menjadi bola.'),
    mc('Kalimat yang sopan adalah ...', ['Tolong ambilkan buku.', 'Cepat ambil!', 'Pergi sana!'], 'Tolong ambilkan buku.', 'Kata tolong membuat permintaan terdengar sopan.'),
    tf('Tanda titik digunakan di akhir kalimat berita.', 'Benar', 'Kalimat berita biasanya diakhiri tanda titik.'),
    mc('Kata yang artinya sama dengan “senang” adalah ...', ['gembira', 'sedih', 'marah'], 'gembira', 'Senang dan gembira memiliki arti yang mirip.'),
  ],
  matematika: [
    mc('3 + 2 = ...', ['4', '5', '6'], '5', 'Tiga ditambah dua sama dengan lima.'),
    tf('8 lebih besar dari 5.', 'Benar', 'Angka 8 berada setelah 5 pada urutan bilangan.'),
    short('6 − 2 = ...', '4', 'Enam dikurangi dua sama dengan empat.'),
    mc('Angka setelah 19 adalah ...', ['18', '20', '21'], '20', 'Setelah 19 adalah 20.'),
    story('Ada 4 apel dan 3 jeruk. Jumlah buah semuanya ...', ['6', '7', '8'], '7', '4 + 3 = 7 buah.'),
    tf('10 − 0 hasilnya 10.', 'Benar', 'Mengurangi nol tidak mengubah jumlah.'),
    mc('Bentuk yang memiliki 3 sisi adalah ...', ['lingkaran', 'segitiga', 'persegi'], 'segitiga', 'Segitiga memiliki tiga sisi.'),
    short('2 + 5 = ...', '7', 'Dua ditambah lima sama dengan tujuh.'),
    mc('Bilangan yang paling kecil adalah ...', ['12', '9', '15'], '9', 'Di antara 12, 9, dan 15, angka 9 paling kecil.'),
    tf('Satu minggu terdiri dari 7 hari.', 'Benar', 'Ada tujuh hari dalam satu minggu.'),
    mc('Rani punya 9 kelereng. Ia memberi 2 kepada Budi. Sisa kelereng Rani ...', ['7', '11', '6'], '7', '9 − 2 = 7 kelereng.'),
    short('Angka sebelum 10 adalah ...', '9', 'Angka sebelum 10 adalah 9.'),
    mc('Benda yang biasanya lebih panjang adalah ...', ['penghapus', 'pensil', 'kancing'], 'pensil', 'Pensil umumnya lebih panjang daripada penghapus dan kancing.'),
    tf('4 + 4 sama dengan 9.', 'Salah', '4 + 4 = 8.'),
    mc('Jika sekarang pagi, waktu setelah pagi adalah ...', ['siang', 'malam', 'dini hari'], 'siang', 'Urutannya pagi, siang, sore, lalu malam.'),
  ],
  ipas: [
    mc('Kita melihat menggunakan ...', ['mata', 'telinga', 'hidung'], 'mata', 'Mata digunakan untuk melihat.'),
    tf('Tumbuhan membutuhkan air untuk tumbuh.', 'Benar', 'Air membantu tumbuhan tetap hidup dan tumbuh.'),
    short('Kita mendengar suara menggunakan ...', 'telinga', 'Telinga digunakan untuk mendengar.'),
    mc('Hewan yang hidup di air adalah ...', ['ikan', 'ayam', 'kucing'], 'ikan', 'Ikan hidup di air.'),
    mc('Bagian tumbuhan yang menyerap air dari tanah adalah ...', ['akar', 'bunga', 'buah'], 'akar', 'Akar menyerap air dan zat dari tanah.'),
    tf('Matahari memberi cahaya dan rasa hangat.', 'Benar', 'Matahari adalah sumber cahaya dan panas alami.'),
    mc('Saat hujan, benda yang membantu kita tetap kering adalah ...', ['payung', 'kipas', 'topi pesta'], 'payung', 'Payung melindungi kita dari air hujan.'),
    short('Hewan yang menghasilkan susu dan memiliki empat kaki: ...', 'sapi', 'Sapi dapat menghasilkan susu.'),
    mc('Kita mencium aroma menggunakan ...', ['hidung', 'mata', 'tangan'], 'hidung', 'Hidung membantu kita mencium bau.'),
    tf('Semua hewan dapat hidup tanpa makan.', 'Salah', 'Hewan membutuhkan makanan untuk hidup.'),
    mc('Tempat yang baik untuk membuang sampah adalah ...', ['tempat sampah', 'selokan', 'halaman'], 'tempat sampah', 'Sampah dibuang ke tempat sampah agar lingkungan bersih.'),
    short('Bagian tubuh untuk berjalan adalah ...', 'kaki', 'Kaki membantu kita berdiri dan berjalan.'),
    mc('Hewan yang berkembang biak dengan bertelur adalah ...', ['ayam', 'kucing', 'sapi'], 'ayam', 'Ayam berkembang biak dengan bertelur.'),
    tf('Kita perlu mencuci tangan sebelum makan.', 'Benar', 'Mencuci tangan membantu menjaga kebersihan.'),
    mc('Langit biasanya tampak gelap dan berawan saat ...', ['akan hujan', 'sedang cerah', 'malam berbintang'], 'akan hujan', 'Awan gelap sering menjadi tanda hujan akan turun.'),
  ],
  pancasila: [
    mc('Saat bertemu guru di pagi hari, sebaiknya kita ...', ['menyapa dengan sopan', 'berlari menjauh', 'berteriak'], 'menyapa dengan sopan', 'Menyapa guru dengan sopan adalah sikap hormat.'),
    tf('Kita harus mendengarkan saat teman berbicara.', 'Benar', 'Mendengarkan menunjukkan sikap menghargai.'),
    short('Bekerja bersama untuk membersihkan kelas disebut ...', 'gotong royong', 'Gotong royong adalah bekerja bersama-sama.'),
    mc('Jika meminjam barang teman, kita harus ...', ['menjaga dan mengembalikannya', 'menyembunyikannya', 'membawanya pulang'], 'menjaga dan mengembalikannya', 'Barang pinjaman harus dijaga dan dikembalikan.'),
    mc('Contoh aturan di sekolah adalah ...', ['datang tepat waktu', 'mencoret meja', 'berlari di kelas'], 'datang tepat waktu', 'Datang tepat waktu termasuk menaati aturan sekolah.'),
    tf('Teman yang berbeda kesukaan tidak boleh diajak bermain.', 'Salah', 'Kita tetap berteman dan menghargai perbedaan.'),
    mc('Saat melihat teman kesulitan, kita sebaiknya ...', ['menawarkan bantuan', 'menertawakan', 'membiarkannya'], 'menawarkan bantuan', 'Menolong teman adalah sikap peduli.'),
    short('Sebelum masuk rumah orang lain, kita sebaiknya ...', 'mengetuk pintu', 'Mengetuk pintu menunjukkan sikap sopan.'),
    mc('Keputusan bersama sebaiknya dibuat dengan ...', ['musyawarah', 'memaksa', 'bertengkar'], 'musyawarah', 'Musyawarah membantu mencari kesepakatan bersama.'),
    tf('Menjaga kebersihan kelas adalah tanggung jawab bersama.', 'Benar', 'Semua warga kelas dapat menjaga kebersihan.'),
    mc('Jika berbeda pendapat dengan teman, kita sebaiknya ...', ['berbicara dengan tenang', 'marah-marah', 'tidak mau mendengar'], 'berbicara dengan tenang', 'Perbedaan pendapat disampaikan dengan sopan.'),
    short('Kepada orang yang lebih tua, kita berbicara dengan ...', 'sopan', 'Berbicara sopan menunjukkan rasa hormat.'),
    mc('Contoh menjaga fasilitas umum adalah ...', ['menggunakan taman dengan baik', 'merusak bangku', 'mencoret dinding'], 'menggunakan taman dengan baik', 'Fasilitas umum digunakan dan dijaga bersama.'),
    tf('Menaati aturan membuat kegiatan lebih tertib.', 'Benar', 'Aturan membantu kegiatan berjalan dengan tertib.'),
    mc('Lambang negara Indonesia adalah ...', ['Garuda Pancasila', 'burung merpati', 'burung elang'], 'Garuda Pancasila', 'Lambang negara Indonesia adalah Garuda Pancasila.'),
  ],
  agama: [
    mc('Saat menerima bantuan, kita mengucapkan ...', ['terima kasih', 'selamat tidur', 'sampai jumpa'], 'terima kasih', 'Mengucapkan terima kasih adalah kebiasaan baik.'),
    tf('Berkata jujur berarti mengatakan hal yang sebenarnya.', 'Benar', 'Jujur berarti berkata sesuai kenyataan.'),
    short('Jika berbuat salah, kita sebaiknya meminta ...', 'maaf', 'Meminta maaf adalah langkah baik saat berbuat salah.'),
    mc('Saat menemukan barang milik teman, kita sebaiknya ...', ['mengembalikan kepada pemiliknya', 'menyimpannya', 'membuangnya'], 'mengembalikan kepada pemiliknya', 'Mengembalikan barang menunjukkan sikap jujur.'),
    mc('Sikap yang baik saat orang lain beribadah adalah ...', ['menghormati dan tidak mengganggu', 'berisik', 'mengejek'], 'menghormati dan tidak mengganggu', 'Kita menghormati orang lain yang sedang beribadah.'),
    tf('Membantu teman yang kesulitan adalah perbuatan baik.', 'Benar', 'Saling membantu membuat kita hidup rukun.'),
    mc('Jika diberi tugas merapikan mainan, kita harus ...', ['menyelesaikannya', 'meninggalkannya', 'menyuruh orang lain'], 'menyelesaikannya', 'Menyelesaikan tugas menunjukkan tanggung jawab.'),
    short('Kepada orang tua, kita harus bersikap ...', 'hormat', 'Kita menghormati dan menyayangi orang tua.'),
    mc('Saat teman berbicara, sikap yang baik adalah ...', ['mendengarkan', 'memotong terus', 'berteriak'], 'mendengarkan', 'Mendengarkan adalah bentuk menghargai orang lain.'),
    tf('Kita boleh mengambil barang orang lain tanpa izin.', 'Salah', 'Kita perlu meminta izin dan tidak mengambil barang tanpa izin.'),
    mc('Contoh menjaga kebersihan diri adalah ...', ['mandi dengan teratur', 'tidak mencuci tangan', 'memakai baju kotor'], 'mandi dengan teratur', 'Mandi teratur membantu menjaga kebersihan tubuh.'),
    short('Jika meminjam barang, setelah selesai kita harus ...', 'mengembalikan', 'Barang yang dipinjam harus dikembalikan kepada pemiliknya.'),
    mc('Sikap yang baik kepada teman yang berbeda adalah ...', ['menghormatinya', 'mengejeknya', 'menjauhinya'], 'menghormatinya', 'Kita menghormati setiap orang.'),
    tf('Mengakui kesalahan adalah salah satu sikap berani.', 'Benar', 'Mengakui kesalahan merupakan bagian dari sikap jujur.'),
    mc('Ketika berjanji, kita berusaha untuk ...', ['menepatinya', 'melupakannya', 'mengingkarinya'], 'menepatinya', 'Menepati janji menunjukkan sikap bertanggung jawab.'),
  ],
  inggris: [
    mc('“Red” artinya warna ...', ['merah', 'biru', 'kuning'], 'merah', 'Red berarti merah.'),
    tf('“Cat” dalam bahasa Indonesia artinya kucing.', 'Benar', 'Cat berarti kucing.'),
    short('Bahasa Inggris dari “halo” adalah ...', 'hello', 'Hello berarti halo.'),
    mc('“One, two, ...”', ['three', 'five', 'seven'], 'three', 'Setelah one dan two adalah three.'),
    mc('Buah “apple” berwarna ...', ['red', 'blue', 'purple'], 'red', 'Apel sering berwarna merah. Red artinya merah.'),
    tf('“Blue” artinya hijau.', 'Salah', 'Blue artinya biru.'),
    mc('Bahasa Inggris dari “anjing” adalah ...', ['dog', 'duck', 'fish'], 'dog', 'Dog artinya anjing.'),
    short('Bahasa Inggris dari “satu” adalah ...', 'one', 'One berarti satu.'),
    mc('Kita mengucapkan “Good morning” pada ...', ['pagi hari', 'tengah malam', 'sore hari'], 'pagi hari', 'Good morning berarti selamat pagi.'),
    tf('“Banana” artinya pisang.', 'Benar', 'Banana berarti pisang.'),
    mc('Warna daun biasanya ...', ['green', 'pink', 'black'], 'green', 'Green berarti hijau.'),
    short('“Thank you” artinya ...', 'terima kasih', 'Thank you berarti terima kasih.'),
    mc('Hari setelah Monday adalah ...', ['Tuesday', 'Sunday', 'Friday'], 'Tuesday', 'Tuesday adalah hari setelah Monday.'),
    tf('“Goodbye” digunakan saat berpamitan.', 'Benar', 'Goodbye berarti selamat tinggal atau sampai jumpa.'),
    mc('“Fish” adalah nama ...', ['hewan', 'warna', 'angka'], 'hewan', 'Fish berarti ikan, yaitu nama hewan.'),
  ],
};

export const subjectById = (id) => subjects.find((subject) => subject.id === id);

// Paket premium (harga tetap, satu paket) — harus sama dengan nilai di Edge Function.
export const PREMIUM_PRICE = 25000;
export const PREMIUM_PRICE_LABEL = 'Rp 25.000';
export const PREMIUM_PACKAGE = 'premium-lifetime';

/** Topik gratis: topik pertama (index 0) tiap mata pelajaran. Sisanya premium. */
export const isTopicFree = (topicIndex) => topicIndex === 0;
