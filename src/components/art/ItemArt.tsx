import type { ReactNode } from "react";
import { INK } from "@/lib/theme";
import { abs } from "./shared";

export type ItemKind = "roti" | "bottle" | "paper" | "banana" | "apple" | "tissue" | "battery";

const O = `2.5px solid ${INK}`;

const ART: Record<ItemKind, () => ReactNode> = {
  roti: () => (
    <>
      <div style={abs({ left: 5, top: 5, width: 70, height: 70, borderRadius: "50%", background: "#e8b86b", border: O })} />
      {[
        [24, 22],
        [46, 18],
        [30, 42],
        [52, 44],
        [40, 58],
        [18, 50],
        [58, 30],
      ].map(([x, y], k) => (
        <div
          key={k}
          style={abs({ left: x, top: y, width: 7, height: 6, borderRadius: "50%", background: "#a86a2e" })}
        />
      ))}
    </>
  ),
  bottle: () => (
    <>
      <div style={abs({ left: 30, top: 2, width: 20, height: 11, background: "#3f6fa8", border: O, borderRadius: 3 })} />
      <div
        style={abs({
          left: 22,
          top: 11,
          width: 36,
          height: 66,
          background: "#d6e6f4",
          border: O,
          borderRadius: "14px 14px 8px 8px",
        })}
      />
      <div style={abs({ left: 22, top: 38, width: 36, height: 16, background: "#3f6fa8", border: O })} />
      <div style={abs({ left: 30, top: 20, width: 4, height: 14, background: "#fff", borderRadius: 2 })} />
    </>
  ),
  paper: () => (
    <div
      style={abs({
        left: 6,
        top: 12,
        width: 68,
        height: 56,
        background: "#f6f4ec",
        border: O,
        borderRadius: 4,
        transform: "rotate(-6deg)",
      })}
    >
      <div style={abs({ left: 7, top: 7, width: 48, height: 8, background: INK, borderRadius: 2 })} />
      <div style={abs({ left: 7, top: 22, width: 22, height: 3, background: "#9aa293" })} />
      <div style={abs({ left: 7, top: 30, width: 22, height: 3, background: "#9aa293" })} />
      <div style={abs({ left: 7, top: 38, width: 22, height: 3, background: "#9aa293" })} />
      <div style={abs({ left: 34, top: 21, width: 22, height: 22, background: "#c9dcae", border: `1.5px solid ${INK}` })} />
    </div>
  ),
  banana: () => (
    <>
      <div
        style={abs({
          left: 8,
          top: 24,
          width: 64,
          height: 30,
          background: "#f2c94c",
          border: O,
          borderRadius: "8px 8px 40px 40px / 8px 8px 30px 30px",
          transform: "rotate(-14deg)",
        })}
      />
      <div style={abs({ left: 8, top: 34, width: 9, height: 9, background: "#7a5230", borderRadius: 3 })} />
      <div style={abs({ left: 64, top: 18, width: 9, height: 9, background: "#7a5230", borderRadius: 3 })} />
    </>
  ),
  apple: () => (
    <>
      <div style={abs({ left: 38, top: 5, width: 5, height: 16, background: "#7a5230", borderRadius: 2 })} />
      <div
        style={abs({
          left: 43,
          top: 7,
          width: 18,
          height: 10,
          background: "#4a7a2c",
          border: `2px solid ${INK}`,
          borderRadius: "0 100% 0 100%",
        })}
      />
      <div
        style={abs({
          left: 11,
          top: 18,
          width: 58,
          height: 56,
          background: "#d9534f",
          border: O,
          borderRadius: "50% 50% 46% 46%",
        })}
      />
      <div style={abs({ left: 22, top: 30, width: 10, height: 10, background: "rgba(255,255,255,.6)", borderRadius: "50%" })} />
    </>
  ),
  tissue: () => (
    <>
      <div
        style={abs({
          left: 26,
          top: 14,
          width: 28,
          height: 28,
          background: "#fff",
          border: O,
          borderRadius: 4,
          transform: "rotate(45deg)",
        })}
      />
      <div style={abs({ left: 8, top: 34, width: 64, height: 38, background: "#f2d6df", border: O, borderRadius: 7 })} />
      <div style={abs({ left: 26, top: 40, width: 28, height: 6, background: "#c0456b", borderRadius: 3 })} />
    </>
  ),
  battery: () => (
    <>
      <div style={abs({ left: 33, top: 4, width: 14, height: 10, background: INK, borderRadius: 2 })} />
      <div
        style={abs({
          left: 22,
          top: 12,
          width: 36,
          height: 64,
          background: "#d08a1e",
          border: O,
          borderRadius: 7,
          overflow: "hidden",
        })}
      >
        <div style={abs({ left: 0, right: 0, bottom: 0, height: "45%", background: INK })} />
      </div>
      <div
        style={abs({
          left: 36,
          top: 24,
          width: 8,
          height: 16,
          background: "#fff",
          borderRadius: 2,
          clipPath: "polygon(60% 0,0 60%,45% 60%,35% 100%,100% 40%,55% 40%)",
        })}
      />
    </>
  ),
};

/** 80×80 flat waste-item illustration, scaled with a CSS transform (layout box stays 80×80). */
export function ItemArt({ kind, scale = 1 }: { kind: ItemKind; scale?: number }) {
  return (
    <div style={{ position: "relative", width: 80, height: 80, transform: `scale(${scale})` }}>{ART[kind]()}</div>
  );
}
