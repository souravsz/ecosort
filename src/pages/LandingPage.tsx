import type { CSSProperties } from "react";
import { AccuracyChart } from "@/components/AccuracyChart";
import { BinGuideCard } from "@/components/BinGuideCard";
import type { ItemKind } from "@/components/art/ItemArt";
import { BOLT_PATH, DROP_PATH, HEX_PATH, LEAF_PATH } from "@/components/art/Icons";
import { ScaledPlant, type PlantStage } from "@/components/art/Plant";
import { HeroGame } from "@/components/landing/HeroGame";
import { Logo } from "@/components/ui/Logo";
import { OffsetButton } from "@/components/ui/OffsetButton";
import { CONTENT_MAX, GREEN, INK, MUTED, OUTFIT, SAGE } from "@/lib/theme";
import { usePageChrome } from "@/lib/usePageChrome";

const GUIDE: { name: string; color: string; tint: string; blurb: string; item: ItemKind; examples: string[] }[] = [
  {
    name: "Wet",
    color: "#4a7a2c",
    tint: "#dde8cc",
    blurb: "Anything that rots. It becomes compost.",
    item: "banana",
    examples: ["Fruit and vegetable peels", "Leftover food", "Used tea leaves", "Flowers and garden leaves"],
  },
  {
    name: "Dry",
    color: "#3f6fa8",
    tint: "#d6e2ee",
    blurb: "Clean, dry things that can be recycled.",
    item: "bottle",
    examples: ["Plastic bottles and bags", "Paper and cardboard", "Glass and metal cans", "Empty rice and milk packets"],
  },
  {
    name: "Sanitary",
    color: "#c0456b",
    tint: "#f2d6df",
    blurb: "Wrap it in paper and mark it before it goes out.",
    item: "tissue",
    examples: ["Diapers and sanitary pads", "Used masks and gloves", "Bandages and cotton", "Used tissues"],
  },
  {
    name: "Special care",
    color: "#d08a1e",
    tint: "#f6e2c2",
    blurb: "Harmful items. Hand them to a collection point.",
    item: "battery",
    examples: ["Batteries and bulbs", "Old phones and chargers", "Paint and chemical tins", "Expired medicines"],
  },
];

const STEPS: [string, string][] = [
  ["Create a game", "Pick a grade level and get a six-letter join code."],
  ["Students join", "They open ecosort on any phone and type the code."],
  ["Sort for 60 seconds", "Twenty everyday items, one at a time, into the four bins."],
  ["Talk about the misses", "See the items most students got wrong, with the reason for each."],
  ["Watch the garden grow", "Every correct sort adds a plant to the class garden."],
];

const CTA_LEFT: [PlantStage, number][] = [
  [4, 0.7],
  [2, 0.8],
  [1, 0.45],
];
const CTA_RIGHT: [PlantStage, number][] = [
  [3, 0.6],
  [4, 0.75],
  [2, 0.8],
  [3, 0.55],
];

const h2: CSSProperties = {
  margin: 0,
  fontSize: "clamp(34px,4.6cqi,56px)",
  lineHeight: 1.02,
  fontWeight: 800,
  letterSpacing: "-0.035em",
};
const lede: CSSProperties = {
  margin: 0,
  fontSize: "clamp(17px,1.6cqi,20px)",
  lineHeight: 1.5,
  color: MUTED,
  textWrap: "pretty",
} as CSSProperties;
const card: CSSProperties = {
  background: "#fbfbf7",
  border: `2px solid ${INK}`,
  borderRadius: 22,
  boxShadow: `6px 6px 0 ${INK}`,
};
const bigBtn: CSSProperties = { padding: "15px 28px", fontWeight: 600, fontSize: 17, textAlign: "center" };

function Chip({ bg, path, first, join }: { bg: string; path: string; first?: boolean; join?: "round" }) {
  return (
    <span
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: bg,
        border: `2px solid ${INK}`,
        marginLeft: first ? 0 : -8,
        display: "grid",
        placeItems: "center",
      }}
    >
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth={2.6}
        strokeLinecap={join ? undefined : "round"}
        strokeLinejoin={join}
        aria-hidden
      >
        <path d={path} />
      </svg>
    </span>
  );
}

