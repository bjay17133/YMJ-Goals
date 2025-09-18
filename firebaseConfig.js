// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDodpztd6h31WHGnLVHF-VeyrlEjP--e_Q",
  authDomain: "ymj-mobile-app---tracker.firebaseapp.com",
  projectId: "ymj-mobile-app---tracker",
  storageBucket: "ymj-mobile-app---tracker.firebasestorage.app",
  messagingSenderId: "428888400744",
  appId: "1:428888400744:web:fb229c0efd4be2c21c6cdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

 const auth = getAuth(app);

export { auth };