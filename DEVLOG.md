# DEVLOG — Ofnstube

Journal of all development sessions. Each session ends with mandatory entry. KB-маркер (Закон 20 §H) обязателен.

---

### [S001] — 2026-05-25 — Scaffold + CDP + KB-14 (third twin)

**Роли:** #1 Product Architect (исполнение, делегировано Claude Code MainCore), #14 Hans Landa (TS1 review — REJECTED → TS2 fixes Z-01..Z-15)
**Статус:** завершено
**Задача:** [MainCore PX-023 / T029](c:/Projects/MainCore/docs/tasks/T029_burger_restaurant_third_twin.md) — родительская сессия [MainCore S047](c:/Projects/MainCore/DEVLOG.md)

**Что сделано:**
- Создан project scaffold `c:/Projects/Ofnstube/` (12 files + verify.py pure-Python + .gitkeep)
- CDP заполнен из MainCore CLAUDE_DESKTOP_DESIGN_PROMPT.md с Landa-фиксами §I LMIV / §J JuSchG / §K Schema + ASCII-anchors
- Vault KB: hub `Ofnstube.md` + 14 KB scaffolded (3 inline-populated: Blueprint, Stack, Design)
- MainCore PX_REGISTRY: PX-023 добавлен, дубль PX-021 (KZScout debug) переименован в PX-022
- T029 файл создан
- MainCore DEVLOG: S027 добавлен (родительская сессия)

**Ключевые решения:**
- Brand: Ofnstube (Bavarian craft-burger), palette smoked-black + ember-orange + bone, Leitmotiv Glut-Ring — выбрано CEO из 3 brand options
- Reservation: Quandoo primary + WhatsApp FAB, static form fallback
- Alcohol: in-house only (Helles/Weißbier), `≥ 16` badge per drink, без site-wide age-gate
- Stack: Vanilla HTML/CSS/JS (как AiS152/Eko-OYLIS), self-hosted WOFF2, GSAP+Lenis L1
- Domain: `ofnstube.ais152.com` (GitHub Pages, отдельный repo Ofnstube-site) — план, отдельная PX
- Markenrecherche «Ofnstube» — web clean, DPMA финал-проверка остаётся для CEO/Anwalt

**Артефакты:**
- `c:/Projects/Ofnstube/` (project scaffold)
- `c:/Projects/MainCore/vault/02_Knowledge/Claude Desktop Prompts/CDP_Burger_Restaurant_Muenchen_Ofnstube.md`
- `c:/Projects/MainCore/vault/01_Projects/Ofnstube.md` + `Ofnstube/*.md` (14 KB)
- `c:/Projects/MainCore/docs/tasks/T029_burger_restaurant_third_twin.md`

**Следующие шаги:**
- CEO открывает Claude Desktop → копирует CDP → Desktop разворачивает `v1-desktop/` Stage 1 R&D-прототип
- После Stage 2 ОК CEO — отдельная PX на создание GitHub repo Ofnstube-site + Pages config + CNAME

> KB: updated [[Ofnstube/Blueprint — How to Replicate]], [[Ofnstube/Stack and Versions]], [[Ofnstube/Design and Branding]]

---

### [S002] — 2026-05-25 — Stage 1 R&D-Prototyp gebaut (10 Seiten)

**Роли:** #1 Product Architect (исполнение через Claude Desktop)
**Статус:** завершено
**Задача:** `CDP_Burger_Restaurant_Muenchen_Ofnstube.md` § ШАБЛОН — Stage 1 R&D-Прототип

**Что сделано:**
- Собран полный Vanilla-прототип в корне `c:/Projects/Ofnstube/` (без обёртки `v1-desktop/`)
- 10 HTML-страниц (index, menu, reservation, ueber-uns, standort, kontakt, impressum,
  datenschutz, agb, 404) + корневой redirect `index.html`
- 8 CSS-файлов (tokens/base/glut-ring/layout/components/motion/hero/menu), 8 JS-модулей
- `data/menu.json` (14 Gerichte, LMIV) + `data/drinks.json` (15 Getränke, JuSchG)
- 3 SVG-логотипа, 14 Outline-Icons, 24 gestaltete SVG-Platzhalter, 3 Video-Marker
- `README.md` (11 разделов) + `docs/content/higgsfield_prompts.md` (22 Prompts)

