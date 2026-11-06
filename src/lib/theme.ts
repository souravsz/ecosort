import type { CSSProperties } from "react";

export const INK = "#1e3319";
export const GREEN = "#4a7a2c";
export const SAGE = "#eef0e9";
export const PAPER = "#fbf8f0";
export const WOOD = "#dcbf92";
export const MAT = "#3d6a2a";
export const MUTED = "#5d6a58";
export const TAPE = "rgba(160,196,120,.85)";

/**
 * Max page width: 1320px of content plus up to 32px side padding on each side.
 * Shared by every page so all sections line up.
 */
export const CONTENT_MAX = 1384;

export const OUTFIT = "var(--font-outfit), 'Outfit', sans-serif";
export const FREDOKA = "var(--font-fredoka), 'Fredoka', sans-serif";

/** Wood-grain tabletop used behind the game and achievements pages. */
export const WOOD_BG: CSSProperties = {
  backgroundColor: WOOD,
  backgroundImage:
    "repeating-linear-gradient(0deg,transparent 0 158px,rgba(110,70,30,.22) 158px 160px),repeating-linear-gradient(0deg,rgba(110,70,30,.05) 0 1px,transparent 1px 7px)",
};

/** Green cutting-mat sorting zone with major/minor grid lines. */
export const matBg = (major: number): CSSProperties => ({
  backgroundColor: MAT,
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.2) 1.5px,transparent 1.5px),linear-gradient(90deg,rgba(255,255,255,.2) 1.5px,transparent 1.5px),linear-gradient(rgba(255,255,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.09) 1px,transparent 1px)",
  backgroundSize: `${major}px ${major}px,${major}px ${major}px,24px 24px,24px 24px`,
  backgroundPosition: "-1px -1px",
});

/** Small uppercase label used across HUD cards. */
export const eyebrow: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: MUTED,
};

export type BinDef = {
  name: string;
  color: string;
  tint: string;
  /** Level at which the bin unlocks; 0 = open from the start. */
  unlock: number;
};
