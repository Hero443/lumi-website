/* ═══════════════════════════════════════════════════════
   LuminosCity Experience — script.js
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ── Countdown Timer ──────────────────────────────────── */
const LAUNCH_DATE = new Date('2026-03-27T19:00:00');

function pad(n) {
  return String(n).padStart(2, '0');
}

function setDigit(id, val) {
  const el = document.getElementById('cd-' + id);
  if (!el) return;
  if (el.textContent !== val) {
    el.classList.add('flip');
    setTimeout(() => {
      el.textContent = val;
      el.classList.remove('flip');
    }, 125);
  }
}

function updateCountdown() {
  const diff = LAUNCH_DATE - Date.now();

  if (diff <= 0) {
    const wrap = document.getElementById('countdown-wrap');
    if (wrap) {
      wrap.innerHTML = '<div class="live-banner">SERVER IST LIVE!</div>';
    }
    return;
  }

  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000)  / 60000);
  const seconds = Math.floor((diff % 60000)    / 1000);

  setDigit('days',    pad(days));
  setDigit('hours',   pad(hours));
  setDigit('minutes', pad(minutes));
  setDigit('seconds', pad(seconds));
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

/* ── Navbar Scroll ────────────────────────────────────── */
const navbar = document.getElementById('navbar');

function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', onScroll, { passive: true });

/* ── Mobile Menu ──────────────────────────────────────── */
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Server-Einblicke Slideshow ───────────────────────── */
const showcase = document.querySelector('.showcase');

if (showcase) {
  const slides = Array.from(showcase.querySelectorAll('.showcase-slide'));
  const dots = Array.from(showcase.querySelectorAll('.showcase-dot'));
  const prevBtn = showcase.querySelector('[data-showcase-prev]');
  const nextBtn = showcase.querySelector('[data-showcase-next]');
  let activeSlide = 0;
  let autoplayId = null;

  function setSlide(index) {
    if (!slides.length) return;
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === activeSlide);
    });

    dots.forEach((dot, i) => {
      const active = i === activeSlide;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function nextSlide() {
    setSlide(activeSlide + 1);
  }

  function prevSlide() {
    setSlide(activeSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(nextSlide, 6500);
  }

  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
  }

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startAutoplay();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      setSlide(i);
      startAutoplay();
    });
  });

  showcase.addEventListener('mouseenter', stopAutoplay);
  showcase.addEventListener('mouseleave', startAutoplay);
  showcase.addEventListener('focusin', stopAutoplay);
  showcase.addEventListener('focusout', startAutoplay);
  showcase.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') prevSlide();
    if (event.key === 'ArrowRight') nextSlide();
  });

  setSlide(0);
  startAutoplay();
}

/* ── Scroll Animations ────────────────────────────────── */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.08, rootMargin: '-40px 0px' });

// Stagger grid children
const staggerParentSelectors = [
  '.features-grid',
  '.rules-grid',
  '.team-grid',
  '.steps-grid',
  '.stats-grid',
];

document.querySelectorAll('.anim').forEach(el => {
  // Check if this element is a direct child of a grid container
  const parent = el.parentElement;
  if (parent) {
    const isGridChild = staggerParentSelectors.some(sel => parent.matches(sel));
    if (isGridChild) {
      const siblings = Array.from(parent.querySelectorAll(':scope > .anim'));
      const idx = siblings.indexOf(el);
      if (idx > 0) {
        el.style.transitionDelay = (idx * 0.1) + 's';
      }
    }
  }
  animObserver.observe(el);
});

// Hero elements animate immediately on load (already in viewport)
document.querySelectorAll('#hero .anim').forEach((el, i) => {
  el.style.transitionDelay = (0.15 + i * 0.12) + 's';
  // Trigger via small timeout so transition plays
  setTimeout(() => el.classList.add('visible'), 50);
});

/* ── Smooth Scroll ────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
