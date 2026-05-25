/* ============================================================
   Ofnstube · main.js  ·  Stage 1.5 redesign
   Orchestrator — sticky header, mobile nav, cookie banner +
   settings, footer year, opening-hours highlight.
   (Hero ember canvas removed — hero is now food-first +
   scroll-bound parallax, handled in gsap-init.js.)
   No analytics is loaded in this prototype.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Sticky header ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  if (header) { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); }

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.querySelector('.mobile-nav');
  function setNav(open) {
    if (!toggle || !drawer) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (window.OfnLenis) { open ? window.OfnLenis.stop() : window.OfnLenis.start(); }
  }
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) setNav(false);
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Cookie banner (DSGVO) ---------- */
  var STORE = 'ofn-consent';
  var banner = document.getElementById('cookie-banner');

  function getConsent() { try { return localStorage.getItem(STORE); } catch (e) { return null; } }
  function hideBanner() {
    if (!banner) return;
    banner.classList.remove('is-visible');
    setTimeout(function () { banner.hidden = true; }, 600);
  }
  function setConsent(value) {
    try { localStorage.setItem(STORE, value); } catch (e) {}
    hideBanner();
    /* Statistik-/Analyse-Scripts werden im Prototyp bewusst nicht geladen.
       Stage 2 haengt hier den consent-abhaengigen Loader ein. */
  }
  if (banner && !getConsent()) {
    setTimeout(function () {
      banner.hidden = false;
      requestAnimationFrame(function () { banner.classList.add('is-visible'); });
    }, 900);
  }

  var settingsModal = null;
  function buildSettings() {
    var m = document.createElement('div');
    m.className = 'modal';
    m.id = 'cookie-settings';
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-modal', 'true');
    m.setAttribute('aria-labelledby', 'cs-title');
    m.hidden = true;
    m.innerHTML =
      '<div class="modal__dialog">' +
        '<h3 id="cs-title">Cookie-Einstellungen</h3>' +
        '<p>Waehle, welche Kategorien du zulassen moechtest. Nichts ist vorausgewaehlt.</p>' +
        '<div class="form" style="margin-top:1.5rem">' +
          '<label class="check"><input type="checkbox" checked disabled>' +
            '<span>Technisch notwendig — immer aktiv, damit die Seite funktioniert.</span></label>' +
          '<label class="check"><input type="checkbox" data-cs="analytics">' +
            '<span>Statistik &amp; Analyse — hilft uns, die Seite zu verbessern.</span></label>' +
        '</div>' +
        '<div class="modal__actions">' +
          '<button class="btn btn--primary" type="button" data-cs-save>Auswahl speichern</button>' +
          '<button class="btn btn--ghost" type="button" data-cs-close>Abbrechen</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(m);
    m.addEventListener('click', function (e) {
      if (e.target === m || e.target.closest('[data-cs-close]')) closeSettings();
    });
    m.querySelector('[data-cs-save]').addEventListener('click', function () {
      var on = m.querySelector('[data-cs="analytics"]').checked;
      setConsent(on ? 'all' : 'necessary');
      closeSettings();
    });
    return m;
  }
  function openSettings() {
    if (!settingsModal) settingsModal = buildSettings();
    settingsModal.hidden = false;
    requestAnimationFrame(function () { settingsModal.classList.add('is-open'); });
    if (window.OfnLenis) window.OfnLenis.stop();
  }
  function closeSettings() {
    if (!settingsModal) return;
    settingsModal.classList.remove('is-open');
    if (window.OfnLenis) window.OfnLenis.start();
    setTimeout(function () { settingsModal.hidden = true; }, 320);
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cookie]');
    if (!btn) return;
    var v = btn.getAttribute('data-cookie');
    if (v === 'settings') { openSettings(); return; }
    setConsent(v === 'all' ? 'all' : 'necessary');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && settingsModal && settingsModal.classList.contains('is-open')) closeSettings();
  });

  /* ---------- Opening hours — highlight today ---------- */
  var today = String(new Date().getDay()); // 0 = Sonntag
  document.querySelectorAll('.hours li[data-day]').forEach(function (li) {
    if (li.getAttribute('data-day').split(/\s+/).indexOf(today) > -1) {
      li.classList.add('is-today');
    }
  });
})();
