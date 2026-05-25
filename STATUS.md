# STATUS — Ofnstube

**Дата:** 2026-05-25
**Фаза:** Stage 2 ЗАКРЫТ — передача на Stage 3 (Claude Code: GitHub Pages deploy)

---

## Готово

- ✅ Stage 1.5 — асимметричный food-first редизайн дизайн-слоя
- ✅ Stage 1.6 — Higgsfield MVP: 6 фото (nano_banana_pro 2k, 12c из 60c-cap, balance 67→55).
  Claude Code скачал + оптимизировал (PNG→JPG, 48,8 MB → 1,2 MB), `.jpg` активны
- ✅ Stage 2 B1 — mobile: hero column на 375px (`min-width:0` + `overflow-wrap`)
- ✅ Stage 2 B2 — large-desktop: container-cap `@media 1920px`
- ✅ Stage 2 B3 — EN: lang.js + `data-en-html`; все 6 контент-страниц двуязычны
  (index 103 · menu 54 · reservation 70 · kontakt 52 · standort 59 · ueber-uns 72 · gesamt 482)
- ✅ F-07 Landa-review — PASS WITH NOTES
- ✅ Верификация host-tools: Закон 21 = 0 · dev-leak = 0 · 10/10 страниц целы · menu.json 5×.jpg

## Активно

- 🟢 **Stage 2 ЗАКРЫТ.** Ждёт Claude Code → Stage 3

## Blocked / Open Questions

- Логотип — CEO выбирает 1 из 3
- Контактные данные фиктивны · legal-страницы — anwaltliche Prüfung
- menu.html dish-карточки на EN остаются DE — нужен `description_en` в menu.json +
  i18n в menu-renderer (Stage 4)
- Legal-страницы body — намеренно DE (Rechtstexte)
- Higgsfield: spent 12c · balance 55c · полный prompt-list (22) — за CEO-approval
- `verify/acceptance.json` — Stage-0 gates устарели

## Next Phases

1. **Stage 3 (Claude Code):** `gh repo create Ofnstube-site` + GitHub Pages + CNAME
   `ofnstube.ais152.com` · post-deploy Landa-review (Tobias)
2. **Stage 4:** menu-renderer i18n (`description_en`), Legal-Finalisierung,
   restliche Higgsfield-Assets (Interior/Team), real-data backfill
