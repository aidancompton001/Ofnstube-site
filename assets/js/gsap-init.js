/* ============================================================
   Ofnstube · gsap-init.js
   Scroll-reveal (L1, restrained), hero intro, hero parallax,
   logo-mark Glut pulse. Honours prefers-reduced-motion and a
   no-GSAP fallback (everything stays visible).
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = !!(window.gsap && window.ScrollTrigger);

  // Fallback: no animation -> reveal everything immediately
  if (reduce || !hasGSAP) {
    root.classList.add('reveal-fallback');
    return;
  }

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  /* — Scroll reveal (batched -> natural stagger) — */
  var revealEls = gsap.utils.toArray('[data-reveal]');
  if (revealEls.length) {
    gsap.set(revealEls, { opacity: 0, y: 30 });
    window.ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.09,
          overwrite: true,
          onComplete: function () {
            batch.forEach(function (el) { el.style.willChange = 'auto'; });
          }
        });
      }
    });
  }

  /* — Hero intro timeline (on load) — */
  var heroIn = gsap.utils.toArray('[data-hero-in]');
  if (heroIn.length) {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from(heroIn, {
        opacity: 0, y: 36, duration: 1.0, stagger: 0.12, delay: 0.15
      });
  }

  /* — Hero parallax (scroll-bound, scrub) — */
  var hero = document.querySelector('.hero');
  if (hero) {
    var heroMedia = hero.querySelector('[data-hero-parallax]');
    if (heroMedia) {
      gsap.to(heroMedia, {
        yPercent: 11, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      });
    }
    var heroRing = hero.querySelector('[data-hero-ring]');
    if (heroRing) {
      gsap.to(heroRing, {
        yPercent: 28, rotate: 22, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      });
    }
  }

  /* — Logo-mark Glut pulse on load — */
  var logoMark = document.querySelector('.logo-mark');
  if (logoMark) {
    logoMark.classList.add('is-glowing');
    setTimeout(function () { logoMark.classList.remove('is-glowing'); }, 3200);
  }

  /* — Re-measure once fonts / images settle — */
  window.addEventListener('load', function () { window.ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { window.ScrollTrigger.refresh(); });
  }

  // Exposed so menu-renderer can refresh triggers after async render
  window.OfnRefreshScroll = function () { window.ScrollTrigger.refresh(); };
})();
