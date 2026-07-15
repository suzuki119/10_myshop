// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4TIoQ_AaiYoOj1gQZO3BRjLTrwXLcQkA",
  authDomain: "react-ecsite-7fb1d.firebaseapp.com",
  projectId: "react-ecsite-7fb1d",
  storageBucket: "react-ecsite-7fb1d.firebasestorage.app",
  messagingSenderId: "32534360658",
  appId: "1:32534360658:web:f0ce3b86b30b27ab8e658b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
