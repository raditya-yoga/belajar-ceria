import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { unlockAudioOnFirstGesture } from './lib/sfx';

// Backsound hanya bisa diputar setelah pengguna menyentuh halaman (aturan browser).
unlockAudioOnFirstGesture();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
