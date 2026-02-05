// === HIGH DENSITY WHITE STAR TRAIL ===
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let mouse = { x: undefined, y: undefined };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    
    // Tăng số lượng sao sinh ra mỗi lần di chuột (Density: High)
    for(let i = 0; i < 8; i++) {
        particles.push(new Particle());
    }
});

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 0.5; // Kích thước sao ngẫu nhiên
        
        // Tốc độ phân tán nhanh hơn một chút
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        
        // MÀU TRẮNG TINH KHIẾT
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`; 
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Sao nhỏ dần nhanh hơn để tạo hiệu ứng lấp lánh (sparkle)
        if(this.size > 0.1) this.size -= 0.08; 
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Hiệu ứng phát sáng trắng (White Glow)
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'white';
    }
}

function handleParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.1) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(handleParticles);
}
handleParticles();


// === OTHER EFFECTS ===

// AOS: Nhanh hơn (Snappy)
AOS.init({
    once: true,
    offset: 50,
    duration: 500, // Nhanh hơn (cũ là 800)
    easing: 'ease-out-back', // Hiệu ứng bật nảy nhẹ
});

// Typed.js
const typed = new Typed('.typing-text', {
    strings: ['Web Developer'],
    typeSpeed: 40,
    backSpeed: 20,
    backDelay: 1500,
    loop: true,
    cursorChar: '|'
});

// Navbar Glass Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('glass', 'shadow-2xl', 'py-3');
        navbar.classList.remove('py-6', 'border-transparent');
    } else {
        navbar.classList.remove('glass', 'shadow-2xl', 'py-3');
        navbar.classList.add('py-6', 'border-transparent');
    }
});

// Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuLinks = document.querySelectorAll('.menu-link');

function toggleMenu(show) {
    if(show) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => mobileMenu.classList.remove('opacity-0'), 10);
    } else {
        mobileMenu.classList.add('opacity-0');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    }
}

menuBtn.addEventListener('click', () => toggleMenu(true));
closeBtn.addEventListener('click', () => toggleMenu(false));
menuLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

// Form UI Logic
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const icon = btn.querySelector('i');
    const span = btn.querySelector('span');
    const originalText = span.innerText;
    
    // Loading State
    span.innerText = 'Đang gửi...';
    icon.className = 'fa-solid fa-circle-notch fa-spin ml-2';
    
    setTimeout(() => {
        // Success State
        btn.classList.remove('from-cyan-600', 'to-blue-600');
        btn.classList.add('bg-green-600', 'hover:bg-green-500');
        span.innerText = 'Đã gửi thành công!';
        icon.className = 'fa-solid fa-check ml-2';
        
        setTimeout(() => {
            // Reset
            span.innerText = originalText;
            icon.className = 'fa-solid fa-paper-plane ml-2';
            btn.classList.add('from-cyan-600', 'to-blue-600');
            btn.classList.remove('bg-green-600', 'hover:bg-green-500');
            e.target.reset();
        }, 2000);
    }, 1500);
});