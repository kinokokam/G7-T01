// Import Firebase services from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration
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
const firestore = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export the Firebase modules
export { firestore, auth, provider, collection, addDoc, getDocs, query, where, setDoc, doc, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup };
