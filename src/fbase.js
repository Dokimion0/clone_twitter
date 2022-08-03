import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBkD2U9TaS55SZGSRI8cv54JITl6gie0Ko",
  authDomain: "tweetproject-77096.firebaseapp.com",
  projectId: "tweetproject-77096",
  storageBucket: "tweetproject-77096.appspot.com",
  messagingSenderId: "681496311939",
  appId: "1:681496311939:web:a7b64fab3219368ea983b6"
};

const app = initializeApp(firebaseConfig);

export const dbService =  getFirestore(app);
export const authService = getAuth();




