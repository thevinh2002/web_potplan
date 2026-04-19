// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy0a5ZqgipUFklBZbf5Szl2qLqkIW_fJ8",
  authDomain: "vad-pottery.firebaseapp.com",
  projectId: "vad-pottery",
  storageBucket: "vad-pottery.firebasestorage.app",
  messagingSenderId: "624750345881",
  appId: "1:624750345881:web:919223f0dfd14689904208",
  measurementId: "G-RNVJ7W5TJV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
