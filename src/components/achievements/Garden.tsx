import { Plant } from "@/components/art/Plant";
import { OffsetButton } from "@/components/ui/OffsetButton";
import { GARDEN_PLOTS, PLANT_STAGES, POINTS_PER_PLANT, STAGE_THRESHOLDS, stageOf } from "@/lib/game";
import { INK, PAPER } from "@/lib/theme";

type GardenProps = {
  total: number;
  open: boolean;
  onToggle: () => void;
};

/** "Your garden": 10 plots, each grown from seed to tree by 100 points of total score. */
export function Garden({ total, open, onToggle }: GardenProps) {
  const trees = Math.min(GARDEN_PLOTS, Math.floor(total / POINTS_PER_PLANT));
  const cur = total % POINTS_PER_PLANT;
  const nextT = STAGE_THRESHOLDS.find((t) => t > cur) ?? POINTS_PER_PLANT;
  const note =
    trees >= GARDEN_PLOTS
      ? `${total} points. Your garden is full.`
      : `${total} points grown · next stage in ${nextT - cur} points`;

  return (
    <section
      style={{
        position: "relative",
        background: "#3d6a2a",
        border: `2px solid ${INK}`,
        borderRadius: 18,
        boxShadow: `6px 6px 0 ${INK}`,
        padding: "clamp(16px,2.6cqi,26px)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <h2 style={{ margin: 0, fontSize: "clamp(22px,3cqi,28px)", fontWeight: 700, color: PAPER }}>Your garden</h2>
          <span style={{ fontSize: 15, color: "#dfe8d2" }}>Every 100 points grows one plant from seed to tree.</span>
        </div>
        <OffsetButton
          shadow={3}
          hover="none"
          onClick={onToggle}
          aria-expanded={open}
          style={{ background: PAPER, color: INK, padding: "11px 22px", fontSize: 16, fontWeight: 600 }}
        >
          {open ? "Hide garden" : "Show your garden"}
        </OffsetButton>
      </div>

      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ position: "relative", paddingTop: 44 }}>
            {/* signpost */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  background: "#a0703f",
                  color: PAPER,
                  border: `2px solid ${INK}`,
                  borderRadius: 4,
                  padding: "3px 12px",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Our garden
              </span>
              <span
                style={{
                  width: 6,
                  height: 22,
                  background: "#7a5230",
                  borderLeft: `2px solid ${INK}`,
                  borderRight: `2px solid ${INK}`,
                  borderBottom: `2px solid ${INK}`,
                }}
              />
            </div>
            {/* planter */}
            <div
              style={{
                background: "#a0703f",
                backgroundImage: "repeating-linear-gradient(0deg,transparent 0 22px,rgba(60,30,10,.25) 22px 24px)",
                border: `2px solid ${INK}`,
                borderRadius: 12,
                padding: 12,
                boxShadow: `4px 4px 0 ${INK}`,
              }}
            >
              <div
                style={{
                  backgroundColor: "#6e4a2a",
                  backgroundImage: "radial-gradient(rgba(255,255,255,.12) 1.5px,transparent 1.5px)",
                  backgroundSize: "14px 14px",
                  border: `2px solid ${INK}`,
                  borderRadius: 6,
                  padding: "14px 10px 0",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))",
                  gap: "8px 6px",
                }}
              >
                {Array.from({ length: GARDEN_PLOTS }, (_, i) => {
                  const p = Math.max(0, Math.min(POINTS_PER_PLANT, total - i * POINTS_PER_PLANT));
                  const st = stageOf(p);
                  return (
                    <div
                      key={i}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingBottom: 10 }}
                    >
                      <div style={{ height: 116, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                        <div
                          key={`${i}-${st}`}
                          style={{
                            animation: st >= 0 ? `plotgrow .6s ${i * 0.06}s cubic-bezier(.3,1.4,.5,1) both` : "none",
                            transformOrigin: "bottom center",
                          }}
                        >
                          {st === -1 ? (
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                border: "2px dashed #c9a77a",
                                display: "grid",
                                placeItems: "center",
                                color: "#c9a77a",
                                fontWeight: 700,
                                marginBottom: 6,
                              }}
                            >
                              +
                            </div>
                          ) : (
                            <Plant stage={st} />
                          )}
                        </div>
                      </div>
                      <span style={{ width: 70, height: 10, borderRadius: "50%", background: "#4e321b", marginTop: -8 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#f0e6d8" }}>
                        {st === -1 ? "Empty" : PLANT_STAGES[st]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                background: PAPER,
                border: `2px solid ${INK}`,
                borderRadius: 6,
                padding: "8px 14px",
                fontSize: 15,
                fontWeight: 500,
                boxShadow: `3px 3px 0 ${INK}`,
              }}
            >
              {note}
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {PLANT_STAGES.map((n, i) => (
                <span
                  key={n}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: INK,
                    background: "#dfe8d2",
                    border: `1.5px solid ${INK}`,
                    borderRadius: 999,
                    padding: "2px 10px",
                  }}
                >
                  {n} · {STAGE_THRESHOLDS[i]}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
