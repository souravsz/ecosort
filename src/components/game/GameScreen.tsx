import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { Bucket } from "@/components/art/Bucket";
import { Heart, Lock } from "@/components/art/Icons";
import { ItemArt } from "@/components/art/ItemArt";
import { OffsetButton } from "@/components/ui/OffsetButton";
import { PaperCard } from "@/components/ui/PaperCard";
import { GAME_BINS, GAME_XS, ITEM_SECONDS, LEVEL, isUnlocked, type GameItem } from "@/lib/game";
import { CONTENT_MAX, FREDOKA, GREEN, INK, MUTED, PAPER, WOOD_BG, eyebrow, matBg } from "@/lib/theme";
import type { GameState } from "./useSortGame";

export type Layout = {
  /** Compact layout (phones/small tablets, and desktops shorter than 780px). */
  compact: boolean;
  /** Bucket scale. */
  BS: number;
  /** Item art box size. */
  IS: number;
};

type Props = {
  layout: Layout;
  state: GameState;
  item: GameItem;
  pick: (n: number) => boolean;
  togglePause: () => void;
  restart: () => void;
  onItemPointerDown: (e: ReactPointerEvent) => void;
};

const pillBtn: CSSProperties = {
  background: PAPER,
  padding: "9px 18px",
  fontSize: 16,
  fontWeight: 600,
  color: INK,
};

/** The 100dvh play area: HUD, sorting mat with the falling item, and the bucket row. */
export function GameScreen(props: Props) {
  return props.layout.compact ? <CompactScreen {...props} /> : <DesktopScreen {...props} />;
}

/* ------------------------------------------------------------------ */
/* Desktop                                                             */
/* ------------------------------------------------------------------ */