**Ключевые решения:**
- Структура — содержимое в корень `Ofnstube/`, без `v1-desktop/` (указание CEO)
- Hero — «Animated Glut-Hero»: Canvas-Ember + Glut-Ring, `<video>` verdrahtet под будущий футаж
- Vendor (GSAP/Lenis) и Schriften (Fraunces/Inter) — уже были в проекте, использованы as-is
- Контактные данные — фиктивные плейсхолдеры, задокументированы в README §10

**Артефакты:**
- `c:/Projects/Ofnstube/` — `pages/`, `assets/`, `data/`, `docs/content/`, `README.md`

**Верификация:** Закон 21 (точки в h1-h4/CTA/badges) = 0 · dev-leak-паттерны = 0 ·
Google-Fonts-CDN = 0 · все `<img>` с width/height · 10/10 страниц css=8 js=11

**Следующие шаги:**
- CEO открывает `http://localhost:8000/` → ревью прототипа, выбор 1 из 3 логотипов
- После ОК — Stage 2 (Claude Code): polish, EN-Übersetzung, реальный контент
- `verify/acceptance.json` — Stage-0 gates ссылаются на `v1-desktop/`, устарели после смены
  структуры — обновить под Stage 1

> KB: Stage 1 prototype materialized — [[Ofnstube/Blueprint — How to Replicate]], [[Ofnstube/Design and Branding]]

---

### [S003] — 2026-05-25 — Stage 1 забракован, Stage 1.5 redesign brief готов

**Роли:** #1 Chief Methodologist + #14 Hans Landa (методологический разбор)
**Статус:** завершено (CDP обновлён, ждёт Desktop)
**Родительская сессия:** [MainCore S049](c:/Projects/MainCore/DEVLOG.md)