export default function LandingPage() {
  usePageChrome("ecosort — Learn to sort. Learn to care.", SAGE);
  return (
    <div
      style={{
        containerType: "inline-size",
        overflow: "hidden",
        position: "relative",
        background: SAGE,
        fontFamily: OUTFIT,
        color: INK,
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: CONTENT_MAX,
          margin: "0 auto",
          padding: "clamp(18px,2.5cqi,28px) clamp(18px,3cqi,32px) 0",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* ---------- Header ---------- */}
        <header
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, position: "relative", zIndex: 2 }}
        >
          <Logo />
          <nav className="nav-desktop" style={{ alignItems: "center", gap: 28, fontSize: 16, fontWeight: 500 }}>
            <a href="#how-it-works" className="navlink">
              How it works
            </a>
            <a href="#" className="navlink">
              For schools
            </a>
            <a href="#" className="navlink">
              For organisations
            </a>
            <OffsetButton
              href="/play"
              shadow={3}
              lift={1}
              style={{ background: GREEN, color: "#fff", padding: "10px 22px", fontWeight: 600 }}
            >
              Play free
            </OffsetButton>
          </nav>
          <div className="nav-mobile" style={{ alignItems: "center", gap: 10 }}>
            <OffsetButton
              href="/play"
              shadow={3}
              hover="none"
              press={false}
              style={{ background: GREEN, color: "#fff", padding: "9px 18px", fontWeight: 600, fontSize: 15 }}
            >
              Play free
            </OffsetButton>
            <button
              type="button"
              aria-label="Menu"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#fff",
                border: `2px solid ${INK}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                cursor: "pointer",
                padding: 0,
              }}
            >
              {[0, 1, 2].map((k) => (
                <span key={k} style={{ width: 16, height: 2, background: INK, borderRadius: 2 }} />
              ))}
            </button>
          </div>
        </header>

        {/* ---------- Hero ---------- */}
        <main
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))",
            gap: "clamp(40px,5cqi,64px)",
            alignItems: "center",
            marginTop: "clamp(48px,6cqi,96px)",
          }}
        >
          <section
            style={{ display: "flex", flexDirection: "column", gap: "clamp(22px,2.4cqi,28px)", position: "relative", zIndex: 1 }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(46px,6.6cqi,84px)",
                lineHeight: 0.98,
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              Learn to{" "}
              <span
                style={{
                  background: "linear-gradient(transparent 62%,#c9dcae 62%,#c9dcae 92%,transparent 92%)",
                  padding: "0 4px",
                }}
              >
                sort.
              </span>
              <br />
              Learn to <span style={{ color: GREEN }}>care.</span>
            </h1>
            <div
              style={
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  fontSize: "clamp(18px,1.8cqi,22px)",
                  lineHeight: 1.4,
                  textWrap: "pretty",
                  maxWidth: "34ch",
                } as CSSProperties
              }
            >
              <p style={{ margin: 0, fontWeight: 600 }}>A better waste habit starts with understanding.</p>
              <p style={{ margin: 0, color: MUTED }}>
                The simplest way to teach kids waste segregation: a game they’ll love.
              </p>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <OffsetButton href="/play" style={{ ...bigBtn, background: GREEN, color: "#fff" }}>
                Start sorting
              </OffsetButton>
              <OffsetButton href="#" style={{ ...bigBtn, background: "#fff", color: INK }}>
                Create a class game
              </OffsetButton>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 4 }}>
              <div style={{ display: "flex", flex: "none" }}>
                <Chip bg="#4a7a2c" path={LEAF_PATH} first />
                <Chip bg="#3f6fa8" path={HEX_PATH} join="round" />
                <Chip bg="#c0456b" path={DROP_PATH} join="round" />
                <Chip bg="#d08a1e" path={BOLT_PATH} join="round" />
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.4, color: MUTED }}>
                <strong style={{ color: INK, fontWeight: 600 }}>Wet, dry, sanitary and special care.</strong>
                <br />
                The same four bins your municipality collects.
              </p>
            </div>
          </section>

          <HeroGame />
        </main>
      </div>

      {/* ---------- White content panel: every section below the hero ---------- */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "clamp(56px,7cqi,96px)",
          // full-bleed: the side borders sit just outside the viewport so only the top edge + rounded corners show
          marginLeft: -2,
          marginRight: -2,
          background: "#fff",
          borderTop: `2px solid ${INK}`,
          borderLeft: `2px solid ${INK}`,
          borderRight: `2px solid ${INK}`,
          borderRadius: "clamp(28px,4cqi,56px) clamp(28px,4cqi,56px) 0 0",
        }}
      >
        <div
          style={{
            maxWidth: CONTENT_MAX,
            margin: "0 auto",
            padding: "clamp(56px,7cqi,112px) clamp(18px,3cqi,32px) 72px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          {/* ---------- What goes in each bin ---------- */}
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(28px,3.5cqi,44px)",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: "44rem" }}>
                <h2 style={h2}>What goes in each bin</h2>
                <p style={lede}>
                  Every item in the game belongs to one of these four bins. Learn the rule once and it works at home, at
                  school and on the street.
                </p>
              </div>
              <OffsetButton
                href="/play"
                style={{ background: "#fff", color: INK, padding: "12px 24px", fontWeight: 600, fontSize: 16 }}
              >
                Test yourself
              </OffsetButton>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(min(100%,max(calc((560px - 100cqi) * 999),min(calc(50% - 11px),max(190px,calc((900px - 100cqi) * 999))))),1fr))",
                gap: 22,
              }}
            >
              {GUIDE.map((g, n) => (
                <BinGuideCard key={g.name} {...g} itemTilt={n % 2 ? 14 : -12} />
              ))}
            </div>
          </section>

          {/* ---------- One class, one garden ---------- */}
          <section
            id="how-it-works"
            style={{
              marginTop: "clamp(80px,10cqi,128px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(28px,3.5cqi,44px)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: "44rem" }}>
              <h2 style={h2}>One class, one garden</h2>
              <p style={lede}>
                Run a game in any period. The whole class sorts together, and the class garden shows how the habit grows
                week by week.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: 24 }}>
              <div style={{ ...card, padding: "clamp(22px,3cqi,36px)", display: "flex", flexDirection: "column", gap: 28 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>How a class game works</h3>
                  <span style={{ fontSize: 15, color: MUTED }}>About five minutes, start to finish.</span>
                </div>
                <ol style={{ display: "flex", flexDirection: "column", gap: 22, margin: 0, padding: 0, listStyle: "none" }}>
                  {STEPS.map(([title, body], n) => {
                    const last = n === STEPS.length - 1;
                    return (
                      <li key={title} style={{ display: "flex", gap: 18, position: "relative" }}>
                        {!last && (
                          <span
                            aria-hidden
                            style={{
                              position: "absolute",
                              left: 19,
                              top: 44,
                              bottom: -22,
                              borderLeft: "2px dashed #b9c2ad",
                            }}
                          />
                        )}
                        <span
                          style={{
                            flex: "none",
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            border: `2px solid ${INK}`,
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 700,
                            boxSizing: "border-box",
                            background: last ? GREEN : "#dde8cc",
                            color: last ? "#fff" : INK,
                            position: "relative",
                          }}
                        >
                          {n + 1}
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 6 }}>
                          <span style={{ fontSize: 18, fontWeight: 600 }}>{title}</span>
                          <span style={{ fontSize: 15, lineHeight: 1.4, color: MUTED }}>{body}</span>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div style={{ ...card, padding: "clamp(22px,3cqi,36px)", display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Class 6B accuracy</h3>
                  <span style={{ fontSize: 14, color: MUTED }}>Last 4 weeks</span>
                </div>
                <AccuracyChart />
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "#f6e2c2",
                    border: `2px solid ${INK}`,
                    borderRadius: 12,
                    padding: "12px 16px",
                    fontSize: 15,
                    lineHeight: 1.4,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flex: "none",
                      width: 22,
                      height: 18,
                      border: `2px solid ${INK}`,
                      borderRadius: 3,
                      background: "#fbf8f0",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 2,
                      padding: "0 3px",
                    }}
                  >
                    <span style={{ height: 2, background: INK }} />
                    <span style={{ height: 2, background: INK, width: "60%" }} />
                  </span>
                  <span>
                    <strong style={{ fontWeight: 600 }}>Most missed this week:</strong> chips packets. They go in dry, not
                    wet.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- CTA ---------- */}
          <section
            style={{
              marginTop: "clamp(80px,10cqi,128px)",
              position: "relative",
              background: GREEN,
              border: `2px solid ${INK}`,
              borderRadius: 28,
              boxShadow: `8px 8px 0 ${INK}`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "clamp(48px,6cqi,80px) 24px clamp(120px,12cqi,150px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <h2
                style={
                  {
                    ...h2,
                    fontSize: "clamp(34px,4.6cqi,58px)",
                    color: "#fff",
                    maxWidth: "14ch",
                    textWrap: "balance",
                  } as CSSProperties
                }
              >
                Start your class garden this week
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(16px,1.5cqi,19px)",
                  lineHeight: 1.5,
                  color: "#eef3e6",
                  maxWidth: "34rem",
                }}
              >
                Free for schools, NGOs and resident welfare associations. Set up a game in under two minutes.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 6 }}>
                <OffsetButton
                  href="#"
                  style={{ background: "#fff", color: INK, padding: "14px 26px", fontWeight: 600, fontSize: 17 }}
                >
                  Create a class game
                </OffsetButton>
                <OffsetButton
                  href="/play"
                  style={{ background: "#2f5a1f", color: "#fff", padding: "14px 26px", fontWeight: 600, fontSize: 17 }}
                >
                  Play a round
                </OffsetButton>
              </div>
            </div>
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 34,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                padding: "0 clamp(12px,3cqi,40px)",
                pointerEvents: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                {CTA_LEFT.map(([st, sc], n) => (
                  <ScaledPlant key={n} stage={st} scale={sc} />
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                {CTA_RIGHT.map(([st, sc], n) => (
                  <ScaledPlant key={n} stage={st} scale={sc} />
                ))}
              </div>
            </div>
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 36,
                background: "#b98a63",
                borderTop: `2px solid ${INK}`,
              }}
            />
          </section>

          {/* ---------- Footer ---------- */}
          <footer
            style={{
              marginTop: "clamp(56px,7cqi,96px)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <Logo size={34} fontSize={22} iconSize={15} borderBox />
            <span style={{ fontSize: 15, color: MUTED }}>Made for schools across India.</span>
            <nav
              style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", fontSize: 15, fontWeight: 500, whiteSpace: "nowrap" }}
            >
              <a href="#" className="navlink">
                Bin guide
              </a>
              <a href="#" className="navlink">
                For schools
              </a>
              <a href="#" className="navlink">
                For organisations
              </a>
              <a href="#" className="navlink">
                Privacy
              </a>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
