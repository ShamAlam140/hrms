// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHbSF7TG_rH0zRBwIpGGY3dASCjbac6YM",
  authDomain: "hrms-7c974.firebaseapp.com",
  projectId: "hrms-7c974",
  storageBucket: "hrms-7c974.appspot.com",
  messagingSenderId: "968985436688",
  appId: "1:968985436688:web:c7a513424cfc98033e2095",
  measurementId: "G-B9LR62H6CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage()