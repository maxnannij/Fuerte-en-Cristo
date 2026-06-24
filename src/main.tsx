import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register Service Worker in both production and development for absolute reliability
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('PWA Service Worker registered successfully:', reg.scope);

        // Check for updates periodically (every 15 minutes)
        setInterval(() => {
          console.log('Checking for service worker updates (periodic)...');
          reg.update().catch((e) => console.log('Periodic SW update check failed:', e));
        }, 15 * 60 * 1000);

        // Check for updates whenever the window/tab is focused
        window.addEventListener('focus', () => {
          console.log('Window focused. Checking for service worker updates...');
          reg.update().catch((e) => console.log('Focus SW update check failed:', e));
        });

        // Check for updates when coming back online
        window.addEventListener('online', () => {
          console.log('Connection online. Checking for service worker updates...');
          reg.update().catch((e) => console.log('Online SW update check failed:', e));
        });

        // If there's an installing worker, listen for state changes to notify updates early
        reg.addEventListener('updatefound', () => {
          const installingWorker = reg.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New service worker content is installed and waiting to take over!');
                // Custom event to show a beautiful banner
                window.dispatchEvent(new CustomEvent('pwa-update-ready'));
              }
            });
          }
        });
      })
      .catch((err) => console.error('PWA Service Worker registration failed:', err));

    // Handle controller change (fires when a new service worker takes over via self.skipWaiting() and self.clients.claim())
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        console.log('New Service Worker controller activated! Dispatching update ready event...');
        window.dispatchEvent(new CustomEvent('pwa-update-ready'));
      }
    });
  });
}

