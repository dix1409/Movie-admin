// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbRaWktJsiQrjN_jcpFbA-KTM-3nrKPuM",
  authDomain: "movie-1e522.firebaseapp.com",
  projectId: "movie-1e522",
  storageBucket: "movie-1e522.appspot.com",
  messagingSenderId: "308471814762",
  appId: "1:308471814762:web:315f2da5814b3fc13e0813",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const store = getFirestore(app);
const auth = getAuth(app);
export { store, auth };
