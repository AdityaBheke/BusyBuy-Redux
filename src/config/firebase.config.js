// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEdZtUo3QQmiORsinAUsLAz8BdYk0q4ec",
  authDomain: "busybuy-679fb.firebaseapp.com",
  projectId: "busybuy-679fb",
  storageBucket: "busybuy-679fb.firebasestorage.app",
  messagingSenderId: "627284516290",
  appId: "1:627284516290:web:9af6ce1226c7f04eae0a5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
