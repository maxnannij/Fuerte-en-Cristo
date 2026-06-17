import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import appletConfig from "../firebase-applet-config.json";

// Combine standard environment variables (best for GitHub, Vercel, Netlify)
// with the local AI Studio applet configuration as fallback.
const metaEnv = (import.meta as any).env || {};
const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || appletConfig.apiKey,
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain,
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId,
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket,
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId,
  appId: metaEnv.VITE_FIREBASE_APP_ID || appletConfig.appId,
};

// Initialize Firebase with the resolved configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

/**
 * Normalizes a surname for authentication:
 * - Trims whitespace
 * - Converts to lowercase
 * - Removes accents (e.g., Pérez -> perez)
 */
export function normalizeLastNameToEmail(lastName: string): string {
  const trimmed = lastName.trim();
  if (trimmed.includes("@")) {
    return trimmed.toLowerCase();
  }
  // Remove accents
  const normalized = trimmed
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  
  return `${normalized}@fiel.com`;
}
