var carritoDeCompras = [];

var tablaCarrito = document.querySelector('#lista-carrito tbody');
var botonVaciarCarrito = document.getElementById('vaciar-carrito');
var botonesAgregarCurso = document.querySelectorAll('.agregar-carrito');

var agregarProductoAlCarrito = function(producto) {
    var productoExistente = carritoDeCompras.some(function(item) {
        return item.id === producto.id;
    });

    if (productoExistente) {
        carritoDeCompras = carritoDeCompras.map(function(item) {
            if (item.id === producto.id) {
                item.cantidad++;
            }
            return item;
        });
    } else {
        carritoDeCompras.push({ ...producto, cantidad: 1 });
    }
    actualizarVistaCarrito();
};

var eliminarProductoDelCarrito = function(productoId) {
    carritoDeCompras = carritoDeCompras.filter(function(producto) {
        return producto.id !== productoId;
    });
    actualizarVistaCarrito();
};

var actualizarVistaCarrito = function() {
    tablaCarrito.innerHTML = '';
    carritoDeCompras.forEach(function(producto) {
        var fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}€</td>
            <td>${producto.cantidad}</td>
            <td><a href="#" class="eliminar-producto" data-id="${producto.id}">X</a></td>
        `;
        tablaCarrito.appendChild(fila);
    });
    asignarEventosEliminar();
};

var asignarEventosEliminar = function() {
    var botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach(function(boton) {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            var productoId = parseInt(boton.getAttribute('data-id'));
            eliminarProductoDelCarrito(productoId);
        });
    });
};

botonesAgregarCurso.forEach(function(boton) {
    boton.addEventListener('click', function(e) {
        e.preventDefault();

        var tarjetaCurso = boton.closest('.card');
        var productoId = boton.getAttribute('data-id');
        var productoNombre = tarjetaCurso.querySelector('h4').textContent;
        var productoPrecio = tarjetaCurso.querySelector('.precio').textContent.split(' ')[0];
        var productoImagen = tarjetaCurso.querySelector('.imagen-curso').src;

        var producto = {
            id: parseInt(productoId),
            nombre: productoNombre,
            precio: parseFloat(productoPrecio),
            imagen: productoImagen,
        };

        agregarProductoAlCarrito(producto);
    });
});

botonVaciarCarrito.addEventListener('click', function() {
    carritoDeCompras = [];
    actualizarVistaCarrito();
});

actualizarVistaCarrito();
