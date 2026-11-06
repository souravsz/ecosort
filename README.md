# ecosort

Landing page, sorting game and achievements garden, built with React + TypeScript (Vite) and React Router.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # type-check + production build to dist/
npm run preview
```

## Routes

| Path            | Page                                                                        |
| --------------- | --------------------------------------------------------------------------- |
| `/`             | Landing: hero with the 6-item demo round, bin guide, class garden, CTA      |
| `/play`         | Game: fills 100dvh (all buckets visible), level info and guides below       |
| `/achievements` | Stats, garden (`?garden=1` opens it), badges, 50-level map                  |

It's a single-page app, so the host has to serve `index.html` for every route (SPA fallback).

## Layout

- `src/pages/` holds the three routes.
- `src/components/art/` holds `Bucket`, `ItemArt`, `Plant`/`ScaledPlant`, `Heart`, `Lock` and `MiniBin`, ported from `design/ecosort-art.js`.
- `src/components/ui/` holds `PaperCard` (paper card with washi tape), `OffsetButton` (ink-shadow button that lifts on hover and presses on click) and `Logo`.
- `src/components/` also holds `BinGuideCard` and `AccuracyChart`.
- `src/components/achievements/Garden.tsx` is the 10-plot garden.
- `src/components/game/useSortGame.ts` is the game loop: 6 s timer, scoring, lives, combo, locked bins, pause and game over, keys 1–5 and P, drag-to-bucket.
- `src/components/game/GameScreen.tsx` has the desktop and compact layouts. The compact one (buttons on top, tall mat, buckets, then the stats card) is used under 768px wide or under 780px tall.
- `src/lib/game.ts` holds the bins, items, level constants, scoring and the `ecosort.total` storage helpers.
- `src/lib/theme.ts` holds the colours, fonts and the wood and cutting-mat backgrounds.

## Saved progress

Each correct sort adds its points to the total in `localStorage["ecosort.total"]`. The achievements garden reads that total and grows one plant per 100 points: Seed 0, Sprout 20, Sapling 40, Bloom 70, Tree 100. When nothing is saved yet, the pages show the design's demo total of 228.

The design references (`design/*.dc.html`) are kept in `design/`.
