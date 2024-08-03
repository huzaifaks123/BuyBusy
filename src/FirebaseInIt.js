// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnraEHFYdueql8KLrAR-P2y-6VmB2m3xM",
  authDomain: "buybusy-2-24bb2.firebaseapp.com",
  projectId: "buybusy-2-24bb2",
  storageBucket: "buybusy-2-24bb2.appspot.com",
  messagingSenderId: "324408024947",
  appId: "1:324408024947:web:398dcc6ad8c3dc7d0f2f06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);