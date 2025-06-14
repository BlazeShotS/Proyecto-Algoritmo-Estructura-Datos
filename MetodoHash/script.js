class TablaHash { // MANEJA COLISIONES || además, como están dentro de la clase, las funciones no es necesario poner function
    constructor(tamaño) { // Constructor para inicializar y crear un objeto
        this.tamaño = tamaño; // Define el tamaño de la tabla, por ejemplo, tamaño = 80
        this.tabla = new Array(tamaño).fill(null).map(() => []); // El map transforma cada elemento del array (que actualmente es null) en un nuevo array vacío []
    }

    // Función hash que convierte un código en un índice
    funciónHash(codigo) {
        const parte1 = parseInt(codigo.substring(0, 2), 10) || 0; // Toma los dos primeros dígitos del código
        const parte2 = parseInt(codigo.substring(2, 4), 10) || 0; // Toma los siguientes dos dígitos del código
        const sumaPartes = parte1 + parte2; // Suma ambas partes
        return sumaPartes % this.tamaño; // Devuelve el índice dentro del rango de la tabla
    }

    // Inserta un producto en la tabla hash
    insertar(producto) {
        const índice = this.funciónHash(producto.Codigo); // Calcula el índice para el producto
        this.tabla[índice].push(producto); // Determina en qué cubo específico se almacenará el elemento (un arreglo que puede tener múltiples elementos)
        this.mostrar(); // Muestra la tabla actualizada
    }

    // Muestra la tabla hash en la interfaz
    mostrar() {
        const cuerpoResultado = document.getElementById("resultadoBody"); // Obtiene el cuerpo de la tabla en la interfaz
        cuerpoResultado.innerHTML = ''; // Limpia el contenido actual

        this.tabla.forEach((cubo, índice) => { // Recorre cada cubo de la tabla hash
            cubo.forEach(producto => { // Recorre cada producto en el cubo
                const fila = document.createElement('tr'); // Crea una nueva fila de tabla
                fila.innerHTML = `
                    <td>${producto.Codigo}</td>
                    <td>${producto.Nombre}</td>
                    <td>${producto.TipoProducto}</td>
                    <td>${producto.PrecioUnitario}</td>
                    <td>${producto.PrecioDocena}</td>
                    <td>${índice}</td>
                `; // Llena la fila con los datos del producto
                cuerpoResultado.appendChild(fila); // Añade la fila al cuerpo de la tabla
            });
        });
    }

    // Consulta productos por su índice
    consultarPorÍndice(índice) {
        if (índice >= 0 && índice < this.tamaño) { // Verifica que el índice esté dentro del rango válido
            return this.tabla[índice]; // Devuelve el cubo correspondiente al índice
        }
        return null; // Si el índice es inválido, devuelve null
    }

    // Elimina un producto por su índice y código
    eliminarPorÍndice(índice, codigo) {
        if (índice >= 0 && índice < this.tamaño) { // Verifica que el índice esté dentro del rango válido
            const cubo = this.tabla[índice]; // Obtiene el cubo correspondiente al índice
            const nuevoCubo = cubo.filter(producto => producto.Codigo !== codigo); // Filtra el producto con el código especificado del cubo

            if (nuevoCubo.length !== cubo.length) { // Verifica si algún producto fue eliminado
                this.tabla[índice] = nuevoCubo; // Actualiza el cubo en la tabla hash
                this.mostrar(); // Muestra la tabla actualizada
            }
        }
    }

    // Modifica un producto por su índice y código
    modificarPorÍndice(índice, productoModificado) {
        if (índice >= 0 && índice < this.tamaño) { // Verifica que el índice esté dentro del rango válido
            const cubo = this.tabla[índice]; // Obtiene el cubo correspondiente al índice
            const índiceProducto = cubo.findIndex(p => p.Codigo === productoModificado.Codigo); // Encuentra el índice del producto en el cubo

            if (índiceProducto !== -1) { // Si el producto existe en el cubo
                cubo[índiceProducto] = productoModificado; // Actualiza el producto en el cubo
                this.mostrar(); //  me muestra la tabla actualizada
            }
        }
    }
}

//-------------------------------------------------------------------------------------------------------------

const tablaHash = new TablaHash(80); // Tamaño del arreglo

// Función para insertar un producto
function Insertar() {
    const codigo = document.getElementById('Codigo').value;
    const nombre = document.getElementById('Nombre').value;
    const tipoProducto = document.getElementById('TipoProducto').value;
    const precioUnitario = parseFloat(document.getElementById('PrecioUnitario').value);
    const precioDocena = parseFloat(document.getElementById('PrecioDocena').value);

    const producto = { Codigo: codigo, Nombre: nombre, TipoProducto: tipoProducto, PrecioUnitario: precioUnitario, PrecioDocena: precioDocena };
    tablaHash.insertar(producto); // Inserta el producto en la tabla hash

    Limpiar(); // Llama a la función Limpiar para que una vez ingresados los datos se limpie
}

// Función para consultar productos por índice
function Consultar() {
    const índice = parseInt(document.getElementById('Índice').value, 10);
    const productos = tablaHash.consultarPorÍndice(índice);
    if (productos && productos.length > 0) {
        alert(`Productos en el índice ${índice}: \n` + productos.map(p => `Nombre: ${p.Nombre}, Tipo: ${p.TipoProducto}, Precio Unitario: ${p.PrecioUnitario}, Precio por Docena: ${p.PrecioDocena}`).join('\n'));
    } else {
        alert('No se encontraron productos en el índice especificado');
    }
}

// Función para eliminar un producto por índice y código
function Eliminar() {
    const índice = parseInt(document.getElementById('Índice').value, 10);
    const codigo = document.getElementById('Codigo').value;
    tablaHash.eliminarPorÍndice(índice, codigo); // Elimina el producto de la tabla hash
}

// Función para modificar un producto por índice y código
function Modificar() {
    const índice = parseInt(document.getElementById('Índice').value, 10);
    const codigo = document.getElementById('Codigo').value;
    const nombre = document.getElementById('Nombre').value;
    const tipoProducto = document.getElementById('TipoProducto').value;
    const precioUnitario = parseFloat(document.getElementById('PrecioUnitario').value);
    const precioDocena = parseFloat(document.getElementById('PrecioDocena').value);

    const producto = { Codigo: codigo, Nombre: nombre, TipoProducto: tipoProducto, PrecioUnitario: precioUnitario, PrecioDocena: precioDocena };
    tablaHash.modificarPorÍndice(índice, producto); // Modifica el producto en la tabla hash
}

// Función para salir del sistema
function Salir() {
    alert('¡Gracias por usar nuestro sistema!');
    location.reload(); // Vuelve a cargar el programa
}

// Función para limpiar los campos del formulario
function Limpiar() {
    document.getElementById("Codigo").value = "";
    document.getElementById("Nombre").value = "";
    document.getElementById("TipoProducto").value = "";
    document.getElementById("PrecioUnitario").value = "";
    document.getElementById("PrecioDocena").value = "";
    document.getElementById("Índice").value = "";
}

function Imprimir() {
    window.print();
}