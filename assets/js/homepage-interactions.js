document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("biography");
  if (!hero) return;
  const links = [...document.querySelectorAll(".home-section-link")];
  const sections = links.map((link) => document.getElementById(link.dataset.section)).filter(Boolean);
  const updateNavigation = () => {
    document.getElementById("navbar")?.classList.toggle("navbar-scrolled", window.scrollY > 24);
    const current = sections.filter((section) => section.getBoundingClientRect().top <= 160).at(-1) || hero;
    links.forEach((link) => {
      const active = link.dataset.section === current.id;
      link.parentElement.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  let scheduled = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        updateNavigation();
        scheduled = false;
      });
    },
    { passive: true }
  );
  updateNavigation();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("reveal-pending");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
  );
  document.querySelectorAll(".home-section-card").forEach((card) => {
    card.classList.add("scroll-reveal");
    if (card.getBoundingClientRect().top >= window.innerHeight) {
      card.classList.add("reveal-pending");
      observer.observe(card);
    }
    card.querySelectorAll(".research-entry, .skill-group, .award-card, .publications li, .academic-activity-list > li").forEach((row, index) => {
      if (row.getBoundingClientRect().top < window.innerHeight) return;
      row.classList.add("scroll-reveal", "reveal-pending");
      row.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
      observer.observe(row);
    });
  });
});