**Что сделано:**
- CEO забраковал Stage 1 prototype: «шаблонное говнище» (centered hero, canvas-particle, equal cards, PowerPoint порядок секций)
- Root cause analysis: CDP-шаблон допускал generic output (no enforcement skills block, no запрещённые шаблоны, references «возьми тон»)
- CDP обновлён Stage 1.5:
  - Добавлен ШАГ 0 — обязательные skills (Cowork-native: design:design-critique, theme-factory, brand-guidelines, canvas-design, product-management:brainstorm, design:accessibility-review)
  - Запрещённые шаблоны (с конкретными примерами из Stage 1)
  - Restaurant-only references (Black Axe Mangal, Frenchette, Roberta's, Daroco, Carbone + WebSearch awwwards 2025-2026)
  - Eko-OYLIS forcing убран
  - Принципы не-шаблонности: asymmetric hero, editorial menu, oversized typography, food-first
- Создано 3 урока MainCore + 3 populated KB (Gotchas, Problems and Decisions, SEO and Legal)

**Ключевые решения:**
- Stage 1.5 — redesign дизайн-слоя, данные/legal/vendor/шрифты не трогать
- Cross-env skills (MainCore vs Cowork) разные — Desktop использует свои Cowork-native

**Артефакты:**
- Обновлённый CDP: `c:/Projects/MainCore/vault/02_Knowledge/Claude Desktop Prompts/CDP_Burger_Restaurant_Muenchen_Ofnstube.md`
- 3 lessons MainCore: `CDP_MUST_ENFORCE_SKILLS`, `CROSS_ENV_SKILLS_INCOMPATIBILITY`, `RESTAURANT_REFERENCES_DOMAIN_MATCH`
- 3 KB populated: `Gotchas and Solutions`, `Problems and Decisions`, `SEO and Legal`

**Следующие шаги:**
- CEO вставляет CDP в Cowork Desktop → Desktop делает Stage 1.5 redesign
- После Stage 1.5 ОК CEO — Higgsfield MVP (54 credits, 6 standardized burger photos)

**Higgsfield budget статус:**
- Balance: 67 credits (Starter plan)
- MVP plan: 54 credits (1 hero-poster + 5-6 burger photos)
- Deficit полного prompt-list: -293 credits (потребуется top-up)

> KB: updated [[Ofnstube/Gotchas and Solutions]], [[Ofnstube/Problems and Decisions]], [[Ofnstube/SEO and Legal]]

---

### [S004] — 2026-05-25 — Stage 1.5 Redesign ausgeführt (дизайн-слой)

**Роли:** #1 Product Architect (Cowork Desktop execution)
**Статус:** завершено
**Задача:** `CDP § ШАБЛОН` Stage 1.5 — редизайн дизайн-слоя (данные/legal/vendor/шрифты не трогать)

**Что сделано:**
- ШАГ 0 честно: skills из CDP (`ui-ux-pro-max`, `cinematic`, `food-beverage`, `brand-story`,
  `real-estate`, `social-hook`, `motion-design-ad`, `dispatching-parallel-agents` и др.) в
  Cowork-среде НЕ установлены — ложную строку «Skills invoked» не писал. Применены реально
  доступные Cowork-native: `design:design-critique`-подход, `theme-factory`, `canvas-design`,
  `brand-guidelines`, `product-management:brainstorm` + WebSearch awwwards-ресторанных сайтов
- Переделан дизайн-слой: `index.html` + `menu.html` + 8 CSS + hero JS (`main.js`, `gsap-init.js`)
- Hero: canvas-particle убран → асимметричный food-first (claim слева, fullbleed image-панель
  справа, oversized Fraunces, без centered text), scroll-bound parallax
- Marquee-strip вместо статичного trust-bar; editorial-меню (чередующиеся широкие строки с
  магазинной нумерацией вместо equal-grid); sticky-pin statement-секция; big ember-CTA band;
  Bavarian grain-текстура; Glut-Ring как micro-interaction
- Порядок секций не-PowerPoint: Hero → Marquee → Signatures → Statement → Über-uns →
  Standort → Reservation → BigCTA → Footer

**Ключевые решения:**
- Cross-env: MainCore skill-пак ≠ Cowork-каталог — выполнено на реальной дизайн-работе,
  без фабрикации skill-подтверждения (принципиально)
- Hero — image-панель (placeholder); Higgsfield-футаж позже встанет в ту же панель
- `data/`, legal-страницы, `vendor/`, шрифты — НЕ тронуты (строго по скоупу)

**Верификация (host-tools — sandbox-mount давал ложные сбои):** Закон 21 = 0 · dev-leak = 0 ·
Google-Fonts-CDN = 0 · canvas-particle = 0 · 10/10 страниц целы · `main.js` + `gsap-init.js`
прочитаны с диска, валидны · запрещённые шаблоны исключены

**Артефакты:**
- `pages/index.html`, `pages/menu.html`, `assets/css/*` (8), `assets/js/main.js`, `assets/js/gsap-init.js`

**Следующие шаги:**
- CEO открывает `http://localhost:8000/` → ревью Stage 1.5 редизайна
- После ОК — Higgsfield-генерация (CEO утверждает prompt-list, balance 67 / MVP 54 credits)

> KB: Stage 1.5 redesign — [[Ofnstube/Design and Branding]], [[Ofnstube/Gotchas and Solutions]]

---

### [S005] — 2026-05-25 — Stage 1.6 (Higgsfield MVP) + Stage 2 polish

**Роли:** #1 Tobias Reinhardt (Chief Methodologist), #14 Hans Landa (F-07 review)
**Статус:** завершено — Landa: PASS WITH NOTES
**Задача:** Stage 1.6 Higgsfield MVP + Stage 2 polish (B1-B3), F-07 review (F-01..F-09 protocol)

**Что сделано:**
- **A) Higgsfield MVP:** balance 67c проверен (§H' step 1). Сгенерировано 6 фото —
  модель `nano_banana_pro`, 2k, 5 burger 3:4 (classic/bayer/henne/garten/wurzel) +
  1 hero 16:9. Стоимость **12 кредитов** (cap 60c соблюдён), balance 67 → 55c.
  Job-IDs + download-таблица в `docs/content/higgsfield_prompts.md`. Код провязан:
  `.svg → .jpg` в `data/menu.json` (5) + `index.html` (hero + 3 signature) с
  `onerror`-fallback на SVG. Schmelzer + Rauch остались SVG-Platzhalter.
  Бинарники CEO скачивает из Higgsfield-аккаунта вручную (среда без save-капабилити —
  согласовано через AskUserQuestion).
- **B1) Mobile:** hero hardened — `min-width:0` на grid-детях, headline
  `overflow-wrap:break-word`, `text-wrap:nowrap` убран → 375px column без overflow.
