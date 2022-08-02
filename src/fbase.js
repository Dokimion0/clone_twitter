import { initializeApp } from "firebase/app";
import firebase from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB2yvEyLGiPcu-XkSHXY5XbxxPkVEhGLrQ",
  authDomain: "twitter-f553c.firebaseapp.com",
  projectId: "twitter-f553c",
  storageBucket: "twitter-f553c.appspot.com",
  messagingSenderId: "336493647524",
  appId: "1:336493647524:web:bf19ebdeefed0cf31f3831"
  };

const app = initializeApp(firebaseConfig);
export const authService = getAuth();




