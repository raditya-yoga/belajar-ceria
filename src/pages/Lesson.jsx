import { useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import Quiz from '../components/Quiz';
import PageLoader from '../components/PageLoader';
import { useAuth } from '../context/AuthContext';
import { usePremium } from '../context/PremiumContext';
import { isTopicFree, subjectById } from '../data/subjects';

export default function Lesson() {
  const { subjectId, topicIndex } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, loading, isPremium, progress, grade } = useAuth();
  const { openUpgradeModal } = usePremium();
  // Tab materi/latihan disimpan di URL (?latihan=1) supaya bisa dibagikan & tahan refresh.
  const view = searchParams.get('latihan') ? 'latihan' : 'materi';

  const subject = subjectById(subjectId);
  const hasTopicParam = topicIndex !== undefined;
  const index = Number(topicIndex ?? 0);
  const topic = hasTopicParam ? subject?.topics[index] : undefined;
  const locked = Boolean(topic) && !isPremium && !isTopicFree(index);

  const stats = useMemo(() => {
    if (!subject) return { completed: 0, percent: 0, stars: 0 };
    const completed = subject.topics.filter((_, i) => progress.completedTopics.includes(`${subject.id}-${i}`)).length;
    const stars = progress.history.filter((run) => run.subjectId === subject.id).reduce((sum, run) => sum + run.stars, 0);
    return { completed, percent: Math.round((completed / subject.topics.length) * 100), stars };
  }, [subject, progress]);

  if (loading) return (
    <Layout>
      <PageLoader label="Menyiapkan materi…" />
    </Layout>
  );
  if (!user) return <Navigate to="/login" replace />;
  if (!subject) return <Navigate to="/" replace />;

  const upgradeReason = `Topik “${topic?.[0] ?? 'premium'}” termasuk materi Premium. Buka sekali bayar untuk semua topik.`;

  // ---------- Materi + latihan (topicIndex ada di URL) ----------
  if (topic) {
    return (
      <Layout>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(`/lesson/${subject.id}`)}
            className="btn-press inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 font-extrabold text-ink shadow-[0_4px_0_#e4d7ff]"
          >
            <Icon name="arrow_back" className="text-[21px] text-purple" /> Daftar materi
          </button>
          <span className="hidden rounded-full bg-[#eee5ff] px-4 py-2 text-sm font-bold text-purple sm:inline-flex">
            {subject.name} · Kelas {grade}
          </span>
        </div>

        {locked ? (
          <LockedTopic subject={subject} topic={topic} index={index} onUpgrade={() => openUpgradeModal(upgradeReason)} />
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {[
                ['materi', 'menu_book', 'Materi'],
                ['latihan', 'quiz', 'Latihan soal'],
              ].map(([value, iconName, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSearchParams(value === 'latihan' ? { latihan: '1' } : {})}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-extrabold transition ${
                    view === value ? 'bg-purple text-white shadow-[0_4px_0_#491cc5]' : 'bg-white text-ink shadow-[0_4px_0_#e4d7ff]'
                  }`}
                >
                  <Icon name={iconName} className="text-[20px]" /> {label}
                </button>
              ))}
            </div>

            {view === 'latihan' ? (
              <Quiz subject={subject} topicIndex={index} onExit={() => navigate(`/lesson/${subject.id}`)} />
            ) : (
              <TopicMaterial subject={subject} topic={topic} index={index} grade={grade} onStartQuiz={() => setSearchParams({ latihan: '1' })} />
            )}
          </>
        )}
      </Layout>
    );
  }

  // ---------- Daftar topik (hanya /lesson/:subjectId) ----------
  if (hasTopicParam) return <Navigate to={`/lesson/${subject.id}`} replace />;

  const artwork =
    subject.id === 'matematika' ? (
      <img src="/assets/math-subject.jpg" alt="Maskot bintang dan angka untuk belajar matematika" className="h-full w-full object-cover" />
    ) : (
      <div className="grid h-full w-full place-items-center text-white" style={{ background: `linear-gradient(140deg,${subject.color},${subject.pale})` }}>
        <Icon name={subject.icon} className="text-[76px] drop-shadow-md" />
      </div>
    );

  return (
    <Layout>
      <section className="fade-in">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="btn-press inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 font-extrabold text-ink shadow-[0_4px_0_#e4d7ff]">
            <Icon name="arrow_back" className="text-[21px] text-purple" /> Kembali ke Beranda
          </Link>
          <span className="hidden rounded-full bg-[#eee5ff] px-4 py-2 text-sm font-extrabold text-purple sm:inline-flex">
            <Icon name="school" className="mr-1 text-[18px]" /> Kurikulum Merdeka · Kelas {grade}
          </span>
        </div>

        <div className="grid gap-5 rounded-[2rem] bg-white p-5 shadow-card sm:p-7 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="illustration-frame h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32 sm:rounded-[1.5rem]">{artwork}</div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple px-3 py-1.5 text-xs font-extrabold text-white">
                <Icon name="auto_stories" className="text-[16px]" /> MATA PELAJARAN
              </span>
              <p className="mt-3 text-xs font-extrabold uppercase tracking-wide text-purple">Kelas {grade}</p>
              <h1 className="mt-1 font-display text-2xl font-bold leading-tight text-ink sm:text-4xl">{subject.name} · Kelas {grade}</h1>
              <p className="mt-2 max-w-xl font-semibold leading-7 text-muted">Ayo belajar dan bermain bersama! Selesaikan topik untuk menambah bintang.</p>
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-[#f5efff] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold">Progres Belajar</h2>
              <span className="rounded-full bg-green px-3 py-1 text-sm font-extrabold text-white">{stats.percent}% selesai</span>
            </div>
            <div className="mt-4 h-3.5 overflow-hidden rounded-full bg-[#e6deff]">
              <div className="h-full rounded-full bg-green" style={{ width: `${stats.percent}%` }} />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm font-bold">
              <span className="inline-flex items-center gap-1.5 text-muted">
                <Icon name="check_circle" className="text-[20px] text-green" /> {stats.completed} dari {subject.topics.length} topik selesai
              </span>
              <span className="inline-flex items-center gap-1 text-ink">
                <Icon name="star" className="text-xl text-yellow" /> {stats.stars} bintang
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4 mt-8 flex flex-wrap items-end justify-between gap-2">
          <h2 className="border-l-[6px] border-purple pl-3 font-display text-2xl font-bold sm:text-3xl">Daftar Topik Materi</h2>
          <span className="text-sm font-bold text-muted">{subject.topics.length} topik tersedia</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {subject.topics.map(([title, desc], topicIdx) => {
            const key = `${subject.id}-${topicIdx}`;
            const done = progress.completedTopics.includes(key);
            const topicLocked = !isPremium && !isTopicFree(topicIdx);
            return (
              <article key={key} className="flex h-full flex-col rounded-[1.75rem] bg-white p-5 shadow-[0_8px_24px_rgba(95,59,218,.08)] sm:p-6">
                <div className="flex items-start gap-4">
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-2xl font-bold"
                    style={{ background: done ? '#e8f8dc' : subject.pale, color: done ? '#43a000' : subject.color }}
                  >
                    {topicIdx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold ${
                          topicLocked ? 'bg-[#eee5ff] text-purple' : done ? 'bg-green text-white' : 'bg-[#eee5ff] text-purple'
                        }`}
                      >
                        <Icon name={topicLocked ? 'lock' : done ? 'check_circle' : 'schedule'} className="text-[14px]" />
                        {topicLocked ? 'Premium' : done ? 'Selesai' : 'Belum dimulai'}
                      </span>
                      {topicIdx === 0 && !isPremium && (
                        <span className="rounded-full bg-[#e9f9df] px-2.5 py-1 text-[11px] font-extrabold text-[#369000]">GRATIS</span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink">{title}</h3>
                  </div>
                  <span className="hidden rounded-full bg-[#fff4c9] px-2.5 py-1 text-sm font-bold text-[#9b7600] sm:inline-flex">
                    <Icon name={done ? 'star' : 'star_outline'} className="text-[18px]" />
                    {done ? '3' : '—'}
                  </span>
                </div>
                <p className="mt-4 flex-1 text-sm font-semibold leading-6 text-muted">{desc}</p>
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {topicLocked ? (
                    <>
                      <button
                        type="button"
                        onClick={() => openUpgradeModal(`Topik “${title}” termasuk materi Premium. Buka sekali bayar untuk semua topik.`)}
                        className="btn-press col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#eee5ff] px-3 font-extrabold text-purple shadow-[0_4px_0_#e4d7ff]"
                      >
                        <Icon name="lock_open" className="text-[20px]" /> Buka dengan Premium
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/lesson/${subject.id}/${topicIdx}`}
                        className="btn-press flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-[#f5efff] px-3 font-extrabold text-purple shadow-[0_4px_0_#e4d7ff]"
                      >
                        <Icon name="menu_book" className="text-[20px]" /> Pelajari
                      </Link>
                      <Link
                        to={`/lesson/${subject.id}/${topicIdx}?latihan=1`}
                        className="btn-press flex min-h-12 items-center justify-center gap-1.5 rounded-full px-3 font-extrabold text-white shadow-[0_4px_0_#491cc5]"
                        style={{ background: subject.id === 'pancasila' ? '#c45100' : '#5f3bda' }}
                      >
                        <Icon name="quiz" className="text-[20px]" /> Latihan soal
                      </Link>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-6 flex flex-col gap-4 rounded-[1.75rem] bg-[#eee5ff] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-yellow text-[#705b00] shadow-[0_4px_0_#ecc306]">
              <Icon name="emoji_events" className="text-[25px]" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">Sudah siap mencoba?</p>
              <p className="text-sm font-semibold text-muted">
                {isPremium ? 'Kerjakan 15 soal seru dan kumpulkan bintang!' : 'Topik pertama gratis — coba latihan 15 soal dulu!'}
              </p>
            </div>
          </div>
          <Link
            to={`/lesson/${subject.id}/0?latihan=1`}
            className="btn-press flex min-h-12 items-center justify-center gap-2 rounded-full bg-purple px-6 font-extrabold text-white shadow-[0_5px_0_#491cc5]"
          >
            <Icon name="rocket_launch" className="text-[20px]" /> Mulai latihan (15 soal)
          </Link>
        </section>
      </section>
    </Layout>
  );
}

function TopicMaterial({ subject, topic, index, grade, onStartQuiz }) {
  const isMath = subject.id === 'matematika';
  const art = isMath ? '/assets/lesson-student.jpg' : '/assets/welcome-students.jpg';
  const alt = isMath ? 'Siswa menghitung apel sebagai contoh penjumlahan' : 'Anak-anak belajar dan membaca bersama';

  return (
    <section className="fade-in">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <div className="flex flex-col gap-5">
          <section className="rounded-[2rem] bg-white p-6 shadow-card sm:p-9">
            <p className="text-xs font-extrabold tracking-[.14em] text-purple">MATERI BELAJAR · TOPIK {String(index + 1).padStart(2, '0')}</p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{topic[0]}</h1>
            <p className="mt-3 text-lg font-semibold leading-8 text-muted">{topic[1]}</p>
            <div className="mt-6 flex items-start gap-3 rounded-[1.4rem] bg-[#f5efff] p-4 sm:p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-purple text-white shadow-[0_3px_0_#491cc5]">
                <Icon name="lightbulb" className="text-[22px]" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold">Apa yang perlu diingat?</h2>
                <p className="mt-1 leading-7 text-muted">{topic[2]}</p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-extrabold tracking-wide text-[#c45100]">VISUALISASI KONSEP</p>
                <h2 className="mt-1 font-display text-xl font-bold">Contoh sehari-hari</h2>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-yellow text-[#705b00]">
                <Icon name="sunny" className="text-[22px]" />
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 rounded-[1.5rem] bg-[#f8f1ff] p-4 sm:gap-5 sm:p-6">
              {isMath ? (
                <>
                  <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
                    <div className="flex justify-center gap-1 text-[#ff5d8f]">
                      {[1, 2, 3].map((n) => <Icon key={n} name="nutrition" className="text-[28px]" />)}
                    </div>
                    <p className="mt-1 font-display font-bold">3 apel</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-yellow text-[#705b00]">
                    <Icon name="add" className="text-[28px]" />
                  </span>
                  <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
                    <div className="flex justify-center gap-1 text-[#ff5d8f]">
                      {[1, 2].map((n) => <Icon key={n} name="nutrition" className="text-[28px]" />)}
                    </div>
                    <p className="mt-1 font-display font-bold">2 apel</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-purple text-white">
                    <Icon name="equal" className="text-[26px]" />
                  </span>
                  <div className="rounded-2xl bg-green px-5 py-3 text-center text-white shadow-[0_4px_0_#3f9f00]">
                    <p className="font-display text-3xl font-bold">5</p>
                    <p className="text-sm font-extrabold">total apel</p>
                  </div>
                </>
              ) : (
                <>
                  <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white text-purple shadow-card">
                    <Icon name={subject.icon} className="text-[45px]" />
                  </span>
                  <p className="max-w-md text-center font-display text-lg font-bold leading-7 text-ink">{topic[2]}</p>
                </>
              )}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <figure className="illustration-frame relative min-h-[260px] overflow-hidden rounded-[2rem] bg-[#eee5ff] sm:min-h-[380px]">
            <img src={art} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
            <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-white/95 px-4 py-3 shadow-lg">
              <span className="font-extrabold">Ilustrasi belajar</span>
              <span className="rounded-full bg-green px-3 py-1 text-xs font-extrabold text-white">Mudah dipahami</span>
            </figcaption>
          </figure>
          <div className="rounded-[1.75rem] bg-[#fff4c9] p-5">
            <p className="flex items-center gap-2 font-display font-bold">
              <Icon name="stars" className="text-[23px] text-[#9b7600]" /> Belajar pelan-pelan, ya!
            </p>
            <p className="mt-1 text-sm font-semibold leading-6 text-muted">Baca lagi jika perlu. Kamu pasti bisa memahami materi ini.</p>
          </div>
          <div className="rounded-[1.75rem] bg-white p-5 shadow-card">
            <p className="text-xs font-extrabold uppercase tracking-wide text-purple">Kelas {grade}</p>
            <p className="mt-1 font-display text-lg font-bold">Materi selesai dibaca?</p>
            <button
              type="button"
              onClick={onStartQuiz}
              className="btn-press mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-purple px-5 font-extrabold text-white shadow-[0_5px_0_#491cc5]"
            >
              <Icon name="rocket_launch" className="text-[21px]" /> Mulai latihan (15 soal)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function LockedTopic({ subject, topic, index, onUpgrade }) {
  return (
    <section className="fade-in mx-auto max-w-2xl">
      <div className="relative overflow-hidden rounded-[2rem] bg-white p-6 text-center shadow-card sm:p-10">
        <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple/10 blur-2xl" />
        <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-[1.75rem] bg-[#eee5ff] text-purple">
          <Icon name="lock" className="text-[42px]" />
        </span>
        <p className="relative mt-4 text-xs font-extrabold tracking-[.14em] text-purple">
          {subject.name.toUpperCase()} · TOPIK {String(index + 1).padStart(2, '0')}
        </p>
        <h1 className="relative mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">{topic[0]}</h1>
        <p className="relative mx-auto mt-2 max-w-md font-semibold leading-7 text-muted">{topic[1]}</p>
        <div className="relative mt-6 rounded-[1.5rem] bg-[#f5efff] p-5">
          <p className="font-display text-lg font-bold">Materi ini khusus akun Premium</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-muted">
            Topik pertama tiap pelajaran gratis. Dengan Premium, semua topik (18 materi) dan seluruh latihan 15 soal terbuka.
          </p>
          <button
            type="button"
            onClick={onUpgrade}
            className="btn-press mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-purple font-display text-lg font-bold text-white shadow-[0_6px_0_#491cc5]"
          >
            <Icon name="qr_code_2" className="text-[24px]" /> Buka dengan QRIS
          </button>
          <Link to={`/lesson/${subject.id}`} className="mt-3 flex min-h-12 items-center justify-center rounded-full border-2 border-purple-100 font-extrabold text-purple">
            Lihat topik lainnya
          </Link>
        </div>
      </div>
    </section>
  );
}
