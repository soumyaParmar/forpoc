// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD36mZJ4dZDpJb1xHU1vbNEeV_n1Mzyv9A",
  authDomain: "auth-c8db4.firebaseapp.com",
  projectId: "auth-c8db4",
  storageBucket: "auth-c8db4.appspot.com",
  messagingSenderId: "857082116832",
  appId: "1:857082116832:web:31da33b15cc9e32892ae85",
  measurementId: "G-4SYT7T3R2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Set up Google provider
export const googleProvider = new GoogleAuthProvider();

// Function to handle Google sign-in
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// Function to handle sign-out
export const logout = () => {
  return signOut(auth);
};