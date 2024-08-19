// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGrkJYSYIlb0Mf5_e1Ip48VQ_npKjNl3M",
  authDomain: "devtalles-astro-auth.firebaseapp.com",
  projectId: "devtalles-astro-auth",
  storageBucket: "devtalles-astro-auth.appspot.com",
  messagingSenderId: "486365002993",
  appId: "1:486365002993:web:3d5e031a548fa1444f3d50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const firebase = {
  app,
  auth,
}