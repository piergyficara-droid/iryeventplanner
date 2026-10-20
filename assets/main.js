(() => {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const links = [...document.querySelectorAll(".nav-link")];

  const setMenuOpen = (open) => {
    if (!toggle || !menu) return;
    menu.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", String(open));
    const spanish = document.documentElement.lang === "es";
    toggle.setAttribute("aria-label", open ? (spanish ? "Cerrar el menú" : "Chiudi il menu") : (spanish ? "Abrir el menú" : "Apri il menu"));
  };

  toggle?.addEventListener("click", () => {
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  links.forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  const updateNavbar = () => navbar?.classList.toggle("scrolled", window.scrollY > 50);
  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const selector = anchor.getAttribute("href");
      const target = selector && document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      if (selector !== "#home") history.replaceState(null, "", selector);
    });
  });

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll(".service-card, .corner-card, .portfolio-item, .journey-step, .about-content").forEach((item) => observer.observe(item));
  }
})();