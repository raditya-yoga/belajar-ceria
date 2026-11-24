import { toggleMusic, useSoundEnabled } from '../lib/sfx';
import Icon from './Icon';

/** Tombol kontrol backsound anak-anak (menggantikan updateSoundControl() di app.js lama). */
export default function AudioPlayer({ compact = false }) {
  const enabled = useSoundEnabled();
  return (
    <button
      type="button"
      data-sound-toggle
      onClick={toggleMusic}
      aria-label={enabled ? 'Matikan backsound' : 'Putar backsound'}
      aria-pressed={enabled}
      title="Backsound diputar dengan volume rendah"
      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-white px-2.5 text-purple shadow-[0_4px_12px_rgba(95,59,218,.08)] sm:px-3"
    >
      <Icon name={enabled ? 'volume_up' : 'volume_off'} className="text-[21px]" />
      {!compact && (
        <span className="hidden text-xs font-extrabold sm:inline">{enabled ? 'Suara aktif' : 'Putar backsound'}</span>
      )}
    </button>
  );
}
