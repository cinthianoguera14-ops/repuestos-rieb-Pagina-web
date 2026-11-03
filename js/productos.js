import { observarSesion, cerrarSesion } from "./auth.js";

const API_URL = "https://script.google.com/macros/s/AKfycbzCcNmLmbAZoL4K0rulY9bENG4I7Q6PT3vhfMsUZZy5i10hP-dtDbNZQWKPElOgmVtofg/exec";

document.addEventListener("DOMContentLoaded", () => {
    const acceso = document.querySelector(".acceso-card");
    const catalogo = document.getElementById("catalogoContenido");
    const enlaceSesion = document.getElementById("enlaceSesion");
    const listaProductos = document.getElementById("listaProductos");
    const buscador = document.getElementById("buscadorProductos");

    let productosCargados = [];

    // Crear enlace de WhatsApp para cada sucursal
    function enlaceWhatsApp(telefono, nombreProducto) {
        const mensaje = `Hola, quisiera consultar por el producto: ${nombreProducto}. ¿Podrían brindarme más información?`;
        return `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    }

    // Mostrar los productos en pantalla
    function mostrarProductos(productos) {
        listaProductos.innerHTML = "";

        if (!productos.length) {
            listaProductos.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        productos.forEach(producto => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "col-md-6 col-lg-4 mb-4";

            const imagen = producto.Imagen || "";
            const nombre = producto.Nombre || "Producto";
            const categoria = producto.Categoria || "";
            const descripcion = producto.Descripción || producto.Descripcion || "";
            const stock = producto.Stock || 0;
            const estado = producto.Estado || "";

            const whatsappLamarque = enlaceWhatsApp("5492984206194", nombre);
            const whatsappChoele = enlaceWhatsApp("5492984619489", nombre);

            tarjeta.innerHTML = `
                <div class="card h-100 shadow-sm">
                    ${imagen ? `<img src="${imagen}" class="card-img-top" alt="${nombre}" style="height:220px; object-fit:contain;">` : ""}

                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="text-muted">${categoria}</p>
                        <p>${descripcion}</p>
                        <p>Stock: ${stock}</p>
                        <span class="badge bg-success mb-3">${estado}</span>

                        <div class="mt-auto">
                            <p class="fw-bold mb-2">Consultar por este producto:</p>

                            <a href="${whatsappLamarque}"
                               target="_blank"
                               rel="noopener noreferrer"
                               class="btn btn-success w-100 mb-2">
                                <i class="bi bi-whatsapp"></i>
                                Consultar en Lamarque
                            </a>

                            <a href="${whatsappChoele}"
                               target="_blank"
                               rel="noopener noreferrer"
                               class="btn btn-outline-success w-100">
                                <i class="bi bi-whatsapp"></i>
                                Consultar en Choele Choel
                            </a>
                        </div>
                    </div>
                </div>
            `;

            listaProductos.appendChild(tarjeta);
        });
    }

    // Consultar productos a Apps Script
    async function cargarProductos(usuario) {
        listaProductos.innerHTML = "<p>Cargando productos...</p>";

        try {
            const token = await usuario.getIdToken();

            const respuesta = await fetch(
                API_URL + "?idToken=" + encodeURIComponent(token)
            );

            const datos = await respuesta.json();

            if (!datos.success) {
                throw new Error(datos.message || "No se pudo cargar el catálogo.");
            }

            productosCargados = datos.productos;
            mostrarProductos(productosCargados);

        } catch (error) {
            console.error("Error al cargar productos:", error);
            listaProductos.innerHTML =
                "<p>No pudimos cargar el catálogo. Intentá nuevamente.</p>";
        }
    }

    // Buscador de productos
    if (buscador) {
        buscador.addEventListener("input", () => {
            const texto = buscador.value.toLowerCase();

            const filtrados = productosCargados.filter(producto =>
                Object.values(producto).some(valor =>
                    String(valor).toLowerCase().includes(texto)
                )
            );

            mostrarProductos(filtrados);
        });
    }

    // Cerrar sesión desde el menú
    if (enlaceSesion) {
        enlaceSesion.addEventListener("click", async evento => {
            if (enlaceSesion.dataset.estado === "conectado") {
                evento.preventDefault();
                await cerrarSesion();
                window.location.href = "login.html";
            }
        });
    }

    // Controlar el estado de autenticación
    observarSesion(usuario => {
        if (usuario) {
            if (acceso) acceso.hidden = true;
            if (catalogo) catalogo.hidden = false;

            if (enlaceSesion) {
                enlaceSesion.textContent = "Cerrar sesión";
                enlaceSesion.href = "#";
                enlaceSesion.dataset.estado = "conectado";
            }

            cargarProductos(usuario);

        } else {
            if (acceso) acceso.hidden = false;
            if (catalogo) catalogo.hidden = true;

            if (enlaceSesion) {
                enlaceSesion.textContent = "Ingresar";
                enlaceSesion.href = "login.html";
                enlaceSesion.dataset.estado = "desconectado";
            }
        }
    });
});
