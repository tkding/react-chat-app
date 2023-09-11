// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClktT83G642LRWCEdAA6wVyaElhx6qBFE",
  authDomain: "chatapp-22a6b.firebaseapp.com",
  projectId: "chatapp-22a6b",
  storageBucket: "chatapp-22a6b.appspot.com",
  messagingSenderId: "274645523132",
  appId: "1:274645523132:web:f2999ae1fb63784ca8ceb9",
  measurementId: "G-VW9WPTFCWW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Use the emulator URLs when running on localhost
// if (window.location.hostname === "localhost") {
//   connectFirestoreEmulator(db, '127.0.0.1', 8080);
//   connectAuthEmulator(auth, 'http://localhost:9099');
// }