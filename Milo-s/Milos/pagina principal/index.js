// Obtenemos la referencia al menú y al submenú
const menuIcon = document.getElementById('menu-icon');
const submenu = document.getElementById('submenu');

// Agregamos un evento al pasar el cursor por encima del icono del menú
menuIcon.addEventListener('mouseenter', () => {
    submenu.style.display = 'block';
});

// Agregamos un evento para ocultar el submenú cuando el cursor sale del menú
submenu.addEventListener('mouseleave', () => {
    submenu.style.display = 'none';
});