function DesktopScreen({ layout, state: s, item, pick, togglePause, restart, onItemPointerDown }: Props) {
  return (
    <div style={{ containerType: "inline-size", fontFamily: FREDOKA, color: INK, ...WOOD_BG }}>
      <div
        style={{
          maxWidth: CONTENT_MAX,
          margin: "0 auto",
          padding: "clamp(14px,2.2cqi,24px) clamp(14px,3cqi,32px) clamp(16px,2.2cqi,24px)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(12px,1.5cqi,16px)",
          height: "100dvh",
        }}
      >
        <TopBar paused={s.paused} togglePause={togglePause} />

        {/* HUD */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "stretch" }}>
          <PaperCard
            rotate={-1}
            tape={{ at: "left", offset: 28, width: 76, height: 20, top: -11, rotate: -4 }}
            style={{ flex: "2 1 300px", padding: "18px 20px 16px", display: "flex", flexDirection: "column", gap: 10 }}
          >
            <h1 style={{ margin: 0, fontSize: "clamp(28px,4cqi,40px)", lineHeight: 1, fontWeight: 700, letterSpacing: "-0.01em" }}>
              {LEVEL.name}
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span
                style={{
                  background: "#dfe8d2",
                  border: `1.5px solid ${INK}`,
                  borderRadius: 999,
                  padding: "3px 12px",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Level {LEVEL.number} · {LEVEL.pack}
              </span>
              <span
                style={{
                  background: "#fff",
                  border: `1.5px solid ${INK}`,
                  borderRadius: 999,
                  padding: "3px 12px",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Target {LEVEL.target} · Item {s.idx + 1} of {LEVEL.items}
              </span>
            </div>
          </PaperCard>
          <PaperCard
            rotate={1}
            tape={{ at: "center", width: 52, height: 18, top: -10, rotate: 3 }}
            style={hudCard(2)}
          >
            <span style={eyebrow}>Stage score</span>
            <span style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, color: GREEN }}>{s.stage}</span>
            <span style={{ fontSize: 13, color: MUTED }}>Total {s.total}</span>
          </PaperCard>
          <PaperCard
            rotate={-1.5}
            tape={{ at: "center", width: 52, height: 18, top: -10, rotate: -3 }}
            style={hudCard(8)}
          >
            <span style={eyebrow}>Lives</span>
            <div style={{ display: "flex", gap: 2 }} aria-label={`${s.lives} of 3 lives`}>
              {[0, 1, 2].map((n) => (
                <Heart key={n} on={n < s.lives} />
              ))}
            </div>
          </PaperCard>
          <PaperCard
            rotate={1.2}
            tape={{ at: "center", width: 52, height: 18, top: -10, rotate: 2 }}
            style={hudCard(2)}
          >
            <span style={eyebrow}>Item time</span>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                lineHeight: 1,
                color: s.time <= 2 ? "#c0456b" : INK,
                transition: "color .2s",
              }}
            >
              {s.time}s
            </span>
          </PaperCard>
        </div>

        {/* Ruler progress */}
        <div
          style={{
            height: 16,
            flex: "none",
            backgroundColor: PAPER,
            backgroundImage: `repeating-linear-gradient(90deg,${INK} 0 1.5px,transparent 1.5px 12px)`,
            backgroundSize: "100% 6px",
            backgroundRepeat: "repeat-x",
            border: `2px solid ${INK}`,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: `3px 3px 0 ${INK}`,
          }}
        >
          <ProgressFill idx={s.idx} />
        </div>

        {/* Sorting mat */}
        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: 140,
            ...matBg(120),
            border: `2px solid ${INK}`,
            borderRadius: 18,
            boxShadow: `6px 6px 0 ${INK}`,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              zIndex: 1,
              background: PAPER,
              border: `1.5px solid ${INK}`,
              borderRadius: 4,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              transform: "rotate(-2deg)",
            }}
          >
            Sorting zone · {LEVEL.speed}
          </span>
          <span style={{ position: "absolute", top: 16, right: 16, zIndex: 1, fontSize: 13, fontWeight: 500, color: "#dfe8d2" }}>
            Drag the item into a bin
          </span>
          <FallingItem layout={layout} state={s} item={item} onPointerDown={onItemPointerDown} />
          {s.paused && <PausedCard compact={false} onResume={togglePause} />}
          {s.over && <GameOver compact={false} stage={s.stage} onRestart={restart} />}
        </div>

        {/* Message bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            background: PAPER,
            border: `2px solid ${INK}`,
            borderRadius: 6,
            boxShadow: `3px 3px 0 ${INK}`,
            padding: "10px 14px",
          }}
        >
          <span aria-live="polite" style={{ fontSize: 15, fontWeight: 500 }}>
            {s.msg}
          </span>
          <span
            style={{
              flex: "none",
              border: "2px solid #d08a1e",
              color: "#a8681a",
              borderRadius: 6,
              padding: "2px 10px",
              fontSize: 14,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".06em",
              transform: "rotate(-4deg)",
            }}
          >
            Combo {s.combo}
          </span>
        </div>

        <BinRow layout={layout} state={s} item={item} pick={pick} />
      </div>
    </div>
  );
}

const hudCard = (gap: number): CSSProperties => ({
  flex: "1 1 110px",
  padding: "14px 16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap,
});

/* ------------------------------------------------------------------ */
/* Compact (mobile + short desktop)                                    */
/* ------------------------------------------------------------------ */

function CompactScreen({ layout, state: s, item, pick, togglePause, restart, onItemPointerDown }: Props) {
  const label10: CSSProperties = { ...eyebrow, fontSize: 10 };
  return (
    <div style={{ fontFamily: FREDOKA, color: INK, ...WOOD_BG }}>
      <div
        style={{
          maxWidth: CONTENT_MAX,
          margin: "0 auto",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: "12px 12px 14px",
          boxSizing: "border-box",
        }}
      >
        {/* Top: buttons only */}
        <TopBar paused={s.paused} togglePause={togglePause} compact />

        {/* Sorting mat takes all the spare height */}
        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: 120,
            ...matBg(96),
            border: `2px solid ${INK}`,
            borderRadius: 16,
            boxShadow: `4px 4px 0 ${INK}`,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 1,
              background: PAPER,
              border: `1.5px solid ${INK}`,
              borderRadius: 4,
              padding: "3px 9px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              transform: "rotate(-2deg)",
            }}
          >
            Sorting zone · {LEVEL.speed}
          </span>
          <FallingItem layout={layout} state={s} item={item} onPointerDown={onItemPointerDown} />
          <span
            aria-live="polite"
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              bottom: 10,
              zIndex: 1,
              textAlign: "center",
              fontSize: 13,
              fontWeight: 500,
              color: PAPER,
            }}
          >
            {s.msg}
          </span>
          {s.paused && <PausedCard compact onResume={togglePause} />}
          {s.over && <GameOver compact stage={s.stage} onRestart={restart} />}
        </div>

        <BinRow layout={layout} state={s} item={item} pick={pick} />

        {/* Bottom: progress + stats card */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "none" }}>
          <div
            style={{
              flex: 1,
              height: 10,
              background: PAPER,
              border: `2px solid ${INK}`,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <ProgressFill idx={s.idx} />
          </div>
          <span
            style={{
              flex: "none",
              fontSize: 12,
              fontWeight: 600,
              background: PAPER,
              border: `1.5px solid ${INK}`,
              borderRadius: 4,
              padding: "1px 6px",
            }}
          >
            Target {LEVEL.target} · {s.idx + 1}/{LEVEL.items}
          </span>
        </div>

        <PaperCard
          shadow={3}
          tape={{ at: "center", width: 52, height: 16, top: -9, rotate: -3 }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", flex: "none" }}
        >
          <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={label10}>Stage score</span>
            <span style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, color: GREEN }}>{s.stage}</span>
            <span style={{ fontSize: 11, color: MUTED }}>Total {s.total}</span>
          </div>
          <div
            style={{
              padding: "8px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              borderLeft: "1.5px dashed #c4b89c",
              borderRight: "1.5px dashed #c4b89c",
            }}
          >
            <span style={label10}>Lives</span>
            <div style={{ display: "flex" }} aria-label={`${s.lives} of 3 lives`}>
              {[0, 1, 2].map((n) => (
                <Heart key={n} on={n < s.lives} />
              ))}
            </div>
          </div>
          <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={label10}>Item time</span>
            <span style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, color: s.time <= 2 ? "#c0456b" : INK }}>
              {s.time}s
            </span>
            <span style={{ fontSize: 11, color: MUTED }}>Combo {s.combo}</span>
          </div>
        </PaperCard>
      </div>
    </div>
  );
}

