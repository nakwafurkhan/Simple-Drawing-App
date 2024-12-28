const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const startPainting = (e) => {
    isPainting = true;
    draw(e); // Start drawing immediately on touch/mousedown
};

const stopPainting = () => {
    isPainting = false;
    ctx.beginPath();
};

const draw = (e) => {
    if (!isPainting) return;

    let x, y;

    if (e.type.startsWith('touch')) {
        const touch = e.touches[0];
        x = touch.clientX - canvasOffsetX;
        y = touch.clientY - canvasOffsetY;
    } else {
        x = e.clientX - canvasOffsetX;
        y = e.clientY - canvasOffsetY;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
};

// Mouse events
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', draw);

// Touch events
canvas.addEventListener('touchstart', startPainting);
canvas.addEventListener('touchend', stopPainting);
canvas.addEventListener('touchmove', draw);
