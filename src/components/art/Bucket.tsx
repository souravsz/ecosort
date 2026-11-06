import { FREDOKA, INK } from "@/lib/theme";
import { abs } from "./shared";

type BucketProps = {
  color: string;
  name: string;
  locked?: boolean;
  /** Scale factor; the bucket is 104×128 at scale 1. Below .7 it switches to the "mini" style. */
  scale?: number;
};

const TRAP = "polygon(0 0,100% 0,91% 100%,9% 100%)";

/** Flat illustrated waste bucket with handle, rim and paper name label. */
export function Bucket({ color, name, locked = false, scale = 1 }: BucketProps) {
  const s = scale;
  const k = (v: number) => v * s;
  const mini = s < 0.7;
  const col = locked ? "#bfc2b8" : color;
  const bw = mini ? 2 : 2.5;
  const labelInset = mini ? -3 : s < 1 ? k(2) : 14;
  const fontSize = mini ? 10.5 : s < 1 ? (name.length > 7 ? 11 : 13) : name.length > 7 ? 12 : 15;

  return (
    <div style={{ position: "relative", width: k(104), height: k(128), flex: "none" }}>
      {/* handle */}
      <div
        style={abs({
          left: k(27),
          top: 0,
          width: k(50),
          height: k(24),
          borderTop: `${mini ? 2 : 3}px solid ${INK}`,
          borderLeft: `${mini ? 2 : 3}px solid ${INK}`,
          borderRight: `${mini ? 2 : 3}px solid ${INK}`,
          borderRadius: `${k(30)}px ${k(30)}px 0 0`,
        })}
      />
      {/* rim */}
      <div
        style={abs({
          left: k(2),
          top: k(16),
          width: k(100),
          height: k(16),
          background: col,
          border: `${bw}px solid ${INK}`,
          borderRadius: k(6),
          zIndex: 2,
        })}
      >
        <div style={abs({ left: 0, right: 0, bottom: 0, height: "45%", background: "rgba(0,0,0,.18)" })} />
      </div>
      {/* body outline */}
      <div style={abs({ left: k(8), top: k(30), width: k(88), height: k(98), background: INK, clipPath: TRAP })} />
      {/* body fill */}
      <div
        style={abs({
          left: k(8) + bw,
          top: k(30),
          width: k(88) - 2 * bw,
          height: k(98) - bw,
          background: col,
          clipPath: TRAP,
        })}
      >
        <div style={abs({ left: 0, right: 0, top: 0, height: k(10), background: "rgba(0,0,0,.14)" })} />
        <div
          style={abs({
            left: k(18),
            top: k(70),
            width: k(4),
            height: k(16),
            background: "rgba(255,255,255,.4)",
            borderRadius: 2,
          })}
        />
        <div
          style={abs({
            right: k(18),
            top: k(70),
            width: k(4),
            height: k(16),
            background: "rgba(255,255,255,.4)",
            borderRadius: 2,
          })}
        />
      </div>
      {/* name label */}
      <div
        style={abs({
          left: labelInset,
          right: labelInset,
          top: k(48),
          minHeight: mini ? 20 : k(30),
          zIndex: 3,
          background: "#fbf8f0",
          border: `${mini ? 1.5 : 2}px solid ${INK}`,
          borderRadius: mini ? 4 : 5,
          display: "grid",
          placeItems: "center",
          padding: mini ? "1px 2px" : "2px 4px",
          whiteSpace: "nowrap",
          fontFamily: FREDOKA,
          fontSize,
          fontWeight: 700,
          lineHeight: 1.05,
          textAlign: "center",
          color: locked ? "#7a7f74" : INK,
        })}
      >
        {name}
      </div>
    </div>
  );
}

/** Small 34×42 bin glyph (from ecosort-art.js `bin`). */
export function MiniBin({ color, scale = 1, locked = false }: { color: string; scale?: number; locked?: boolean }) {
  const s = scale;
  const col = locked ? "#c4c8bd" : color;
  return (
    <div style={{ position: "relative", width: 34 * s, height: 42 * s, flex: "none" }}>
      <div
        style={abs({
          left: "50%",
          top: 0,
          width: 12 * s,
          height: 6 * s,
          marginLeft: -6 * s,
          borderTop: `2px solid ${INK}`,
          borderLeft: `2px solid ${INK}`,
          borderRight: `2px solid ${INK}`,
          borderRadius: "4px 4px 0 0",
        })}
      />
      <div
        style={abs({
          left: 0,
          right: 0,
          top: 5 * s,
          height: 7 * s,
          background: col,
          border: `2px solid ${INK}`,
          borderRadius: 3 * s,
        })}
      />
      <div
        style={abs({
          left: 3 * s,
          right: 3 * s,
          top: 11 * s,
          bottom: 0,
          background: col,
          borderLeft: `2px solid ${INK}`,
          borderRight: `2px solid ${INK}`,
          borderBottom: `2px solid ${INK}`,
          borderRadius: `0 0 ${6 * s}px ${6 * s}px`,
          display: "flex",
          justifyContent: "center",
          gap: 6 * s,
          paddingTop: 5 * s,
        })}
      >
        <span style={{ width: 2.5 * s, height: "58%", background: "rgba(255,255,255,.55)", borderRadius: 2 }} />
        <span style={{ width: 2.5 * s, height: "58%", background: "rgba(255,255,255,.55)", borderRadius: 2 }} />
      </div>
    </div>
  );
}
