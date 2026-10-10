/* Soft liquid hero background: three blurred blobs that drift toward the pointer. */
(() => {
  const hero = document.getElementById("biography");
  if (!hero) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const layer = document.createElement("div");
  layer.className = "liquid-bg";
  layer.setAttribute("aria-hidden", "true");
  const blobs = [
    { size: 460, color: "#b9a4f0", opacity: 0.7, follow: 0.045, ox: 0, oy: 0 },
    { size: 340, color: "#e4b8ea", opacity: 0.6, follow: 0.03, ox: 220, oy: -90 },
    { size: 280, color: "#a9c4f5", opacity: 0.55, follow: 0.02, ox: -240, oy: 130 },
  ].map((b) => {
    const el = document.createElement("div");
    el.className = "liquid-blob";
    Object.assign(el.style, { width: `${b.size}px`, height: `${b.size}px`, background: b.color, opacity: b.opacity });
    layer.appendChild(el);
    return { ...b, el, x: 0, y: 0 };
  });
  hero.prepend(layer);

  let inside = false;
  const target = { x: hero.clientWidth * 0.5, y: hero.clientHeight * 0.4 };
  blobs.forEach((b) => {
    b.x = target.x + b.ox;
    b.y = target.y + b.oy;
  });
  window.addEventListener(
    "pointermove",
    (e) => {
      const r = hero.getBoundingClientRect();
      inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) return;
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
    },
    { passive: true }
  );

  let running = true;
  new IntersectionObserver((es) => (running = es[0].isIntersecting)).observe(hero);

  const frame = (now) => {
    requestAnimationFrame(frame);
    if (!running || document.hidden) return;
    const t = reduced ? 0 : now / 1000;
    if (!inside) {
      // no pointer on the hero: wander across it on a slow loop so the glow is always visible
      target.x = hero.clientWidth * (0.5 + 0.3 * Math.sin(t * 0.17));
      target.y = hero.clientHeight * (0.45 + 0.25 * Math.cos(t * 0.13));
    }
    blobs.forEach((b, i) => {
      if (!reduced) {
        b.x += (target.x + b.ox + Math.sin(t * 0.4 + i * 2) * 40 - b.x) * b.follow;
        b.y += (target.y + b.oy + Math.cos(t * 0.35 + i * 2) * 40 - b.y) * b.follow;
      }
      b.el.style.transform = `translate(${b.x - b.size / 2}px, ${b.y - b.size / 2}px)`;
    });
  };
  requestAnimationFrame(frame);
})();
