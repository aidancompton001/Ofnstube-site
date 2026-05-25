/* ============================================================
   Ofnstube · lenis-init.js
   Smooth scroll (Lenis) — restrained, restaurant-calm.
   Disabled on prefers-reduced-motion. Synced with GSAP ticker.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.OfnLenis = null;

  if (reduce || typeof window.Lenis !== 'function') {
    return; // native scroll — fully accessible fallback
  }

  var lenis = new Lenis({
    duration: 1.05,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.6
  });
  window.OfnLenis = lenis;

  // Sync with GSAP ticker when available, else self-drive RAF
  if (window.gsap && window.ScrollTrigger) {
    lenis.on('scroll', window.ScrollTrigger.update);
    window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    window.gsap.ticker.lagSmoothing(0);
  } else {
    var raf = function (time) { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  // In-page anchor links -> eased scroll with header offset
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute('href');
    if (!hash || hash.length < 2) return;
    var target = document.getElementById(hash.slice(1));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -90, duration: 1.1 });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
})();
