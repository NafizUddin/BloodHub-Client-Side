// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1FHUODROi9ZwV52W5sSskd_2HnCyXJr4",
  authDomain: "simple-firbase-first-project.firebaseapp.com",
  projectId: "simple-firbase-first-project",
  storageBucket: "simple-firbase-first-project.appspot.com",
  messagingSenderId: "31870120979",
  appId: "1:31870120979:web:695ace1a8a64100114fbe6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
