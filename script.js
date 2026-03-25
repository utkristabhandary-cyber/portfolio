

/* =========================
   DARK MODE TOGGLE
========================= */
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

/* Load saved theme */
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

/* =========================
   FADE-IN ON SCROLL
========================= */
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

fadeElements.forEach(el => observer.observe(el));

/* =========================
   SKILL BAR ANIMATION
========================= */
const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute("data-width");
      entry.target.style.width = width;
    }
  });
}, {
  threshold: 0.3
});

skillBars.forEach(bar => skillObserver.observe(bar));

/* =========================
   TYPEWRITER EFFECT
========================= */
const typewriterText = "Student Developer | Data Analyst | UI/UX Designer";
const typewriterEl = document.getElementById("typewriter");

let i = 0;

function typeEffect() {
  if (i < typewriterText.length) {
    typewriterEl.innerHTML = typewriterText.substring(0, i) + "|";
    i++;
    setTimeout(typeEffect, 50);
  } else {
    typewriterEl.innerHTML = typewriterText;
  }
}

typeEffect();

/* =========================
   PARTICLE BACKGROUND
========================= */
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 80; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* Resize canvas */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

/* =========================
   NAVBAR SCROLL EFFECT
========================= */
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
  } else {
    nav.style.boxShadow = "none";
  }
});

/* =========================
   CONTACT FORM UX
========================= */
const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", () => {
    alert("🚀 Message sent successfully!");
  });
}
