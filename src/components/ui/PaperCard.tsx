import type { CSSProperties, ReactNode } from "react";
import { INK, PAPER, TAPE } from "@/lib/theme";

export type Tape = {
  /** Horizontal anchor; `center` centres the strip on the card. */
  at: "left" | "right" | "center";
  /** Offset from the anchored edge (ignored for `center`). */
  offset?: number;
  width: number;
  height: number;
  top: number;
  rotate?: number;
};

type PaperCardProps = {
  children?: ReactNode;
  /** Card rotation in degrees (the tabletop cards sit at ±1°). */
  rotate?: number;
  /** Offset shadow distance in px. */
  shadow?: number;
  tape?: Tape;
  style?: CSSProperties;
  as?: "div" | "section";
};

/** Paper card on the tabletop: 2px ink border, offset shadow, optional green washi tape. */
export function PaperCard({ children, rotate = 0, shadow = 4, tape, style, as = "div" }: PaperCardProps) {
  const Tag = as;
  return (
    <Tag
      style={{
        position: "relative",
        background: PAPER,
        border: `2px solid ${INK}`,
        borderRadius: 6,
        boxShadow: `${shadow}px ${shadow}px 0 ${INK}`,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    >
      {tape && <WashiTape {...tape} />}
      {children}
    </Tag>
  );
}

export function WashiTape({ at, offset = 28, width, height, top, rotate }: Tape) {
  const pos: CSSProperties =
    at === "center" ? { left: "50%", marginLeft: -width / 2 } : at === "left" ? { left: offset } : { right: offset };
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        top,
        width,
        height,
        background: TAPE,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...pos,
      }}
    />
  );
}
