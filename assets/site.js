/* ASTI.BAT — interactions légères */
(function () {
  // ─── Reveal on scroll — progressive enhancement ─────────────
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

  // ─── Mobile burger menu ─────────────────────────────────────
  const burger = document.querySelector('.nav__burger');
  if (burger) {
    const setOpen = (open) => {
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', () => {
      setOpen(!document.body.classList.contains('menu-open'));
    });
    // Close on link click (so anchors / nav navigation feels right)
    document.querySelectorAll('.nav__links a').forEach((a) => {
      a.addEventListener('click', () => setOpen(false));
    });
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        setOpen(false);
      }
    });
  }
})();
