# Ecosort — implementation prompt

Build the Ecosort website and game exactly as shown in `Ecosort-all-designs.html` (open it in a browser; every screen is shown at desktop 1280px and mobile 390px).

**Stack:** any (React/Next.js preferred). Fully responsive. No UI library styling; replicate the visuals pixel-close.

**Visual system**
- Fonts: Outfit (landing page), Fredoka (game, achievements, game card in hero). Google Fonts.
- Colors: ink `#1e3319`, green `#4a7a2c`, sage bg `#eef0e9`, paper `#fbf8f0`, wood `#dcbf92`, cutting mat `#3d6a2a`, light green `#dde8cc`/`#c9dcae`.
- Bin colors (solid / tint): Wet `#4a7a2c`/`#dfe8d2`, Dry `#3f6fa8`/`#d6e2ee`, Sanitary `#c0456b`/`#f2d6df`, Special care & Hazard `#d08a1e`/`#f6e2c2`, E-waste `#6b5fa8`/`#e2def2`, General `#7a7f74`/`#e6e8e1`.
- Every card, button and chip: 2px ink border + solid offset shadow (`3–8px 3–8px 0 #1e3319`). Buttons lift on hover and press flat on click.
- Tabletop look for the game: wood-grain table background, paper cards rotated ±1° with green washi tape, green cutting-mat sorting zone with grid lines.
- Buckets, items and garden plants are flat illustrations built from simple shapes with ink outlines (reference: `ecosort-art.js`). Replace with real SVG/PNG art where available.

**Pages**
1. **Landing** — nav; hero (copy left, interactive game card right in tabletop style, fits one viewport); "What goes in each bin" (4 bin cards); "One class, one garden" (5 steps + accuracy chart with plants on points); green CTA with garden strip; footer. Hero card plays a 6-item round: items slide down the mat in 6s, pick by click or keys 1–4, correct answers grow plants in the mini planter.
2. **Game** — must fill exactly 100dvh on desktop and mobile (buckets always visible), extra content below. HUD: Paper Or Peel, Level 3 · EcoSort India, Target 117 · Item x of 11, stage score/total, 3 lives, 6s item timer, ruler progress bar, combo. Items fall down the mat; drag into a bucket, tap a bucket, or press 1–6. Wet/Dry open; Hazard/E-waste/Sanitary/General locked (levels 5/8/12/15). Pause, game-over and level journey (50 levels). Below: this level, progress, bin guide, how to play. Mobile: compact header with icon buttons, single row of 6 buckets. Also use compact layout on short desktops (<780px tall).
3. **Achievements** — stats, "Your garden" (Show your garden toggle; 10 plots, every 100 points grows a plant: Seed 0, Sprout 20, Sapling 40, Bloom 70, Tree 100), 8 badges with progress, 50-level map with stars and bin-unlock markers. Garden grows from the saved total game score.

Keep all copy exactly as in the designs.
