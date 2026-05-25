# CLAUDE.md — Ofnstube

## Владелец проекта

**Пользователь = CEO проекта.** Его слово — закон. Команда выполняет указания CEO без обсуждения.

**Второй после CEO: #1 Product Architect** — правая рука CEO, координатор команды.

---

## Проект

**Название:** Ofnstube — Munich Craft-Burger (fictional brand, баварский Stube-feel)
**Тип:** Static website (Vanilla HTML5 + CSS3 + JS) — restaurant landing с in-house reservation
**Описание:** Сайт fictional craft-burger ресторана в Мюнхене. Брендинг: Bavarian glow / Ofen-Stube тепло, palette smoked-black + ember-orange + bone, Leitmotiv «Glut-Ring» (пульсирующее свечение огня в hover'ах). Site = landing + menu + reservation embed + legal. **Без e-commerce** — ресторан не продаёт онлайн.
**Источник:** MainCore PX-023 / T029, third twin pipeline (после KONTUR PX-021 + Getraenke-Case)
**CDP-источник:** `c:\Projects\MainCore\vault\02_Knowledge\Claude Desktop Prompts\CDP_Burger_Restaurant_Muenchen_Ofnstube.md`
**Локация:** Мюнхен, Германия
**Языки:** Deutsch primary + English secondary (Munich-tourist audience)
**Рынок/Recht:** DSGVO/TTDSG, LMIV §1169/2011 (Anhang II аллергены + Zusatzstoffe), JuSchG §9 (≥16 для пива, in-house only), BFSG 2025 (a11y mandatory с 28.06.2025), §5 TMG, PAngV
**Текущая фаза:** Stage 0 (scaffold готов, ждёт Claude Desktop для Stage 1 R&D-прототипа в `v1-desktop/`).
**Domain (план):** `ofnstube.ais152.com` (GitHub Pages, отдельный repo `Ofnstube-site`, отдельная PX позже)

---

## Документация

| Файл | Назначение | Когда читать |
|------|-----------|--------------|
| `CLAUDE.md` | Главный управляющий документ | Всегда |
| `TEAM.md` | Команда: роли, страйки | При запуске агента |
| `DEVLOG.md` | Журнал разработки | Старт/завершение сессии |
| `STATUS.md` | Текущее состояние (snapshot) | Старт сессии |
| `docs/tasks/PX_REGISTRY.md` | Project-internal PX-задачи | Перед PX |
| `docs/CREDENTIALS.md` | Доступы (НЕ в git) | Деплой |
| `CEO_PROMPTS.md` | Копия канонических промптов CEO | Перед задачей |
| `.mcp.json` | MCP конфиг (Obsidian SSE + Playwright + Higgsfield) | Auto Claude Code |
| **Obsidian KB** | `c:\Projects\MainCore\vault\01_Projects\Ofnstube\` — 14 KB (Закон 20) | Всегда + KB-маркер |

### Канонические документы MainCore (read-only)

| Документ | Путь |
|----------|------|
| `CEO_PROMPTS.md` | `c:\Projects\MainCore\core\CEO_PROMPTS.md` |
| `CLAUDE_DESKTOP_DESIGN_PROMPT.md` | `c:\Projects\MainCore\core\CLAUDE_DESKTOP_DESIGN_PROMPT.md` |
| `CREATIVE_TOOLKIT.md` | `c:\Projects\MainCore\core\CREATIVE_TOOLKIT.md` (Закон 19) |
| `20_PROJECT_KB_LIFECYCLE.md` | `c:\Projects\MainCore\laws\20_PROJECT_KB_LIFECYCLE.md` |
| **CDP** | `c:\Projects\MainCore\vault\02_Knowledge\Claude Desktop Prompts\CDP_Burger_Restaurant_Muenchen_Ofnstube.md` |
| **CDP Hardening** | `c:\Projects\MainCore\vault\02_Knowledge\Claude Desktop Prompts\CDP Hardening — Failure Modes (Eko-OYLIS-UA).md` |
| Lessons KONTUR | `c:\Projects\MainCore\vault\01_Projects\KONTUR\` |
| Lessons Getraenke | `c:\Projects\Getraenke-Case\` + KB hub |

---

## Tech Stack

| Слой | Технология | Статус |
|------|-----------|--------|
| Markup | HTML5 multi-file (index + menu + reservation + impressum + datenschutz + agb + 404) | Locked |
| Стили | Vanilla CSS, разнесён в `assets/css/{tokens,base,layout,components,motion,hero,menu,glut-ring}.css` | Locked |
| Скрипты | Vanilla JS — `assets/js/{lang,lenis,gsap-init,quandoo-loader,whatsapp,allergens,menu-renderer,main}.js` | Locked |
| Smooth Scroll + Animations | Lenis + GSAP + ScrollTrigger (self-hosted UMD в `assets/vendor/`, НЕ CDN) | Locked |
| Шрифты | Self-hosted WOFF2 (DSGVO) — **Fraunces (variable, headings) + Inter (variable, body)** — LOCKED CEO 2026-05-25 | Locked |
| Reservation | Quandoo widget (2-click DSGVO loader) primary + WhatsApp FAB. Fallback: static form (FormSubmit/Resend) | Locked |
| Хостинг (план) | GitHub Pages — отдельный repo `Ofnstube-site` с CNAME `ofnstube.ais152.com` | Open |
| Данные меню | `data/menu.json` — `data-allergens` (14-group EU codes A-N) + `data-additives` (1-9) + `data-age-restriction` (≥16 для алкоголя) | Locked |
| Higgsfield | Image/Video MCP — генерация food-photo, hero-video — **с balance-check guard + CEO approval** | Locked |

---

## Структура проекта

```
Ofnstube/
├── CLAUDE.md
├── TEAM.md
├── DEVLOG.md
├── STATUS.md
├── README.md
├── CEO_PROMPTS.md
├── .mcp.json
├── .gitignore
├── docs/
│   ├── tasks/PX_REGISTRY.md
│   ├── content/             # Higgsfield prompts (с CEO approval-checkbox)
│   └── CREDENTIALS.md.template
├── verify/
│   ├── acceptance.json
│   └── verify.py            # pure-Python (Windows-safe)
└── v1-desktop/              # Claude Desktop Stage 1 prototype (пока .gitkeep)
```

---

## ПРОТОКОЛ ФОРМАЛИЗАЦИИ ЗАДАЧ

> CEO ставит задачу → агент ОБЯЗАН выполнить протокол из промпта CEO (P0/PX/P1-P11).
> Без промпта CEO — агент читает этот раздел как минимальный стандарт.

### Минимальный стандарт

```
1. Прочитай CLAUDE.md + TEAM.md
2. Назначь специалиста
3. Сформируй ТС — покажи CEO, жди ОК
4. После ОК — выполняй строго по ТС
5. verify (build/test/acceptance.json)
6. Запиши в DEVLOG.md, STATUS.md
7. KB-маркер (Закон 20 §H, обязательно)
```

### Размеры задач

| Размер | Бюджет | ОК CEO | Тесты |
|--------|--------|--------|-------|
| S | 3 итер | Нет | Нет |
| M | 7 итер | Да | 1-2 unit / visual |
| L | 15 итер | Да | Unit + Integration |
| XL | 25 итер | Да + Landa | Полный |

---

## КРИТИЧНЫЕ ПРАВИЛА (Restaurant-specific)

### LMIV §1169/2011 — Lebensmittel-Informationsverordnung

- Каждое блюдо в `data/menu.json` ОБЯЗАНО иметь:
  - `data-allergens` = массив из 14 EU-кодов (Anhang II): A Gluten, B Krebstiere, C Eier, D Fische, E Erdnüsse, F Sojabohnen, G Milch, H Schalenfrüchte, L Sellerie, M Senf, N Sesam, O Schwefeldioxid, P Lupinen, R Weichtiere
  - `data-additives` = массив Zusatzstoff-Kennzeichnungen 1-9
- Render: **visible chip-row под именем блюда в DOM** — НЕ tooltip / НЕ hover / НЕ title-only (BFSG-нарушение)
- Mock-данные допустимы в Stage 1 с warning-banner «Hinweis: Allergen-Daten sind Mock — vor Veröffentlichung durch Real-Daten ersetzen»

### JuSchG §9 — Jugendschutz (Alkohol)

- Карта напитков: каждое алкогольное блюдо имеет visible `≥ 16` chip (Helles, Weißbier, Spezi-mit-Schuss)
- НЕТ site-wide age-gate — Ofnstube продаёт алкоголь **только in-house** (не to-go, не online order)
- Если в будущем добавится delivery — потребуется полный JuSchG age-gate

### BFSG 2025 (Barrierefreiheitsstärkungsgesetz, 28.06.2025)

- Semantic HTML5 (landmarks)
- `alt` на всех `<img>`
- `aria-label` на icon-only buttons
- Visible focus states
- Contrast WCAG AA (текст 4.5:1, large 3:1) — для CTA AAA
- `prefers-reduced-motion` respected
- Keyboard navigation 100%
- Tap targets ≥ 48px

### Закон 21 — «БЕЗ ТОЧЕК» в headings/CTA/badges

ЗАПРЕЩЕНО ставить `.` в конце:
- `<h1>`, `<h2>`, `<h3>`, `<h4>`
- CTA-кнопки («Tisch reservieren», «Per WhatsApp schreiben», «Zum Menü», «Anfahrt»)
- badge/chip, tagline, eyebrow, kicker
- hero claim, hero subtitle, final-CTA блоки
- Cookie-Banner кнопки («Alle akzeptieren», «Nur notwendige», «Einstellungen»)

Разрешено: длинные body-параграфы, правовые тексты, описания ≥2 предложений в модалках.

Verify: `verify/verify.py` grep'ает shipped HTML — fail если найдёт `\.</h[1-4]>` или `\.</button>` или `\.</a>` (для CTA-link).

### Higgsfield Guard

- ПЕРЕД любой генерацией: `mcp__claude_ai_Higgsfield_MCP__balance` → результат в `docs/content/higgsfield_prompts.md`
- Все prompts в `docs/content/higgsfield_prompts.md` имеют `Approved by CEO: [ ]` checkbox
- БЕЗ checked-checkbox генерация ЗАПРЕЩЕНА
- Food-photography template: «top-down editorial, soft daylight, dark plate, gentle steam, no gore, no raw-meat close-up»

---

## Brand Constants

### Palette

```css
:root {
  --smoked-black: #0d0d0d;   /* base bg */
  --ember-orange: #ff6b1a;   /* signal / CTA primary / Glut-Ring */
  --bone:         #f5e6d3;   /* body text on dark */
  --olive:        #5c6b2c;   /* decorative ONLY — НЕ для текста (contrast fail) */
  --ink-900:      #1a1a1a;   /* dark accent */
  --warn:         #c41e3a;   /* allergen-warning / status-error */
  --ok-500:       #5c8a3c;   /* status-ok */
}
```

**Contrast pairs (verified):**
- `smoked-black` + `bone` = 14.2:1 ✅ AAA
- `smoked-black` + `ember-orange` = 5.1:1 ✅ AA (large text + CTA)
- `ember-orange` + `bone` = 2.8:1 ❌ (только декор, НЕ для текста)

### Leitmotiv: «Glut-Ring»

Пульсирующее свечение огня (concentric `box-shadow` `0 0 20px ember, 0 0 40px ember-dim`) применяется в:
- hover карточек меню
- focus-ring CTA-кнопок
- логотип-знак (subtle pulse при scroll-in)
- timeline-маркеры
- footer-pattern (статичные кольца)

---

## Cross-references

- Project KB: `c:\Projects\MainCore\vault\01_Projects\Ofnstube\` (14 заметок)
- CDP (для Claude Desktop): `CDP_Burger_Restaurant_Muenchen_Ofnstube.md`
- Donor lessons: KONTUR + Getraenke-Case + Eko-OYLIS Failure Modes
