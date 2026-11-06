import { ScaledPlant, type PlantStage } from "@/components/art/Plant";
import { GREEN, INK, OUTFIT } from "@/lib/theme";

const Y_LABELS: [string, string][] = [
  ["100%", "5.9%"],
  ["75%", "25.7%"],
  ["50%", "45.6%"],
  ["25%", "65.4%"],
  ["0%", "85.3%"],
];
const X_LABELS: [string, string][] = [
  ["Week 1", "18.75%"],
  ["Week 2", "42.2%"],
  ["Week 3", "65.6%"],
  ["Week 4", "89.1%"],
];
/** Data points in the 640×340 chart space; plants grow on weeks 2–4. */
const POINTS: [number, number][] = [
  [120, 155],
  [270, 120],
  [420, 85],
  [570, 52],
];
const PLANTS: [number, number, PlantStage][] = [
  [270, 120, 1],
  [420, 85, 2],
  [570, 52, 4],
];

const label = { position: "absolute", fontSize: 13, color: "#5d6a58" } as const;

/** "Class 6B accuracy" area chart with plants growing on the data points. */
export function AccuracyChart() {
  return (
    <div style={{ paddingTop: 44 }}>
      <div
        role="img"
        aria-label="Class accuracy rose each week over the last 4 weeks, reaching 86%."
        style={{ position: "relative", width: "100%", aspectRatio: "640/340" }}
      >
        {Y_LABELS.map(([t, top]) => (
          <span key={t} style={{ ...label, left: 0, top, transform: "translateY(-50%)" }}>
            {t}
          </span>
        ))}
        {X_LABELS.map(([t, left]) => (
          <span
            key={t}
            style={{
              position: "absolute",
              left,
              top: "95.5%",
              transform: "translate(-50%,-50%)",
              fontSize: 15,
              fontWeight: 500,
              color: "#3a4a36",
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </span>
        ))}
        <svg
          viewBox="0 0 640 340"
          width="100%"
          height="100%"
          style={{ display: "block", overflow: "visible", fontFamily: OUTFIT }}
          aria-hidden
        >
          <g stroke="#d8dccf" strokeWidth={1.5}>
            {[20, 87.5, 155, 222.5].map((y) => (
              <line key={y} x1={60} y1={y} x2={630} y2={y} />
            ))}
          </g>
          <line x1={56} y1={290} x2={630} y2={290} stroke={INK} strokeWidth={3} />
          <path
            d="M120 155 C 175 145, 210 125, 270 120 S 360 92, 420 85 S 520 58, 570 52 L 570 290 L 120 290 Z"
            fill="#dde8cc"
          />
          <path
            d="M120 155 C 175 145, 210 125, 270 120 S 360 92, 420 85 S 520 58, 570 52"
            fill="none"
            stroke={INK}
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <g fill="#fff" stroke={INK} strokeWidth={3}>
            {POINTS.map(([cx, cy]) => (
              <circle key={cx} cx={cx} cy={cy} r={8} />
            ))}
          </g>
        </svg>
        {PLANTS.map(([x, y, st]) => (
          <div
            key={x}
            style={{
              position: "absolute",
              left: `${(x / 640) * 100}%`,
              top: `${(y / 340) * 100}%`,
              transform: "translate(-50%,-100%)",
              marginTop: -6,
              pointerEvents: "none",
            }}
          >
            <ScaledPlant stage={st} scale={0.45} />
          </div>
        ))}
        <span
          style={{
            position: "absolute",
            right: -6,
            top: "22%",
            background: GREEN,
            color: "#fff",
            border: `2px solid ${INK}`,
            borderRadius: 999,
            padding: "4px 14px",
            fontWeight: 700,
            fontSize: 17,
            boxShadow: `2px 2px 0 ${INK}`,
          }}
        >
          86%
        </span>
      </div>
    </div>
  );
}
