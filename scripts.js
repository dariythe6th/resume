document.addEventListener('DOMContentLoaded', function() {
  // Бургер-меню
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  
  burgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burgerBtn.setAttribute('aria-expanded', 
      burgerBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
  });

  // Переключение темы
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Проверяем сохранённую тему или системные настройки
  const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  }
  
  themeToggle.addEventListener('click', () => {
    let theme = 'light';
    if (document.documentElement.getAttribute('data-theme') !== 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      theme = 'dark';
      themeToggle.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
  });

  // Переключение языка
  const langBtn = document.getElementById('langBtn');
  let currentLang = 'ru';
  
  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    langBtn.textContent = currentLang === 'ru' ? 'EN' : 'RU';
    
    // Обновляем все тексты с атрибутами data-ru и data-en
    document.querySelectorAll('[data-ru], [data-en]').forEach(element => {
      if (element.tagName === 'SPAN' || element.tagName === 'A') {
        element.textContent = element.getAttribute(`data-${currentLang}`);
      } else if (element.tagName === 'P') {
        element.innerHTML = element.getAttribute(`data-${currentLang}`);
      }
    });
  });

  // Плавное появление элементов при скролле
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });

  // Закрытие меню при клике на ссылку
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Анимация печатания текста в hero-секции
  const heroText = document.querySelector('.hero-content p');
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    // Запускаем анимацию после небольшой задержки
    setTimeout(typeWriter, 500);
  }
});
