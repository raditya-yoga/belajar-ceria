tailwind.config = {
      theme: {
        extend: {
          colors: {
            ink: "#2e293d", muted: "#6d687d", purple: "#7c5df9",
            lilac: "#f3efff", orange: "#ff7a2f", green: "#58cc02",
            yellow: "#ffd426", sky: "#38bdf8", canvas: "#f8f7fc"
          },
          fontFamily: {
            display: ["Rubik", "sans-serif"],
            body: ["Nunito Sans", "sans-serif"]
          },
          boxShadow: {
            card: "0 10px 24px rgba(124, 93, 249, .08)",
            purple: "0 5px 0 #5b3fd6, 0 9px 18px rgba(92, 84, 112, .12)",
            orange: "0 5px 0 #d95b16, 0 9px 18px rgba(92, 84, 112, .12)",
            green: "0 5px 0 #3f9f00, 0 9px 18px rgba(92, 84, 112, .12)"
          }
        }
      }
    };

const subjects = [
      { id:"indonesia", name:"Bahasa Indonesia", short:"Bahasa Indonesia", icon:"menu_book", color:"#ff5d8f", pale:"#fff0f4", topics:[
        ["Mengenal Huruf","Yuk kenali huruf dan bunyinya! Huruf membantu kita membaca banyak hal di sekitar." ,"Huruf pertama dari kata “apel” adalah A."],
        ["Membaca Kata","Gabungkan suku kata menjadi kata yang mudah dibaca." ,"BU + KU = BUKU."],
        ["Cerita Pendek","Baca cerita dengan teliti, lalu temukan informasi penting di dalamnya." ,"Siapa tokoh dalam cerita? Apa yang ia lakukan?"]
      ]},
      { id:"matematika", name:"Matematika", short:"Matematika", icon:"calculate", color:"#38bdf8", pale:"#eaf8ff", topics:[
        ["Ayo Berhitung","Angka membantu kita menghitung benda dan kegiatan sehari-hari." ,"Ada 3 apel, lalu ditambah 2 apel. Semuanya ada 5 apel."],
        ["Tambah & Kurang","Penjumlahan menggabungkan jumlah. Pengurangan mengambil sebagian." ,"7 − 3 = 4. Kita bisa menghitung mundur dari angka 7."],
        ["Bangun Datar","Bentuk ada di mana-mana. Perhatikan sisi dan sudutnya." ,"Bola memiliki bentuk seperti lingkaran jika dilihat dari depan."]
      ]},
      { id:"ipas", name:"IPAS", short:"IPAS", icon:"science", color:"#58cc02", pale:"#effbe7", topics:[
        ["Tubuh Kita","Tubuh memiliki bagian-bagian yang membantu kita beraktivitas." ,"Mata digunakan untuk melihat. Telinga digunakan untuk mendengar."],
        ["Hewan & Tumbuhan","Makhluk hidup tumbuh dan membutuhkan lingkungan yang baik." ,"Tumbuhan membutuhkan air dan cahaya matahari untuk tumbuh."],
        ["Cuaca & Lingkungan","Cuaca dapat berubah. Kita bisa menjaga lingkungan setiap hari." ,"Saat hujan, kita memakai payung agar tidak basah."]
      ]},
      { id:"pancasila", name:"Pendidikan Pancasila", short:"Pancasila", icon:"flag", color:"#c45100", pale:"#fff2e9", topics:[
        ["Aturan Baik","Aturan membantu kita hidup tertib, aman, dan saling menghargai." ,"Datang tepat waktu adalah contoh menaati aturan sekolah."],
        ["Hidup Rukun","Kita berteman dengan banyak orang yang memiliki kesukaan berbeda." ,"Mendengarkan teman saat berbicara adalah sikap menghargai."],
        ["Gotong Royong","Bekerja bersama membuat pekerjaan terasa lebih ringan." ,"Merapikan kelas bersama adalah contoh gotong royong."]
      ]},
      { id:"agama", name:"Agama & Budi Pekerti", short:"Agama & Budi Pekerti", icon:"volunteer_activism", color:"#8d72ff", pale:"#f1edff", topics:[
        ["Kebiasaan Baik","Kebiasaan baik membuat diri kita dan orang di sekitar merasa nyaman." ,"Mengucapkan terima kasih saat dibantu adalah sikap terpuji."],
        ["Jujur & Bertanggung Jawab","Kita berani berkata jujur dan menyelesaikan tugas dengan baik." ,"Jika tidak sengaja menumpahkan air, kita berkata jujur dan membantu membersihkan."],
        ["Peduli Sesama","Kita dapat menunjukkan kasih sayang dengan membantu dan menghormati." ,"Membantu teman yang kesulitan adalah perbuatan baik."]
      ]},
      { id:"inggris", name:"Bahasa Inggris", short:"Bahasa Inggris", icon:"translate", color:"#d59b00", pale:"#fff8dc", topics:[
        ["Warna","Belajar nama warna dalam bahasa Inggris lewat benda di sekitar." ,"Red artinya merah. The apple is red."],
        ["Angka & Sapaan","Kita bisa menyapa teman dan menghitung dalam bahasa Inggris." ,"“Hello!” artinya “Halo!”"],
        ["Buah & Hewan","Kenali nama buah dan hewan dalam bahasa Inggris." ,"Cat artinya kucing. Banana artinya pisang."]
      ]}
    ];

    const questionSets = {
      indonesia: [
        mc("Huruf setelah B adalah ...",["A","C","D"],"C","Urutan huruf adalah A, B, C, D, dan seterusnya."),
        tf("Kata “ibu” terdiri dari tiga huruf.","Benar","I-B-U terdiri dari tiga huruf."),
        short("Lengkapi kata ini: B _ K U","u","Kata yang tepat adalah BUKU."),
        mc("Kata yang dimulai dengan huruf M adalah ...",["meja","sapi","bola"],"meja","Meja diawali dengan huruf M."),
        mc("Lawan kata “besar” adalah ...",["tinggi","kecil","panjang"],"kecil","Lawan kata besar adalah kecil."),
        tf("Kata “mata” memiliki dua suku kata.","Benar","Kata mata dibaca ma-ta, jadi ada dua suku kata."),
        mc("Kalimat yang diakhiri tanda tanya adalah ...",["Siapa namamu?","Namaku Rani.","Ayo belajar."],"Siapa namamu?","Tanda tanya dipakai untuk mengakhiri kalimat pertanyaan."),
        short("Huruf pertama pada kata “rumah” adalah ...","r","Kata rumah dimulai dengan huruf R."),
        mc("Kata yang tepat untuk melengkapi: “Adik minum ...”",["air","kursi","buku"],"air","Kita minum air."),
        tf("Kata “buku” dan “muku” memiliki arti yang sama.","Salah","Buku memiliki arti, sedangkan muku bukan kata yang tepat."),
        mc("Manakah yang termasuk nama hewan?",["kucing","pensil","piring"],"kucing","Kucing adalah nama hewan."),
        wordOrder("Susun suku kata “bo” dan “la” menjadi ...","bola","Bo + la menjadi bola."),
        mc("Kalimat yang sopan adalah ...",["Tolong ambilkan buku.","Cepat ambil!","Pergi sana!"],"Tolong ambilkan buku.","Kata tolong membuat permintaan terdengar sopan."),
        tf("Tanda titik digunakan di akhir kalimat berita.","Benar","Kalimat berita biasanya diakhiri tanda titik."),
        mc("Kata yang artinya sama dengan “senang” adalah ...",["gembira","sedih","marah"],"gembira","Senang dan gembira memiliki arti yang mirip.")
      ],
      matematika: [
        mc("3 + 2 = ...",["4","5","6"],"5","Tiga ditambah dua sama dengan lima."),
        tf("8 lebih besar dari 5.","Benar","Angka 8 berada setelah 5 pada urutan bilangan."),
        short("6 − 2 = ...","4","Enam dikurangi dua sama dengan empat."),
        mc("Angka setelah 19 adalah ...",["18","20","21"],"20","Setelah 19 adalah 20."),
        story("Ada 4 apel dan 3 jeruk. Jumlah buah semuanya ...",["6","7","8"],"7","4 + 3 = 7 buah."),
        tf("10 − 0 hasilnya 10.","Benar","Mengurangi nol tidak mengubah jumlah."),
        mc("Bentuk yang memiliki 3 sisi adalah ...",["lingkaran","segitiga","persegi"],"segitiga","Segitiga memiliki tiga sisi."),
        short("2 + 5 = ...","7","Dua ditambah lima sama dengan tujuh."),
        mc("Bilangan yang paling kecil adalah ...",["12","9","15"],"9","Di antara 12, 9, dan 15, angka 9 paling kecil."),
        tf("Satu minggu terdiri dari 7 hari.","Benar","Ada tujuh hari dalam satu minggu."),
        mc("Rani punya 9 kelereng. Ia memberi 2 kepada Budi. Sisa kelereng Rani ...",["7","11","6"],"7","9 − 2 = 7 kelereng."),
        short("Angka sebelum 10 adalah ...","9","Angka sebelum 10 adalah 9."),
        mc("Benda yang biasanya lebih panjang adalah ...",["penghapus","pensil","kancing"],"pensil","Pensil umumnya lebih panjang daripada penghapus dan kancing."),
        tf("4 + 4 sama dengan 9.","Salah","4 + 4 = 8."),
        mc("Jika sekarang pagi, waktu setelah pagi adalah ...",["siang","malam","dini hari"],"siang","Urutannya pagi, siang, sore, lalu malam.")
      ],
      ipas: [
        mc("Kita melihat menggunakan ...",["mata","telinga","hidung"],"mata","Mata digunakan untuk melihat."),
        tf("Tumbuhan membutuhkan air untuk tumbuh.","Benar","Air membantu tumbuhan tetap hidup dan tumbuh."),
        short("Kita mendengar suara menggunakan ...","telinga","Telinga digunakan untuk mendengar."),
        mc("Hewan yang hidup di air adalah ...",["ikan","ayam","kucing"],"ikan","Ikan hidup di air."),
        mc("Bagian tumbuhan yang menyerap air dari tanah adalah ...",["akar","bunga","buah"],"akar","Akar menyerap air dan zat dari tanah."),
        tf("Matahari memberi cahaya dan rasa hangat.","Benar","Matahari adalah sumber cahaya dan panas alami."),
        mc("Saat hujan, benda yang membantu kita tetap kering adalah ...",["payung","kipas","topi pesta"],"payung","Payung melindungi kita dari air hujan."),
        short("Hewan yang menghasilkan susu dan memiliki empat kaki: ...","sapi","Sapi dapat menghasilkan susu."),
        mc("Kita mencium aroma menggunakan ...",["hidung","mata","tangan"],"hidung","Hidung membantu kita mencium bau."),
        tf("Semua hewan dapat hidup tanpa makan.","Salah","Hewan membutuhkan makanan untuk hidup."),
        mc("Tempat yang baik untuk membuang sampah adalah ...",["tempat sampah","selokan","halaman"],"tempat sampah","Sampah dibuang ke tempat sampah agar lingkungan bersih."),
        short("Bagian tubuh untuk berjalan adalah ...","kaki","Kaki membantu kita berdiri dan berjalan."),
        mc("Hewan yang berkembang biak dengan bertelur adalah ...",["ayam","kucing","sapi"],"ayam","Ayam berkembang biak dengan bertelur."),
        tf("Kita perlu mencuci tangan sebelum makan.","Benar","Mencuci tangan membantu menjaga kebersihan."),
        mc("Langit biasanya tampak gelap dan berawan saat ...",["akan hujan","sedang cerah","malam berbintang"],"akan hujan","Awan gelap sering menjadi tanda hujan akan turun.")
      ],
      pancasila: [
        mc("Saat bertemu guru di pagi hari, sebaiknya kita ...",["menyapa dengan sopan","berlari menjauh","berteriak"],"menyapa dengan sopan","Menyapa guru dengan sopan adalah sikap hormat."),
        tf("Kita harus mendengarkan saat teman berbicara.","Benar","Mendengarkan menunjukkan sikap menghargai."),
        short("Bekerja bersama untuk membersihkan kelas disebut ...","gotong royong","Gotong royong adalah bekerja bersama-sama."),
        mc("Jika meminjam barang teman, kita harus ...",["menjaga dan mengembalikannya","menyembunyikannya","membawanya pulang"],"menjaga dan mengembalikannya","Barang pinjaman harus dijaga dan dikembalikan."),
        mc("Contoh aturan di sekolah adalah ...",["datang tepat waktu","mencoret meja","berlari di kelas"],"datang tepat waktu","Datang tepat waktu termasuk menaati aturan sekolah."),
        tf("Teman yang berbeda kesukaan tidak boleh diajak bermain.","Salah","Kita tetap berteman dan menghargai perbedaan."),
        mc("Saat melihat teman kesulitan, kita sebaiknya ...",["menawarkan bantuan","menertawakan","membiarkannya"],"menawarkan bantuan","Menolong teman adalah sikap peduli."),
        short("Sebelum masuk rumah orang lain, kita sebaiknya ...","mengetuk pintu","Mengetuk pintu menunjukkan sikap sopan."),
        mc("Keputusan bersama sebaiknya dibuat dengan ...",["musyawarah","memaksa","bertengkar"],"musyawarah","Musyawarah membantu mencari kesepakatan bersama."),
        tf("Menjaga kebersihan kelas adalah tanggung jawab bersama.","Benar","Semua warga kelas dapat menjaga kebersihan."),
        mc("Jika berbeda pendapat dengan teman, kita sebaiknya ...",["berbicara dengan tenang","marah-marah","tidak mau mendengar"],"berbicara dengan tenang","Perbedaan pendapat disampaikan dengan sopan."),
        short("Kepada orang yang lebih tua, kita berbicara dengan ...","sopan","Berbicara sopan menunjukkan rasa hormat."),
        mc("Contoh menjaga fasilitas umum adalah ...",["menggunakan taman dengan baik","merusak bangku","mencoret dinding"],"menggunakan taman dengan baik","Fasilitas umum digunakan dan dijaga bersama."),
        tf("Menaati aturan membuat kegiatan lebih tertib.","Benar","Aturan membantu kegiatan berjalan dengan tertib."),
        mc("Lambang negara Indonesia adalah ...",["Garuda Pancasila","burung merpati","burung elang"],"Garuda Pancasila","Lambang negara Indonesia adalah Garuda Pancasila.")
      ],
      agama: [
        mc("Saat menerima bantuan, kita mengucapkan ...",["terima kasih","selamat tidur","sampai jumpa"],"terima kasih","Mengucapkan terima kasih adalah kebiasaan baik."),
        tf("Berkata jujur berarti mengatakan hal yang sebenarnya.","Benar","Jujur berarti berkata sesuai kenyataan."),
        short("Jika berbuat salah, kita sebaiknya meminta ...","maaf","Meminta maaf adalah langkah baik saat berbuat salah."),
        mc("Saat menemukan barang milik teman, kita sebaiknya ...",["mengembalikan kepada pemiliknya","menyimpannya","membuangnya"],"mengembalikan kepada pemiliknya","Mengembalikan barang menunjukkan sikap jujur."),
        mc("Sikap yang baik saat orang lain beribadah adalah ...",["menghormati dan tidak mengganggu","berisik","mengejek"],"menghormati dan tidak mengganggu","Kita menghormati orang lain yang sedang beribadah."),
        tf("Membantu teman yang kesulitan adalah perbuatan baik.","Benar","Saling membantu membuat kita hidup rukun."),
        mc("Jika diberi tugas merapikan mainan, kita harus ...",["menyelesaikannya","meninggalkannya","menyuruh orang lain"],"menyelesaikannya","Menyelesaikan tugas menunjukkan tanggung jawab."),
        short("Kepada orang tua, kita harus bersikap ...","hormat","Kita menghormati dan menyayangi orang tua."),
        mc("Saat teman berbicara, sikap yang baik adalah ...",["mendengarkan","memotong terus","berteriak"],"mendengarkan","Mendengarkan adalah bentuk menghargai orang lain."),
        tf("Kita boleh mengambil barang orang lain tanpa izin.","Salah","Kita perlu meminta izin dan tidak mengambil barang tanpa izin."),
        mc("Contoh menjaga kebersihan diri adalah ...",["mandi dengan teratur","tidak mencuci tangan","memakai baju kotor"],"mandi dengan teratur","Mandi teratur membantu menjaga kebersihan tubuh."),
        short("Jika meminjam barang, setelah selesai kita harus ...","mengembalikan","Barang yang dipinjam harus dikembalikan kepada pemiliknya."),
        mc("Sikap yang baik kepada teman yang berbeda adalah ...",["menghormatinya","mengejeknya","menjauhinya"],"menghormatinya","Kita menghormati setiap orang."),
        tf("Mengakui kesalahan adalah salah satu sikap berani.","Benar","Mengakui kesalahan merupakan bagian dari sikap jujur."),
        mc("Ketika berjanji, kita berusaha untuk ...",["menepatinya","melupakannya","mengingkarinya"],"menepatinya","Menepati janji menunjukkan sikap bertanggung jawab.")
      ],
      inggris: [
        mc("“Red” artinya warna ...",["merah","biru","kuning"],"merah","Red berarti merah."),
        tf("“Cat” dalam bahasa Indonesia artinya kucing.","Benar","Cat berarti kucing."),
        short("Bahasa Inggris dari “halo” adalah ...","hello","Hello berarti halo."),
        mc("“One, two, ...”",["three","five","seven"],"three","Setelah one dan two adalah three."),
        mc("Buah “apple” berwarna ...",["red","blue","purple"],"red","Apel sering berwarna merah. Red artinya merah."),
        tf("“Blue” artinya hijau.","Salah","Blue artinya biru."),
        mc("Bahasa Inggris dari “anjing” adalah ...",["dog","duck","fish"],"dog","Dog artinya anjing."),
        short("Bahasa Inggris dari “satu” adalah ...","one","One berarti satu."),
        mc("Kita mengucapkan “Good morning” pada ...",["pagi hari","tengah malam","sore hari"],"pagi hari","Good morning berarti selamat pagi."),
        tf("“Banana” artinya pisang.","Benar","Banana berarti pisang."),
        mc("Warna daun biasanya ...",["green","pink","black"],"green","Green berarti hijau."),
        short("“Thank you” artinya ...","terima kasih","Thank you berarti terima kasih."),
        mc("Hari setelah Monday adalah ...",["Tuesday","Sunday","Friday"],"Tuesday","Tuesday adalah hari setelah Monday."),
        tf("“Goodbye” digunakan saat berpamitan.","Benar","Goodbye berarti selamat tinggal atau sampai jumpa."),
        mc("“Fish” adalah nama ...",["hewan","warna","angka"],"hewan","Fish berarti ikan, yaitu nama hewan.")
      ]
    };
    function mc(question, options, answer, explanation) { return {type:"Pilihan ganda",question,options,answer,explanation}; }
    function tf(question, answer, explanation) { return {type:"Benar atau salah",question,options:["Benar","Salah"],answer,explanation}; }
    function short(question, answer, explanation) { return {type:"Isian singkat",question,answer,explanation}; }
    function wordOrder(question, answer, explanation) { return {type:"Susun kata",question,answer,explanation}; }
    function story(question, options, answer, explanation) { return {type:"Soal cerita",question,options,answer,explanation}; }

    const storageKey = "belajar-ceria-v1";
    let data = loadData();
    let screen = data.profile ? "home" : "welcome";
    let activeSubject = null;
    let activeTopic = 0;
    let questionIndex = 0;
    let answers = {};
    let resultRun = null;
    let soundEnabled = false;
    let audioContext = null;

    function getAudioContext() {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      if (!audioContext) audioContext = new AudioContextClass();
      return audioContext;
    }
    function playTone(frequency, duration=0.16, volume=0.018, type="sine", delay=0) {
      if (!soundEnabled) return;
      audioContext = getAudioContext();
      if (!audioContext) return;
      if (audioContext.state === "suspended") audioContext.resume().catch(error => console.error("Efek suara tidak dapat diputar.", error));
      const start = audioContext.currentTime + delay;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + duration);
    }
    function updateSoundControl() {
      const button = document.querySelector("[data-sound-toggle]");
      if (!button) return;
      button.setAttribute("aria-label", soundEnabled ? "Matikan backsound" : "Putar backsound");
      button.setAttribute("aria-pressed", String(soundEnabled));
      button.innerHTML = `${icon(soundEnabled ? "volume_up" : "volume_off","text-[21px]")}<span class="hidden text-xs font-extrabold sm:inline">${soundEnabled ? "Suara aktif" : "Putar backsound"}</span>`;
    }
    function playBackgroundMusic() {
      const audio = document.getElementById("background-music");
      audio.volume = 0.12;
      audio.play().then(() => {
        soundEnabled = true;
        updateSoundControl();
      }).catch(error => {
        soundEnabled = false;
        updateSoundControl();
        if (error.name !== "NotAllowedError") console.error("Backsound tidak dapat diputar.", error);
      });
    }
    function toggleSound() {
      if (soundEnabled) {
        document.getElementById("background-music").pause();
        soundEnabled = false;
        updateSoundControl();
      } else {
        playBackgroundMusic();
      }
    }

    document.addEventListener("click", event => {
      const button = event.target.closest("button");
      if (soundEnabled && button && !button.disabled && !button.hasAttribute("data-sound-toggle")) {
        playTone(880,0.09,0.014);
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        window.clearInterval(musicTimer);
        musicTimer = null;
      } else {
        startBackgroundMusic();
      }
    });

    function loadData() {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
        return { profile:saved.profile || null, history:Array.isArray(saved.history) ? saved.history : [], draft:saved.draft || null, completedTopics:saved.completedTopics || [] };
      } catch (error) {
        console.warn("Data belajar tersimpan tidak dapat dibaca.", error);
        return { profile:null, history:[], draft:null, completedTopics:[] };
      }
    }
    function persist() {
      try { localStorage.setItem(storageKey, JSON.stringify(data)); }
      catch (error) { console.error("Progres belajar tidak dapat disimpan.", error); }
    }
    function esc(value) { return String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[char])); }
    function totalStars() { return data.history.reduce((sum, item) => sum + item.stars, 0); }
    function bestScore() { return data.history.length ? Math.max(...data.history.map(item => item.score)) : 0; }
    function subjectById(id) { return subjects.find(subject => subject.id === id); }
    function icon(name, size="text-2xl") { return `<span aria-hidden="true" class="material-symbols-outlined ${size}">${name}</span>`; }
    function setScreen(next) { screen = next; window.scrollTo({top:0,behavior:"smooth"}); render(); }
    function goSubjects() {
      if (screen !== "home") setScreen("home");
      requestAnimationFrame(() => document.getElementById("subjects")?.scrollIntoView({behavior:"smooth",block:"start"}));
    }
    function header(showBack = false, title = "") {
      return `<header class="sticky top-0 z-30 border-b border-purple-100/80 bg-[#fdf7ff]/90 backdrop-blur-xl">
        <div class="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div class="flex min-w-0 items-center gap-3">
            ${showBack ? `<button onclick="goBack()" class="btn-press grid h-11 w-11 place-items-center rounded-2xl border-2 border-purple-100 bg-white text-xl shadow-[0_3px_0_#e2dcf8]" aria-label="Kembali">←</button>` : ""}
            <button onclick="setScreen('home')" class="flex items-center gap-2.5 text-left" aria-label="Ke beranda">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple text-white shadow-[0_4px_0_#491cc5]">${icon("auto_stories","text-[25px]")}</span>
              <span class="font-display text-lg font-bold leading-tight text-purple sm:text-xl">Belajar Ceria</span>
            </button>
          </div>
          ${data.profile ? `<nav class="hidden items-center gap-1 md:flex" aria-label="Navigasi desktop">
            <button onclick="setScreen('home')" class="rounded-full px-5 py-2.5 text-sm font-extrabold transition ${screen==="home"?"bg-purple text-white shadow-[0_3px_0_#491cc5]":"text-ink hover:bg-purple/10"}">Beranda</button>
            <button onclick="goSubjects()" class="rounded-full px-5 py-2.5 text-sm font-extrabold text-ink transition hover:bg-purple/10">Mata Pelajaran</button>
            <button onclick="setScreen('progress')" class="rounded-full px-5 py-2.5 text-sm font-extrabold transition ${screen==="progress"?"bg-purple text-white shadow-[0_3px_0_#491cc5]":"text-ink hover:bg-purple/10"}">Progres</button>
          </nav>` : `<span class="hidden text-sm font-extrabold text-purple sm:block">Sahabat belajar kelas 1–3</span>`}
          <div class="flex shrink-0 items-center gap-2 sm:gap-3">
            ${data.profile ? `<span class="inline-flex items-center gap-1.5 rounded-full bg-yellow px-3.5 py-2 text-sm font-extrabold text-[#574400] shadow-[0_3px_0_#ecc306] sm:px-4"><span aria-hidden="true" class="material-symbols-outlined text-xl">star</span>${totalStars()}</span>` : ""}
            ${data.profile ? `<button onclick="setScreen('profile')" class="flex h-10 items-center gap-2 rounded-full bg-white px-2.5 shadow-[0_4px_12px_rgba(95,59,218,.08)] sm:px-3"><span class="grid h-8 w-8 place-items-center rounded-full bg-[#ffe6db] text-orange">${icon("face_3","text-xl")}</span><span class="hidden text-sm font-extrabold text-ink sm:block">Kelas ${data.profile.grade}</span><span class="sr-only">Profil ${esc(data.profile.name)}</span></button>` : ""}
            <button data-sound-toggle onclick="toggleSound()" aria-label="${soundEnabled ? "Matikan backsound" : "Putar backsound"}" aria-pressed="${soundEnabled}" title="Backsound diputar dengan volume rendah" class="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-white px-2.5 text-purple shadow-[0_4px_12px_rgba(95,59,218,.08)] sm:px-3">
              ${icon(soundEnabled ? "volume_up" : "volume_off","text-[21px]")}<span class="hidden text-xs font-extrabold sm:inline">${soundEnabled ? "Suara aktif" : "Putar backsound"}</span>
            </button>
          </div>
        </div>
      </header>`;
    }
    function nav(active) {
      return `<nav class="fixed bottom-0 left-0 right-0 z-30 border-t border-purple-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden" aria-label="Navigasi utama">
        <div class="mx-auto grid max-w-lg grid-cols-3 gap-1 px-3 py-2">
          ${[["home","home","Beranda"],["progress","monitoring","Progres"],["profile","face_3","Profil"]].map(([id,name,label]) => `<button onclick="setScreen('${id}')" class="flex min-h-[56px] flex-col items-center justify-center rounded-2xl ${active===id?"bg-lilac text-purple":"text-muted"}">${icon(name,"text-[22px]")}<span class="text-xs font-extrabold">${label}</span></button>`).join("")}
        </div>
      </nav>`;
    }
    function shell(content, options={}) {
      document.getElementById("app").innerHTML = `${header(options.back, options.title || "")}<main class="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:px-8 ${options.mainClass || ""}">${content}</main>${options.nav ? nav(options.nav) : ""}`;
      document.getElementById("modal-root").innerHTML = "";
    }
    function render() {
      if (screen === "welcome") return renderWelcome();
      if (screen === "profileSetup") return renderSetup();
      if (screen === "home") return renderHome();
      if (screen === "subject") return renderSubject();
      if (screen === "lesson") return renderLesson();
      if (screen === "quiz") return renderQuiz();
      if (screen === "result") return renderResult();
      if (screen === "progress") return renderProgress();
      if (screen === "profile") return renderProfile();
      renderHome();
    }
    function renderWelcome() {
      document.getElementById("app").innerHTML = `${header()}<main class="relative overflow-hidden px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div class="pointer-events-none absolute -right-20 top-12 h-72 w-72 rounded-full bg-yellow/25 blur-3xl"></div>
        <section class="relative mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(95,59,218,.1)] lg:grid-cols-12">
          <div class="flex flex-col items-center px-6 pb-7 pt-7 text-center sm:px-10 sm:pt-10 lg:col-span-5 lg:items-start lg:px-12 lg:py-12 lg:text-left">
            <div class="inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-2 text-sm font-extrabold text-[#654f00] shadow-[0_3px_0_#ecc306]">${icon("auto_awesome","text-[19px]")} Petualangan ilmu dimulai!</div>
            <h1 class="mt-5 max-w-xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[42px]">Selamat datang di <span class="text-purple">Belajar Ceria!</span></h1>
            <p class="mt-4 max-w-md text-base font-semibold leading-7 text-muted sm:text-lg sm:leading-8">Yuk, bermain sambil belajar, mengumpulkan bintang, dan jadi juara setiap hari!</p>
            <div class="illustration-frame relative mt-7 w-full max-w-[500px] overflow-hidden rounded-[1.75rem] bg-[#f4eaff] lg:mt-auto lg:pt-8">
              <img src="assets/welcome-students.jpg" alt="Anak-anak belajar bersama dengan ceria" class="h-52 w-full object-cover sm:h-64">
              <span class="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-xs font-extrabold text-ink shadow-lg">${icon("verified","text-[18px] text-green")} Seru & ramah anak</span>
            </div>
          </div>
          <div class="flex items-center p-4 sm:p-8 lg:col-span-7 lg:p-10">
            <form onsubmit="saveProfile(event)" class="w-full rounded-[1.75rem] bg-[#f8f1ff] p-5 sm:p-8">
              <label for="child-name" class="flex items-center gap-3 font-display text-lg font-semibold text-ink">
                <span class="grid h-10 w-10 place-items-center rounded-full bg-purple text-white shadow-[0_3px_0_#491cc5]">${icon("face","text-xl")}</span>Siapa nama panggilanmu?
              </label>
              <input id="child-name" maxlength="24" autocomplete="given-name" required placeholder="Contoh: Bintang, Rara, atau Budi..." class="focus-ring mt-3 h-14 w-full rounded-2xl border-0 bg-white px-5 text-base font-bold text-ink shadow-[0_4px_12px_rgba(95,59,218,.08)] placeholder:text-[#8c8799] sm:text-lg">
              <div class="mb-3 mt-7 flex flex-wrap items-center justify-between gap-2">
                <span class="flex items-center gap-3 font-display text-lg font-semibold text-ink"><span class="grid h-10 w-10 place-items-center rounded-full bg-[#c45100] text-white shadow-[0_3px_0_#873500]">${icon("school","text-xl")}</span>Pilih kelasmu</span>
                <span class="rounded-full bg-[#e6deff] px-3 py-1.5 text-xs font-extrabold text-purple">Belajar sesuai kelas</span>
              </div>
              <fieldset><legend class="sr-only">Pilih kelas</legend><div class="grid grid-cols-3 gap-2.5 sm:gap-3">
                ${[1,2,3].map(grade => `<label class="cursor-pointer"><input type="radio" name="grade" value="${grade}" ${grade===2?"checked":""} class="peer sr-only"><span class="flex min-h-[112px] flex-col items-center justify-center gap-2 rounded-2xl bg-white px-2 py-3 text-center text-ink shadow-[0_5px_0_#e0d5f6,0_9px_18px_rgba(95,59,218,.07)] transition hover:-translate-y-0.5 peer-checked:bg-purple peer-checked:text-white peer-checked:shadow-[0_5px_0_#491cc5,0_10px_20px_rgba(95,59,218,.2)]"><span class="grid h-10 w-10 place-items-center rounded-full bg-sky/20 text-purple peer-checked:bg-white/20 peer-checked:text-white">${icon(["child_care","menu_book","rocket_launch"][grade-1],"text-[24px]")}</span><span class="font-display font-bold">Kelas ${grade}</span><span class="text-[11px] font-bold opacity-80">Usia ${grade+5}–${grade+6} tahun</span></span></label>`).join("")}
              </div></fieldset>
              <button class="btn-press mt-7 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#c45100] px-6 font-display text-lg font-bold text-white shadow-[0_6px_0_#873500,0_12px_24px_rgba(196,81,0,.2)] hover:brightness-105">${icon("arrow_forward","text-[24px] order-2")}<span>Mulai Belajar</span></button>
              <p class="mt-4 text-center text-xs font-bold text-muted">Nama panggilanmu hanya disimpan di perangkat ini.</p>
            </form>
          </div>
        </section>
      </main><footer class="bg-[#f8f1ff] px-5 py-5 text-center text-xs font-semibold text-muted sm:flex sm:justify-between sm:px-8"><span>© 2026 Belajar Ceria · Sahabat belajar kelas 1–3 SD</span><span class="mt-1 inline-block sm:mt-0">Belajar jadi seru setiap hari!</span></footer>`;
    }
    function renderSetup() {
      document.getElementById("app").innerHTML = `<main class="flex min-h-screen items-center justify-center bg-[#f8f7fc] px-4 py-8">
        <div class="w-full max-w-xl">
          <button onclick="setScreen('welcome')" class="mb-5 rounded-full px-3 py-2 font-extrabold text-muted hover:bg-white">← Kembali</button>
          <section class="rounded-[2rem] bg-white p-6 shadow-card sm:p-10">
            <div class="mb-6 text-center"><div class="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-lilac text-4xl">🙋</div><h1 class="font-display text-3xl font-bold text-ink">Kenalan dulu, yuk!</h1><p class="mt-2 font-semibold text-muted">Supaya kami bisa menyapa dengan nama yang tepat.</p></div>
            <form onsubmit="saveProfile(event)">
              <label for="child-name" class="mb-2 block text-sm font-extrabold text-ink">Nama panggilan</label>
              <input id="child-name" maxlength="24" autocomplete="given-name" required placeholder="Contoh: Naya" class="focus-ring h-14 w-full rounded-2xl border-2 border-purple-100 px-4 text-lg font-bold text-ink placeholder:text-[#aaa5b7]">
              <fieldset class="mt-7"><legend class="mb-3 text-sm font-extrabold text-ink">Kamu kelas berapa?</legend><div class="grid grid-cols-3 gap-3">
                ${[1,2,3].map(grade => `<label class="cursor-pointer"><input type="radio" name="grade" value="${grade}" ${grade===1?"checked":""} class="peer sr-only"><span class="flex min-h-[72px] flex-col items-center justify-center rounded-2xl border-2 border-purple-100 bg-white font-display text-xl font-bold text-muted shadow-[0_3px_0_#eee8fa] transition peer-checked:border-purple peer-checked:bg-lilac peer-checked:text-purple"><span class="text-xs font-extrabold">KELAS</span>${grade}</span></label>`).join("")}
              </div></fieldset>
              <button class="btn-press mt-8 min-h-14 w-full rounded-full bg-orange px-6 text-lg font-extrabold text-white shadow-orange">Lanjutkan <span class="ml-2">→</span></button>
            </form>
            <p class="mt-5 text-center text-xs font-semibold text-muted">Nama panggilan disimpan hanya di perangkat ini.</p>
          </section>
        </div>
      </main>`;
    }
    function saveProfile(event) {
      event.preventDefault();
      const name = document.getElementById("child-name").value.trim();
      const grade = Number(new FormData(event.currentTarget).get("grade"));
      if (!name || ![1,2,3].includes(grade)) return;
      data.profile = {name,grade}; persist(); setScreen("home");
    }
    function renderHome() {
      const name = data.profile?.name || "Teman";
      const cards = subjects.map((subject, index) => {
        const count = data.history.filter(run => run.subjectId === subject.id).length;
        return `<button onclick="openSubject('${subject.id}')" class="subject-card group relative flex min-h-[156px] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] bg-white px-3 py-5 text-center shadow-[0_6px_0_#e2d9f1,0_10px_20px_rgba(95,59,218,.08)] sm:min-h-[190px] sm:px-4">
          <span class="grid h-14 w-14 place-items-center rounded-2xl sm:h-16 sm:w-16" style="background:${subject.pale};color:${subject.color}">${icon(subject.icon,"text-[32px] sm:text-[36px]")}</span>
          <h3 class="mt-3 max-w-[170px] font-display text-sm font-bold leading-snug text-ink sm:text-base">${subject.short}</h3>
          <span class="mt-4 h-1.5 w-10 rounded-full transition-all group-hover:w-16" style="background:${subject.color}"></span>
          ${count?`<span class="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-green text-white">${icon("check","text-[15px]")}</span>`:""}
        </button>`;
      }).join("");
      const lessonCount = data.history.length;
      shell(`<section class="fade-in">
        <div class="relative overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-[#f0e9ff] via-[#f6f0ff] to-[#e3f5ff] p-5 shadow-[0_14px_36px_rgba(95,59,218,.1)] sm:p-8 lg:p-10">
          <span class="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-yellow/30 blur-2xl"></span><span class="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-sky/20 blur-2xl"></span>
          <div class="relative mb-6 flex items-start justify-between gap-4">
            <div><div class="inline-flex items-center gap-2 rounded-full bg-purple px-4 py-2 text-sm font-extrabold text-white shadow-[0_4px_0_#491cc5]">${icon("school","text-[18px]")} Kelas ${data.profile.grade}</div><span class="ml-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-extrabold text-muted shadow-sm">${icon("local_fire_department","text-[18px] text-green")} Semangat terus!</span>
              <h1 class="mt-4 font-display text-[28px] font-bold leading-tight text-ink sm:text-4xl">Halo, ${esc(name)}!<br class="sm:hidden"> Siap belajar hari ini?</h1>
            </div>
            <div class="hidden shrink-0 items-center gap-3 rounded-[1.5rem] bg-white px-5 py-3 shadow-[0_5px_0_#e2d9f1] sm:flex"><span class="grid h-12 w-12 place-items-center rounded-full bg-yellow text-[#705b00]">${icon("star","text-[27px]")}</span><div><p class="text-xs font-bold text-muted">TOTAL BINTANG</p><p class="font-display text-xl font-bold">${totalStars()} bintang</p></div></div>
          </div>
          <div class="relative grid items-center gap-5 lg:grid-cols-12 lg:gap-7">
            <div class="flex justify-center lg:col-span-5">
              <div class="relative h-[210px] w-full max-w-[410px] overflow-hidden rounded-[2rem] bg-white/70 p-3 shadow-[0_8px_0_rgba(255,255,255,.65)] sm:h-[250px]">
                <img src="assets/home-mascot.jpg" alt="Maskot gajah Belajar Ceria menyambut teman belajar" class="h-full w-full rounded-[1.5rem] object-cover object-center">
                <span class="absolute bottom-5 left-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-purple shadow-md">Sahabat belajarmu 🐘</span>
              </div>
            </div>
            <div class="lg:col-span-7">
              <article class="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_8px_0_#e2d9f1,0_14px_28px_rgba(95,59,218,.1)] sm:grid-cols-[1fr_190px]">
                <div class="p-5 sm:p-7"><span class="rounded-full bg-[#ffdfd2] px-3 py-1.5 text-[11px] font-extrabold tracking-wide text-[#933900]">REKOMENDASI HARI INI</span>
                  <h2 class="mt-3 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">Penjumlahan & Pengurangan Seru</h2>
                  <p class="mt-2 text-sm font-semibold text-muted">Matematika · Kelas ${data.profile.grade} · 15 soal latihan</p>
                  <div class="mt-4 flex items-center justify-between text-xs font-extrabold"><span>Progres belajarmu</span><span class="text-green">${Math.min(100,lessonCount*20)}%</span></div>
                  <div class="mt-2 h-3.5 overflow-hidden rounded-full bg-[#ece4ff]"><div class="h-full rounded-full bg-green transition-all" style="width:${Math.min(100,lessonCount*20)}%"></div></div>
                  <button onclick="openSubject('matematika')" class="btn-press mt-5 min-h-12 rounded-full bg-[#c45100] px-5 font-extrabold text-white shadow-[0_4px_0_#873500]">Lanjutkan belajar <span class="ml-1">→</span></button>
                </div>
                <div class="hidden items-center bg-[#e9f7ff] p-3 sm:flex"><img src="assets/math-subject.jpg" alt="Maskot bintang belajar matematika" class="h-full max-h-52 w-full rounded-[1.5rem] object-cover"></div>
              </article>
              <div class="mt-4 grid grid-cols-2 gap-3">
                <div class="flex items-center gap-3 rounded-[1.5rem] bg-white px-4 py-3.5 shadow-[0_5px_0_#e2d9f1]"><span class="grid h-11 w-11 place-items-center rounded-full bg-sky/15 text-sky">${icon("track_changes","text-[25px]")}</span><div><p class="font-extrabold">Misi harian</p><p class="text-xs font-semibold text-muted">${Math.min(lessonCount,3)} dari 3 latihan</p></div></div>
                <div class="flex items-center gap-3 rounded-[1.5rem] bg-white px-4 py-3.5 shadow-[0_5px_0_#e2d9f1]"><span class="grid h-11 w-11 place-items-center rounded-full bg-[#ffe4ed] text-[#ff5d8f]">${icon("emoji_events","text-[25px]")}</span><div><p class="font-extrabold">Koleksi piala</p><p class="text-xs font-semibold text-muted">${lessonCount} lencana diraih</p></div></div>
              </div>
            </div>
          </div>
        </div>
        <section id="subjects" class="mt-7 scroll-mt-24 rounded-[2rem] bg-[#7858f5] p-4 text-white shadow-[0_8px_0_#491cc5,0_15px_24px_rgba(95,59,218,.18)] sm:mt-10 sm:p-6 lg:p-7">
          <div class="mb-5 flex items-center justify-between gap-3"><h2 class="inline-flex items-center gap-2 rounded-full bg-green px-5 py-2.5 font-display text-lg font-bold text-white shadow-[0_4px_0_#3f9f00]">${icon("auto_stories","text-[22px]")} Mata Pelajaran</h2><span class="text-xs font-bold text-white/85 sm:text-sm">Pilih kesukaanmu ✨</span></div>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">${cards}</div>
        </section>
      </section>`, {nav:"home"});
    }
    function openSubject(id) { activeSubject = id; setScreen("subject"); }
    function renderSubject() {
      const subject = subjectById(activeSubject);
      if (!subject) return setScreen("home");
      const completed = subject.topics.filter((_,index) => data.completedTopics.includes(`${subject.id}-${index}`)).length;
      const percent = Math.round(completed / subject.topics.length * 100);
      const stars = data.history.filter(run => run.subjectId === subject.id).reduce((sum,run) => sum + run.stars,0);
      const artwork = subject.id === "matematika"
        ? `<img src="assets/math-subject.jpg" alt="Maskot bintang dan angka untuk belajar matematika" class="h-full w-full object-cover">`
        : `<div class="grid h-full w-full place-items-center text-white" style="background:linear-gradient(140deg,${subject.color},${subject.pale})">${icon(subject.icon,"text-[76px] drop-shadow-md")}</div>`;
      const topics = subject.topics.map(([title,desc], index) => {
        const key = `${subject.id}-${index}`;
        const done = data.completedTopics.includes(key);
        return `<article class="flex h-full flex-col rounded-[1.75rem] bg-white p-5 shadow-[0_8px_24px_rgba(95,59,218,.08)] sm:p-6">
          <div class="flex items-start gap-4">
            <span class="grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-2xl font-bold" style="background:${done?"#e8f8dc":subject.pale};color:${done?"#43a000":subject.color}">${index+1}</span>
            <div class="min-w-0 flex-1"><div class="flex flex-wrap items-center gap-2"><span class="rounded-full px-3 py-1 text-xs font-extrabold ${done?"bg-green text-white":"bg-[#eee5ff] text-purple"}">${done?`${icon("check_circle","mr-1 text-[14px]")} Selesai`:`${icon("schedule","mr-1 text-[14px]")} Belum dimulai`}</span></div><h3 class="mt-2 font-display text-lg font-bold leading-snug text-ink">${esc(title)}</h3></div>
            <span class="hidden rounded-full bg-[#fff4c9] px-2.5 py-1 text-sm font-bold text-[#9b7600] sm:inline-flex">${icon(done?"star":"star_outline","text-[18px]")}${done?"3":"—"}</span>
          </div>
          <p class="mt-4 flex-1 text-sm font-semibold leading-6 text-muted">${esc(desc)}</p>
          <div class="mt-5 grid grid-cols-2 gap-2.5">
            <button onclick="openLesson(${index})" class="btn-press flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-[#f5efff] px-3 font-extrabold text-purple shadow-[0_4px_0_#e4d7ff]">${icon("menu_book","text-[20px]")}Pelajari</button>
            <button onclick="startQuiz(${index})" class="btn-press flex min-h-12 items-center justify-center gap-1.5 rounded-full px-3 font-extrabold text-white shadow-[0_4px_0_#491cc5]" style="background:${subject.id==="pancasila"?"#c45100":"#5f3bda"}">${icon("quiz","text-[20px]")}Latihan soal</button>
          </div>
        </article>`;
      }).join("");
      shell(`<section class="fade-in">
        <div class="mb-5 flex items-center justify-between gap-3"><button onclick="setScreen('home')" class="btn-press inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 font-extrabold text-ink shadow-[0_4px_0_#e4d7ff]">${icon("arrow_back","text-[21px] text-purple")}Kembali ke Beranda</button><span class="hidden rounded-full bg-[#eee5ff] px-4 py-2 text-sm font-extrabold text-purple sm:inline-flex">${icon("school","mr-1 text-[18px]")} Kurikulum Merdeka · Kelas ${data.profile.grade}</span></div>
        <div class="grid gap-5 rounded-[2rem] bg-white p-5 shadow-card sm:p-7 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
          <div class="flex items-center gap-4 sm:gap-6">
            <div class="illustration-frame h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32 sm:rounded-[1.5rem]">${artwork}</div>
            <div><span class="inline-flex items-center gap-1.5 rounded-full bg-purple px-3 py-1.5 text-xs font-extrabold text-white">${icon("auto_stories","text-[16px]")} MATA PELAJARAN</span><p class="mt-3 text-xs font-extrabold uppercase tracking-wide text-purple">Kelas ${data.profile.grade}</p><h1 class="mt-1 font-display text-2xl font-bold leading-tight text-ink sm:text-4xl">${subject.name} · Kelas ${data.profile.grade}</h1><p class="mt-2 max-w-xl font-semibold leading-7 text-muted">Ayo belajar dan bermain bersama! Selesaikan topik untuk menambah bintang.</p></div>
          </div>
          <div class="rounded-[1.5rem] bg-[#f5efff] p-5 sm:p-6">
            <div class="flex items-center justify-between gap-3"><h2 class="font-display text-lg font-bold">Progres Belajar</h2><span class="rounded-full bg-green px-3 py-1 text-sm font-extrabold text-white">${percent}% selesai</span></div>
            <div class="mt-4 h-3.5 overflow-hidden rounded-full bg-[#e6deff]"><div class="h-full rounded-full bg-green" style="width:${percent}%"></div></div>
            <div class="mt-4 flex items-center justify-between text-sm font-bold"><span class="inline-flex items-center gap-1.5 text-muted">${icon("check_circle","text-[20px] text-green")}${completed} dari ${subject.topics.length} topik selesai</span><span class="inline-flex items-center gap-1 text-ink">${icon("star","text-xl text-yellow")} ${stars} bintang</span></div>
          </div>
        </div>
        <div class="mb-4 mt-8 flex items-end justify-between"><h2 class="border-l-[6px] border-purple pl-3 font-display text-2xl font-bold sm:text-3xl">Daftar Topik Materi</h2><span class="text-sm font-bold text-muted">${subject.topics.length} topik tersedia</span></div>
        <div class="grid gap-4 md:grid-cols-2">${topics}</div>
        <section class="mt-6 flex flex-col gap-4 rounded-[1.75rem] bg-[#eee5ff] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"><div class="flex items-center gap-3"><span class="grid h-12 w-12 place-items-center rounded-full bg-yellow text-[#705b00] shadow-[0_4px_0_#ecc306]">${icon("emoji_events","text-[25px]")}</span><div><p class="font-display text-lg font-bold">Sudah siap mencoba?</p><p class="text-sm font-semibold text-muted">Kerjakan 15 soal seru dan kumpulkan bintang!</p></div></div><button onclick="startQuiz(0)" class="btn-press flex min-h-12 items-center justify-center gap-2 rounded-full bg-purple px-6 font-extrabold text-white shadow-[0_5px_0_#491cc5]">${icon("rocket_launch","text-[20px]")}Mulai latihan (15 soal)</button></section>
      </section>`, {title:subject.name,nav:""});
    }
    function openLesson(index) { activeTopic = index; setScreen("lesson"); }
    function renderLesson() {
      const subject = subjectById(activeSubject), topic = subject?.topics[activeTopic];
      if (!subject || !topic) return setScreen("home");
      const lessonArt = subject.id === "matematika" ? "assets/lesson-student.jpg" : "assets/welcome-students.jpg";
      const lessonAlt = subject.id === "matematika" ? "Siswa menghitung apel sebagai contoh penjumlahan" : "Anak-anak belajar dan membaca bersama";
      shell(`<section class="fade-in">
        <div class="mb-5 flex items-center justify-between gap-3"><button onclick="setScreen('subject')" class="btn-press inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 font-extrabold text-ink shadow-[0_4px_0_#e4d7ff]">${icon("arrow_back","text-[21px] text-purple")}Kembali ke daftar materi</button><span class="hidden rounded-full bg-[#eee5ff] px-4 py-2 text-sm font-bold text-purple sm:inline-flex">${subject.name} · Kelas ${data.profile.grade}</span></div>
        <div class="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div class="flex flex-col gap-5">
            <section class="rounded-[2rem] bg-white p-6 shadow-card sm:p-9">
              <p class="text-xs font-extrabold tracking-[.14em] text-purple">MATERI BELAJAR · TOPIK ${String(activeTopic+1).padStart(2,"0")}</p>
              <h1 class="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">${esc(topic[0])}</h1>
              <p class="mt-3 text-lg font-semibold leading-8 text-muted">${esc(topic[1])}</p>
              <div class="mt-6 flex items-start gap-3 rounded-[1.4rem] bg-[#f5efff] p-4 sm:p-5">
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-purple text-white shadow-[0_3px_0_#491cc5]">${icon("lightbulb","text-[22px]")}</span>
                <div><h2 class="font-display text-lg font-bold">Apa yang perlu diingat?</h2><p class="mt-1 leading-7 text-muted">${esc(topic[2])}</p></div>
              </div>
            </section>
            <section class="overflow-hidden rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
              <div class="flex items-center justify-between gap-2"><div><p class="text-xs font-extrabold tracking-wide text-[#c45100]">VISUALISASI KONSEP</p><h2 class="mt-1 font-display text-xl font-bold">Contoh sehari-hari</h2></div><span class="grid h-10 w-10 place-items-center rounded-full bg-yellow text-[#705b00]">${icon("sunny","text-[22px]")}</span></div>
              <div class="mt-4 flex flex-wrap items-center justify-center gap-3 rounded-[1.5rem] bg-[#f8f1ff] p-4 sm:gap-5 sm:p-6">
                ${subject.id==="matematika" ? `<div class="rounded-2xl bg-white px-4 py-3 text-center shadow-sm"><div class="flex justify-center gap-1 text-[#ff5d8f]">${[1,2,3].map(()=>icon("nutrition","text-[28px]")).join("")}</div><p class="mt-1 font-display font-bold">3 apel</p></div><span class="grid h-11 w-11 place-items-center rounded-full bg-yellow text-[#705b00]">${icon("add","text-[28px]")}</span><div class="rounded-2xl bg-white px-4 py-3 text-center shadow-sm"><div class="flex justify-center gap-1 text-[#ff5d8f]">${[1,2].map(()=>icon("nutrition","text-[28px]")).join("")}</div><p class="mt-1 font-display font-bold">2 apel</p></div><span class="grid h-11 w-11 place-items-center rounded-full bg-purple text-white">${icon("equal","text-[26px]")}</span><div class="rounded-2xl bg-green px-5 py-3 text-center text-white shadow-[0_4px_0_#3f9f00]"><p class="font-display text-3xl font-bold">5</p><p class="text-sm font-extrabold">total apel</p></div>` : `<span class="grid h-20 w-20 place-items-center rounded-3xl bg-white text-purple shadow-card">${icon(subject.icon,"text-[45px]")}</span><p class="max-w-md text-center font-display text-lg font-bold leading-7 text-ink">${esc(topic[2])}</p>`}
              </div>
            </section>
          </div>
          <div class="flex flex-col gap-4">
            <figure class="illustration-frame relative min-h-[260px] overflow-hidden rounded-[2rem] bg-[#eee5ff] sm:min-h-[380px]">
              <img src="${lessonArt}" alt="${lessonAlt}" class="absolute inset-0 h-full w-full object-cover">
              <figcaption class="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-white/95 px-4 py-3 shadow-lg"><span class="font-extrabold">Ilustrasi belajar</span><span class="rounded-full bg-green px-3 py-1 text-xs font-extrabold text-white">Mudah dipahami</span></figcaption>
            </figure>
            <div class="rounded-[1.75rem] bg-[#fff4c9] p-5"><p class="flex items-center gap-2 font-display font-bold">${icon("stars","text-[23px] text-[#9b7600]")} Belajar pelan-pelan, ya!</p><p class="mt-1 text-sm font-semibold leading-6 text-muted">Baca lagi jika perlu. Kamu pasti bisa memahami materi ini.</p></div>
          </div>
        </div>
        <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-between"><button onclick="setScreen('subject')" class="btn-press flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-extrabold text-purple shadow-[0_4px_0_#e4d7ff]">${icon("arrow_back","text-[21px]")}Daftar materi</button><button onclick="startQuiz(${activeTopic})" class="btn-press flex min-h-12 items-center justify-center gap-2 rounded-full bg-purple px-6 font-extrabold text-white shadow-[0_5px_0_#491cc5]">${icon("rocket_launch","text-[21px]")}Mulai latihan (15 soal)${icon("arrow_forward","text-[20px]")}</button></div>
      </section>`, {title:topic[0],nav:""});
    }
    function startQuiz(topicIndex=0) {
      activeTopic = topicIndex;
      const saved = data.draft;
      if (saved && saved.subjectId === activeSubject && saved.topicIndex === topicIndex) {
        questionIndex = Math.min(saved.questionIndex || 0, 14); answers = saved.answers || {};
      } else { questionIndex = 0; answers = {}; }
      setScreen("quiz");
    }
    function saveDraft() {
      data.draft = {subjectId:activeSubject,topicIndex:activeTopic,questionIndex,answers}; persist();
    }
    function setAnswer(value) { answers[questionIndex] = value; saveDraft(); renderQuiz(); }
    function renderQuiz() {
      const subject = subjectById(activeSubject), list = questionSets[activeSubject], q = list?.[questionIndex];
      if (!subject || !q) return setScreen("home");
      const answered = Object.keys(answers).filter(index => answers[index] !== "").length;
      const options = q.options ? `<div class="mt-6 grid gap-3 sm:grid-cols-2">${q.options.map((option, i) => {
        const selected = answers[questionIndex] === option;
        return `<button onclick="setAnswer(${JSON.stringify(option).replace(/"/g,"&quot;")})" class="flex min-h-[66px] items-center gap-4 rounded-[1.4rem] border-2 px-4 py-3 text-left font-extrabold transition ${selected?"border-purple bg-purple text-white shadow-[0_5px_0_#491cc5]":"border-[#eee5ff] bg-[#f7f1ff] text-ink shadow-[0_4px_0_#e2d9f1] hover:border-purple/40"}"><span class="grid h-10 w-10 shrink-0 place-items-center rounded-full ${selected?"bg-white/20 text-white":"bg-white text-purple shadow-sm"}">${q.options.length===2?icon(i===0?"check":"close","text-[22px]"):String.fromCharCode(65+i)}</span><span class="flex-1">${esc(option)}</span>${selected?icon("check_circle","text-xl text-yellow"):""}</button>`;
      }).join("")}</div>` : `<div class="mt-7"><label for="short-answer" class="mb-2 block text-sm font-extrabold text-muted">Tulis jawabanmu di sini</label><input id="short-answer" value="${esc(answers[questionIndex] || "")}" oninput="setAnswerQuiet(this.value)" onblur="saveDraft()" placeholder="Ketik jawaban..." class="focus-ring h-14 w-full rounded-2xl border-2 border-purple-100 px-4 text-lg font-bold text-ink placeholder:text-[#aaa5b7]"></div>`;
      const progress = ((questionIndex+1)/list.length)*100;
      const questionArt = activeSubject==="matematika" && q.type==="Soal cerita"
        ? `<img src="assets/quiz-oranges.jpg" alt="Keranjang jeruk untuk soal cerita" class="h-full w-full object-cover">`
        : `<div class="grid h-full min-h-[150px] w-full place-items-center" style="background:linear-gradient(145deg,${subject.pale},#fff)"><span class="grid h-20 w-20 place-items-center rounded-[1.6rem] bg-white shadow-card" style="color:${subject.color}">${icon(subject.icon,"text-[46px]")}</span><span class="absolute right-4 top-4 text-yellow">${icon("auto_awesome","text-[25px]")}</span></div>`;
      shell(`<section class="fade-in mx-auto max-w-5xl">
        <div class="mx-auto mb-5 flex max-w-4xl items-center justify-between gap-3 rounded-[1.5rem] bg-white px-4 py-4 shadow-card sm:px-7">
          <div class="flex min-w-0 items-center gap-3"><span class="rounded-full bg-[#e6deff] px-3 py-2 text-xs font-extrabold text-purple sm:text-sm">${subject.name} · Kelas ${data.profile.grade}</span><p class="whitespace-nowrap font-display text-sm font-bold text-ink sm:text-lg">Soal ${questionIndex+1} <span class="text-muted">dari 15</span></p></div>
          <span class="hidden items-center gap-1.5 rounded-full bg-yellow px-3 py-2 text-sm font-extrabold text-[#705b00] sm:inline-flex">${icon("emoji_events","text-[19px]")} Semangat!</span>
        </div>
        <div class="mx-auto max-w-4xl rounded-full bg-[#e6deff] p-1"><div class="h-3 rounded-full bg-green transition-all duration-300" style="width:${progress}%"></div></div>
        <div class="mx-auto mt-2 flex max-w-4xl items-center justify-between px-1 text-xs font-extrabold text-muted"><span>Perjalanan soal</span><span>${answered} / 15 dijawab</span></div>
        <div class="mx-auto mt-5 grid max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-card lg:grid-cols-[230px_1fr]">
          <div class="relative hidden min-h-[215px] overflow-hidden bg-[#fff4d6] lg:block">${questionArt}</div>
          <div class="p-5 sm:p-8">
            <div class="flex items-center justify-between gap-3"><span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold" style="background:${subject.pale};color:${subject.color}">${icon(q.type==="Soal cerita"?"menu_book":"quiz","text-[17px]")}${q.type.toUpperCase()}</span><button onclick="confirmExitQuiz()" class="rounded-full px-3 py-2 text-xs font-extrabold text-muted hover:bg-canvas">Keluar latihan</button></div>
            <div class="mt-4 flex items-center gap-3 lg:hidden"><span class="grid h-12 w-12 place-items-center rounded-2xl" style="background:${subject.pale};color:${subject.color}">${icon(subject.icon,"text-[27px]")}</span><span class="text-sm font-extrabold text-muted">Pikirkan baik-baik, ya!</span></div>
            <h1 class="mt-4 font-display text-xl font-bold leading-8 text-ink sm:text-2xl">${esc(q.question)}</h1>
          ${options}
          <div class="mt-6 flex items-center justify-between gap-3 border-t border-purple-50 pt-5">
            <button onclick="moveQuestion(-1)" ${questionIndex===0?"disabled":""} class="btn-press flex min-h-12 items-center gap-1.5 rounded-full bg-white px-4 font-extrabold text-purple shadow-[0_4px_0_#e2d9f1] disabled:cursor-not-allowed disabled:opacity-40">${icon("arrow_back","text-[20px]")}<span>Sebelumnya</span></button>
            ${questionIndex===14 ? `<button onclick="showSubmitModal()" class="btn-press flex min-h-12 items-center gap-2 rounded-full bg-[#c45100] px-5 font-extrabold text-white shadow-[0_5px_0_#873500]">Selesai ${icon("check","text-[20px]")}</button>` : `<button onclick="moveQuestion(1)" class="btn-press flex min-h-12 items-center gap-2 rounded-full bg-[#c45100] px-5 font-extrabold text-white shadow-[0_5px_0_#873500]">Berikutnya ${icon("arrow_forward","text-[20px]")}</button>`}
          </div>
          </div>
        </div>
        <p class="mt-4 text-center text-sm font-bold text-muted">Jawabanmu tersimpan saat berpindah soal. Kamu bisa meninjaunya sebelum selesai.</p>
      </section>`, {title:"Latihan Soal",nav:""});
    }
    function setAnswerQuiet(value) { answers[questionIndex] = value; data.draft = {subjectId:activeSubject,topicIndex:activeTopic,questionIndex,answers}; persist(); }
    function moveQuestion(step) { questionIndex = Math.max(0,Math.min(14,questionIndex+step)); saveDraft(); renderQuiz(); }
    function jumpQuestion(index) { questionIndex = index; saveDraft(); renderQuiz(); }
    function normalized(value) { return String(value ?? "").trim().replace(/\s+/g," ").toLocaleLowerCase("id-ID"); }
    function showSubmitModal() {
      const empty = 15 - Object.keys(answers).filter(index => answers[index] !== "").length;
      document.getElementById("modal-root").innerHTML = `<div class="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-3 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="submit-title" onclick="if(event.target===this)closeModal()">
        <div class="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"><div class="text-center"><div class="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#fff7d5] text-4xl">🎉</div><h2 id="submit-title" class="mt-4 font-display text-2xl font-bold">Sudah selesai?</h2><p class="mt-2 font-semibold leading-6 text-muted">${empty ? `Masih ada ${empty} soal kosong. Jawaban kosong dihitung salah, ya.` : "Keren! Semua soal sudah kamu jawab."} Setelah dikirim, jawaban akan diperiksa.</p></div><div class="mt-6 grid gap-3"><button onclick="submitQuiz()" class="btn-press min-h-14 rounded-full bg-orange font-extrabold text-white shadow-orange">Kirim Jawaban</button><button onclick="closeModal()" class="min-h-12 rounded-full border-2 border-purple-100 font-extrabold text-purple">Periksa Lagi</button></div></div>
      </div>`;
    }
    function closeModal() { document.getElementById("modal-root").innerHTML = ""; }
    function confirmExitQuiz() {
      document.getElementById("modal-root").innerHTML = `<div class="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" role="dialog" aria-modal="true"><div class="w-full max-w-sm rounded-[2rem] bg-white p-7 text-center shadow-2xl"><div class="text-4xl">📝</div><h2 class="mt-3 font-display text-xl font-bold">Keluar dari latihan?</h2><p class="mt-2 font-semibold text-muted">Jawabanmu tersimpan. Kamu bisa melanjutkan nanti.</p><div class="mt-6 grid gap-3"><button onclick="closeModal();setScreen('subject')" class="min-h-12 rounded-full bg-purple font-extrabold text-white">Ya, keluar</button><button onclick="closeModal()" class="min-h-12 rounded-full border-2 border-purple-100 font-extrabold text-purple">Lanjutkan latihan</button></div></div></div>`;
    }
    function submitQuiz() {
      const subject = subjectById(activeSubject), questions = questionSets[activeSubject];
      const review = questions.map((q,index) => {
        const given = String(answers[index] ?? "").trim();
        const correct = q.options ? given === q.answer : normalized(given) === normalized(q.answer);
        return {question:q.question,given,answer:q.answer,correct,explanation:q.explanation,type:q.type};
      });
      const correctCount = review.filter(item => item.correct).length;
      const score = Math.round(correctCount / questions.length * 100);
      const stars = score >= 80 ? 3 : score >= 60 ? 2 : 1;
      [659.25,783.99,1046.5].forEach((frequency,index) => playTone(frequency,0.3,0.018,"sine",index*0.12));
      resultRun = {id:Date.now(),subjectId:activeSubject,subjectName:subject.name,topic:subject.topics[activeTopic][0],grade:data.profile.grade,date:new Date().toISOString(),correct:correctCount,total:questions.length,score,stars,review};
      data.history.unshift(resultRun);
      data.completedTopics = [...new Set([...data.completedTopics, `${activeSubject}-${activeTopic}`])];
      data.draft = null; persist(); closeModal(); setScreen("result");
    }
    function renderResult() {
      const run = resultRun || data.history[0];
      if (!run) return setScreen("home");
      const message = run.score >= 80 ? "Hebat sekali! Kamu menguasai materi ini! 🎉" : run.score >= 60 ? "Bagus! Terus berlatih, ya! 🌈" : "Usaha yang bagus! Ayo belajar lagi bersama! 💪";
      const reviews = run.review.map((item,index) => `<details class="group rounded-2xl border-2 ${item.correct?"border-green/20 bg-[#f7fff2]":"border-[#ffdce7] bg-[#fff7fa]"} p-4">
        <summary class="flex cursor-pointer list-none items-start gap-3"><span class="grid h-8 w-8 shrink-0 place-items-center rounded-full ${item.correct?"bg-green text-white":"bg-coral-pink text-white"} font-extrabold">${item.correct?"✓":"!"}</span><span class="flex-1"><span class="block text-xs font-extrabold text-muted">SOAL ${index+1} · ${esc(item.type)}</span><span class="mt-1 block font-extrabold leading-6 text-ink">${esc(item.question)}</span></span><span class="mt-1 text-muted transition group-open:rotate-180">⌄</span></summary>
        <div class="ml-11 mt-3 border-t border-black/5 pt-3 text-sm font-semibold leading-6 text-muted"><p>Jawabanmu: <strong class="${item.correct?"text-[#328500]":"text-[#d64b78]"}">${item.given?esc(item.given):"Belum dijawab"}</strong></p><p class="mt-1">Jawaban benar: <strong class="text-ink">${esc(item.answer)}</strong></p><p class="mt-2">💡 ${esc(item.explanation)}</p></div>
      </details>`).join("");
      shell(`<section class="fade-in">
        <div class="relative grid overflow-hidden rounded-[2.4rem] bg-white shadow-[0_16px_40px_rgba(95,59,218,.1)] lg:grid-cols-[1.05fr_.95fr]">
          <div class="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <span class="inline-flex w-fit items-center gap-2 rounded-full bg-[#e6deff] px-4 py-2 text-sm font-extrabold text-purple">${icon("celebration","text-[19px]")} Latihan selesai!</span>
            <div class="mt-5 flex items-center gap-2">${[1,2,3].map((_,i)=>`<span class="star-pop grid h-14 w-14 place-items-center rounded-full ${i<run.stars?"bg-yellow text-[#705b00] shadow-[0_5px_0_#ecc306]":"bg-[#f0ecf7] text-[#c8c2d2]"}" style="animation-delay:${i*.12}s">${icon(i<run.stars?"star":"star_outline","text-[34px]")}</span>`).join("")}</div>
            <div class="mt-5 flex flex-wrap items-center gap-4"><div class="rounded-[1.5rem] bg-[#f5efff] px-5 py-3"><p class="text-sm font-bold text-muted">Nilai akhirmu</p><p class="font-display text-5xl font-bold text-purple">${run.score}</p></div><div><span class="inline-flex items-center gap-2 rounded-full bg-[#e9f9df] px-4 py-2 font-extrabold text-[#369000]">${icon("check_circle","text-[21px]")} ${run.correct} dari ${run.total} soal benar</span><p class="mt-2 max-w-sm font-semibold leading-6 text-muted">${message}</p></div></div>
            <div class="mt-6 flex flex-wrap gap-3"><button onclick="scrollToReview()" class="btn-press flex min-h-12 items-center gap-2 rounded-full bg-purple px-5 font-extrabold text-white shadow-[0_5px_0_#491cc5]">${icon("visibility","text-[20px]")}Lihat pembahasan</button><button onclick="startQuiz(${activeTopic})" class="btn-press flex min-h-12 items-center gap-2 rounded-full bg-[#c45100] px-5 font-extrabold text-white shadow-[0_5px_0_#873500]">${icon("replay","text-[20px]")}Ulangi latihan</button></div>
            <button onclick="setScreen('home')" class="mt-3 flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#f5efff] px-5 font-extrabold text-ink shadow-[0_4px_0_#d8cce8]">${icon("home","text-[20px]")}Kembali ke Beranda</button>
          </div>
          <div class="relative min-h-[210px] bg-[#f5efff] sm:min-h-[270px] lg:min-h-[360px]">
            <img src="assets/achievement-student.jpg" alt="Murid merayakan keberhasilan dengan piala" class="absolute inset-0 h-full w-full object-cover object-center">
            <span class="absolute bottom-5 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-ink shadow-xl sm:bottom-8 sm:right-7 sm:px-5 sm:py-3">${icon("emoji_events","text-[22px] text-[#e5ad00]")} +${run.stars} bintang baru!</span>
          </div>
          <div class="grid grid-cols-3 border-t border-purple-50 px-3 py-4 lg:hidden">
            <div class="text-center"><p class="font-display text-2xl font-bold text-purple">${run.score}</p><p class="text-[10px] font-extrabold text-muted">NILAI</p></div>
            <div class="border-x border-purple-100 text-center"><p class="font-display text-2xl font-bold text-[#3d9900]">${run.correct}/${run.total}</p><p class="text-[10px] font-extrabold text-muted">BENAR</p></div>
            <div class="text-center"><p class="font-display text-2xl font-bold text-[#b58a00]">${run.stars} ⭐</p><p class="text-[10px] font-extrabold text-muted">BINTANG</p></div>
          </div>
        </div>
        <section id="review-list" class="mt-9 scroll-mt-24"><div class="mb-4 flex items-end justify-between"><div><p class="text-xs font-extrabold text-purple">BELAJAR DARI JAWABAN</p><h2 class="mt-1 font-display text-2xl font-bold">Pembahasan</h2></div><span class="text-xs font-bold text-muted sm:text-sm">Ketuk soal untuk melihat</span></div><div class="space-y-3">${reviews}</div></section>
      </section>`, {back:false,nav:""});
    }
    function scrollToReview() { document.getElementById("review-list")?.scrollIntoView({behavior:"smooth"}); }
    function renderProgress() {
      const count = data.history.length, latest = data.history[0];
      const progressAverage = subjects.length ? Math.round(subjects.reduce((sum,subject) => {
        const runs=data.history.filter(run=>run.subjectId===subject.id);
        return sum + Math.min(100,runs.length*25);
      },0)/subjects.length) : 0;
      const subjectRows = subjects.map(subject => {
        const runs = data.history.filter(run => run.subjectId === subject.id);
        const recent = runs[0], best = runs.length ? Math.max(...runs.map(run=>run.score)) : null;
        const progress=Math.min(100,runs.length*25);
        const encouragement=best===null?"Mulai petualanganmu!":best>=80?"Luar biasa!":best>=60?"Makin jago!":"Terus semangat!";
        return `<article class="rounded-[1.65rem] bg-white p-5 shadow-[0_8px_22px_rgba(95,59,218,.08)] sm:p-6">
          <div class="flex items-center gap-3"><span class="grid h-14 w-14 shrink-0 place-items-center rounded-full text-white shadow-[0_4px_0_rgba(0,0,0,.12)]" style="background:${subject.color}">${icon(subject.icon,"text-[27px]")}</span><div class="min-w-0"><h3 class="truncate font-display text-lg font-bold">${subject.short}</h3><span class="mt-1 inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${best===null?"bg-[#f0ecf7] text-muted":"bg-[#e9f9df] text-[#3a8b00]"}">${encouragement}</span></div></div>
          <div class="mt-4 flex items-center justify-between text-sm font-bold"><span class="text-muted">Progres latihan</span><span>${progress}%</span></div><div class="mt-2 h-3 overflow-hidden rounded-full bg-[#eee5ff]"><div class="h-full rounded-full bg-green" style="width:${progress}%"></div></div>
          <div class="mt-4 flex items-center justify-between bg-[#f7f1ff] px-4 py-3"><div><p class="text-xs font-bold text-muted">Nilai terbaik</p><p class="font-display text-xl font-bold text-purple">${best===null?"—":best}</p></div><span class="inline-flex items-center gap-1 rounded-full bg-yellow px-3 py-1.5 font-extrabold text-[#705b00] shadow-[0_3px_0_#ecc306]">${icon("star","text-[18px]")}${runs.reduce((sum,run)=>sum+run.stars,0)}</span></div>
        </article>`;
      }).join("");
      const historyRows = data.history.slice(0,8).map(run => `<div class="flex items-center gap-3 border-b border-purple-50 py-3 last:border-0"><span class="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style="background:${subjectById(run.subjectId)?.color||"#7c5df9"}">${icon(subjectById(run.subjectId)?.icon||"menu_book","text-[21px]")}</span><div class="min-w-0 flex-1"><p class="truncate font-extrabold text-ink">${esc(run.subjectName)} · ${esc(run.topic)}</p><p class="text-xs font-bold text-muted">${new Date(run.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})} · ${run.correct}/${run.total} benar</p></div><span class="rounded-full bg-lilac px-3 py-1 font-display font-bold text-purple">${run.score}</span></div>`).join("");
      shell(`<section class="fade-in">
        ${latest?`<section class="relative grid overflow-hidden rounded-[2rem] bg-white shadow-card lg:grid-cols-[1.1fr_.9fr]">
          <div class="relative z-10 p-6 sm:p-9"><span class="inline-flex items-center gap-2 rounded-full bg-[#e6deff] px-4 py-2 text-sm font-extrabold text-purple">${icon("celebration","text-[19px]")} Latihan selesai!</span>
            <div class="mt-4 flex items-center gap-2">${[1,2,3].map((_,i)=>`<span class="grid h-12 w-12 place-items-center rounded-full ${i<latest.stars?"bg-yellow text-[#705b00] shadow-[0_4px_0_#ecc306]":"bg-[#f0ecf7] text-[#c8c2d2]"}">${icon(i<latest.stars?"star":"star_outline","text-[29px]")}</span>`).join("")}</div>
            <div class="mt-4 flex flex-wrap items-center gap-4"><div class="rounded-2xl bg-[#f5efff] px-5 py-3"><p class="text-xs font-bold text-muted">Nilai terakhir</p><p class="font-display text-4xl font-bold text-purple">${latest.score}</p></div><div><span class="rounded-full bg-[#e9f9df] px-4 py-2 text-sm font-extrabold text-[#369000]">${latest.correct} dari ${latest.total} soal benar</span><p class="mt-3 font-semibold text-muted">Setiap langkah kecil membawamu jadi makin pintar.</p></div></div>
          </div>
          <div class="relative hidden min-h-[260px] bg-[#f5efff] lg:block"><img src="assets/achievement-student.jpg" alt="Murid merayakan keberhasilan dengan piala" class="absolute inset-0 h-full w-full object-cover"><span class="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-extrabold shadow-lg">${icon("emoji_events","text-[21px] text-[#e5ad00]")} +${latest.stars} bintang baru!</span></div>
        </section>`:`<section class="grid overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#f0e9ff] to-[#e6f7ff] shadow-card sm:grid-cols-[1fr_260px]">
          <div class="p-6 sm:p-8"><p class="text-sm font-extrabold text-purple">LANGKAH KECIL, KEMAJUAN BESAR</p><h1 class="mt-2 font-display text-3xl font-bold text-ink">Perjalananmu dimulai di sini!</h1><p class="mt-2 max-w-lg font-semibold leading-7 text-muted">Coba latihan pertama dan kumpulkan bintang sambil belajar.</p><button onclick="setScreen('home')" class="btn-press mt-5 min-h-12 rounded-full bg-purple px-5 font-extrabold text-white shadow-[0_5px_0_#491cc5]">Pilih pelajaran ${icon("arrow_forward","text-[20px]")}</button></div>
          <div class="hidden min-h-[190px] sm:block"><img src="assets/home-mascot.jpg" alt="Maskot Belajar Ceria menemani perjalanan belajar" class="h-full w-full object-cover"></div>
        </section>`}
        <div class="mb-6 mt-8 flex flex-wrap items-end justify-between gap-3"><div><p class="text-xs font-extrabold tracking-wide text-purple">PENCAPAIAN BELAJARMU · KELAS ${data.profile.grade}</p><h1 class="mt-1 font-display text-3xl font-bold text-ink">Ringkasan Progres Belajar</h1><p class="mt-2 font-semibold text-muted">${esc(data.profile.name)}, kamu sudah mengumpulkan ${totalStars()} bintang. Terus semangat!</p></div><div class="flex items-center gap-3 rounded-[1.5rem] bg-white px-4 py-3 shadow-card"><span class="grid h-12 w-12 place-items-center rounded-full border-[5px] border-green text-sm font-extrabold text-purple">${progressAverage}%</span><div><p class="text-xs font-bold text-muted">TOTAL PROGRES</p><p class="font-display font-bold">${progressAverage}% selesai</p></div></div></div>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">${subjectRows}</div>
        ${historyRows?`<section class="mt-8 rounded-[1.75rem] bg-white p-5 shadow-card sm:p-7"><div class="flex items-center justify-between"><div><p class="text-xs font-extrabold tracking-wide text-purple">PERJALANAN TERAKHIR</p><h2 class="mt-1 font-display text-xl font-bold">Latihan yang sudah kamu kerjakan</h2></div><span class="grid h-11 w-11 place-items-center rounded-full bg-[#fff4c9] text-[#9b7600]">${icon("history","text-[23px]")}</span></div><div class="mt-3">${historyRows}</div></section>`:""}
      </section>`, {title:"Progres Belajarku",nav:"progress"});
    }
    function renderProfile() {
      shell(`<section class="fade-in mx-auto max-w-2xl">
        <div class="rounded-[2rem] bg-white p-6 shadow-card sm:p-9">
          <div class="text-center"><span class="mx-auto grid h-20 w-20 place-items-center rounded-[1.75rem] bg-[#ffe8d9] font-display text-4xl font-bold text-orange">${esc(data.profile.name.slice(0,1).toUpperCase())}</span><h1 class="mt-4 font-display text-2xl font-bold">Profil Belajar</h1><p class="mt-1 font-semibold text-muted">Pengaturan sederhana untuk teman belajar.</p></div>
          <form onsubmit="updateProfile(event)" class="mt-7"><label for="edit-name" class="mb-2 block text-sm font-extrabold">Nama panggilan</label><input id="edit-name" maxlength="24" required value="${esc(data.profile.name)}" class="focus-ring h-14 w-full rounded-2xl border-2 border-purple-100 px-4 text-lg font-bold">
            <fieldset class="mt-6"><legend class="mb-3 text-sm font-extrabold">Kelas</legend><div class="grid grid-cols-3 gap-3">${[1,2,3].map(grade=>`<label class="cursor-pointer"><input type="radio" name="grade" value="${grade}" ${data.profile.grade===grade?"checked":""} class="peer sr-only"><span class="flex min-h-14 items-center justify-center rounded-2xl border-2 border-purple-100 font-display text-lg font-bold text-muted peer-checked:border-purple peer-checked:bg-lilac peer-checked:text-purple">Kelas ${grade}</span></label>`).join("")}</div></fieldset>
            <button class="btn-press mt-6 min-h-12 w-full rounded-full bg-purple font-extrabold text-white shadow-purple">Simpan Profil</button></form>
          <div class="mt-7 rounded-2xl bg-canvas p-4"><p class="font-extrabold">🔒 Data belajar tersimpan di perangkat ini.</p><p class="mt-1 text-sm font-semibold text-muted">Kami hanya menyimpan nama panggilan, kelas, dan hasil latihan di browser ini.</p></div>
          <button onclick="resetProgress()" class="mt-5 min-h-12 w-full rounded-full border-2 border-[#ffdce7] bg-white font-extrabold text-[#cf4e75]">Hapus semua progres</button>
        </div>
      </section>`, {title:"Profil",nav:"profile"});
    }
    function updateProfile(event) {
      event.preventDefault(); const name=document.getElementById("edit-name").value.trim(), grade=Number(new FormData(event.currentTarget).get("grade"));
      if (!name || ![1,2,3].includes(grade)) return;
      data.profile={name,grade}; persist(); setScreen("profile");
    }
    function resetProgress() {
      document.getElementById("modal-root").innerHTML = `<div class="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" role="dialog" aria-modal="true"><div class="w-full max-w-sm rounded-[2rem] bg-white p-7 text-center shadow-2xl"><div class="text-4xl">🧹</div><h2 class="mt-3 font-display text-xl font-bold">Hapus semua progres?</h2><p class="mt-2 font-semibold text-muted">Riwayat latihan dan bintang akan dihapus dari perangkat ini.</p><div class="mt-6 grid gap-3"><button onclick="data.history=[];data.completedTopics=[];data.draft=null;persist();closeModal();setScreen('profile')" class="min-h-12 rounded-full bg-[#ff5d8f] font-extrabold text-white">Ya, hapus progres</button><button onclick="closeModal()" class="min-h-12 rounded-full border-2 border-purple-100 font-extrabold text-purple">Batalkan</button></div></div></div>`;
    }
    function goBack() {
      if (screen==="lesson" || screen==="quiz" || screen==="result") setScreen("subject");
      else setScreen("home");
    }
    document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("background-music").volume = 0.12;
      playBackgroundMusic();
      render();
    });
