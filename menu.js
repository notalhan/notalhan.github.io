/* ============================================
   ANKA LOUNGE — MENU PAGE SCRIPT
   ============================================ */

(() => {
  'use strict';

  const cats = document.querySelectorAll('.menu-cat');
  const sections = document.querySelectorAll('.menu-section[id]');
  const catsInner = document.querySelector('.menu-cats-inner');

  /* ---------- Scrollspy via IntersectionObserver ---------- */
  const setActive = (id) => {
    cats.forEach((cat) => {
      const isActive = cat.getAttribute('href') === `#${id}`;
      cat.classList.toggle('active', isActive);
      if (isActive && catsInner) {
        // Center the active pill horizontally in the scroll container
        const offset =
          cat.offsetLeft - catsInner.clientWidth / 2 + cat.clientWidth / 2;
        catsInner.scrollTo({ left: offset, behavior: 'smooth' });
      }
    });
  };

  const spy = new IntersectionObserver(
    (entries) => {
      // Pick the entry closest to the top of the viewport
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    },
    {
      // Trigger when section crosses the area just under the sticky nav
      rootMargin: '-160px 0px -55% 0px',
      threshold: 0,
    }
  );

  sections.forEach((s) => spy.observe(s));

  /* ---------- Click → smooth scroll (with sticky offset) ---------- */
  cats.forEach((cat) => {
    cat.addEventListener('click', (e) => {
      const id = cat.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      setActive(id);
      const top =
        target.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    });
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Deep link on load ---------- */
  if (location.hash) {
    const id = location.hash.slice(1);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) {
        const top =
          target.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top, behavior: 'auto' });
        setActive(id);
      }
    });
  }
})();
