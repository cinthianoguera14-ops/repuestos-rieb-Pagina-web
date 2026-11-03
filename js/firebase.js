import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCfF3sge1PSutuGRfR4j2JoDKBJSwbLGqo",
    authDomain: "repuestos-rieb.firebaseapp.com",
    projectId: "repuestos-rieb",
    storageBucket: "repuestos-rieb.firebasestorage.app",
    messagingSenderId: "704255447970",
    appId: "1:704255447970:web:71765359f33ad20a19d8fb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();