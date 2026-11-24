import { Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import PageLoader from '../components/PageLoader';
import { useAuth } from '../context/AuthContext';
import { subjectById, subjects } from '../data/subjects';

export default function Progress() {
  const { user, loading, displayName, grade, history, totalStars, progress } = useAuth();
  if (loading) return (
    <Layout>
      <PageLoader label="Memuat progres…" />
    </Layout>
  );
  if (!user) return <Navigate to="/login" replace />;

  const latest = history[0];
  const progressAverage = Math.round(
    subjects.reduce((sum, subject) => {
      const runs = history.filter((run) => run.subjectId === subject.id);
      return sum + Math.min(100, runs.length * 25);
    }, 0) / subjects.length,
  );

  return (
    <Layout>
      <section className="fade-in">
        {latest ? (
          <section className="relative grid overflow-hidden rounded-[2rem] bg-white shadow-card lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative z-10 p-6 sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e6deff] px-4 py-2 text-sm font-extrabold text-purple">
                <Icon name="celebration" className="text-[19px]" /> Latihan selesai!
              </span>
              <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3].map((_, i) => (
                  <span
                    key={i}
                    className={`grid h-12 w-12 place-items-center rounded-full ${
                      i < latest.stars ? 'bg-yellow text-[#705b00] shadow-[0_4px_0_#ecc306]' : 'bg-[#f0ecf7] text-[#c8c2d2]'
                    }`}
                  >
                    <Icon name={i < latest.stars ? 'star' : 'star_outline'} className="text-[29px]" />
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="rounded-2xl bg-[#f5efff] px-5 py-3">
                  <p className="text-xs font-bold text-muted">Nilai terakhir</p>
                  <p className="font-display text-4xl font-bold text-purple">{latest.score}</p>
                </div>
                <div>
                  <span className="rounded-full bg-[#e9f9df] px-4 py-2 text-sm font-extrabold text-[#369000]">
                    {latest.correct} dari {latest.total} soal benar
                  </span>
                  <p className="mt-3 font-semibold text-muted">Setiap langkah kecil membawamu jadi makin pintar.</p>
                </div>
              </div>
            </div>
            <div className="relative hidden min-h-[260px] bg-[#f5efff] lg:block">
              <img src="/assets/achievement-student.jpg" alt="Murid merayakan keberhasilan dengan piala" className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-extrabold shadow-lg">
                <Icon name="emoji_events" className="text-[21px] text-[#e5ad00]" /> +{latest.stars} bintang baru!
              </span>
            </div>
          </section>
        ) : (
          <section className="grid overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#f0e9ff] to-[#e6f7ff] shadow-card sm:grid-cols-[1fr_260px]">
            <div className="p-6 sm:p-8">
              <p className="text-sm font-extrabold text-purple">LANGKAH KECIL, KEMAJUAN BESAR</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-ink">Perjalananmu dimulai di sini!</h1>
              <p className="mt-2 max-w-lg font-semibold leading-7 text-muted">Coba latihan pertama dan kumpulkan bintang sambil belajar.</p>
              <Link
                to="/"
                className="btn-press mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-purple px-5 font-extrabold text-white shadow-[0_5px_0_#491cc5]"
              >
                Pilih pelajaran <Icon name="arrow_forward" className="text-[20px]" />
              </Link>
            </div>
            <div className="hidden min-h-[190px] sm:block">
              <img src="/assets/home-mascot.jpg" alt="Maskot Belajar Ceria menemani perjalanan belajar" className="h-full w-full object-cover" />
            </div>
          </section>
        )}

        <div className="mb-6 mt-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold tracking-wide text-purple">PENCAPAIAN BELAJARMU · KELAS {grade}</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-ink">Ringkasan Progres Belajar</h1>
            <p className="mt-2 font-semibold text-muted">{displayName}, kamu sudah mengumpulkan {totalStars} bintang. Terus semangat!</p>
          </div>
          <div className="flex items-center gap-3 rounded-[1.5rem] bg-white px-4 py-3 shadow-card">
            <span className="grid h-12 w-12 place-items-center rounded-full border-[5px] border-green text-sm font-extrabold text-purple">
              {progressAverage}%
            </span>
            <div>
              <p className="text-xs font-bold text-muted">TOTAL PROGRES</p>
              <p className="font-display font-bold">{progressAverage}% selesai</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject) => {
            const runs = history.filter((run) => run.subjectId === subject.id);
            const best = runs.length ? Math.max(...runs.map((run) => run.score)) : null;
            const percent = Math.min(100, runs.length * 25);
            const encouragement = best === null ? 'Mulai petualanganmu!' : best >= 80 ? 'Luar biasa!' : best >= 60 ? 'Makin jago!' : 'Terus semangat!';
            return (
              <article key={subject.id} className="rounded-[1.65rem] bg-white p-5 shadow-[0_8px_22px_rgba(95,59,218,.08)] sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-white shadow-[0_4px_0_rgba(0,0,0,.12)]" style={{ background: subject.color }}>
                    <Icon name={subject.icon} className="text-[27px]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-lg font-bold">{subject.short}</h3>
                    <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${best === null ? 'bg-[#f0ecf7] text-muted' : 'bg-[#e9f9df] text-[#3a8b00]'}`}>
                      {encouragement}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm font-bold">
                  <span className="text-muted">Progres latihan</span>
                  <span>{percent}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#eee5ff]">
                  <div className="h-full rounded-full bg-green" style={{ width: `${percent}%` }} />
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f7f1ff] px-4 py-3">
                  <div>
                    <p className="text-xs font-bold text-muted">Nilai terbaik</p>
                    <p className="font-display text-xl font-bold text-purple">{best === null ? '—' : best}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow px-3 py-1.5 font-extrabold text-[#705b00] shadow-[0_3px_0_#ecc306]">
                    <Icon name="star" className="text-[18px]" />
                    {runs.reduce((sum, run) => sum + run.stars, 0)}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {history.length > 0 && (
          <section className="mt-8 rounded-[1.75rem] bg-white p-5 shadow-card sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold tracking-wide text-purple">PERJALANAN TERAKHIR</p>
                <h2 className="mt-1 font-display text-xl font-bold">Latihan yang sudah kamu kerjakan</h2>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#fff4c9] text-[#9b7600]">
                <Icon name="history" className="text-[23px]" />
              </span>
            </div>
            <div className="mt-3">
              {history.slice(0, 8).map((run) => {
                const subject = subjectById(run.subjectId);
                return (
                  <div key={run.id} className="flex items-center gap-3 border-b border-purple-50 py-3 last:border-0">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ background: subject?.color || '#7c5df9' }}>
                      <Icon name={subject?.icon || 'menu_book'} className="text-[21px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-extrabold text-ink">{run.subjectName} · {run.topic}</p>
                      <p className="text-xs font-bold text-muted">
                        {new Date(run.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} · {run.correct}/{run.total} benar
                      </p>
                    </div>
                    <span className="rounded-full bg-lilac px-3 py-1 font-display font-bold text-purple">{run.score}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-center text-xs font-semibold text-muted">
              {progress.completedTopics.length} topik selesai dari {subjects.reduce((sum, subject) => sum + subject.topics.length, 0)} topik tersedia.
            </p>
          </section>
        )}
      </section>
    </Layout>
  );
}
