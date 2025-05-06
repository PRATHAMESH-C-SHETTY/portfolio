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
document.querySelectorAll('section, .project-card').forEach(el => {
  observer.observe(el);
});

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

