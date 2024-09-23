import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRABASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIRABASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRABASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIRABASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRABASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIRABASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;