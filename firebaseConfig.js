import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDodpztd6h31WHGnLVHF-VeyrlEjP--e_Q",
  authDomain: "ymj-mobile-app---tracker.firebaseapp.com",
  projectId: "ymj-mobile-app---tracker",
  storageBucket: "ymj-mobile-app---tracker.appspot.com",
  messagingSenderId: "428888400744",
  appId: "1:428888400744:web:fb229c0efd4be2c21c6cdd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
