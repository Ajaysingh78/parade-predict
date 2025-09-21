// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjxTTKUIKSlnI4xYZ6gifXo5VCGn2to14",
  authDomain: "weather-app-43dc6.firebaseapp.com",
  projectId: "weather-app-43dc6",
  storageBucket: "weather-app-43dc6.appspot.com",
  messagingSenderId: "1040102674645",
  appId: "1:1040102674645:web:50c9b9127a2164b813d25c",
  measurementId: "G-SQK4XF1D01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
