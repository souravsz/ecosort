import type { CSSProperties } from "react";

/** Absolutely-positioned, border-box style helper (mirrors `a()` in ecosort-art.js). */
export const abs = (st: CSSProperties): CSSProperties => ({
  position: "absolute",
  boxSizing: "border-box",
  ...st,
});
