// === BACKGROUND PARTICLES ===
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 80;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = 'rgba(0, 217, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

resizeCanvas();
animateParticles();
window.addEventListener('resize', resizeCanvas);


// === TYPING EFFECT ===
const typingEl = document.getElementById('typing');
const typingText = "Junior Web Developer";
let typingIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeEffect() {
  clearTimeout(typingTimeout);

  if (!isDeleting && typingIndex <= typingText.length) {
    typingEl.textContent = typingText.slice(0, typingIndex);
    typingEl.style.width = `${typingIndex}ch`;
    typingIndex++;
    typingTimeout = setTimeout(typeEffect, 100);
  } else if (isDeleting && typingIndex >= 0) {
    typingEl.textContent = typingText.slice(0, typingIndex);
    typingEl.style.width = `${typingIndex}ch`;
    typingIndex--;
    typingTimeout = setTimeout(typeEffect, 60);
  } else if (!isDeleting && typingIndex > typingText.length) {
    isDeleting = true;
    typingTimeout = setTimeout(typeEffect, 1500);
  } else if (isDeleting && typingIndex < 0) {
    isDeleting = false;
    typingTimeout = setTimeout(typeEffect, 500);
  }
}

typeEffect();


// === BURGER MENU TOGGLE ===
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

function toggleMenu() {
  burger.classList.toggle('active');
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
}

burger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
document.querySelectorAll('.nav-links a').forEach(link =>
  link.addEventListener('click', toggleMenu)
);


// === SWIPER INITIALIZATION ===
new Swiper('.mySwiper', {
  loop: true,
  slidesPerView: 5,
  spaceBetween: 20,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: { slidesPerView: 2 },
    768: { slidesPerView: 4 },
    992: { slidesPerView: 5 },
  },
});


// === CUSTOM CURSOR FOLLOW ===
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});


// === NAVBAR SCROLL EFFECT ===
const navbar = document.querySelector('.navbar');
const navLinksAll = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
let isScrolling = false;

window.addEventListener('scroll', () => {
  if (!isScrolling) navbar.classList.add('scrolled');
  isScrolling = true;

  clearTimeout(window.scrollEndTimer);
  window.scrollEndTimer = setTimeout(() => {
    isScrolling = false;
    updateNavbar();
  }, 120);
});

function getCurrentSection() {
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 180 && rect.bottom >= 180) return section;
  }
  return null;
}

function updateNavbar() {
  const current = getCurrentSection();
  if (current && !isScrolling) {
    const rect = current.getBoundingClientRect();
    if (rect.top <= 180 && rect.bottom >= 180) {
      navbar.classList.remove('scrolled');
    }
  }
}

navLinksAll.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    const offsetTop = target.offsetTop - 100;
    navbar.classList.add('scrolled');

    window.scrollTo({ top: offsetTop, behavior: 'smooth' });

    navLinksAll.forEach(l => l.classList.remove('scroll-active'));
    link.classList.add('scroll-active');

    const checkArrival = setInterval(() => {
      const rect = target.getBoundingClientRect();
      if (Math.abs(rect.top - 100) < 50) {
        navbar.classList.remove('scrolled');
        clearInterval(checkArrival);
      }
    }, 60);

    setTimeout(() => link.classList.remove('scroll-active'), 1200);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(updateNavbar, 300);
});


// === ABOUT IMAGE TILT ON MOUSE MOVE ===
const aboutImg = document.querySelector('.about-img img');

if (aboutImg) {
  aboutImg.addEventListener('mousemove', e => {
    const rect = aboutImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 4;
    const centerY = rect.height / 4;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    aboutImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    aboutImg.style.transition = 'none';
  });

  aboutImg.addEventListener('mouseleave', () => {
    aboutImg.style.transform = '';
    aboutImg.style.transition = 'all 0.9s ease';
  });
}


// === LENIS SMOOTH SCROLL ===
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  mouseMultiplier: 1.2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
lenis.on('scroll', () => AOS.refresh());

// Fungsi untuk menutup menu mobile & overlay
function closeMobileMenu() {
  burger.classList.remove('active');
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
}

// Navigasi dari navbar
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    // Tutup menu mobile SEBELUM scroll
    closeMobileMenu();

    // Scroll ke target
    lenis.scrollTo(target, {
      offset: -100,
      duration: 1.4,
      // Callback saat scroll selesai
      onComplete: () => {
        // Pastikan overlay benar-benar hilang
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.classList.remove('active');
        }, 300);
      }
    });
  });
});

// === SKILL BAR ANIMATION ===
const skillBars = document.querySelectorAll('.skill .fill');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const fill = entry.target;
    const width = fill.getAttribute('data-width');
    if (!width) return;

    // Animasi lebar bar
    setTimeout(() => {
      fill.style.width = width;
    }, 100);

    // Tampilkan persentase
    const percentage = fill.closest('.skill').querySelector('.percentage');
    setTimeout(() => {
      percentage.style.opacity = '1';
      percentage.style.transform = 'translateY(0)';
    }, 600);

    skillObserver.unobserve(fill);
  });
}, { threshold: 0.6 });

skillBars.forEach(bar => skillObserver.observe(bar));
