import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCNoQu3HTs367iDKS1M7Sboqtu0J28xuyk",
    authDomain: "svelte-course-c24fa.firebaseapp.com",
    projectId: "svelte-course-c24fa",
    storageBucket: "svelte-course-c24fa.appspot.com",
    messagingSenderId: "6839152588",
    appId: "1:6839152588:web:8e68ff1f385fe2b40d7769",
    measurementId: "G-ZKRLM9CMDV"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();