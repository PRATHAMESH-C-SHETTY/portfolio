// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navContent = document.querySelector('.nav-content');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navContent.classList.toggle('active');
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-content a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navContent.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navContent.contains(e.target)) {
    hamburger.classList.remove('active');
    navContent.classList.remove('active');
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and project cards
//document.querySelectorAll('section, .project-card').forEach(el => {
//  observer.observe(el);
//});

// Handle active state for bottom navigation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

function setActiveNavItem() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').slice(1) === current) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNavItem);
window.addEventListener('load', setActiveNavItem);

// Interactive parallax effect for waves background
const wavesBg = document.querySelector('.waves-bg');
if (wavesBg) {
  const wave1 = wavesBg.querySelector('.wave1');
  const wave2 = wavesBg.querySelector('.wave2');
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    if (wave1) wave1.style.transform = `translateX(${-x * 40}px)`;
    if (wave2) wave2.style.transform = `translateX(${-x * 80}px)`;
  });
  wavesBg.addEventListener('mouseleave', () => {
    if (wave1) wave1.style.transform = '';
    if (wave2) wave2.style.transform = '';
  });
}

// Dark/Light mode toggle functionality
const themeToggle = document.getElementById('themeToggle');
const toggleThumb = themeToggle ? themeToggle.querySelector('.toggle-thumb') : null;
const toggleIcon = toggleThumb ? toggleThumb.querySelector('i') : null;

function setTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.classList.add('light');
    if (toggleIcon) {
      toggleIcon.classList.remove('fa-moon');
      toggleIcon.classList.add('fa-sun');
    }
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-mode');
    themeToggle.classList.remove('light');
    if (toggleIcon) {
      toggleIcon.classList.remove('fa-sun');
      toggleIcon.classList.add('fa-moon');
    }
    localStorage.setItem('theme', 'dark');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    themeToggle.classList.toggle('light', isLight);
    if (toggleIcon) {
      toggleIcon.classList.toggle('fa-sun', isLight);
      toggleIcon.classList.toggle('fa-moon', !isLight);
    }
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
  // On load, set theme from localStorage
  const saved = localStorage.getItem('theme');
  if (saved === 'light') setTheme('light');
  else setTheme('dark');
}

// Animated letter-by-letter effect for Welcome to My Portfolio
window.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('animated-title');
  if (title) {
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    function typeLetter() {
      if (i < text.length) {
        title.textContent += text[i];
        i++;
        setTimeout(typeLetter, 60);
      } else {
        title.textContent = text; // Ensure full text at end
      }
    }
    typeLetter();
  }
}); 

