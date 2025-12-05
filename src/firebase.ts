// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC-PA-Aj1QYjyYYTArjmTBEwPdkjaAu4k",
  authDomain: "pomodoro-5470b.firebaseapp.com",
  projectId: "pomodoro-5470b",
  storageBucket: "pomodoro-5470b.appspot.com",
  messagingSenderId: "318987272256",
  appId: "1:318987272256:web:c725128f12c83d739f9fa5",
  measurementId: "G-VQ11R5KB2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
