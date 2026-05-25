/* ============================================================
   Ofnstube · menu-renderer.js
   Renders data/menu.json + data/drinks.json into the menu page.
   LMIV-CONTRACT-MARKER — every dish gets a VISIBLE allergen
   chip-row in the DOM (never a tooltip). JUSCHG-MARKER — every
   alcoholic drink gets a visible age badge.
   ============================================================ */
(function () {
  'use strict';

  var foodRoot = document.querySelector('[data-menu-root]');
  if (!foodRoot) return;

  var drinkRoot = document.querySelector('[data-drinks-root]');
  var filterRoot = document.querySelector('[data-menu-filter]');
  var loadingEl = document.querySelector('[data-menu-loading]');
  var errorEl = document.querySelector('[data-menu-error]');
  var A = window.OfnAllergens;

  function price(n) { return Number(n).toFixed(2).replace('.', ',') + ' €'; }
  function esc(s) { return A ? A.esc(s) : String(s); }

  /* — Dish card (food) — */
  function dishCard(item) {
    var codes = item['data-allergens'] || [];
    var chips = codes.map(function (c) { return A.allergenChip(c); }).join('');
    if (!chips) chips = '<span class="chip">ohne Hauptallergene</span>';
    var additives = (item['data-additives'] || []).map(function (n) { return A.additiveChip(n); }).join('');
    var diet = (item.diet || []).map(function (d) { return A.dietTag(d); }).join('');
    var ariaList = codes.map(function (c) { return A.ALLERGENS_SHORT[c] || c; }).join(', ');

    return '<article class="dish glut-hover" data-category="' + esc(item.category) + '">' +
      '<div class="dish__media media">' +
        '<img src="' + esc(item.image) + '" alt="' + esc(item.name) +
          ' — Gericht aus dem Ofnstube-Menü" width="320" height="420" loading="lazy" ' +
          'onerror="this.onerror=null;this.src=&quot;' + esc(item.image).replace('.jpg', '.svg') + '&quot;">' +
        '<span class="media__tag">Bildplatzhalter</span>' +
      '</div>' +
      '<div class="dish__body">' +
        '<div class="dish__head">' +
          '<h3 class="dish__name">' + esc(item.name) + '</h3>' +
          '<span class="dish__price">' + price(item.price_eur) + '</span>' +
        '</div>' +
        '<div class="chip-row dish__allergens" aria-label="Allergene: ' +
          esc(ariaList || 'keine Hauptallergene') + '">' + chips + '</div>' +
        '<p class="dish__desc">' + esc(item.description) + '</p>' +
        '<div class="dish__meta">' + diet + additives + '</div>' +
      '</div>' +
    '</article>';
  }

  /* — Drink row — */
  function drinkRow(item) {
    var ageVal = item['data-age-restriction'];
    var age = ageVal
      ? '<span class="age-badge" aria-label="Ausschank ab ' + ageVal + ' Jahren">≥ ' + ageVal + '</span>'
      : '';
    var sub = [];
    if (item.alcohol_vol) sub.push(item.alcohol_vol);
    (item['data-allergens'] || []).forEach(function (c) { sub.push(A.ALLERGENS_SHORT[c] || c); });
    (item['data-additives'] || []).forEach(function (n) { sub.push(A.ADDITIVES[n] || ('Zusatzstoff ' + n)); });
    var subHTML = sub.length ? '<span class="drink__sub">' + esc(sub.join(' · ')) + '</span>' : '';

    return '<li class="drink">' +
      '<div class="drink__main"><span class="drink__name">' + esc(item.name) + '</span>' + age + '</div>' +
      '<div class="drink__meta">' +
        (item.size ? '<span class="drink__size">' + esc(item.size) + '</span>' : '') +
        '<span class="drink__price">' + price(item.price_eur) + '</span>' +
      '</div>' + subHTML +
    '</li>';
  }

  function renderFood(data) {
    var html = '';
    data.categories.forEach(function (cat) {
      var items = data.items.filter(function (i) { return i.category === cat.id; });
      if (!items.length) return;
      html += '<section class="menu-group" data-group="' + esc(cat.id) + '">' +
        '<div class="menu-group__head"><h2>' + esc(cat.label) + '</h2>' +
        '<span class="menu-group__rule"></span>' +
        '<span class="menu-group__count">' + items.length + ' Gerichte</span></div>' +
        '<div class="menu-grid">' + items.map(dishCard).join('') + '</div></section>';
    });
    foodRoot.innerHTML = html;
  }

  function renderDrinks(data) {
    if (!drinkRoot) return;
    var cards = '';
    data.categories.forEach(function (cat) {
      var items = data.items.filter(function (i) { return i.category === cat.id; });
      if (!items.length) return;
      cards += '<div class="drink-card"><h3>' + esc(cat.label) + '</h3>' +
        '<ul class="drink-list">' + items.map(drinkRow).join('') + '</ul></div>';
    });
    drinkRoot.innerHTML =
      '<section class="menu-group" data-group="getraenke">' +
      '<div class="menu-group__head"><h2>Getränke</h2><span class="menu-group__rule"></span></div>' +
      '<div class="grid grid--2">' + cards + '</div></section>';
  }

  function buildFilter(foodCats) {
    if (!filterRoot) return;
    var cats = [{ id: 'all', label: 'Alles' }]
      .concat(foodCats.map(function (c) { return { id: c.id, label: c.label }; }));
    cats.push({ id: 'getraenke', label: 'Getränke' });

    filterRoot.innerHTML = cats.map(function (c, i) {
      return '<button class="filter-btn" type="button" data-filter="' + esc(c.id) +
        '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' + esc(c.label) + '</button>';
    }).join('');

    filterRoot.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      var f = btn.getAttribute('data-filter');
      filterRoot.querySelectorAll('[data-filter]').forEach(function (x) {
        x.setAttribute('aria-pressed', x === btn ? 'true' : 'false');
      });
      document.querySelectorAll('.menu-group').forEach(function (g) {
        g.hidden = !(f === 'all' || g.getAttribute('data-group') === f);
      });
      if (typeof window.OfnRefreshScroll === 'function') window.OfnRefreshScroll();
    });
  }

  function revealCards() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !window.gsap) return;
    window.gsap.from('.dish, .drink-card', {
      opacity: 0, y: 22, duration: 0.6, ease: 'power2.out', stagger: 0.04
    });
  }

  function fail() {
    if (loadingEl) loadingEl.hidden = true;
    if (errorEl) errorEl.hidden = false;
  }

  if (!A) { fail(); return; }

  Promise.all([
    fetch('../data/menu.json').then(function (r) { if (!r.ok) throw new Error('menu'); return r.json(); }),
    fetch('../data/drinks.json').then(function (r) { if (!r.ok) throw new Error('drinks'); return r.json(); })
  ]).then(function (res) {
    renderFood(res[0]);
    renderDrinks(res[1]);
    buildFilter(res[0].categories);
    if (loadingEl) loadingEl.hidden = true;
    revealCards();
    if (typeof window.OfnRefreshScroll === 'function') window.OfnRefreshScroll();
  }).catch(function (err) {
    if (window.console) console.error('Ofnstube menu load failed:', err);
    fail();
  });
})();
