import Icon from './Icon';

/** Kartu mata pelajaran di Beranda. Menampilkan ikon gembok bila ada topik premium. */
export default function SubjectCard({ subject, completedCount, totalTopics, locked, onOpen }) {
  const percent = totalTopics ? Math.round((completedCount / totalTopics) * 100) : 0;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="subject-card group relative flex min-h-[168px] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] bg-white px-3 py-5 text-center shadow-[0_6px_0_#e2d9f1,0_10px_20px_rgba(95,59,218,.08)] focus-ring sm:min-h-[196px] sm:px-4"
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl sm:h-16 sm:w-16" style={{ background: subject.pale, color: subject.color }}>
        <Icon name={subject.icon} className="text-[32px] sm:text-[36px]" />
      </span>
      <h3 className="mt-3 max-w-[170px] font-display text-sm font-bold leading-snug text-ink sm:text-base">{subject.short}</h3>

      <span className="mt-3 h-1.5 w-10 overflow-hidden rounded-full bg-[#eee5ff] transition-all group-hover:w-16">
        <span className="block h-full rounded-full" style={{ width: `${percent}%`, background: subject.color }} />
      </span>
      <span className="mt-1.5 text-[11px] font-extrabold text-muted">
        {completedCount}/{totalTopics} topik selesai
      </span>

      {completedCount > 0 ? (
        <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-green text-white">
          <Icon name="check" className="text-[15px]" />
        </span>
      ) : locked ? (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#eee5ff] px-2 py-1 text-[10px] font-extrabold text-purple">
          <Icon name="lock" className="text-[13px]" /> PREMIUM
        </span>
      ) : null}
    </button>
  );
}
