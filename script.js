// -------------------------
// CURSOR GLOW
// -------------------------
const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

// -------------------------
// MAGNETIC BUTTON EFFECT
// -------------------------
const magneticButtons = document.querySelectorAll(".magnetic-btn");

magneticButtons.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = `translate(0, 0) scale(1)`;
  });
});

// -------------------------
// SIMPLE FADE-IN ANIMATIONS
// -------------------------
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

fadeElements.forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(40px)";
  el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
  observer.observe(el);
});

// -------------------------
// EMAILJS CONTACT FORM INTEGRATION
// -------------------------
(function(){
    emailjs.init("D18KwVASsg6oJxH9m"); // Your EmailJS Public Key
})();

const form = document.getElementById('contact-form');

// create form status element if it doesn't exist
let formStatus = document.querySelector('.form-status');
if(!formStatus) {
    formStatus = document.createElement('p');
    formStatus.classList.add('form-status');
    form.appendChild(formStatus);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    formStatus.style.display = "block";
    formStatus.classList.remove('success', 'error');
    formStatus.textContent = "Sending message...";

    // Use EmailJS sendForm with your service and template IDs
    emailjs.sendForm('service_0iauh6o', 'template_vpmfun8', this)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            formStatus.classList.add('success');
            formStatus.textContent = "Message sent! You will receive an auto-reply.";
            form.reset();
        }, (err) => {
            console.error('FAILED...', err);
            formStatus.classList.add('error');
            formStatus.textContent = "Oops! Something went wrong. Try again.";
        });
});