/** Home · Pause · Settings pill buttons, shared by both layouts (slightly smaller when compact). */
function TopBar({
  paused,
  togglePause,
  compact = false,
}: {
  paused: boolean;
  togglePause: () => void;
  compact?: boolean;
}) {
  const pill: CSSProperties = compact ? { ...pillBtn, padding: "8px 15px", fontSize: 15 } : pillBtn;
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flex: "none" }}>
      <OffsetButton
        href="/"
        shadow={3}
        hover="none"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: PAPER,
          padding: compact ? "6px 14px 6px 6px" : "7px 16px 7px 7px",
          fontSize: compact ? 15 : 16,
          fontWeight: 600,
          color: INK,
        }}
      >
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: GREEN,
            border: `2px solid ${INK}`,
            display: "grid",
            placeItems: "center",
            boxSizing: "border-box",
          }}
        >
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.8} strokeLinecap="round" aria-hidden>
            <path d="M5 19C5 10 11 5 20 4c-1 9-6 15-15 15z" />
          </svg>
        </span>
        Home
      </OffsetButton>
      <div style={{ display: "flex", gap: compact ? 8 : 10 }}>
        <OffsetButton shadow={3} hover="none" onClick={togglePause} style={pill}>
          {paused ? "Resume" : "Pause"}
        </OffsetButton>
        <OffsetButton shadow={3} hover="none" style={pill}>
          Settings
        </OffsetButton>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function ProgressFill({ idx }: { idx: number }) {
  return (
    <div
      style={{
        height: "100%",
        width: `${((idx + 1) / LEVEL.items) * 100}%`,
        background: GREEN,
        borderRight: `2px solid ${INK}`,
        boxSizing: "border-box",
        transition: "width .4s",
      }}
    />
  );
}

