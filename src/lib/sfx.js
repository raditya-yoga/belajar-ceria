// Efek suara + backsound anak-anak.
// Dipisahkan dari komponen agar bisa dipanggil dari mana saja (mis. saat menjawab kuis).
import { useSyncExternalStore } from 'react';

const MUSIC_SRC = '/assets/Funny%20Cartoon%20Kids%20Background%20Music%20For%20Videos.mp3';
const MUSIC_VOLUME = 0.12;

let enabled = false;
let audioContext = null;
let music = null;
let unlockBound = false;
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener());
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) audioContext = new AudioContextClass();
  return audioContext;
}

function getMusic() {
  if (music) return music;
  music = new Audio(MUSIC_SRC);
  music.loop = true;
  music.volume = MUSIC_VOLUME;
  music.preload = 'auto';
  return music;
}

export function playTone(frequency, duration = 0.16, volume = 0.018, type = 'sine', delay = 0) {
  if (!enabled) return;
  const context = getAudioContext();
  if (!context) return;
  if (context.state === 'suspended') context.resume().catch(() => {});
  const start = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

export const successChime = () => [659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, 0.3, 0.018, 'sine', i * 0.12));
export const clickSound = () => playTone(880, 0.09, 0.014);

async function startMusic() {
  const player = getMusic();
  try {
    await player.play();
    enabled = true;
  } catch (error) {
    enabled = false;
    if (error.name !== 'NotAllowedError') console.error('Backsound tidak dapat diputar.', error);
  }
  emit();
}

/** Backsound hanya boleh diputar setelah ada interaksi pengguna (aturan browser). */
export function unlockAudioOnFirstGesture() {
  if (unlockBound) return;
  unlockBound = true;
  document.addEventListener(
    'click',
    (event) => {
      if (!enabled) startMusic();
      const button = event.target.closest?.('button');
      if (button && !button.disabled && !button.hasAttribute('data-sound-toggle')) clickSound();
    },
    { passive: true },
  );
  startMusic();
}

export function toggleMusic() {
  if (enabled) {
    getMusic().pause();
    enabled = false;
    emit();
  } else {
    startMusic();
  }
}

export const isSoundEnabled = () => enabled;

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Hook React untuk membaca status backsound. */
export function useSoundEnabled() {
  return useSyncExternalStore(subscribe, isSoundEnabled, () => false);
}
