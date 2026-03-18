// script.js - The magic happens here!
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 200
      });
    }
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(p => {
      p.x += p.vx + (this.mouse.x - this.canvas.width/2) * 0.0001;
      p.y += p.vy + (this.mouse.y - this.canvas.height/2) * 0.0001;
      
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(Date.now() * 0.001);
      
      const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius * 2);
      gradient.addColorStop(0, `hsla(${p.hue}, 70%, 60%, ${p.alpha})`);
      gradient.addColorStop(1, 'transparent');
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
      this.ctx.restore();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize everything
const particles = new ParticleSystem();

// Custom cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  particles.mouse = { x: e.clientX, y: e.clientY };
});

function animateCursor() {
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  
  follower.style.left = (mouseX - 20) + 'px';
  follower.style.top = (mouseY - 20) + 'px';
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Typewriter effect
function typeWriter() {
  const text = "Student Developer";
  const typewriter = document.getElementById('typewriter');
  let i = 0;
  
  function type() {
    if (i < text.length) {
      typewriter.innerHTML = text.slice(0, i + 1).replace(' ', '<span> </span>');
      i++;
      setTimeout(type, 100);
    }
  }
  type();
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate skill bars
      if (entry.target.querySelector('.skill-progress')) {
        const bars = entry.target.querySelectorAll('.skill-progress');
        bars.forEach(bar => {
          const width = bar.dataset.width;
          setTimeout(() => bar.style.width = width, 500);
        });
      }
      
      // Animate counters
      if (entry.target.querySelector('#projects-count')) {
        animateCounter('#projects-count', 6);
        animateCounter('#skills-count', 9);
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Counter animation
function animateCounter(selector, target) {
  let count = 0;
  const element = document.querySelector(selector);
  const timer = setInterval(() => {
    count++;
    element.textContent = count + '+';
    if (count >= target) clearInterval(timer);
  }, 50);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(0,0,0,0.8)';
  } else {
    navbar.style.background = 'rgba(0,0,0,0.3)';
  }
});

// Form submission
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('🚀 Thanks! I\'ll get back to you within 24 hours!');
});

// Initialize
window.addEventListener('load', () => {
  setTimeout(typeWriter, 500);
  document.body.style.opacity = '1';
});

window.addEventListener('resize', () => particles.resize());
