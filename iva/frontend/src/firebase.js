// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEZbFPwkX-HiQz1IFb5TPlf9FZD7v9Ak0",
  authDomain: "imaginate-vision-ai.firebaseapp.com",
  projectId: "imaginate-vision-ai",
  storageBucket: "imaginate-vision-ai.firebasestorage.app",
  messagingSenderId: "596149403121",
  appId: "1:596149403121:web:3c4c309fad6a1d97495850",
  measurementId: "G-S749LDBY4H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
