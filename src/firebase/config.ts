import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXHyizosnRkV_6Xw3Ysh9MmyYA8X3R_-8",
  authDomain: "grit-gym.firebaseapp.com",
  projectId: "grit-gym",
  storageBucket: "grit-gym.firebasestorage.app",
  messagingSenderId: "46394863507",
  appId: "1:46394863507:web:decbcaaf56e9effbaf0266",
  measurementId: "G-M9EG6JE681"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
