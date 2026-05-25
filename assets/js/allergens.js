/* ============================================================
   Ofnstube · allergens.js
   LMIV single source of truth — 14 EU allergen codes (Anhang II
   VO 1169/2011) + 9 Zusatzstoff codes. Provides chip-builders
   used by menu-renderer. Chips render as visible DOM (BFSG) —
   never as title= / hover-tooltip.
   ============================================================ */
(function () {
  'use strict';

  // Full legal names (legend / aria)
  var ALLERGENS = {
    A: 'Glutenhaltiges Getreide',
    B: 'Krebstiere',
    C: 'Eier',
    D: 'Fische',
    E: 'Erdnüsse',
    F: 'Sojabohnen',
    G: 'Milch (inkl. Laktose)',
    H: 'Schalenfrüchte',
    L: 'Sellerie',
    M: 'Senf',
    N: 'Sesamsamen',
    O: 'Schwefeldioxid und Sulfite',
    P: 'Lupinen',
    R: 'Weichtiere'
  };

  // Short labels for compact chips
  var ALLERGENS_SHORT = {
    A: 'Gluten', B: 'Krebstiere', C: 'Eier', D: 'Fisch', E: 'Erdnuss',
    F: 'Soja', G: 'Milch', H: 'Schalenfrüchte', L: 'Sellerie', M: 'Senf',
    N: 'Sesam', O: 'Sulfite', P: 'Lupinen', R: 'Weichtiere'
  };

  var ADDITIVES = {
    1: 'mit Farbstoff',
    2: 'mit Konservierungsstoff',
    3: 'mit Antioxidationsmittel',
    4: 'mit Geschmacksverstärker',
    5: 'geschwefelt',
    6: 'geschwärzt',
    7: 'gewachst',
    8: 'phosphathaltig',
    9: 'mit Süßungsmittel'
  };

  var DIET = {
    meat:       { label: 'Rind',       cls: 'diet-tag--meat' },
    poultry:    { label: 'Geflügel',   cls: 'diet-tag--meat' },
    vegetarian: { label: 'Vegetarisch', cls: 'diet-tag--veggie' },
    vegan:      { label: 'Vegan',      cls: 'diet-tag--vegan' }
  };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // Visible allergen chip: code + short label
  function allergenChip(code) {
    var label = ALLERGENS_SHORT[code] || code;
    return '<span class="chip"><span class="chip__code">' + esc(code) +
           '</span> ' + esc(label) + '</span>';
  }

  // Visible additive chip: number + label
  function additiveChip(num) {
    var label = ADDITIVES[num] || ('Zusatzstoff ' + num);
    return '<span class="chip chip--additive"><span class="chip__code">' +
           esc(num) + '</span> ' + esc(label) + '</span>';
  }

  function dietTag(diet) {
    var d = DIET[diet];
    if (!d) return '';
    return '<span class="diet-tag ' + d.cls + '">' + esc(d.label) + '</span>';
  }

  window.OfnAllergens = {
    ALLERGENS: ALLERGENS,
    ALLERGENS_SHORT: ALLERGENS_SHORT,
    ADDITIVES: ADDITIVES,
    DIET: DIET,
    allergenChip: allergenChip,
    additiveChip: additiveChip,
    dietTag: dietTag,
    esc: esc
  };
})();
