// Obtenemos la referencia al menú y al submenú
const menuIcon = document.getElementById('menu-icon');
const submenu = document.getElementById('submenu');

// Variable para controlar si el menú está desplegado o no
let isSubMenuVisible = false;

// Agregamos un evento al pasar el cursor por encima del icono del menú
menuIcon.addEventListener('mouseenter', () => {
    isSubMenuVisible = true;
    submenu.style.display = 'block';
});

// Agregamos un evento al salir del icono del menú
menuIcon.addEventListener('mouseleave', () => {
    isSubMenuVisible = false;
    setTimeout(() => {
        // Ocultamos el submenú solo si el cursor no está sobre el submenú
        if (!isSubMenuVisible) {
            submenu.style.display = 'none';
        }
    }, 200); // Puedes ajustar el valor del retardo (en milisegundos) según tus necesidades
});

// Agregamos un evento para ocultar el submenú cuando el cursor sale del menú
submenu.addEventListener('mouseleave', () => {
    submenu.style.display = 'none';
});
