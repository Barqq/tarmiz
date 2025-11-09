// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
  });
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Counter animation
const counters = document.querySelectorAll('.stat-number');
let animated = false;

const animateCounters = () => {
  counters.forEach(counter => {
    if (counter.dataset.text || !counter.dataset.target) return; // Skip text-only stats
    
    const target = parseInt(counter.dataset.target);
    const prefix = counter.dataset.prefix || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = prefix + Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = prefix + target;
      }
    };

    updateCounter();
  });
};

// Intersection Observer for counter animation
const statsSection = document.getElementById('stats');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animated) {
      animated = true;
      animateCounters();
    }
  });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in-element');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100); // Stagger effect
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
  fadeObserver.observe(element);
});
