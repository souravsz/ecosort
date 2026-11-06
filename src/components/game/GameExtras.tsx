import { useState, type CSSProperties } from "react";
import { BinGuideCard } from "@/components/BinGuideCard";
import { OffsetButton } from "@/components/ui/OffsetButton";
import { PaperCard } from "@/components/ui/PaperCard";
import { BIN_EXAMPLES, GAME_BINS, LEVEL, POINTS_PER_PLANT, isUnlocked } from "@/lib/game";
import { CONTENT_MAX, FREDOKA, GREEN, INK, MUTED, PAPER, WOOD_BG, eyebrow } from "@/lib/theme";

const h2: CSSProperties = { margin: 0, fontSize: "clamp(22px,3cqi,28px)", fontWeight: 700 };

const HOW_TO: string[] = [
  "Watch the item slide down the mat. You have 6 seconds.",
  "Drag it into the right bucket, tap the bucket, or press 1 to 5.",
  "Right answers score points and build your combo. Wrong ones cost a life.",
];

/** Everything below the 100dvh game screen: level info, progress, journey, bin guide, how to play. */
export function GameExtras({ total }: { total: number }) {
  const [journey, setJourney] = useState(false);
  const openBins = GAME_BINS.filter((b) => isUnlocked(b))
    .map((b) => b.name)
    .join(", ");
  const linkBtn: CSSProperties = { padding: "10px 20px", fontSize: 15, fontWeight: 600 };

  return (
    <div style={{ containerType: "inline-size", fontFamily: FREDOKA, color: INK, ...WOOD_BG }}>
      <div
        style={{
          maxWidth: CONTENT_MAX,
          margin: "0 auto",
          padding: "12px clamp(12px,3cqi,32px) 56px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 18 }}>
          <PaperCard
            rotate={-0.6}
            tape={{ at: "left", offset: 28, width: 70, height: 18, top: -10, rotate: -4 }}
            style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={eyebrow}>This level</span>
              <span style={{ fontSize: 24, fontWeight: 700 }}>
                Level {LEVEL.number} · {LEVEL.name}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 18px", fontSize: 15 }}>
              <span style={{ color: MUTED }}>Target</span>
              <span style={{ fontWeight: 600 }}>{LEVEL.target} points</span>
              <span style={{ color: MUTED }}>Items</span>
              <span style={{ fontWeight: 600 }}>{LEVEL.items}</span>
              <span style={{ color: MUTED }}>Speed</span>
              <span style={{ fontWeight: 600 }}>{LEVEL.speed}</span>
              <span style={{ color: MUTED }}>Bins</span>
              <span style={{ fontWeight: 600 }}>{openBins}</span>
            </div>
            <span style={{ fontSize: 14, color: "#3a4a36", borderTop: "1.5px dashed #c4b89c", paddingTop: 12 }}>
              Clear this level to grow a new plant in your garden.
            </span>
          </PaperCard>

          <PaperCard
            rotate={0.6}
            tape={{ at: "right", offset: 28, width: 70, height: 18, top: -10, rotate: 3 }}
            style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}
          >
            <span style={eyebrow}>Your progress</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 10 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>
                  {LEVEL.number}
                  <span style={{ fontSize: 15, color: MUTED }}> / {LEVEL.totalLevels}</span>
                </span>
                <span style={{ fontSize: 13, color: MUTED }}>Level</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, color: GREEN }}>{total}</span>
                <span style={{ fontSize: 13, color: MUTED }}>Total score</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{Math.floor(total / POINTS_PER_PLANT)}</span>
                <span style={{ fontSize: 13, color: MUTED }}>Plants grown</span>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "auto" }}>
              <OffsetButton
                href="/achievements"
                shadow={3}
                hover="nudge"
                press={false}
                style={{ ...linkBtn, background: GREEN, color: "#fff" }}
              >
                View achievements
              </OffsetButton>
              <OffsetButton
                href="/achievements?garden=1"
                shadow={3}
                hover="nudge"
                press={false}
                style={{ ...linkBtn, background: PAPER, color: INK }}
              >
                Show your garden
              </OffsetButton>
            </div>
          </PaperCard>
        </div>

        {/* Level journey */}
        <section
          style={{
            background: PAPER,
            border: `2px solid ${INK}`,
            borderRadius: 6,
            boxShadow: `3px 3px 0 ${INK}`,
            overflow: "hidden",
          }}
        >
          <button
            type="button"
            aria-expanded={journey}
            onClick={() => setJourney((j) => !j)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              background: "none",
              border: "none",
              padding: "14px 18px",
              fontFamily: "inherit",
              fontSize: 16,
              fontWeight: 600,
              color: INK,
              cursor: "pointer",
            }}
          >
            <span>
              Your level journey · {LEVEL.number} / {LEVEL.totalLevels}
            </span>
            <span style={{ display: "grid", transform: journey ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
          {journey && (
            <div style={{ padding: "4px 18px 18px", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Array.from({ length: LEVEL.totalLevels }, (_, n) => {
                const done = n < LEVEL.number - 1;
                const cur = n === LEVEL.number - 1;
                return (
                  <span
                    key={n}
                    aria-label={`Level ${n + 1}${done ? ", cleared" : cur ? ", current" : ""}`}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 12,
                      fontWeight: 600,
                      boxSizing: "border-box",
                      background: done ? GREEN : cur ? "#fff" : "#efe9dc",
                      color: done ? "#fff" : cur ? INK : "#9a8f78",
                      border: done || cur ? `2px solid ${INK}` : "1.5px dashed #c4b89c",
                      boxShadow: cur ? "0 0 0 3px #c9dcae" : "none",
                    }}
                  >
                    {n + 1}
                  </span>
                );
              })}
            </div>
          )}
        </section>

        {/* Bin guide */}
        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={h2}>Which bin is which</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))", gap: 14 }}>
            {GAME_BINS.map((b, n) => (
              <BinGuideCard
                key={b.name}
                variant="compact"
                name={b.name}
                color={b.color}
                tint={b.tint}
                examples={BIN_EXAMPLES[n]}
                unlock={b.unlock}
                locked={!isUnlocked(b)}
                rotate={n % 2 ? 0.5 : -0.5}
              />
            ))}
          </div>
        </section>

        {/* How to play */}
        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={h2}>How to play</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 14 }}>
            {HOW_TO.map((t, n) => (
              <div
                key={n}
                style={{
                  background: PAPER,
                  border: `2px solid ${INK}`,
                  borderRadius: 6,
                  boxShadow: `3px 3px 0 ${INK}`,
                  padding: 16,
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: GREEN,
                    color: "#fff",
                    border: `2px solid ${INK}`,
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                  }}
                >
                  {n + 1}
                </span>
                <span style={{ fontSize: 15, lineHeight: 1.4 }}>{t}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
