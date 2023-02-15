const firebase = require('firebase');

// Connect to Firebase
//-----------------------
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyB7gaQQhJi0n2Ksw7sv8KNZpAKPeAhBKwQ",
  authDomain: "twitterdata-1fc9d.firebaseapp.com",
  projectId: "twitterdata-1fc9d",
  storageBucket: "twitterdata-1fc9d.appspot.com",
  messagingSenderId: "301587230384",
  appId: "1:301587230384:web:d91b771c739aa9d4165575",
  measurementId: "G-KYDYWB9YFC"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

