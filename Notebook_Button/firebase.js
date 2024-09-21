// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA50SALxdgUFkntXHLOG6xjtmvpa10qRP4",
  authDomain: "myprojekt-1b40d.firebaseapp.com",
  projectId: "myprojekt-1b40d",
  storageBucket: "myprojekt-1b40d.appspot.com",
  messagingSenderId: "66760740033",
  appId: "1:66760740033:web:982cb3ddecf64d6f129840",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);
export { app, database };
