const burger = document.getElementById("burgerBtn");
const navLinks = document.getElementById("navLinks");
const langBtn = document.getElementById("langBtn");
const themeToggle = document.getElementById("themeToggle");
let currentLang = "ru";

burger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  burger.textContent = navLinks.classList.contains("show") ? "✕" : "☰";
});

langBtn.addEventListener("click", () => {
  currentLang = currentLang === "ru" ? "en" : "ru";
  langBtn.textContent = currentLang === "ru" ? "EN" : "RU";
  document.querySelectorAll("[data-ru]").forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
