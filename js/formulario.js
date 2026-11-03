const API_URL = "https://script.google.com/macros/s/AKfycbzCcNmLmbAZoL4K0rulY9bENG4I7Q6PT3vhfMsUZZy5i10hP-dtDbNZQWKPElOgmVtofg/exec";

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formularioContacto");
    const respuesta = document.getElementById("respuestaFormulario");

    if (!formulario) return;

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const boton = formulario.querySelector('button[type="submit"]');
        const datos = {
            nombre: formulario.querySelector('[name="nombre"]')?.value.trim(),
            email: formulario.querySelector('[name="email"]')?.value.trim(),
            telefono: formulario.querySelector('[name="telefono"]')?.value.trim(),
            mensaje: formulario.querySelector('[name="mensaje"]')?.value.trim()
        };

        if (!datos.nombre || !datos.email || !datos.telefono || !datos.mensaje) {
            respuesta.textContent = "Completá todos los campos.";
            return;
        }

        boton.disabled = true;
        respuesta.textContent = "Enviando consulta...";

        try {
            await fetch(API_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(datos)
            });

            respuesta.textContent =
                "Tu consulta fue enviada. ¡Gracias por comunicarte con Repuestos Rieb!";
            formulario.reset();

        } catch (error) {
            console.error("Error al enviar la consulta:", error);
            respuesta.textContent =
                "No se pudo enviar la consulta. Intentá nuevamente.";
        } finally {
            boton.disabled = false;
        }
    });
});