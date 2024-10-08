// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjhZ-j7FUQUvqpYVix_jUA4W_ZzzE2iuQ",
  authDomain: "file-sharing-1801c.firebaseapp.com",
  projectId: "file-sharing-1801c",
  storageBucket: "file-sharing-1801c.appspot.com",
  messagingSenderId: "337772704567",
  appId: "1:337772704567:web:85fd7b94623f3cd14260b2",
  measurementId: "G-TQXBKEJTXW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);