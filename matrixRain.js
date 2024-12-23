const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const charSize = 20;
const columns = Math.floor(canvas.width / charSize);

// Initialize drops with random starting positions
const drops = Array(columns).fill().map(() => Math.floor(Math.random() * canvas.height / charSize));
const columnBinary = Array(columns).fill().map(() => Math.random() < 0.5 ? '0' : '1');

// Function to randomly change binary value
function getRandomBinary() {
    return Math.random() < 0.5 ? '0' : '1';
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = '20px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Randomly update the binary value with a slight chance
        if (Math.random() < 0.5) {
            columnBinary[i] = getRandomBinary();
        }

        const x = i * charSize;
        const y = drops[i] * charSize;

        ctx.fillStyle = '#0F0';
        ctx.fillText(columnBinary[i], x, y);

        if (y > canvas.height) {
            // Reset the drop to the top after reaching the bottom
            drops[i] = 0;
        }

        drops[i]++;
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = Math.floor(canvas.width / charSize);
    drops.length = newColumns;
    columnBinary.length = newColumns;

    // Reinitialize the drops with random starting positions
    for (let i = 0; i < newColumns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / charSize);
        columnBinary[i] = Math.random() < 0.5 ? '0' : '1';
    }
});

setInterval(draw, 60); // Reduced interval time to make the animation slightly faster
