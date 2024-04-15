// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABSba1lNlUKMFQPoeePgVpzhGf9CBcsLk",
  authDomain: "netflixgpt-clone-6e6ac.firebaseapp.com",
  projectId: "netflixgpt-clone-6e6ac",
  storageBucket: "netflixgpt-clone-6e6ac.appspot.com",
  messagingSenderId: "691776043591",
  appId: "1:691776043591:web:28c76324ca788b1c6f4f62",
  measurementId: "G-K9GNEF0SGT"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
