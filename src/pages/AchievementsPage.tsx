import { useState, type CSSProperties } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Garden } from "@/components/achievements/Garden";
import { BOLT_PATH, DROP_PATH, HEX_PATH, LEAF_PATH } from "@/components/art/Icons";
import { Logo } from "@/components/ui/Logo";
import { PaperCard } from "@/components/ui/PaperCard";
import { DEMO_TOTAL, GAME_BINS, GARDEN_PLOTS, LEVEL, POINTS_PER_PLANT, isUnlocked, readTotal } from "@/lib/game";
import { CONTENT_MAX, FREDOKA, GREEN, INK, MUTED, PAPER, WOOD, WOOD_BG, eyebrow } from "@/lib/theme";
import { usePageChrome } from "@/lib/usePageChrome";

type BadgeDef = { name: string; desc: string; value: number; max: number; color: string };

const ICONS = [LEAF_PATH, BOLT_PATH, DROP_PATH, HEX_PATH];

/** Bin-unlock marker colours on the level map. */
const UNLOCK_MARK: Record<number, string> = Object.fromEntries(
  GAME_BINS.filter((b) => b.unlock).map((b) => [b.unlock, b.color]),
);
/** Stars earned on cleared levels (level 1: 3 stars, level 2: 2 stars). */
const STARS_OF = [3, 2];

const h2: CSSProperties = { margin: 0, fontSize: "clamp(22px,3cqi,28px)", fontWeight: 700 };

