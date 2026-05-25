# Higgsfield Prompt-Kit — Ofnstube · Stage 1

`HIGGSFIELD-GUARD-MARKER`

Sammlung aller Bild- und Video-Prompts für die visuelle Ausstattung von Ofnstube. Solange ein
Prompt nicht von CEO freigegeben ist (Checkbox `[x]`), wird er **nicht** generiert.

---

## Workflow (§H' — verbindlich)

1. **VOR jeder Generierung** den Higgsfield-Kontostand prüfen (`balance`-Tool) und unten eintragen.
2. CEO prüft jeden Prompt und setzt `[x]` in der `Status`-Zeile.
3. Generierung **ohne** gesetzte Checkbox ist verboten (Higgsfield-guard-strike).
4. Generierte Assets ersetzen die SVG-Platzhalter in `assets/images/` bzw. die `.placeholder`-
   Marker in `assets/video/`. Danach Dateipfade in `data/menu.json` von `.svg` auf das reale
   Format umstellen.

**Higgsfield-Balance:** 67 Credits vor MVP · **55 Credits nach MVP** (Stage 1.6, 2026-05-25)

---

## GENERIERT — Stage 1.6 MVP (CEO-freigegeben, 60-Credit-Cap)

Modell `nano_banana_pro` · Resolution 2k · 2 Credits/Bild · **gesamt 12 Credits** (Cap 60 eingehalten).
Die Dateien liegen im Higgsfield-Konto. Zum Self-Host die `rawUrl` (PNG) herunterladen und unter
dem Zielpfad ablegen (Browser akzeptieren PNG unter `.jpg`-Namen; optional zu JPG konvertieren):

| Job-ID | Aspect | Zielpfad | Gericht |
|--------|--------|----------|---------|
| 839a31bd-3d4a-4da2-bbcb-dc281195f8ca | 3:4 | assets/images/menu/patty-classic.jpg | Der Klassiker |
| f86821d1-e86d-4eac-9df4-f44d2cab3bec | 3:4 | assets/images/menu/patty-bayer.jpg | Der Bayer |
| 97b502e5-be08-4ec2-bec5-04934f929e29 | 3:4 | assets/images/menu/patty-henne.jpg | Die Henne |
| 7cb9b48e-fba0-4e77-b772-fdf7743402e7 | 3:4 | assets/images/menu/patty-garten.jpg | Der Garten |
| ed4c775b-a456-4f5c-9d9b-46755a2ba4db | 3:4 | assets/images/menu/patty-wurzel.jpg | Die Wurzel |
| f98ba278-17bf-4cfe-a914-01944899ead2 | 16:9 | assets/images/hero-poster.jpg | Hero-Standbild |

Standardization-Prefix (CEO): matte black ceramic 26cm plate, dark walnut wood table,
smoked-black wall bokeh, single warm tungsten 45 Grad camera-left 3200K, 35 Grad elevated
3/4 view, burger centered 70% frame, pickle + grilled-shallot at 5 o'clock, ember-warm
grading, 35mm film grain. — Der Schmelzer und Der Rauch bleiben bewusst SVG-Platzhalter.

Code ist vorverdrahtet (`data/menu.json` + `index.html` → `.jpg`, mit `onerror`-Fallback
auf die SVG-Platzhalter, solange die JPGs noch nicht abgelegt sind).

**Geschätzte Gesamtkosten Vollausstattung:** ~360 Credits — vor weiterer Freigabe verifizieren

---

## Anti-Failure Food-Template

Jeder Food-Prompt baut auf diesem Grundgerüst auf:

```
top-down editorial shot, soft warm daylight, dark ceramic plate,
gentle steam rising, ember-warm color grading, no gore, no raw-meat
close-up, no glossy-CGI sheen, baker's bread bun, hand-cut produce visible,
shallow depth of field, 35mm film aesthetic
```

## Verbotene Prompt-Muster

- raw-meat / blood / gore close-up
- glossy CGI / over-rendered look
- AI-uncanny humans — Fokus strikt auf Gericht / Raum, keine Gesichter in Close-up
- bright-white studio / fluoreszierendes Licht — gebraucht wird Ember-Wärme
- Imitation realer Biermarken (Augustiner, Paulaner, Hofbräu, Spaten, Löwenbräu) — nur neutrale Etiketten

---

## A · Hero-Video & Standbild

### Prompt #001 — Hero Video Loop · Desktop 16:9
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~45 (Schätzung)
**Aspect ratio:** 16:9 · **Duration:** 6-8 sec · **Zieldatei:** `assets/video/hero-loop-desktop.mp4`
**Prompt:**
Slow cinematic loop of glowing embers in a craft restaurant oven, warm orange light pulsing
in the dark, faint smoke drifting upward, a cast-iron grill edge in soft focus foreground,
smoked-black background, ember-warm color grading, 35mm film grain, calm and gemütlich mood,
no people, no text, seamless loop.

### Prompt #002 — Hero Video Loop · Mobile 9:16
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~45 (Schätzung)
**Aspect ratio:** 9:16 · **Duration:** 6-8 sec · **Zieldatei:** `assets/video/hero-loop-mobile.mp4`
**Prompt:**
Vertical cinematic loop of glowing oven embers, warm orange glow rising through dark smoke,
close crop on the ember bed, smoked-black surroundings, ember-warm grading, 35mm film grain,
quiet Bavarian-craft atmosphere, no people, no text, seamless loop.

### Prompt #003 — Hero Poster · Standbild 16:9
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 (Schätzung)
**Aspect ratio:** 16:9 · **Zieldatei:** `assets/images/hero-poster.jpg`
**Prompt:**
Still frame of a craft restaurant oven with a glowing ember bed, warm orange light against a
smoked-black interior, gentle smoke, soft depth of field, ember-warm color grading, 35mm film
aesthetic, no people, no text.

