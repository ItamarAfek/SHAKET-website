import './style.css';
const canvas = document.getElementById('inkCanvas');
const ctx = canvas.getContext('2d');

let particles = [];

// Handle full screen resizing
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// The Ink Droplet blueprint
class InkDrop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 2; 
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = Math.random() * 0.5 + 0.2; // Slowly leaks downwards
        this.opacity = 1;
        this.fadeSpeed = Math.random() * 0.01 + 0.008;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;
        this.size += 0.05; 
    }

    draw() {
        ctx.fillStyle = `rgba(30, 30, 60, ${this.opacity})`; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Track mouse movement to spawn ink
window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
        particles.push(new InkDrop(e.clientX, e.clientY));
    }
});



// Single, clean touchmove listener. NO e.preventDefault() to allow native scrolling.
window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    for (let i = 0; i < 2; i++) {
        particles.push(new InkDrop(touch.clientX, touch.clientY));
    }
}, { passive: true }); 

// Capture the initial single tap on mobile without hijacking the tap-to-click link behavior
window.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    for (let i = 0; i < 5; i++) { 
        particles.push(new InkDrop(touch.clientX, touch.clientY));
    }
}, { passive: true });




// The standard high-performance animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].opacity <= 0) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animate);
}

animate();