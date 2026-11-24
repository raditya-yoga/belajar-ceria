import { useEffect, useMemo, useRef, useState } from 'react';
import { questionSets } from '../data/subjects';
import { useAuth } from '../context/AuthContext';
import { playTone, successChime } from '../lib/sfx';
import Icon from './Icon';

const TOTAL = 15;
const normalized = (value) => String(value ?? '').trim().replace(/\s+/g, ' ').toLocaleLowerCase('id-ID');

function buildReview(questions, answers) {
  const review = questions.map((question, index) => {
    const given = String(answers[index] ?? '').trim();
    const correct = question.options ? given === question.answer : normalized(given) === normalized(question.answer);
    return { question: question.question, given, answer: question.answer, correct, explanation: question.explanation, type: question.type };
  });
  const correctCount = review.filter((item) => item.correct).length;
  const score = Math.round((correctCount / questions.length) * 100);
  const stars = score >= 80 ? 3 : score >= 60 ? 2 : 1;
  return { review, correctCount, score, stars };
}

export default function Quiz({ subject, topicIndex, onExit }) {
  const { progress, saveDraft, recordRun, grade } = useAuth();
  const questions = questionSets[subject.id];
  const resume = useRef(
    progress.draft && progress.draft.subjectId === subject.id && progress.draft.topicIndex === topicIndex
      ? progress.draft
      : null,
  );

  const [index, setIndex] = useState(Math.min(resume.current?.questionIndex ?? 0, TOTAL - 1));
  const [answers, setAnswers] = useState(resume.current?.answers ?? {});
  const [confirming, setConfirming] = useState(false);
  const [result, setResult] = useState(null);

  const question = questions[index];
  const answeredCount = useMemo(() => Object.values(answers).filter((value) => String(value).trim() !== '').length, [answers]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [index, result]);

  function commit(nextAnswers, nextIndex = index) {
    setAnswers(nextAnswers);
    saveDraft({ subjectId: subject.id, topicIndex, questionIndex: nextIndex, answers: nextAnswers });
  }

  function selectOption(option) {
    if (result) return;
    playTone(760, 0.08, 0.012);
    commit({ ...answers, [index]: option });
  }

  function move(step) {
    const next = Math.max(0, Math.min(TOTAL - 1, index + step));
    setIndex(next);
    saveDraft({ subjectId: subject.id, topicIndex, questionIndex: next, answers });
  }

  function submit() {
    const { review, correctCount, score, stars } = buildReview(questions, answers);
    const run = {
      id: Date.now(),
      subjectId: subject.id,
      subjectName: subject.name,
      topic: subject.topics[topicIndex][0],
      grade,
      date: new Date().toISOString(),
      correct: correctCount,
      total: questions.length,
      score,
      stars,
      review,
    };
    recordRun(run, `${subject.id}-${topicIndex}`);
    successChime();
    setConfirming(false);
    setResult(run);
  }

  function restart() {
    setResult(null);
    setIndex(0);
    setAnswers({});
    saveDraft({ subjectId: subject.id, topicIndex, questionIndex: 0, answers: {} });
  }

  if (result) {
    return <QuizResult run={result} onRetry={restart} onExit={onExit} />;
  }

  const progressPercent = ((index + 1) / TOTAL) * 100;
  const showArt = subject.id === 'matematika' && question.type === 'Soal cerita';

  return (
    <section className="fade-in mx-auto max-w-5xl">
      <div className="mx-auto mb-5 flex max-w-4xl items-center justify-between gap-3 rounded-[1.5rem] bg-white px-4 py-4 shadow-card sm:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <span className="rounded-full bg-[#e6deff] px-3 py-2 text-xs font-extrabold text-purple sm:text-sm">
            {subject.name} · Kelas {grade}
          </span>
          <p className="whitespace-nowrap font-display text-sm font-bold text-ink sm:text-lg">
            Soal {index + 1} <span className="text-muted">dari {TOTAL}</span>
          </p>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full bg-yellow px-3 py-2 text-sm font-extrabold text-[#705b00] sm:inline-flex">
          <Icon name="emoji_events" className="text-[19px]" /> Semangat!
        </span>
      </div>

      <div className="mx-auto max-w-4xl rounded-full bg-[#e6deff] p-1">
        <div className="h-3 rounded-full bg-green transition-all duration-300" style={{ width: `${progressPercent}%` }} />
      </div>
      <div className="mx-auto mt-2 flex max-w-4xl items-center justify-between px-1 text-xs font-extrabold text-muted">
        <span>Perjalanan soal</span>
        <span>{answeredCount} / {TOTAL} dijawab</span>
      </div>

      <div className="mx-auto mt-5 grid max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-card lg:grid-cols-[230px_1fr]">
        <div className="relative hidden min-h-[215px] overflow-hidden bg-[#fff4d6] lg:block">
          {showArt ? (
            <img src="/assets/quiz-oranges.jpg" alt="Keranjang jeruk untuk soal cerita" className="h-full w-full object-cover" />
          ) : (
            <div className="relative grid h-full w-full place-items-center" style={{ background: `linear-gradient(145deg,${subject.pale},#fff)` }}>
              <span className="grid h-20 w-20 place-items-center rounded-[1.6rem] bg-white shadow-card" style={{ color: subject.color }}>
                <Icon name={subject.icon} className="text-[46px]" />
              </span>
              <span className="absolute right-4 top-4 text-yellow">
                <Icon name="auto_awesome" className="text-[25px]" />
              </span>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold" style={{ background: subject.pale, color: subject.color }}>
              <Icon name={question.type === 'Soal cerita' ? 'menu_book' : 'quiz'} className="text-[17px]" />
              {question.type.toUpperCase()}
            </span>
            <button type="button" onClick={onExit} className="rounded-full px-3 py-2 text-xs font-extrabold text-muted hover:bg-canvas">
              Keluar latihan
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3 lg:hidden">
            <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: subject.pale, color: subject.color }}>
              <Icon name={subject.icon} className="text-[27px]" />
            </span>
            <span className="text-sm font-extrabold text-muted">Pikirkan baik-baik, ya!</span>
          </div>

          <h1 className="mt-4 font-display text-xl font-bold leading-8 text-ink sm:text-2xl">{question.question}</h1>

          {question.options ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {question.options.map((option, i) => {
                const selected = answers[index] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectOption(option)}
                    className={`flex min-h-[66px] items-center gap-4 rounded-[1.4rem] border-2 px-4 py-3 text-left font-extrabold transition ${
                      selected
                        ? 'border-purple bg-purple text-white shadow-[0_5px_0_#491cc5]'
                        : 'border-[#eee5ff] bg-[#f7f1ff] text-ink shadow-[0_4px_0_#e2d9f1] hover:border-purple/40'
                    }`}
                  >
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${selected ? 'bg-white/20 text-white' : 'bg-white text-purple shadow-sm'}`}>
                      {question.options.length === 2 ? (
                        <Icon name={i === 0 ? 'check' : 'close'} className="text-[22px]" />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </span>
                    <span className="flex-1">{option}</span>
                    {selected && <Icon name="check_circle" className="text-xl text-yellow" />}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-7">
              <label htmlFor="short-answer" className="mb-2 block text-sm font-extrabold text-muted">
                Tulis jawabanmu di sini
              </label>
              <input
                id="short-answer"
                value={answers[index] || ''}
                onChange={(event) => commit({ ...answers, [index]: event.target.value })}
                placeholder="Ketik jawaban..."
                autoComplete="off"
                className="focus-ring h-14 w-full rounded-2xl border-2 border-purple-100 px-4 text-lg font-bold text-ink placeholder:text-[#aaa5b7]"
              />
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-purple-50 pt-5">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={index === 0}
              className="btn-press flex min-h-12 items-center gap-1.5 rounded-full bg-white px-4 font-extrabold text-purple shadow-[0_4px_0_#e2d9f1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Icon name="arrow_back" className="text-[20px]" />
              <span>Sebelumnya</span>
            </button>
            {index === TOTAL - 1 ? (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="btn-press flex min-h-12 items-center gap-2 rounded-full bg-[#c45100] px-5 font-extrabold text-white shadow-[0_5px_0_#873500]"
              >
                Selesai <Icon name="check" className="text-[20px]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => move(1)}
                className="btn-press flex min-h-12 items-center gap-2 rounded-full bg-[#c45100] px-5 font-extrabold text-white shadow-[0_5px_0_#873500]"
              >
                Berikutnya <Icon name="arrow_forward" className="text-[20px]" />
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-sm font-bold text-muted">
        Jawabanmu tersimpan saat berpindah soal. Kamu bisa meninjaunya sebelum selesai.
      </p>

      {confirming && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-3 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setConfirming(false);
          }}
        >
          <div className="fade-in w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
            <div className="text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#fff7d5] text-4xl">🎉</div>
              <h2 id="submit-title" className="mt-4 font-display text-2xl font-bold">Sudah selesai?</h2>
              <p className="mt-2 font-semibold leading-6 text-muted">
                {TOTAL - answeredCount > 0
                  ? `Masih ada ${TOTAL - answeredCount} soal kosong. Jawaban kosong dihitung salah, ya.`
                  : 'Keren! Semua soal sudah kamu jawab.'}{' '}
                Setelah dikirim, jawaban akan diperiksa.
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              <button type="button" onClick={submit} className="btn-press min-h-14 rounded-full bg-orange font-extrabold text-white shadow-orange">
                Kirim Jawaban
              </button>
              <button type="button" onClick={() => setConfirming(false)} className="min-h-12 rounded-full border-2 border-purple-100 font-extrabold text-purple">
                Periksa Lagi
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function QuizResult({ run, onRetry, onExit }) {
  const message =
    run.score >= 80 ? 'Hebat sekali! Kamu menguasai materi ini! 🎉'
      : run.score >= 60 ? 'Bagus! Terus berlatih, ya! 🌈'
        : 'Usaha yang bagus! Ayo belajar lagi bersama! 💪';

  return (
    <section className="fade-in">
      <div className="relative grid overflow-hidden rounded-[2.4rem] bg-white shadow-[0_16px_40px_rgba(95,59,218,.1)] lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e6deff] px-4 py-2 text-sm font-extrabold text-purple">
            <Icon name="celebration" className="text-[19px]" /> Latihan selesai!
          </span>
          <div className="mt-5 flex items-center gap-2">
            {[1, 2, 3].map((_, i) => (
              <span
                key={i}
                className={`star-pop grid h-14 w-14 place-items-center rounded-full ${
                  i < run.stars ? 'bg-yellow text-[#705b00] shadow-[0_5px_0_#ecc306]' : 'bg-[#f0ecf7] text-[#c8c2d2]'
                }`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <Icon name={i < run.stars ? 'star' : 'star_outline'} className="text-[34px]" />
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="rounded-[1.5rem] bg-[#f5efff] px-5 py-3">
              <p className="text-sm font-bold text-muted">Nilai akhirmu</p>
              <p className="font-display text-5xl font-bold text-purple">{run.score}</p>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e9f9df] px-4 py-2 font-extrabold text-[#369000]">
                <Icon name="check_circle" className="text-[21px]" /> {run.correct} dari {run.total} soal benar
              </span>
              <p className="mt-2 max-w-sm font-semibold leading-6 text-muted">{message}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => document.getElementById('review-list')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-press flex min-h-12 items-center gap-2 rounded-full bg-purple px-5 font-extrabold text-white shadow-[0_5px_0_#491cc5]"
            >
              <Icon name="visibility" className="text-[20px]" /> Lihat pembahasan
            </button>
            <button
              type="button"
              onClick={onRetry}
              className="btn-press flex min-h-12 items-center gap-2 rounded-full bg-[#c45100] px-5 font-extrabold text-white shadow-[0_5px_0_#873500]"
            >
              <Icon name="replay" className="text-[20px]" /> Ulangi latihan
            </button>
          </div>
          <button
            type="button"
            onClick={onExit}
            className="mt-3 flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#f5efff] px-5 font-extrabold text-ink shadow-[0_4px_0_#d8cce8]"
          >
            <Icon name="arrow_back" className="text-[20px]" /> Kembali ke daftar topik
          </button>
        </div>
        <div className="relative min-h-[210px] bg-[#f5efff] sm:min-h-[270px] lg:min-h-[360px]">
          <img
            src="/assets/achievement-student.jpg"
            alt="Murid merayakan keberhasilan dengan piala"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <span className="absolute bottom-5 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-ink shadow-xl sm:bottom-8 sm:right-7 sm:px-5 sm:py-3">
            <Icon name="emoji_events" className="text-[22px] text-[#e5ad00]" /> +{run.stars} bintang baru!
          </span>
        </div>
        <div className="grid grid-cols-3 border-t border-purple-50 px-3 py-4 lg:hidden">
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-purple">{run.score}</p>
            <p className="text-[10px] font-extrabold text-muted">NILAI</p>
          </div>
          <div className="border-x border-purple-100 text-center">
            <p className="font-display text-2xl font-bold text-[#3d9900]">{run.correct}/{run.total}</p>
            <p className="text-[10px] font-extrabold text-muted">BENAR</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-[#b58a00]">{run.stars} ⭐</p>
            <p className="text-[10px] font-extrabold text-muted">BINTANG</p>
          </div>
        </div>
      </div>

      <section id="review-list" className="mt-9 scroll-mt-24">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-extrabold text-purple">BELAJAR DARI JAWABAN</p>
            <h2 className="mt-1 font-display text-2xl font-bold">Pembahasan</h2>
          </div>
          <span className="text-xs font-bold text-muted sm:text-sm">Ketuk soal untuk melihat</span>
        </div>
        <div className="space-y-3">
          {run.review.map((item, i) => (
            <details
              key={i}
              className={`group rounded-2xl border-2 p-4 ${item.correct ? 'border-green/20 bg-[#f7fff2]' : 'border-[#ffdce7] bg-[#fff7fa]'}`}
            >
              <summary className="flex cursor-pointer list-none items-start gap-3">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-extrabold text-white ${item.correct ? 'bg-green' : 'bg-coral'}`}>
                  {item.correct ? '✓' : '!'}
                </span>
                <span className="flex-1">
                  <span className="block text-xs font-extrabold text-muted">SOAL {i + 1} · {item.type}</span>
                  <span className="mt-1 block font-extrabold leading-6 text-ink">{item.question}</span>
                </span>
                <span className="mt-1 text-muted transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="ml-11 mt-3 border-t border-black/5 pt-3 text-sm font-semibold leading-6 text-muted">
                <p>Jawabanmu: <strong className={item.correct ? 'text-[#328500]' : 'text-[#d64b78]'}>{item.given || 'Belum dijawab'}</strong></p>
                <p className="mt-1">Jawaban benar: <strong className="text-ink">{item.answer}</strong></p>
                <p className="mt-2">💡 {item.explanation}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </section>
  );
}
