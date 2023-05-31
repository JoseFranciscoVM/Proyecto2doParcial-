import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5cgHTbpwqYVKsw7bqJYe49vSzkPo43uc",
  authDomain: "proyecto-read.firebaseapp.com",
  projectId: "proyecto-read",
  storageBucket: "proyecto-read.appspot.com",
  messagingSenderId: "622787831275",
  appId: "1:622787831275:web:356e098d7dccce381ba5ae",
  measurementId: "G-XQQCK6SYKM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

