document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById("burgerBtn");
  const navLinks = document.getElementById("navLinks");
  const langBtn = document.getElementById("langBtn");
  const themeToggle = document.getElementById("themeToggle");
  let currentLang = "ru";

  // Burger menu toggle
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    burger.textContent = navLinks.classList.contains("show") ? "✕" : "☰";
  });

  // Language switcher
  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "ru" ? "en" : "ru";
    langBtn.textContent = currentLang === "ru" ? "EN" : "RU";
    
    document.querySelectorAll("[data-ru]").forEach(el => {
      if (el.tagName === "SPAN") {
        el.textContent = el.getAttribute(`data-${currentLang}`);
      } else {
        el.innerHTML = el.getAttribute(`data-${currentLang}`);
      }
    });
  });

  // Theme switcher
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        
        // Special handling for skills section
        if (entry.target.id === 'skills') {
          const skillsGrid = entry.target.querySelector('.skills-grid');
          if (skillsGrid) {
            skillsGrid.classList.add('in-view');
          }
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("section").forEach(section => {
    observer.observe(section);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        burger.textContent = "☰";
      }

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Timeline animations
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
    
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 500);
  });

  // Particle background effect
  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 8 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    // Random color based on theme
    const colors = document.body.classList.contains('dark') 
      ? ['rgba(42, 157, 143, 0.3)', 'rgba(32, 61, 44, 0.2)'] 
      : ['rgba(42, 157, 143, 0.2)', 'rgba(32, 61, 44, 0.1)'];
    
    const colorIndex = Math.floor(Math.random() * colors.length);
    particle.style.backgroundColor = colors[colorIndex];
    
    document.querySelector('.animated-background').appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }
  
  // Create initial particles
  for (let i = 0; i < 20; i++) {
    createParticle();
  }
  
  // Create new particles periodically
  setInterval(createParticle, 1000);
});