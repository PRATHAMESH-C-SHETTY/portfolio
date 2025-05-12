// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize particles.js
  if (typeof particlesJS !== 'undefined') {
    initParticles();
  }

  // Initialize theme toggle
  initThemeToggle();

  // Initialize smooth scrolling
  initSmoothScroll();

  // Initialize mobile navigation
  initMobileNav();

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize project filters
  initProjectFilters();

  // Initialize testimonial slider
  initTestimonialSlider();

  // Initialize skill bars animation
  initSkillBars();

  // Initialize counter animation
  initCounters();

  // Initialize form submission
  initContactForm();
});

// Theme Toggle Functionality
function initThemeToggle() {
  const themeSwitch = document.getElementById('theme-switch');
  
  // Check for saved theme preference or prefer-color-scheme
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeSwitch.checked = true;
  } else if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitch.checked = false;
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitch.checked = false;
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitch.checked = false;
  }
  
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// Smooth Scrolling for Navigation Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Adjust scroll position to account for fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active nav link
        updateActiveNavLink(this.getAttribute('href'));
      }
    });
  });
}

// Mobile Navigation
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navContent = document.querySelector('.nav-content');
  
  if (hamburger && navContent) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navContent.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
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
  }
  
  // Handle active state for bottom navigation
  const navItems = document.querySelectorAll('.nav-item');
  
  window.addEventListener('scroll', function() {
    updateActiveNavOnScroll();
  });
}

// Update active navigation link
function updateActiveNavLink(href) {
  document.querySelectorAll('.nav-link, .nav-item').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === href) {
      link.classList.add('active');
    }
  });
}

// Update active navigation based on scroll position
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link, .nav-item');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const headerHeight = document.querySelector('header').offsetHeight;
    
    if (window.scrollY >= (sectionTop - headerHeight - 100)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.project-card, .tech-card, .skill-bar, .timeline-item, .testimonial-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Animate skill bars when they come into view
        if (entry.target.classList.contains('skill-bar')) {
          const skillFill = entry.target.querySelector('.skill-fill');
          const skillPercent = entry.target.querySelector('.skill-info span:last-child').textContent;
          skillFill.style.width = skillPercent;
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Project Filters
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else {
            const categories = card.getAttribute('data-category').split(' ');
            if (categories.includes(filter)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }
}

// Testimonial Slider
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  if (track && slides.length && dots.length) {
    let currentIndex = 0;
    
    // Set initial position
    updateSlider();
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
      updateSlider();
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      updateSlider();
    });
    
    // Dot clicks
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });
    });
    
    // Auto slide
    let interval = setInterval(() => {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      updateSlider();
    }, 5000);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    track.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
      }, 5000);
    });
    
    // Update slider position and active dot
    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  }
}

// Skill Bars Animation
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillFill = entry.target.querySelector('.skill-fill');
        const skillPercent = entry.target.querySelector('.skill-info span:last-child').textContent;
        
        setTimeout(() => {
          skillFill.style.width = skillPercent;
        }, 200);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

// Counter Animation
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5
  });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Contact Form Submission
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For now, we'll just log it and show a success message
      console.log('Form submitted:', { name, email, subject, message });
      
      // Show success message (you could create a more sophisticated notification)
      alert('Message sent successfully! I will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }
}

// Initialize Particles.js
let particlesJS; // Declare particlesJS

function initParticles() {
  particlesJS = window.particlesJS; // Assign window.particlesJS to the declared variable

  if (typeof particlesJS === 'function') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ["#ffffff", "#0099ff", "#00ccff"]
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#0099ff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  } else {
    console.warn('particlesJS not properly loaded. Make sure the particles.js library is included.');
  }
}
