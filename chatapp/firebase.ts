// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.CHAT_APP_FIREBASE_API_KEY,
  authDomain: process.env.CHAT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.CHAT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.CHAT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.CHAT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.CHAT_APP_FIREBASE_APP_ID,
  measurementId: process.env.CHAT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)