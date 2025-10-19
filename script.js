document.addEventListener('DOMContentLoaded', () => {
  // ==================== Typing Effect ====================
  const text = "Junior Web Developer";
  const typingEl = document.getElementById("typing");
  let index = 0, forward = true;
  let lastTime = 0;

  function typeEffect(timestamp) {
    if (!typingEl) return;

    if (!lastTime) lastTime = timestamp;
    const delta = timestamp - lastTime;

    if (delta > 120) { // kecepatan mengetik
      if (forward) {
        typingEl.textContent = text.slice(0, index++);
        if (index > text.length) {
          forward = false;
          setTimeout(() => requestAnimationFrame(typeEffect), 1000);
          return;
        }
      } else {
        typingEl.textContent = text.slice(0, index--);
        if (index < 0) {
          forward = true;
          index = 0;
          setTimeout(() => requestAnimationFrame(typeEffect), 500);
          return;
        }
      }
      lastTime = timestamp;
    }

    requestAnimationFrame(typeEffect);
  }
  requestAnimationFrame(typeEffect);

  /// ==================== Burger Navbar ====================
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

if (burger && nav && overlay) {
  const toggleNavbar = () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
    overlay.classList.toggle('active');
  };

  // Klik burger atau overlay
  burger.addEventListener('click', toggleNavbar);
  overlay.addEventListener('click', toggleNavbar);

  // Tambahkan event ke semua link di nav
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Hanya tutup menu jika sedang aktif
      if (nav.classList.contains('active')) {
        toggleNavbar();
      }
    });
  });
}

  // ==================== Swiper ====================
  const swiper = new Swiper('.mySwiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 30,
    autoplay: { delay: 1000, disableOnInteraction: false },
    speed: 800,
    grabCursor: true,
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 10 },
      480: { slidesPerView: 3, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 25 },
      992: { slidesPerView: 5, spaceBetween: 30 },
      1200: { slidesPerView: 6, spaceBetween: 40 }
    }
  });

  window.addEventListener('resize', () => swiper.update());

  // ==================== Navbar Logo Scroll ====================
  const navbar = document.getElementById('navbar');
  const navbarLogo = document.getElementById('navbar-logo');

  if (navbar && navbarLogo) {
    const transparentSrc = navbarLogo.dataset.transparentLogo;
    const scrolledSrc = navbarLogo.dataset.scrolledLogo;

    navbar.classList.add('navbar-transparent');
    navbarLogo.src = transparentSrc;

    const scrollObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('navbar-scrolled');
          navbarLogo.src = scrolledSrc;
        } else {
          navbar.classList.remove('navbar-scrolled');
          navbar.classList.add('navbar-transparent');
          navbarLogo.src = transparentSrc;
        }
      },
      { threshold: 0 }
    );

    const topSentinel = document.createElement('div');
    topSentinel.style.position = 'absolute';
    topSentinel.style.top = '50px';
    document.body.prepend(topSentinel);
    scrollObserver.observe(topSentinel);
  }

  // ==================== Skill Bar Animation ====================
  const skills = document.querySelectorAll(".fill");

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.getAttribute("data-width");
        observer.unobserve(fill); // stop observing setelah animasi
      }
    });
  }, { threshold: 0.3 });

  skills.forEach(skill => skillObserver.observe(skill));

  // ==================== Cursor ====================
  const cursor = document.querySelector(".cursor");

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let delayFactor = 0.10; // smooth delay

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    delayFactor = 0.10; // reset delay saat mouse baru bergerak

    // ==== DETEKSI WARNA LATAR ====
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return;

    const bg = window.getComputedStyle(el).backgroundColor;
    const color = window.getComputedStyle(el).color;

    // Hitung tingkat kecerahan (brightness)
    const brightness = (color) => {
      const rgb = color.match(/\d+/g)?.map(Number);
      return rgb ? (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 : 255;
    };

    const bgBright = brightness(bg);
    const textBright = brightness(color);

    // Ganti warna cursor tergantung area
    if (bgBright > 180) {
      cursor.classList.add("light");
      cursor.classList.remove("dark");
    } else if (textBright < 100) {
      cursor.classList.add("dark");
      cursor.classList.remove("light");
    } else {
      cursor.classList.remove("light", "dark");
    }
  });

  function animate() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const speed = Math.min(Math.max(distance / 100, 0.1), 0.4);

    cursorX += dx * delayFactor;
    cursorY += dy * delayFactor;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animate);
  }

  animate();
});