function FallingItem({
  layout,
  state: s,
  item,
  onPointerDown,
}: {
  layout: Layout;
  state: GameState;
  item: GameItem;
  onPointerDown: (e: ReactPointerEvent) => void;
}) {
  const { compact, IS } = layout;
  const res = s.picked !== null;
  const ok = res && s.picked === item.bin;
  const d = s.drag;
  const x = GAME_XS[s.idx % GAME_XS.length];
  return (
    <div
      key={s.round}
      onPointerDown={onPointerDown}
      style={{
        position: "absolute",
        left: compact ? `calc(8px + ${x} * (100% - 136px))` : `calc(16px + ${x} * (100% - 182px))`,
        width: compact ? 120 : 150,
        zIndex: d ? 20 : 2,
        touchAction: "none",
        userSelect: "none",
        cursor: res ? "default" : d ? "grabbing" : "grab",
        animation: `${compact ? "gfallm" : "gfall"} ${ITEM_SECONDS}s linear both`,
        animationPlayState: res || s.paused || s.over || d ? "paused" : "running",
      }}
    >
      <div
        style={{
          transform: d ? `translate(${d.dx}px,${d.dy}px) rotate(-4deg) scale(1.05)` : "none",
          transition: d && d.live ? "none" : "transform .25s",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            animation: res ? (ok ? "gonegame .4s .1s ease-in forwards" : "shake .4s") : "pop .35s both",
          }}
        >
          <div style={{ position: "relative", width: IS, height: IS }}>
            <div
              style={{
                position: "absolute",
                left: 14,
                right: 14,
                bottom: d ? -18 : -6,
                height: 14,
                borderRadius: "50%",
                background: "rgba(0,0,0,.32)",
                filter: "blur(4px)",
                transition: "bottom .2s",
              }}
            />
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <ItemArt kind={item.kind} scale={compact ? 0.95 : 1.25} />
            </div>
          </div>
          <span
            style={{
              background: PAPER,
              color: INK,
              border: `2px solid ${INK}`,
              padding: compact ? "4px 12px" : "6px 16px",
              borderRadius: 6,
              fontWeight: 600,
              fontSize: compact ? 14 : 16,
              whiteSpace: "nowrap",
              boxShadow: `3px 3px 0 ${INK}`,
              transform: "rotate(-2deg)",
            }}
          >
            {item.name}
          </span>
        </div>
      </div>
    </div>
  );
}