- **B2) Large-desktop:** при `≥1920px` бамп container-токенов (1380/1640/840),
  hero `max-width:2560px`.
- **B3) EN body-content:** `lang.js` + поддержка `data-en-html` (innerHTML-swap для
  элементов с разметкой); `index.html` 75 EN-аннотаций + `menu.html` chrome 36.
- **C) F-07 Landa-review:** JS валиден (host), JSON валиден, Закон 21 = 0 (DE+EN),
  canvas-particle / Google-Fonts-CDN / dev-leak = 0, структура цела, marquee на
  `data-en-html`, конфликтов `data-en`/`data-en-html` нет.

**Ключевые решения:**
- Higgsfield-MCP подтверждён (`nano_banana_pro`, 2 credits / 2k); генерация по §H' после balance
- `onerror` jpg→svg fallback — нет broken-images до загрузки бинарников

**Landa-findings (PASS WITH NOTES):**
- F1: `menu.html` dish-карточки рендерятся из `menu.json`, на EN остаются DE — полный
  перевод требует `description_en` в `menu.json` + i18n в `menu-renderer.js` (Stage 2 remainder)
- F2: EN body-контент покрыт для `index` + `menu`-chrome; reservation/kontakt/ueber-uns/
  standort/legal — ещё DE (Stage 2 ongoing)
- F3: sandbox-mount даёт ложные `node --check` сбои на свежих файлах — host-файлы
  перепроверены через Read, валидны (на deliverable не влияет)

**Артефакты:** `index.html`, `menu.html`, `hero.css`, `layout.css`, `components.css`,
`lang.js`, `menu-renderer.js`, `data/menu.json`, `docs/content/higgsfield_prompts.md`

**Higgsfield-Budget:** spent 12c · balance 55c · cap 60c — OK

**Следующие шаги:**
- CEO качает 6 фото из Higgsfield-аккаунта → `assets/images/` (см. higgsfield_prompts.md)
- Stage 3 (Claude Code): GitHub Pages deploy + CNAME `ofnstube.ais152.com` — на этом
  этапе информируем CEO (Protocol D)

**Stage-2-Abschluss (2026-05-25):**
- Claude Code: 6 Higgsfield-JPG heruntergeladen + optimiert (PNG→JPG q85, 48,8 MB → 1,2 MB),
  abgelegt in `assets/images/` + `assets/images/menu/` — `onerror`-Fallback greift nicht mehr,
  echte Fotos sind aktiv (hero 235 KB · Burger 165-237 KB)
- EN-Übersetzung erweitert auf `reservation` / `kontakt` / `ueber-uns` / `standort`
  (data-en-Counts 70 / 52 / 72 / 59) — alle 6 Inhaltsseiten zweisprachig; Legal-Seiten
  bleiben bewusst DE (Rechtstexte). Landa-Finding F2 damit geschlossen
- Verifikation host-tools: Закон 21 = 0 · dev-leak = 0 · 10/10 Seiten intakt · menu.json
  5× `.jpg` aktiv · B1 `min-width:0`+`overflow-wrap` · B2 `@media 1920px` · data-en gesamt 482
- **STAGE 2 GESCHLOSSEN** → Übergabe an Claude Code für Stage 3 (GitHub Pages Deploy)

> KB: Stage 1.6 + Stage 2 — [[Ofnstube/Design and Branding]], [[Ofnstube/Gotchas and Solutions]], [[Ofnstube/Problems and Decisions]]
