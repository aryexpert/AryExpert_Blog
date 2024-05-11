// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aryexpert-blog.firebaseapp.com",
  projectId: "aryexpert-blog",
  storageBucket: "aryexpert-blog.appspot.com",
  messagingSenderId: "862541189342",
  appId: "1:862541189342:web:80a55371bbe84951dff24f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