export default function AchievementsPage() {
  usePageChrome("Your achievements · ecosort", WOOD);
  const [params] = useSearchParams();
  const [open, setOpen] = useState(() => params.get("garden") === "1");
  const [total] = useState(() => readTotal() || DEMO_TOTAL);

  const trees = Math.min(GARDEN_PLOTS, Math.floor(total / POINTS_PER_PLANT));
  const unlockedBins = GAME_BINS.filter((b) => isUnlocked(b)).length;
  const badges: BadgeDef[] = [
    { name: "First sort", desc: "Sort your first item.", value: 1, max: 1, color: "#4a7a2c" },
    { name: "Combo 5", desc: "Get a 5-item combo.", value: 1, max: 1, color: "#d08a1e" },
    { name: "Clean level", desc: "Finish a level without losing a life.", value: 1, max: 1, color: "#3f6fa8" },
    { name: "Paper trail", desc: "Sort 50 dry items.", value: 41, max: 50, color: "#3f6fa8" },
    { name: "Hazard unlocked", desc: "Reach level 5.", value: LEVEL.number, max: 5, color: "#d08a1e" },
    { name: "Green thumb", desc: "Grow 3 trees in your garden.", value: Math.min(trees, 3), max: 3, color: "#4a7a2c" },
    { name: "Speed sorter", desc: "Sort an item with 5 seconds left.", value: 0, max: 1, color: "#c0456b" },
    { name: "All five bins", desc: "Unlock every bin.", value: unlockedBins, max: GAME_BINS.length, color: "#6b5fa8" },
  ];
  const earned = badges.filter((b) => b.value >= b.max).length;
  const stats: [string, string][] = [
    ["Levels", `${LEVEL.number} / ${LEVEL.totalLevels}`],
    ["Total score", String(total)],
    ["Badges", `${earned} / ${badges.length}`],
  ];

  return (
    <div style={{ containerType: "inline-size", fontFamily: FREDOKA, color: INK, ...WOOD_BG, minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: CONTENT_MAX,
          margin: "0 auto",
          padding: "clamp(14px,3cqi,32px) clamp(12px,3cqi,32px) 64px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(22px,3cqi,32px)",
        }}
      >
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <Link
            to="/play"
            className="ob"
            data-hover="nudge"
            style={
              {
                "--ob-sh": "3px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: PAPER,
                border: `2px solid ${INK}`,
                borderRadius: 999,
                padding: "8px 18px 8px 12px",
                fontSize: 16,
                fontWeight: 600,
                color: INK,
              } as CSSProperties
            }
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 6l-6 6 6 6" />
            </svg>
            Back to game
          </Link>
          <Link to="/" aria-label="ecosort home" style={{ color: INK }}>
            <Logo size={32} fontSize={22} fontWeight={700} iconSize={14} midrib={false} gap={8} letterSpacing="normal" borderBox />
          </Link>
        </header>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "stretch" }}>
          <PaperCard
            rotate={-1}
            tape={{ at: "left", offset: 28, width: 76, height: 20, top: -11, rotate: -4 }}
            style={{ flex: "2 1 300px", padding: 20, display: "flex", flexDirection: "column", gap: 6 }}
          >
            <h1 style={{ margin: 0, fontSize: "clamp(30px,4.4cqi,44px)", lineHeight: 1, fontWeight: 700 }}>Your achievements</h1>
            <span style={{ fontSize: 15, color: MUTED }}>
              Level {LEVEL.number} of {LEVEL.totalLevels} · {LEVEL.pack}
            </span>
          </PaperCard>
          {stats.map(([label, value], i) => (
            <PaperCard
              key={label}
              rotate={[1, -1.4, 1.1][i]}
              tape={{ at: "center", width: 52, height: 18, top: -10 }}
              style={{
                flex: "1 1 120px",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <span style={eyebrow}>{label}</span>
              <span style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{value}</span>
            </PaperCard>
          ))}
        </div>

        <Garden total={total} open={open} onToggle={() => setOpen((o) => !o)} />

        {/* Badges */}
        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={h2}>Badges</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 14 }}>
            {badges.map((b, n) => {
              const done = b.value >= b.max;
              return (
                <div
                  key={b.name}
                  style={{
                    background: PAPER,
                    border: `2px solid ${INK}`,
                    borderRadius: 6,
                    boxShadow: `3px 3px 0 ${INK}`,
                    padding: 16,
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    opacity: done ? 1 : 0.92,
                    transform: `rotate(${n % 2 ? 0.6 : -0.6}deg)`,
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background: done ? b.color : "#efe9dc",
                      border: done ? `2px solid ${INK}` : "2px dashed #b8ab90",
                      boxShadow: done ? `0 0 0 4px ${PAPER}, 0 0 0 6px ${INK}` : "none",
                    }}
                  >
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={done ? "#fff" : "#9a8f78"}
                      strokeWidth={2.6}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      aria-hidden
                    >
                      <path d={ICONS[n % 4]} />
                    </svg>
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0, flex: 1 }}>
                    <span style={{ fontSize: 17, fontWeight: 700 }}>{b.name}</span>
                    <span style={{ fontSize: 14, lineHeight: 1.3, color: "#3a4a36" }}>{b.desc}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                      <div
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={b.max}
                        aria-valuenow={Math.min(b.value, b.max)}
                        aria-label={`${b.name} progress`}
                        style={{
                          flex: 1,
                          height: 8,
                          background: "#efe9dc",
                          border: `1.5px solid ${INK}`,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${Math.min(1, b.value / b.max) * 100}%`,
                            background: done ? GREEN : b.color,
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: MUTED }}>
                        {done ? "Earned" : `${b.value} / ${b.max}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Level map */}
        <section
          style={{
            background: PAPER,
            border: `2px solid ${INK}`,
            borderRadius: 6,
            boxShadow: `4px 4px 0 ${INK}`,
            padding: "clamp(16px,2.6cqi,24px)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
            <h2 style={h2}>All levels</h2>
            <span style={{ fontSize: 14, color: MUTED }}>New bins unlock at levels 5, 8 and 12</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(56px,1fr))", gap: 10 }}>
            {Array.from({ length: LEVEL.totalLevels }, (_, i) => {
              const n = i + 1;
              const done = n < LEVEL.number;
              const cur = n === LEVEL.number;
              const stars = done ? STARS_OF[i] ?? 0 : 0;
              return (
                <div
                  key={n}
                  aria-label={`Level ${n}${done ? `, ${stars} stars` : cur ? ", current" : ""}`}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    boxSizing: "border-box",
                    background: done ? "#dfe8d2" : cur ? "#fff" : "#efe9dc",
                    color: done || cur ? INK : "#9a8f78",
                    border: done || cur ? `2px solid ${INK}` : "1.5px dashed #c4b89c",
                    boxShadow: cur ? `0 0 0 3px #c9dcae, 3px 3px 0 3px ${INK}` : done ? `2px 2px 0 ${INK}` : "none",
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{n}</span>
                  <div style={{ display: "flex", gap: 3, height: 7 }}>
                    {[0, 1, 2].map((k) => (
                      <span
                        key={k}
                        style={{
                          width: 7,
                          height: 7,
                          transform: "rotate(45deg)",
                          background: done && k < stars ? "#d08a1e" : "transparent",
                          border: done ? `1.5px solid ${INK}` : "1.5px solid #d0c6b0",
                          boxSizing: "border-box",
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ width: 18, height: 4, borderRadius: 2, background: UNLOCK_MARK[n] ?? "transparent" }} />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