function BinRow({
  layout,
  state: s,
  item,
  pick,
}: {
  layout: Layout;
  state: GameState;
  item: GameItem;
  pick: (n: number) => boolean;
}) {
  const { compact, BS } = layout;
  const res = s.picked !== null;
  const ok = res && s.picked === item.bin;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GAME_BINS.length},minmax(0,1fr))`,
        gap: compact ? 4 : 10,
        paddingTop: compact ? 0 : 4,
        alignItems: compact ? "end" : undefined,
      }}
    >
      {GAME_BINS.map((b, n) => {
        const locked = !isUnlocked(b);
        const hit = res && n === item.bin;
        const wrong = res && n === s.picked && !ok;
        const dim = res && !hit && !wrong && !locked;
        return (
          <button
            key={b.name}
            type="button"
            data-bin={n}
            onClick={() => pick(n)}
            aria-disabled={locked || undefined}
            aria-label={locked ? `${b.name} bin, unlocks at level ${b.unlock}` : `${b.name} bin (key ${n + 1})`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              cursor: locked ? "not-allowed" : "pointer",
              transform: hit ? "translateY(-8px)" : "none",
              opacity: dim ? 0.5 : 1,
              minWidth: 0,
              animation: wrong ? "shake .4s" : "none",
              transition: "transform .2s,opacity .2s",
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
              color: "inherit",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: Math.round(128 * BS),
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  bottom: compact ? -4 : -6,
                  left: "50%",
                  width: compact ? 50 : 96,
                  marginLeft: compact ? -25 : -48,
                  height: compact ? 10 : 16,
                  borderRadius: "50%",
                  background: "rgba(70,40,15,.35)",
                  filter: compact ? "blur(2px)" : "blur(3px)",
                }}
              />
              <div style={{ position: "relative" }}>
                <Bucket color={b.color} name={b.name} locked={locked} scale={BS} />
              </div>
            </div>
            {compact ? (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#3a2a14",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  minHeight: 13,
                }}
              >
                {locked ? (
                  <>
                    <span style={{ display: "grid", transform: "scale(.8)" }}>
                      <Lock />
                    </span>
                    L{b.unlock}
                  </>
                ) : (
                  n + 1
                )}
              </span>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 64,
                  padding: "3px 10px",
                  borderRadius: 6,
                  boxSizing: "border-box",
                  background: locked ? "#ebe6da" : hit ? b.color : b.tint,
                  color: hit ? "#fff" : locked ? "#7a7f74" : INK,
                  border: locked ? "2px dashed #9a8f78" : `2px solid ${INK}`,
                  boxShadow: locked ? "none" : `2px 2px 0 ${INK}`,
                  fontSize: 13,
                  fontWeight: 600,
                  transform: `rotate(${n % 2 ? 2 : -2}deg)`,
                  transition: "background .2s,color .2s",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {locked ? (
                    <>
                      <span style={{ display: "grid" }}>
                        <Lock />
                      </span>
                      Level {b.unlock}
                    </>
                  ) : (
                    `Key ${n + 1}`
                  )}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function PausedCard({ compact, onResume }: { compact: boolean; onResume: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="Paused"
      style={{
        position: "absolute",
        top: compact ? 48 : 56,
        left: "50%",
        transform: "translateX(-50%) rotate(-1deg)",
        zIndex: 30,
        width: compact ? "86%" : "min(340px,86%)",
        background: PAPER,
        border: `2px solid ${INK}`,
        borderRadius: 6,
        boxShadow: `4px 4px 0 ${INK}`,
        padding: compact ? 14 : 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: compact ? 8 : 10,
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <span style={{ fontSize: compact ? 22 : 24, fontWeight: 700 }}>Paused</span>
      <span style={{ fontSize: compact ? 13 : 14, color: MUTED }}>
        {compact ? "Drop your own image onto the item." : "Drop your own images onto the item and the bins."}
      </span>
      <OffsetButton
        shadow={3}
        hover="none"
        press={false}
        onClick={onResume}
        style={{ background: GREEN, color: "#fff", padding: "10px 26px", fontSize: 16, fontWeight: 600 }}
      >
        Resume
      </OffsetButton>
    </div>
  );
}

function GameOver({ compact, stage, onRestart }: { compact: boolean; stage: number; onRestart: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="Out of lives"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        borderRadius: compact ? 14 : 16,
        background: "rgba(30,51,25,.55)",
        display: "grid",
        placeItems: "center",
        padding: compact ? 16 : 20,
      }}
    >
      <div
        style={{
          background: PAPER,
          border: `2px solid ${INK}`,
          borderRadius: 6,
          boxShadow: compact ? `4px 4px 0 ${INK}` : `5px 5px 0 ${INK}`,
          padding: compact ? "18px 22px" : "22px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: compact ? 6 : 8,
          textAlign: "center",
          transform: "rotate(-1.5deg)",
        }}
      >
        <span style={{ fontSize: compact ? 24 : 28, fontWeight: 700 }}>Out of lives</span>
        <span style={{ fontSize: compact ? 14 : 15, color: MUTED }}>
          Stage score {stage}. Target {LEVEL.target}.
        </span>
        <OffsetButton
          shadow={3}
          hover="none"
          press={false}
          onClick={onRestart}
          style={{
            marginTop: 6,
            background: GREEN,
            color: "#fff",
            padding: compact ? "10px 24px" : "11px 28px",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Play again
        </OffsetButton>
      </div>
    </div>
  );
}
