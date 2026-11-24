import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SubjectCard from '../components/SubjectCard';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { usePremium } from '../context/PremiumContext';
import { subjects, PREMIUM_PRICE_LABEL, isTopicFree } from '../data/subjects';

export default function Home() {
  const { user, displayName, grade, isPremium, history, totalStars, progress } = useAuth();
  const { openUpgradeModal } = usePremium();
  const navigate = useNavigate();
  const lessonCount = history.length;

  function openSubject(subject) {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/lesson/${subject.id}`);
  }

  return (
    <Layout footer>
      {user ? (
        <LoggedInHero
          displayName={displayName}
          grade={grade}
          totalStars={totalStars}
          lessonCount={lessonCount}
          isPremium={isPremium}
        />
      ) : (
        <GuestHero />
      )}

      <section
        id="subjects"
        className="mt-7 scroll-mt-24 rounded-[2rem] bg-[#7858f5] p-4 text-white shadow-[0_8px_0_#491cc5,0_15px_24px_rgba(95,59,218,.18)] sm:mt-10 sm:p-6 lg:p-7"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="inline-flex items-center gap-2 rounded-full bg-green px-5 py-2.5 font-display text-lg font-bold text-white shadow-[0_4px_0_#3f9f00]">
            <Icon name="auto_stories" className="text-[22px]" /> Mata Pelajaran
          </h2>
          <span className="text-xs font-bold text-white/85 sm:text-sm">
            {user ? 'Pilih kesukaanmu ✨' : 'Masuk dulu untuk mulai belajar ✨'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
          {subjects.map((subject) => {
            const completedCount = subject.topics.filter((_, index) => progress.completedTopics.includes(`${subject.id}-${index}`)).length;
            const hasLockedTopics = !isPremium && subject.topics.some((_, index) => !isTopicFree(index));
            return (
              <SubjectCard
                key={subject.id}
                subject={subject}
                completedCount={completedCount}
                totalTopics={subject.topics.length}
                locked={hasLockedTopics}
                onOpen={() => openSubject(subject)}
              />
            );
          })}
        </div>

        {user && !isPremium && (
          <button
            type="button"
            onClick={() => openUpgradeModal('Buka semua topik di 6 mata pelajaran dengan sekali bayar.')}
            className="btn-press mt-5 flex w-full flex-col items-start gap-3 rounded-[1.5rem] bg-white/12 p-4 text-left ring-1 ring-white/25 sm:flex-row sm:items-center sm:justify-between sm:p-5"
          >
            <span className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-yellow text-[#654f00]">
                <Icon name="lock_open" className="text-[24px]" />
              </span>
              <span>
                <span className="block font-display text-base font-bold">Masih ada topik terkunci</span>
                <span className="text-xs font-semibold text-white/80">Topik 2 & 3 tiap pelajaran khusus akun Premium.</span>
              </span>
            </span>
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-yellow px-5 font-extrabold text-[#654f00] shadow-[0_4px_0_#d9b400]">
              Buka Premium {PREMIUM_PRICE_LABEL}
            </span>
          </button>
        )}
      </section>
    </Layout>
  );
}

function LoggedInHero({ displayName, grade, totalStars, lessonCount, isPremium }) {
  return (
    <section className="fade-in relative overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-[#f0e9ff] via-[#f6f0ff] to-[#e3f5ff] p-5 shadow-[0_14px_36px_rgba(95,59,218,.1)] sm:p-8 lg:p-10">
      <span className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-yellow/30 blur-2xl" />
      <span className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-sky/20 blur-2xl" />

      <div className="relative mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-purple px-4 py-2 text-sm font-extrabold text-white shadow-[0_4px_0_#491cc5]">
              <Icon name="school" className="text-[18px]" /> Kelas {grade}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-extrabold text-muted shadow-sm">
              <Icon name="local_fire_department" className="text-[18px] text-green" /> Semangat terus!
            </span>
            {isPremium && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9f9df] px-3 py-2 text-xs font-extrabold text-[#369000]">
                <Icon name="workspace_premium" className="text-[18px]" /> Premium aktif
              </span>
            )}
          </div>
          <h1 className="mt-4 font-display text-[28px] font-bold leading-tight text-ink sm:text-4xl">
            Halo, {displayName}!<br className="sm:hidden" /> Siap belajar hari ini?
          </h1>
        </div>
        <div className="hidden shrink-0 items-center gap-3 rounded-[1.5rem] bg-white px-5 py-3 shadow-[0_5px_0_#e2d9f1] sm:flex">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-yellow text-[#705b00]">
            <Icon name="star" className="text-[27px]" />
          </span>
          <div>
            <p className="text-xs font-bold text-muted">TOTAL BINTANG</p>
            <p className="font-display text-xl font-bold">{totalStars} bintang</p>
          </div>
        </div>
      </div>

      <div className="relative grid items-center gap-5 lg:grid-cols-12 lg:gap-7">
        <div className="flex justify-center lg:col-span-5">
          <div className="relative h-[210px] w-full max-w-[410px] overflow-hidden rounded-[2rem] bg-white/70 p-3 shadow-[0_8px_0_rgba(255,255,255,.65)] sm:h-[250px]">
            <img
              src="/assets/home-mascot.jpg"
              alt="Maskot gajah Belajar Ceria menyambut teman belajar"
              className="h-full w-full rounded-[1.5rem] object-cover object-center"
            />
            <span className="absolute bottom-5 left-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-purple shadow-md">
              Sahabat belajarmu 🐘
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <article className="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_8px_0_#e2d9f1,0_14px_28px_rgba(95,59,218,.1)] sm:grid-cols-[1fr_190px]">
            <div className="p-5 sm:p-7">
              <span className="rounded-full bg-[#ffdfd2] px-3 py-1.5 text-[11px] font-extrabold tracking-wide text-[#933900]">REKOMENDASI HARI INI</span>
              <h2 className="mt-3 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">Penjumlahan & Pengurangan Seru</h2>
              <p className="mt-2 text-sm font-semibold text-muted">Matematika · Kelas {grade} · 15 soal latihan</p>
              <div className="mt-4 flex items-center justify-between text-xs font-extrabold">
                <span>Progres belajarmu</span>
                <span className="text-green">{Math.min(100, lessonCount * 20)}%</span>
              </div>
              <div className="mt-2 h-3.5 overflow-hidden rounded-full bg-[#ece4ff]">
                <div className="h-full rounded-full bg-green transition-all" style={{ width: `${Math.min(100, lessonCount * 20)}%` }} />
              </div>
              <Link
                to="/lesson/matematika/1"
                className="btn-press mt-5 inline-flex min-h-12 items-center rounded-full bg-[#c45100] px-5 font-extrabold text-white shadow-[0_4px_0_#873500]"
              >
                Lanjutkan belajar <span className="ml-1">→</span>
              </Link>
            </div>
            <div className="hidden items-center bg-[#e9f7ff] p-3 sm:flex">
              <img src="/assets/math-subject.jpg" alt="Maskot bintang belajar matematika" className="h-full max-h-52 w-full rounded-[1.5rem] object-cover" />
            </div>
          </article>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-[1.5rem] bg-white px-4 py-3.5 shadow-[0_5px_0_#e2d9f1]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sky/15 text-sky">
                <Icon name="track_changes" className="text-[25px]" />
              </span>
              <div>
                <p className="font-extrabold">Misi harian</p>
                <p className="text-xs font-semibold text-muted">{Math.min(lessonCount, 3)} dari 3 latihan</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[1.5rem] bg-white px-4 py-3.5 shadow-[0_5px_0_#e2d9f1]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#ffe4ed] text-[#ff5d8f]">
                <Icon name="emoji_events" className="text-[25px]" />
              </span>
              <div>
                <p className="font-extrabold">Koleksi piala</p>
                <p className="text-xs font-semibold text-muted">{lessonCount} lencana diraih</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuestHero() {
  return (
    <section className="fade-in relative overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(95,59,218,.1)]">
      <div className="pointer-events-none absolute -right-20 top-12 h-72 w-72 rounded-full bg-yellow/25 blur-3xl" />
      <div className="relative grid lg:grid-cols-12">
        <div className="flex flex-col items-center px-6 pb-7 pt-7 text-center sm:px-10 sm:pt-10 lg:col-span-6 lg:items-start lg:px-12 lg:py-12 lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-2 text-sm font-extrabold text-[#654f00] shadow-[0_3px_0_#ecc306]">
            <Icon name="auto_awesome" className="text-[19px]" /> Petualangan ilmu dimulai!
          </div>
          <h1 className="mt-5 max-w-xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[42px]">
            Selamat datang di <span className="text-purple">Belajar Ceria!</span>
          </h1>
          <p className="mt-4 max-w-md text-base font-semibold leading-7 text-muted sm:text-lg sm:leading-8">
            Yuk, bermain sambil belajar, mengumpulkan bintang, dan jadi juara setiap hari!
          </p>
          <div className="illustration-frame relative mt-7 w-full max-w-[500px] overflow-hidden rounded-[1.75rem] bg-[#f4eaff]">
            <img src="/assets/welcome-students.jpg" alt="Anak-anak belajar bersama dengan ceria" className="h-52 w-full object-cover sm:h-64" />
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-xs font-extrabold text-ink shadow-lg">
              <Icon name="verified" className="text-[18px] text-green" /> Seru & ramah anak
            </span>
          </div>
        </div>

        <div className="flex items-center p-4 sm:p-8 lg:col-span-6 lg:p-10">
          <div className="w-full rounded-[1.75rem] bg-[#f8f1ff] p-5 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">Akun gratis, langsung bisa belajar</h2>
            <ul className="mt-4 space-y-3">
              {[
                ['menu_book', 'Topik pertama di 6 mata pelajaran kelas 1–3 SD'],
                ['quiz', 'Latihan 15 soal dengan pembahasan tiap jawaban'],
                ['workspace_premium', `Buka semua topik dengan Premium ${PREMIUM_PRICE_LABEL} sekali bayar`],
              ].map(([iconName, text]) => (
                <li key={text} className="flex items-start gap-3 text-sm font-semibold leading-6 text-ink">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-purple shadow-sm">
                    <Icon name={iconName} className="text-[20px]" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-2.5">
              <Link
                to="/login?daftar=1"
                className="btn-press flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#c45100] px-6 font-display text-lg font-bold text-white shadow-[0_6px_0_#873500]"
              >
                <Icon name="arrow_forward" className="order-2 text-[24px]" /> <span>Daftar gratis</span>
              </Link>
              <Link to="/login" className="flex min-h-12 items-center justify-center rounded-full border-2 border-purple-100 bg-white font-extrabold text-purple">
                Sudah punya akun? Masuk
              </Link>
            </div>
            <p className="mt-4 text-center text-xs font-bold text-muted">Cukup email & kata sandi, tanpa aplikasi tambahan.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
