import type { CSSProperties, ReactNode } from "react";
import { INK } from "@/lib/theme";
import { abs } from "./shared";

/** 0 Seed · 1 Sprout · 2 Sapling · 3 Bloom · 4 Tree */
export type PlantStage = 0 | 1 | 2 | 3 | 4;

const G = "#5f9a3a";
const L = "#8cbf5a";
const B = `2px solid ${INK}`;

const stem = (ht: number, w: number) => (
  <div
    key="s"
    style={abs({ left: "50%", bottom: 0, width: w, marginLeft: -w / 2, height: ht, background: G, border: B, borderRadius: 3 })}
  />
);

const leaf = (side: -1 | 1, y: number, s: number, k: string | number) => (
  <div
    key={k}
    style={abs({
      left: side < 0 ? "auto" : "calc(50% + 2px)",
      right: side < 0 ? "calc(50% + 2px)" : "auto",
      bottom: y,
      width: 18 * s,
      height: 10 * s,
      background: L,
      border: B,
      borderRadius: side < 0 ? "100% 0 100% 0" : "0 100% 0 100%",
      transform: `rotate(${side < 0 ? 18 : -18}deg)`,
      transformOrigin: side < 0 ? "right bottom" : "left bottom",
    })}
  />
);

const ball = (l: number, b: number, d: number, c: string, k: string | number) => (
  <div
    key={k}
    style={abs({ left: `calc(50% + ${l}px)`, bottom: b, width: d, height: d, borderRadius: "50%", background: c, border: B })}
  />
);

function parts(st: PlantStage): ReactNode[] {
  switch (st) {
    case 0:
      return [
        <div
          key={0}
          style={abs({
            left: "50%",
            bottom: -3,
            width: 16,
            height: 10,
            marginLeft: -8,
            background: "#7a5230",
            border: B,
            borderRadius: "50%",
          })}
        />,
      ];
    case 1:
      return [stem(24, 6), leaf(-1, 16, 1, 1), leaf(1, 20, 1, 2)];
    case 2:
      return [stem(50, 7), leaf(-1, 14, 1.1, 1), leaf(1, 24, 1.1, 2), leaf(-1, 34, 1, 3), leaf(1, 42, 0.9, 4)];
    case 3:
      return [
        stem(58, 7),
        leaf(-1, 14, 1.1, 1),
        leaf(1, 26, 1.1, 2),
        ...[
          [-7, 66],
          [7, 66],
          [-11, 54],
          [11, 54],
          [0, 46],
        ].map(([x, y], k) => ball(x - 8, y - 6, 16, "#e58aa8", "p" + k)),
        ball(-7, 56, 14, "#f2c94c", "c"),
      ];
    case 4:
      return [
        <div
          key="t"
          style={abs({ left: "50%", bottom: 0, width: 14, marginLeft: -7, height: 46, background: "#8a5a34", border: B, borderRadius: 3 })}
        />,
        ball(-40, 34, 44, G, 1),
        ball(-4, 34, 44, G, 2),
        ball(-28, 56, 56, L, 3),
      ];
  }
}

/** 96×116 garden plant illustration at one of five growth stages. */
export function Plant({ stage }: { stage: PlantStage }) {
  return <div style={{ position: "relative", width: 96, height: 116 }}>{parts(stage)}</div>;
}

/**
 * A plant scaled from its bottom-centre with negative margins so that it occupies
 * only its scaled footprint in layout (the `sc()` helper from the designs).
 */
export function ScaledPlant({ stage, scale, style }: { stage: PlantStage; scale: number; style?: CSSProperties }) {
  const s = scale;
  return (
    <div
      style={{
        width: 96,
        height: 116,
        transform: `scale(${s})`,
        transformOrigin: "bottom center",
        margin: `${-116 * (1 - s)}px ${-48 * (1 - s)}px 0`,
        ...style,
      }}
    >
      <Plant stage={stage} />
    </div>
  );
}
