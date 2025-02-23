// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBNVgWas3wOyQi-2cDqKiJWVQRmG8dO4n0",
    authDomain: "musicly-75a98.firebaseapp.com",
    projectId: "musicly-75a98",
    storageBucket: "musicly-75a98.firebasestorage.app",
    messagingSenderId: "277863878597",
    appId: "1:277863878597:web:b74425931e58c5e15f45ac"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);