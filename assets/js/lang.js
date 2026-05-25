/* ============================================================
   Ofnstube · lang.js
   DE (primary) / EN (secondary) switch. German is the authored
   default; elements carrying data-en hold the English string.
   Persists choice in localStorage. Stage 1 covers UI strings —
   full body-copy translation is a Stage 2 content task.
   ============================================================ */
(function () {
  'use strict';

  var STORE = 'ofn-lang';
  var html = document.documentElement;

  function apply(lang) {
    var en = lang === 'en';

    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (el._de === undefined) el._de = el.textContent;
      el.textContent = en ? el.getAttribute('data-en') : el._de;
    });
    // elements with inner markup (e.g. <em>) — swap innerHTML
    document.querySelectorAll('[data-en-html]').forEach(function (el) {
      if (el._deHtml === undefined) el._deHtml = el.innerHTML;
      el.innerHTML = en ? el.getAttribute('data-en-html') : el._deHtml;
    });
    document.querySelectorAll('[data-en-ph]').forEach(function (el) {
      if (el._dePh === undefined) el._dePh = el.getAttribute('placeholder') || '';
      el.setAttribute('placeholder', en ? el.getAttribute('data-en-ph') : el._dePh);
    });
    document.querySelectorAll('[data-en-label]').forEach(function (el) {
      if (el._deLabel === undefined) el._deLabel = el.getAttribute('aria-label') || '';
      el.setAttribute('aria-label', en ? el.getAttribute('data-en-label') : el._deLabel);
    });

    html.setAttribute('lang', en ? 'en' : 'de');

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang-btn') === lang ? 'true' : 'false');
    });
  }

  function set(lang) {
    try { localStorage.setItem(STORE, lang); } catch (e) {}
    apply(lang);
  }

  var saved = 'de';
  try { saved = localStorage.getItem(STORE) || 'de'; } catch (e) {}
  apply(saved);

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-lang-btn]');
    if (!btn) return;
    set(btn.getAttribute('data-lang-btn'));
  });
})();
