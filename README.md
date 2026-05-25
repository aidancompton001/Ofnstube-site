# Ofnstube — Munich Craft-Burger · R&D-Prototyp (Stage 1)

Vanilla-HTML/CSS/JS-Prototyp der Website von **Ofnstube** — einem fiktiven Craft-Burger-Restaurant
in München. Stage-1-R&D-Skelett: Aus diesem Prototyp extrahiert Claude Code in Stage 2 die
Techniken, ergänzt echten Content und bereitet den Deploy vor (Stage 3 — GitHub Pages,
`ofnstube.ais152.com`).

Marke: **smoked-black + ember-orange + bone**, Leitmotiv **Glut-Ring**, Ton — *Bavarian craft +
ember-warmth + modern restraint*. Typografie locked: **Fraunces** (Headings) + **Inter** (Body).

> Прототип собран по каноническому ТЗ `CDP_Burger_Restaurant_Muenchen_Ofnstube.md` (§ ШАБЛОН).
> Все контактные данные (адрес, телефон, WhatsApp, E-Mail) — **фиктивные плейсхолдеры**, см. раздел 10.

---

## 1. Стек и почему

| Слой | Технология | Причина |
|------|-----------|---------|
| Разметка | Vanilla HTML5, multi-page (10 страниц) | Портируется почти 1:1, без зависимостей |
| Стили | Vanilla CSS3 — 8 файлов, CSS custom properties (tokens) | Без build-step, единая токен-система |
| Логика | Vanilla JS — 8 модулей, без сборки | Прозрачно, нулевые зависимости |
| Анимация | GSAP 3.12 + ScrollTrigger + Lenis — self-hosted UMD в `assets/vendor/` | Уровень L1 (сдержанно, Stube-tone), без CDN (DSGVO) |
| Шрифты | Fraunces + Inter — variable WOFF2, self-hosted в `assets/fonts/` | DSGVO (LG München 2022): запрет Google Fonts CDN |
| Build | нет | Прямой запуск через `python -m http.server` |

Запуск без сборки и без интернета — весь код, шрифты и vendor-библиотеки лежат локально.

## 2. Список страниц

Каждая страница — в `pages/`. Корневой `index.html` делает redirect на `pages/index.html`.

| Страница | Файл | Назначение |
|----------|------|-----------|
| Startseite | `pages/index.html` | Hero (animated Glut-Hero) + Trust-Bar + Menü-Teaser + Reservierung + Über uns + Standort + Final-CTA |
| Menü | `pages/menu.html` | Vollständige Karte, aus `data/*.json` gerendert, Allergen-Chips + LMIV-Legende |
| Reservierung | `pages/reservation.html` | Quandoo-2-Klick-Widget + WhatsApp + Formular-Fallback (Reservierungsanfrage) |
| Über uns | `pages/ueber-uns.html` | Brand-Story, Timeline, Werte, Team (Platzhalter-Fotos) |
| Standort | `pages/standort.html` | Adresse, Google-Maps-2-Klick, Anfahrt, Öffnungszeiten |
| Kontakt | `pages/kontakt.html` | Kontaktwege + Kontaktformular |
| Impressum | `pages/impressum.html` | § 5 TMG — Platzhalter, anwaltlich zu prüfen |
| Datenschutz | `pages/datenschutz.html` | DSGVO — Platzhalter, anwaltlich zu prüfen |
| AGB | `pages/agb.html` | AGB — Platzhalter (für Restaurant ohne Online-Bestellung optional) |
| 404 | `pages/404.html` | Glut-Ring-Fokus + Back-Links |

## 3. Применённые техники по блокам

- **Hero — «Animated Glut-Hero»:** `<canvas>` mit Ember-Partikelfeld + warmem Boden-Glow,
  dahinter konzentrische CSS-Glut-Ringe, GSAP-Scrub-Parallax. Ein `<video>`-Element ist bereits
  verdrahtet (dual-source 16:9 / 9:16) und blendet sich ein, sobald echtes Footage vorliegt.
  `prefers-reduced-motion` → statisches Standbild.
- **Scroll-Reveal:** GSAP `ScrollTrigger.batch` über `[data-reveal]` — natürliches Stagger,
  ohne GSAP / bei reduced-motion bleibt alles sichtbar (Fallback-Klasse `reveal-fallback`).
