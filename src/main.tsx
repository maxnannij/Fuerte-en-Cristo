import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('PWA Service Worker registered successfully:', reg.scope))
      .catch((err) => console.error('PWA Service Worker registration failed:', err));
  });
} else if ('serviceWorker' in navigator) {
  // Register in dev search as well for dynamic testing if required
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('PWA Service Worker registered in dev mode:', reg.scope))
      .catch((err) => console.error('PWA Service Worker registration in dev failed:', err));
  });
}

