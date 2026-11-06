import type { ItemKind } from "@/components/art/ItemArt";
import type { BinDef } from "./theme";

export type GameItem = { name: string; kind: ItemKind; /** index into the bin list */ bin: number };

/* ---------------- Landing hero demo round (4 municipal bins) ---------------- */

export const HERO_BINS: BinDef[] = [
  { name: "Wet", color: "#4a7a2c", tint: "#dfe8d2", unlock: 0 },
  { name: "Dry", color: "#3f6fa8", tint: "#d6e2ee", unlock: 0 },
  { name: "Sanitary", color: "#c0456b", tint: "#f2d6df", unlock: 0 },
  { name: "Special care", color: "#d08a1e", tint: "#f6e2c2", unlock: 0 },
];

export const HERO_ITEMS: GameItem[] = [
  { name: "Banana peel", kind: "banana", bin: 0 },
  { name: "Plastic bottle", kind: "bottle", bin: 1 },
  { name: "Used tissue", kind: "tissue", bin: 2 },
  { name: "Battery", kind: "battery", bin: 3 },
  { name: "Leftover Roti", kind: "roti", bin: 0 },
  { name: "Newspaper", kind: "paper", bin: 1 },
];

/** Horizontal lane (0–1) for each hero item. */
export const HERO_XS = [0.5, 0.15, 0.8, 0.35, 0.65, 0.25];

export const HERO_ITEM_MS = 6000;
export const HERO_RESULT_MS = 1200;

/* ---------------- Full game (5 bins, 50 levels) ---------------- */

export const GAME_BINS: BinDef[] = [
  { name: "Wet", color: "#4a7a2c", tint: "#dfe8d2", unlock: 0 },
  { name: "Dry", color: "#3f6fa8", tint: "#d6e2ee", unlock: 0 },
  { name: "Hazard", color: "#d08a1e", tint: "#f6e2c2", unlock: 5 },
  { name: "E-waste", color: "#6b5fa8", tint: "#e2def2", unlock: 8 },
  { name: "Sanitary", color: "#c0456b", tint: "#f2d6df", unlock: 12 },
];

export const BIN_EXAMPLES = [
  "Food scraps, fruit and vegetable peels, tea leaves, flowers",
  "Paper, cardboard, plastic bottles, metal cans, glass",
  "Paint, cleaning chemicals, expired medicines, tube lights",
  "Phones, chargers, cables, batteries",
  "Diapers, sanitary pads, used tissues, bandages",
];

export const GAME_ITEMS: GameItem[] = [
  { name: "Leftover Roti", kind: "roti", bin: 0 },
  { name: "Newspaper", kind: "paper", bin: 1 },
  { name: "Plastic bottle", kind: "bottle", bin: 1 },
  { name: "Banana peel", kind: "banana", bin: 0 },
  { name: "Bruised apple", kind: "apple", bin: 0 },
];

export const GAME_XS = [0.1, 0.7, 0.4, 0.9, 0.2, 0.6, 0.5, 0.15, 0.85, 0.35, 0.75];

/** The level currently being played (the designs show level 3 of the journey). */
export const LEVEL = {
  number: 3,
  name: "Paper Or Peel",
  pack: "EcoSort India",
  target: 117,
  items: 11,
  speed: "Slow",
  totalLevels: 50,
};

export const ITEM_SECONDS = 6;
export const RESULT_MS = 1000;
export const START_LIVES = 3;

/** Points for a correct sort: base 4 + seconds left + 2 per combo step. */
export const pointsFor = (secondsLeft: number, combo: number) => 4 + secondsLeft + (combo - 1) * 2;

export const isUnlocked = (bin: BinDef, level = LEVEL.number) => !bin.unlock || level >= bin.unlock;

/* ---------------- Saved progress ---------------- */

export const TOTAL_KEY = "ecosort.total";

/** Demo total shown before anything has been saved (as in the designs). */
export const DEMO_TOTAL = 228;

export function readTotal(): number {
  if (typeof window === "undefined") return 0;
  try {
    const v = Number(window.localStorage.getItem(TOTAL_KEY));
    return Number.isFinite(v) && v > 0 ? v : 0;
  } catch {
    return 0;
  }
}

export function writeTotal(total: number) {
  try {
    window.localStorage.setItem(TOTAL_KEY, String(total));
  } catch {
    /* storage unavailable (private mode) — ignore */
  }
}

/* ---------------- Garden ---------------- */

export const PLANT_STAGES = ["Seed", "Sprout", "Sapling", "Bloom", "Tree"] as const;
export const STAGE_THRESHOLDS = [0, 20, 40, 70, 100];
export const POINTS_PER_PLANT = 100;
export const GARDEN_PLOTS = 10;

/** Stage index for the points inside one plot (0–100); -1 = empty plot. */
export function stageOf(p: number): -1 | 0 | 1 | 2 | 3 | 4 {
  return p >= 100 ? 4 : p >= 70 ? 3 : p >= 40 ? 2 : p >= 20 ? 1 : p > 0 ? 0 : -1;
}
