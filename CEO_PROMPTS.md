# CEO_PROMPTS — Ofnstube (local copy)

> Канонический источник: `c:\Projects\MainCore\core\CEO_PROMPTS.md`
> Эта копия — для офлайн-доступа в проекте. При расхождении источник побеждает.

## Промпты

- **P0** — анализ + roadmap (обязателен для ВСЕХ задач)
- **PX** — формулировка задачи (CEO → ТС)
- **P1** — новая фича / новый артефакт
- **P2** — дебаг
- **P3** — рефакторинг
- **P4** — миграция / breaking change
- **P5** — research
- **P6** — аудит / ревью
- **P7** — деплой / релиз
- **P8** — incident response
- **P9** — KB-backfill / документация
- **P10** — глубинное исследование
- **P11** — emergency hotfix

Полные тексты — в MainCore канонической версии. При новой PX-сессии **скопируй промпт** из `c:\Projects\MainCore\core\CEO_PROMPTS.md` и вставь в задание.

---

## Project-specific дополнения

- **KB-маркер** (Закон 20 §H) обязателен в финале P0/P1/P2/P4/P6/P10 — формат:
  `> KB: updated [[Ofnstube/<Note1>]], [[Ofnstube/<Note2>]]`
  или `> KB: skip — <reason>`

- **Restaurant-specific verify checks** (обязательны для любого UI-PX):
  - LMIV: каждое блюдо в `data/menu.json` имеет `data-allergens`
  - JuSchG: алкогольные напитки имеют `data-age-restriction="16"`
  - BFSG: нет `title=` на allergen-info без visible chip-row
  - Закон 21: 0 точек в `<h1-h4>`, `<button>`, `<a class*=cta>`