---

## B · Burger Food-Photos (3:4)

### Prompt #004 — Der Klassiker
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/patty-classic.jpg`
**Prompt:** [Food-Template] craft beef burger with aged cheddar, fresh farm salad, heirloom
tomato, red onion, ember sauce, sesame bun, dark ceramic plate.

### Prompt #005 — Der Bayer
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/patty-bayer.jpg`
**Prompt:** [Food-Template] craft beef burger with alpine mountain cheese, braised roasted
onions, mustard sauerkraut, dark pretzel bun, dark ceramic plate.

### Prompt #006 — Der Schmelzer
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/patty-schmelzer.jpg`
**Prompt:** [Food-Template] double-patty craft burger with three melting cheeses and
caramelised onion, visible cheese pull, dark ceramic plate.

### Prompt #007 — Der Rauch
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/patty-rauch.jpg`
**Prompt:** [Food-Template] beechwood-smoked craft beef burger with crispy bacon, BBQ ember
sauce and cheddar, gentle smoke, dark ceramic plate.

### Prompt #008 — Die Henne
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/patty-henne.jpg`
**Prompt:** [Food-Template] buttermilk-baked chicken fillet burger with slaw and honey-mustard
mayo, sesame bun, dark ceramic plate.

### Prompt #009 — Der Garten
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/patty-garten.jpg`
**Prompt:** [Food-Template] vegetarian burger with grilled king-oyster-mushroom patty,
halloumi, roasted summer vegetables, yoghurt-mint, dark ceramic plate.

### Prompt #010 — Die Wurzel
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/patty-wurzel.jpg`
**Prompt:** [Food-Template] vegan burger with beetroot-bean patty, cashew ember cream, rocket
and pickled onion, dark ceramic plate.

---

## C · Beilagen & Nachspeisen (3:4)

### Prompt #011 — Glut-Pommes
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/side-glut-pommes.jpg`
**Prompt:** [Food-Template] oven-roasted potato wedges with ember salt and a small bowl of
herb aioli, dark ceramic plate.

### Prompt #012 — Obatzda-Brett
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/side-obatzda.jpg`
**Prompt:** [Food-Template] Bavarian obatzda spread with radishes, red onion and warm pretzel
pieces on a wooden board.

### Prompt #013 — Süßkartoffel-Fritten
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/side-suesskartoffel.jpg`
**Prompt:** [Food-Template] sweet-potato fries with smoked paprika and a bowl of chipotle dip,
dark ceramic plate.

### Prompt #014 — Apfelkücherl
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/dessert-apfelkuecherl.jpg`
**Prompt:** [Food-Template] warm apple fritters dusted with cinnamon sugar, small jug of
vanilla cream, dark ceramic plate.

### Prompt #015 — Schoko-Glut-Küchlein
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 3:4 · **Zieldatei:** `assets/images/menu/dessert-schoko-glut.jpg`
**Prompt:** [Food-Template] warm molten chocolate cake with a flowing centre and a quenelle of
salted-caramel ice cream, dark ceramic plate.

---

## D · Interior Shots (16:9) — Stube-Atmosphäre

### Prompt #016 — Gaststube weit
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 16:9 · **Zieldatei:** `assets/images/interior/interior-stube.jpg`
**Prompt:** Cosy modern Bavarian craft restaurant dining room, warm ember lighting, dark wood
and bone-coloured walls, simple wooden tables, soft glow, empty room, no people, 35mm film
aesthetic, ember-warm color grading.

### Prompt #017 — Glut-Ofen Detail
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 16:9 · **Zieldatei:** `assets/images/interior/interior-glut.jpg`
**Prompt:** Close detail of a craft restaurant oven with a glowing ember bed, warm orange light,
dark smoked surroundings, gentle smoke, no people, ember-warm grading, 35mm film aesthetic.

### Prompt #018 — Tischszene
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 16:9 · **Zieldatei:** `assets/images/interior/interior-tisch.jpg`
**Prompt:** A laid wooden restaurant table seen from the side, bone-coloured ceramics, warm
candle glow, dark cosy background, no people, ember-warm grading, shallow depth of field.

### Prompt #019 — Theke / Tresen
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 16:9 · **Zieldatei:** `assets/images/interior/interior-theke.jpg`
**Prompt:** Craft restaurant service counter in dark wood with warm pendant lights, neutral
unlabelled beer taps, bone and ember tones, no people, 35mm film aesthetic.

### Prompt #020 — Eingang / Fassade
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 16:9 · **Zieldatei:** `assets/images/interior/interior-eingang.jpg`
**Prompt:** Evening exterior of a small craft restaurant in a Munich side street, warm light
spilling from the windows, smoked-black facade, no readable signage, no people, ember-warm
color grading, 35mm film aesthetic.

### Prompt #021 — Material-Detail
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 16:9 · **Zieldatei:** `assets/images/interior/interior-detail.jpg`
**Prompt:** Macro detail of craft textures — charred oak wood grain, a bone-coloured ceramic
edge and a faint ember glow, warm tones, shallow depth of field, no people, no text.

---

## OG-Bild (separat)

### Prompt #022 — Open-Graph Default
**Status:** Approved by CEO: [ ]
**Estimated credits:** ~9 · **Aspect ratio:** 1200×630 · **Zieldatei:** `assets/images/og/og-default.jpg`
**Prompt:** Craft burger on a dark ceramic plate beside a glowing ember bed, warm orange light,
smoked-black background, ample negative space on one side for later text overlay, ember-warm
grading, 35mm film aesthetic, no text.
