// =====================================
// REPUESTOS RIEB - JAVASCRIPT
// =====================================

// Mostrar automáticamente el año actual
const anio = document.getElementById("anio");

if (anio) {
    anio.textContent = new Date().getFullYear();
}

// Mensaje de bienvenida en consola
console.log("Sitio web de Repuestos Rieb cargado correctamente.");