- **Smooth Scroll:** Lenis, mit GSAP-Ticker synchronisiert, bei reduced-motion deaktiviert.
- **Hero-Intro:** GSAP-Timeline (`[data-hero-in]`) — Stagger-Einblendung beim Laden.
- **2-Klick-Embeds:** Quandoo + Google Maps laden nichts Drittes vor explizitem Klick.
- **Menü:** `menu-renderer.js` rendert `data/menu.json` + `data/drinks.json` zu DOM-Karten.
- **Cookie-Banner:** drei gleichwertige Buttons, nichts vorausgewählt.
- **Logo-Mark:** dezenter Glut-Puls beim Laden (GSAP-Klasse `is-glowing`).

## 4. Glut-Ring Leitmotiv — карта применения

Konzentrische Ringe pulsierender Glut (`assets/css/glut-ring.css`):

| Ort | Umsetzung |
|-----|-----------|
| Hero-Hintergrund | `.glut-ring--hero` + `.glut-core`, langsames `glut-breathe` |
| Logo (3 Varianten) | gebrochener Glut-Ring + Ember-Kern in allen `assets/logo/*.svg` |
| Menü-Karten / CTA-Hover | `.glut-hover` → `box-shadow` Ember-Glow |
| CTA-Focus | `--glut-focus` Ember-Ring (sichtbarer Fokus, BFSG) |
| Timeline-Marker (Über uns) | `.glut-dot` mit Ripple |
| Footer | statische `.glut-ring--footer` in der Ecke |
| Final-CTA | `.glut-ring--cta` hinter dem Schluss-Block |
| 404 | großer `.glut-ring--404` als Fokuspunkt |
| Bild-Platzhalter | Glut-Ring-Motiv in jeder generierten Platzhalter-SVG |

## 5. LMIV Menu-Data Contract (LMIV-CONTRACT-MARKER)

`data/menu.json` — jedes Gericht trägt `data-allergens` (14 EU-Codes nach Anhang II VO 1169/2011),
`data-additives` (9 Zusatzstoff-Codes), `data-age-restriction`, `diet`, `price_eur`, `image`.
`menu-renderer.js` + `allergens.js` rendern pro Gericht eine **sichtbare Chip-Row im DOM** —
niemals als `title=` oder Hover-Tooltip (BFSG-konform, touch- und screenreader-tauglich).
Auf `menu.html` steht zusätzlich die vollständige 14-Allergene- + 9-Zusatzstoffe-Legende und ein
Warnhinweis, dass die Allergen-Daten Mock sind und vor Veröffentlichung zu ersetzen sind.

## 6. JuSchG Age-Flags (JUSCHG-MARKER)

`data/drinks.json` — jedes alkoholische Getränk hat `data-age-restriction: 16`. Der Renderer
setzt ein **sichtbares `≥ 16`-Badge** (`.age-badge`) neben Helles, Weißbier, Kellerbier, Radler
und Spezi mit Schuss. Alkohol ausschließlich In-House (kein to-go, keine Online-Bestellung) —
daher **kein** seitenweites Age-Gate nötig. Die JuSchG-Klausel steht zusätzlich in den AGB.

## 7. DSGVO / BFSG Checklist

**Готово в прототипе:**
- ✅ Self-hosted WOFF2-Fonts — keine Verbindung zu Google Fonts CDN
- ✅ GSAP / Lenis self-hosted (`assets/vendor/`) — kein CDN
- ✅ Cookie-Banner — 3 gleichwertige Buttons, nichts vorausgewählt
- ✅ Quandoo + Google Maps — 2-Klick-Pattern, nichts lädt vor Zustimmung
- ✅ WhatsApp — erster Klick öffnet DSGVO-Hinweis-Modal (Meta-Datentransfer)
- ✅ Keine Analytics-Scripts eingebunden
- ✅ Semantische Landmarks (`header/nav/main/footer`), Skip-Link, `aria-*`
- ✅ Sichtbare Fokus-States (Ember-Ring), Tastatur-Navigation, `prefers-reduced-motion`
- ✅ Kontrast — smoked-black + bone 14.2:1 (AAA), CTA AA+
- ✅ `alt` an allen Bildern, `aria-label` an Icon-Buttons, Formulare mit `label` + `fieldset`
- ✅ Tap-Targets ≥ 48 px

