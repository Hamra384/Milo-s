const menuIcon = document.getElementById('menu-icon');
const submenu = document.getElementById('submenu');

menuIcon.addEventListener('click', (event) => {
    if (event.target === menuIcon) {
        submenu.classList.toggle('show');
    }
});