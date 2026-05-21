/* ASTI.BAT — interactions légères */
(function () {
  // Reveal on scroll — progressive enhancement
  // 1. Hide elements via JS (so CSS default remains visible if JS fails)
  // 2. IntersectionObserver reveals on scroll
  // 3. Safety timeout reveals everything after 2.5s no matter what
  const els = document.querySelectorAll('.reveal');

  if (els.length) {
    const reveal = (el) => {
      el.classList.remove('is-pre');
      el.classList.add('in');
    };
    const revealAll = () => els.forEach(reveal);

    if ('IntersectionObserver' in window) {
      els.forEach((el) => el.classList.add('is-pre'));

      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

      els.forEach((el) => obs.observe(el));

      // Safety: if observer hasn't fired for whatever reason, reveal after 2.5s
      setTimeout(revealAll, 2500);
    } else {
      revealAll();
    }
  }

  // Contact form: chip select (multi)
  document.querySelectorAll('[data-chip-group]').forEach((g) => {
    g.querySelectorAll('.chip').forEach((c) => {
      c.addEventListener('click', () => c.classList.toggle('active'));
    });
  });

  // Contact form: fake submit (demo)
  const f = document.getElementById('quote-form');
  if (f) {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = f.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = 'Envoi en cours…';
      setTimeout(() => {
        btn.innerHTML = '✓ Demande envoyée — nous vous rappelons sous 24h';
        btn.style.background = '#22C55E';
      }, 900);
    });
  }
})();
