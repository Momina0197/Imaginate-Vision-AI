// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9G9MuRvdKJB7soXNeBNT5RU3oa6A6Alk", // paste from Firebase project settings
  authDomain: "imaginate-vision-ai-90182.firebaseapp.com",
  projectId: "imaginate-vision-ai-90182",
  storageBucket: "imaginate-vision-ai-90182.firebasestorage.app",
  messagingSenderId: "799517757998",
  appId: "1:799517757998:web:812a45a02dbfcd180585bf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
