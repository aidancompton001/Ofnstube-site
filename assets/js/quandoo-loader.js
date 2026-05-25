/* ============================================================
   Ofnstube · quandoo-loader.js
   DSGVO 2-click consent for third-party embeds (Quandoo widget,
   Google Maps). Nothing third-party loads before an explicit
   user click — no cookies, no requests until then.
   ============================================================ */
(function () {
  'use strict';

  var embeds = document.querySelectorAll('.embed');
  if (!embeds.length) return;

  embeds.forEach(function (embed) {
    var btn = embed.querySelector('[data-embed-load]');
    if (!btn) return;

    btn.addEventListener('click', function () {
      embed.classList.add('is-loaded');

      // If a real iframe with data-src is present, load it now.
      var iframe = embed.querySelector('iframe[data-src]');
      if (iframe) {
        iframe.src = iframe.getAttribute('data-src');
      }

      // Move focus into the now-loaded region for keyboard users.
      var frame = embed.querySelector('.embed__frame');
      if (frame) {
        frame.setAttribute('tabindex', '-1');
        frame.focus({ preventScroll: true });
      }

      if (typeof window.OfnRefreshScroll === 'function') {
        window.OfnRefreshScroll();
      }
    });
  });
})();
