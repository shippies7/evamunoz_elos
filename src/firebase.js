// src/firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyCq0ibotgvYgT9CV7ZWpYUvzbzYtjwMZtk",
  authDomain: "evamunoz-org.firebaseapp.com",
  projectId: "evamunoz-org",
  storageBucket: "evamunoz-org.appspot.com",
  messagingSenderId: "949093978498",
  appId: "1:940993798498:web:d46df1c2a643b6d59d0c3b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Servicios
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Mantener sesión aunque cierre navegador
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("🧠 Sesión persistente activada");
  })
  .catch((error) => {
    console.error("⚠️ Error en persistencia:", error);
  });

// Escuchar cambios de sesión
export const listenForAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("✅ Usuario logueado:", user);
      callback(user);
    } else {
      console.log("🚫 No hay usuario logueado");
      callback(null);
    }
  });
};

// Exportar servicios
export { auth, db, googleProvider };