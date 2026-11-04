const c = document.getElementById("c");
const ctx = c.getContext("2d");

const particles = [];
const numParticles = 200;

c.width = window.innerWidth;
c.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * c.width;
        this.y = Math.random() * c.height;
        this.size = Math.random() * 100 + 1;
        this.speedX = Math.random() * 1 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, c.width, c.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.size <= 0.9) {
            particles.splice(index, 2);
        }
    });

    if (particles.length < numParticles) {
        particles.push(new Particle());
    }
}

init();
animate();
