import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUzG15tJPhjgz8qw8bYbUUuRhgdTybfF4",
  authDomain: "finance-tracker-1071e.firebaseapp.com",
  projectId: "finance-tracker-1071e",
  storageBucket: "finance-tracker-1071e.firebasestorage.app",
  messagingSenderId: "509567092326",
  appId: "1:509567092326:web:716a7b7fe487bfce7ccfa7",
  measurementId: "G-R2J4MDEZSH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
