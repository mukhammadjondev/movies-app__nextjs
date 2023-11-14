import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDYeUlHOEnbEugreSOaWaOzIizEAVbmZZU",
  authDomain: "movies-app-82465.firebaseapp.com",
  projectId: "movies-app-82465",
  storageBucket: "movies-app-82465.appspot.com",
  messagingSenderId: "965694033401",
  appId: "1:965694033401:web:764ead8ee1ec6e7b2ec128",
  measurementId: "G-TXSX1V4ZYB"
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };