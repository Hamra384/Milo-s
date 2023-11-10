const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');
const lapiz = document.getElementById('lapiz');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;

// Posición inicial del lápiz
let lapizX = 0;
let lapizY = 0;

// Función para dibujar en el canvas
function dibujar(event) {
    if (!isPainting) return;

    const x = event.clientX - canvasOffsetX;
    const y = event.clientY - canvasOffsetY;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Evento de inicio de arrastre del lápiz
lapiz.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', ''); // Necesario para Firefox
    lapizX = event.clientX - lapiz.width / 2;
    lapizY = event.clientY - lapiz.height / 2;
});

// Evento de soltar el lápiz en el canvas
canvas.addEventListener('drop', (event) => {
    event.preventDefault();
    const x = event.clientX - canvasOffsetX;
    const y = event.clientY - canvasOffsetY;

    lapizX = x - lapiz.width / 2;
    lapizY = y - lapiz.height / 2;

    isPainting = true;
});

// Evento para evitar el comportamiento predeterminado del drop
canvas.addEventListener('dragover', (event) => {
    event.preventDefault();
});

// Evento de soltar el lápiz para dejar de dibujar
canvas.addEventListener('mouseup', () => {
    isPainting = false;
});

// Evento para mover el lápiz y dibujar
canvas.addEventListener('mousemove', dibujar);

// Función para dibujar el lápiz en su posición
function dibujarLapiz() {
    ctx.drawImage(lapiz, lapizX, lapizY);
}

// Llamar a la función dibujarLapiz en cada cuadro para mantener actualizada la posición del lápiz
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarLapiz();
    requestAnimationFrame(animar);
}

// Iniciar la animación
animar();

// Resto de tu código para las herramientas de dibujo...
toolbar.addEventListener('click', (e) => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', (e) => {
    if (e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'lineWidth') {
        // Limita el grosor de la línea a un máximo de 100
        lineWidth = Math.min(e.target.value, 100);
        // Actualiza el valor en el input para reflejar el límite
        e.target.value = lineWidth;
    }
});
