import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCzo1wvqPez9jXBwlfPQnYsWqaiEv-f2Go",
  authDomain: "student-budget-sb.firebaseapp.com",
  projectId: "student-budget-sb",
  storageBucket: "student-budget-sb.appspot.com",
  messagingSenderId: "135971949960",
  appId: "1:135971949960:web:eb95fc919078deeeb43e3d"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const firestoreath = getAuth(app);