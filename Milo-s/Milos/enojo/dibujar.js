const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;

document.addEventListener('mousedown', (e) => {
    if (e.target === canvas) {
        isPainting = true;
        const x = e.clientX - canvasOffsetX;
        const y = e.clientY - canvasOffsetY;
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
});

document.addEventListener('mouseup', () => {
    isPainting = false;
});

document.addEventListener('mousemove', (e) => {
    if (!isPainting) {
        return;
    }

    const x = e.clientX - canvasOffsetX;
    const y = e.clientY - canvasOffsetY;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
});

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