**Offen (Stage 2 / 3 / Anwalt):**
- ⬜ Impressum / Datenschutz / AGB — anwaltlich zu finalisieren (aktuell Platzhalter)
- ⬜ Echte Quandoo-Merchant-ID + echte Google-Maps-Einbettung
- ⬜ Vollständige EN-Übersetzung des Body-Contents (Stage 1 deckt UI-Strings ab)
- ⬜ BFSG-Audit mit Screenreader + Lighthouse vor Launch

## 8. Schema.org JSON-LD

- `index.html` — `Restaurant` (LocalBusiness): Adresse, Geo, Telefon, `openingHoursSpecification`,
  `servesCuisine`, `priceRange`, `acceptsReservations`, `hasMenu`, `image`, `sameAs`.
- `menu.html` — `Menu` mit `hasMenuSection` + `MenuItem` (Name, Beschreibung, `offers`,
  `suitableForDiet`) + `BreadcrumbList`.
- Alle Unterseiten — `BreadcrumbList`.

## 9. Higgsfield Prompt-Kit

Alle Bild- und Video-Prompts: [`docs/content/higgsfield_prompts.md`](docs/content/higgsfield_prompts.md)
(HIGGSFIELD-GUARD-MARKER). Generierung erst nach CEO-Freigabe pro Prompt (Checkbox). Aktuell sind
alle Bilder/Videos **gestaltete SVG-Platzhalter** (`assets/images/`, `assets/video/*.placeholder`).

## 10. Open Questions для CEO

Все ниже — **фиктивные плейсхолдеры**, заменяются реальными данными перед публикацией:

1. **Brand-Name** — «Ofnstube» рабочее имя; финальная DPMA-проверка за CEO/Anwalt
2. **Adresse** — `Auenstraße 14, 80469 München` (фиктивная)
3. **Telefon** — `+49 89 4423 0970` (фиктивный)
4. **WhatsApp** — `+49 151 4420 9930` → `wa.me/4915144209930` (фиктивный)
5. **E-Mail** — `servus@ofnstube.de` (фиктивный; зависит от финального домена)
6. **Öffnungszeiten** — Mo Ruhetag · Di–Do 12–23 · Fr–Sa 12–24 · So 12–22 (черновик)
7. **Menü** — 14 Gerichte + 15 Getränke = Mock-данные (названия, цены, аллергены)
8. **Social** — Instagram / Facebook `@ofnstube` (фиктивные)
9. **Logo** — 3 SVG-варианта в `assets/logo/`, CEO выбирает один (Stage 2 — текст в кривые)
10. **Bilder / Video** — Higgsfield-генерация после CEO-Freigabe prompt-листа
11. **Domain** — `ofnstube.ais152.com` (план; GitHub Pages, отдельная PX на Stage 3)

## 11. Как запустить локально

```
cd c:\Projects\Ofnstube
python -m http.server 8000
```

Затем открыть **http://localhost:8000/** (корневой `index.html` перенаправит на
`pages/index.html`). Сборка не нужна — всё работает напрямую.

---

## Struktur

```
Ofnstube/
  index.html            Redirect -> pages/index.html
  README.md
  pages/                10 Seiten (index, menu, reservation, ueber-uns,
                        standort, kontakt, impressum, datenschutz, agb, 404)
  assets/
    css/                tokens base glut-ring layout components motion hero menu
    js/                 lenis-init gsap-init allergens menu-renderer
                        quandoo-loader whatsapp lang main
    vendor/             gsap.min · ScrollTrigger.min · lenis.min (self-hosted)
    fonts/              Fraunces + Inter — variable WOFF2 (self-hosted)
    logo/               3 SVG-Varianten
    icons/              14 Outline-SVG-Icons
    images/             gestaltete SVG-Platzhalter (menu / interior / team / og)
    video/              .placeholder-Marker (Higgsfield später)
  data/                 menu.json (LMIV) · drinks.json (JuSchG)
  docs/content/         higgsfield_prompts.md
```
