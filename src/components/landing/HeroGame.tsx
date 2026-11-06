import { useCallback, useEffect, useRef, useState } from "react";
import { Bucket } from "@/components/art/Bucket";
import { ItemArt } from "@/components/art/ItemArt";
import { HERO_BINS, HERO_ITEMS, HERO_ITEM_MS, HERO_RESULT_MS, HERO_XS } from "@/lib/game";
import { FREDOKA, INK, matBg } from "@/lib/theme";
import { useViewport } from "@/lib/useViewport";

type State = { i: number; picked: number | null; round: number };

const WOOD_CARD = {
  backgroundColor: "#dcbf92",
  backgroundImage:
    "repeating-linear-gradient(0deg,transparent 0 98px,rgba(110,70,30,.22) 98px 100px),repeating-linear-gradient(0deg,rgba(110,70,30,.05) 0 1px,transparent 1px 7px)",
};

/** Tabletop demo round in the landing hero: 6 items, pick a bin by click or keys 1–4. */
export function HeroGame() {
  const [s, setS] = useState<State>({ i: 0, picked: null, round: 0 });
  const ref = useRef(s);
  const fallTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const vp = useViewport();
  const mobile = vp.w < 640;
  const BS = mobile ? 0.6 : 0.72;

  const update = useCallback((fn: (s: State) => State) => {
    ref.current = fn(ref.current);
    setS(ref.current);
  }, []);

  const resolve = useCallback(
    (n: number) => {
      clearTimeout(fallTimer.current);
      const cur = ref.current;
      if (cur.picked !== null) return;
      update((x) => ({ ...x, picked: n }));
      nextTimer.current = setTimeout(() => {
        update((x) =>
          x.i === HERO_ITEMS.length - 1
            ? { picked: null, i: 0, round: x.round + 1 }
            : { ...x, picked: null, i: x.i + 1, round: x.round + 1 },
        );
        arm();
      }, HERO_RESULT_MS);
    },
    [update],
  );

  const arm = useCallback(() => {
    clearTimeout(fallTimer.current);
    fallTimer.current = setTimeout(() => resolve(-1), HERO_ITEM_MS);
  }, [resolve]);

  const pick = useCallback(
    (n: number) => {
      if (ref.current.picked === null) resolve(n);
    },
    [resolve],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 4) pick(n - 1);
    };
    window.addEventListener("keydown", onKey);
    arm();
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(fallTimer.current);
      clearTimeout(nextTimer.current);
    };
  }, [arm, pick]);

  const item = HERO_ITEMS[s.i];
  const res = s.picked !== null;
  const ok = res && s.picked === item.bin;
  const feedback = !res ? "" : ok ? "Right bin!" : `That goes in ${HERO_BINS[item.bin].name}.`;
  const feedbackColor = !res ? "#fbf8f0" : ok ? "#dfe8d2" : "#f6c9d6";

  return (
    <section style={{ position: "relative", fontFamily: FREDOKA, width: "100%", maxWidth: 560, justifySelf: "end" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "115%",
          aspectRatio: "1",
          borderRadius: "50%",
          background: "#dde8cc",
          left: "-22%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          ...WOOD_CARD,
          border: `2px solid ${INK}`,
          borderRadius: 24,
          boxShadow: `8px 8px 0 ${INK}`,
          padding: "clamp(12px,1.6cqi,16px)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Mat */}
        <div
          style={{
            position: "relative",
            // +107px reclaims the space of the removed mini planter and its caption
            height: "calc(clamp(190px,24vh,240px) + 107px)",
            ...matBg(96),
            border: `2px solid ${INK}`,
            borderRadius: 16,
            boxShadow: `4px 4px 0 ${INK}`,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 2,
              background: "#fbf8f0",
              border: `1.5px solid ${INK}`,
              borderRadius: 4,
              padding: "3px 10px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              transform: "rotate(-2deg)",
            }}
          >
            Which bin?
          </span>
          <div
            key={s.round}
            style={{
              position: "absolute",
              left: `calc(8px + ${HERO_XS[s.i]} * (100% - 136px))`,
              width: 120,
              animation: `hfall ${HERO_ITEM_MS / 1000}s linear both`,
              animationPlayState: res ? "paused" : "running",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                animation: res ? (ok ? "gone .45s .2s ease-in forwards" : "shake .4s") : "pop .35s both",
              }}
            >
              <div style={{ position: "relative", width: 80, height: 80 }}>
                <div
                  style={{
                    position: "absolute",
                    left: 12,
                    right: 12,
                    bottom: -6,
                    height: 12,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,.32)",
                    filter: "blur(4px)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    animation: "sway 1.8s ease-in-out infinite",
                  }}
                >
                  <ItemArt kind={item.kind} scale={0.95} />
                </div>
              </div>
              <span
                style={{
                  background: "#fbf8f0",
                  color: INK,
                  border: `2px solid ${INK}`,
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontWeight: 600,
                  fontSize: 15,
                  whiteSpace: "nowrap",
                  boxShadow: `3px 3px 0 ${INK}`,
                  transform: "rotate(-2deg)",
                }}
              >
                {item.name}
              </span>
            </div>
          </div>
          <span
            aria-live="polite"
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              bottom: 10,
              zIndex: 2,
              textAlign: "center",
              fontSize: 14,
              fontWeight: 600,
              color: feedbackColor,
            }}
          >
            {feedback}
          </span>
        </div>

        {/* Instruction strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#fbf8f0",
            border: `2px solid ${INK}`,
            borderRadius: 6,
            boxShadow: `3px 3px 0 ${INK}`,
            padding: "8px 12px",
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              flex: "none",
              borderRadius: "50%",
              border: `2px solid ${INK}`,
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              boxSizing: "border-box",
            }}
          >
            {HERO_ITEMS.length - s.i}
          </span>
          <div style={{ fontSize: 13, lineHeight: 1.3, color: "#5d6a58" }}>
            <strong style={{ color: INK, fontWeight: 600, fontSize: 15 }}>Pick the right bin</strong>
            <br />
            Tap a bin, or press 1 to 4 on your keyboard.
          </div>
        </div>

        {/* Bins */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 8, paddingTop: 2 }}>
          {HERO_BINS.map((b, n) => {
            const hit = res && n === item.bin;
            const wrong = res && n === s.picked && !ok;
            const dim = res && !hit && !wrong;
            return (
              <button
                key={b.name}
                type="button"
                onClick={() => pick(n)}
                aria-label={`${b.name} bin (key ${n + 1})`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  minWidth: 0,
                  transform: hit ? "translateY(-8px)" : "none",
                  opacity: dim ? 0.5 : 1,
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
                    height: Math.round(128 * BS),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      bottom: -4,
                      left: "50%",
                      width: 64,
                      marginLeft: -32,
                      height: 12,
                      borderRadius: "50%",
                      background: "rgba(70,40,15,.35)",
                      filter: "blur(2px)",
                    }}
                  />
                  <div style={{ position: "relative" }}>
                    <Bucket color={b.color} name={b.name} scale={BS} />
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 5,
                    border: `2px solid ${INK}`,
                    background: hit ? b.color : b.tint,
                    color: hit ? "#fff" : INK,
                    boxShadow: `2px 2px 0 ${INK}`,
                    transform: `rotate(${n % 2 ? 2 : -2}deg)`,
                    transition: "background .2s",
                  }}
                >
                  Key {n + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
