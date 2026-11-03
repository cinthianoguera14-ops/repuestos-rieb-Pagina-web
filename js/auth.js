import {
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

import {
    auth,
    googleProvider
} from "./firebase.js";

// Iniciar sesión con Google
export async function iniciarSesionGoogle() {
    try {
        const resultado = await signInWithPopup(auth, googleProvider);

        console.log("Usuario autenticado:", resultado.user.displayName);

        return resultado.user;

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("No se pudo iniciar sesión. Intentá nuevamente.");

        return null;
    }
}

// Cerrar sesión
export async function cerrarSesion() {
    try {
        await signOut(auth);
        console.log("Sesión cerrada correctamente.");

    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("No se pudo cerrar la sesión.");
    }
}

// Detectar cambios en la autenticación
export function observarSesion(callback) {
    return onAuthStateChanged(auth, callback);
}