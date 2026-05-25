/* ============================================================
   Ofnstube · whatsapp.js
   WhatsApp contact — DSGVO 2-click. First click opens a consent
   dialog warning about the Meta data transfer; only an explicit
   confirm opens wa.me. No-JS users follow the plain link.
   FICTIONAL number — to be replaced with the real restaurant
   line before launch (see README open questions).
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMBER = '4915144209930';
  var WA_TEXT = 'Servus Ofnstube, ich habe eine Frage zu eurem Restaurant.';
  var WA_URL = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_TEXT);

  var triggers = document.querySelectorAll('[data-whatsapp]');
  if (!triggers.length) return;

  // Build the consent modal once and append to <body>.
  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'wa-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'wa-modal-title');
  modal.hidden = true;
  modal.innerHTML =
    '<div class="modal__dialog">' +
      '<div class="modal__icon" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 20l1.5-5.5a8.5 8.5 0 1 1 16.5-3z"/></svg>' +
      '</div>' +
      '<h3 id="wa-modal-title">Weiter zu WhatsApp</h3>' +
      '<p>Mit dem Fortfahren öffnest du WhatsApp. Dabei werden Daten an die Meta Platforms Ireland Ltd. übertragen, unter Umständen auch in die USA. Details findest du in unserer Datenschutzerklärung.</p>' +
      '<div class="modal__actions">' +
        '<a class="btn btn--primary" id="wa-go" href="' + WA_URL + '" target="_blank" rel="noopener noreferrer">Per WhatsApp schreiben</a>' +
        '<button class="btn btn--ghost" type="button" data-wa-close>Abbrechen</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);

  var lastFocus = null;

  function open(e) {
    if (e) e.preventDefault();
    lastFocus = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(function () { modal.classList.add('is-open'); });
    var go = modal.querySelector('#wa-go');
    if (go) go.focus();
    if (window.OfnLenis) window.OfnLenis.stop();
  }
  function close() {
    modal.classList.remove('is-open');
    if (window.OfnLenis) window.OfnLenis.start();
    setTimeout(function () { modal.hidden = true; }, 320);
    if (lastFocus) lastFocus.focus();
  }

  triggers.forEach(function (t) { t.addEventListener('click', open); });
  modal.querySelector('[data-wa-close]').addEventListener('click', close);
  modal.querySelector('#wa-go').addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
})();
