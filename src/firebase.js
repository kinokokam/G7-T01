// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvJo_HCmN5F97adAZjmIVEJZv0UU6FxZE",
  authDomain: "renovenience.firebaseapp.com",
  projectId: "renovenience",
  storageBucket: "renovenience.appspot.com",
  messagingSenderId: "279886416921",
  appId: "1:279886416921:web:1b41f31c84cdb8ca962e88",
  measurementId: "G-YEQ58X83LB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);  // Make sure this is after initializing the app
const auth = getAuth(app);
export {firestore, auth}