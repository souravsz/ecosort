import { Bucket } from "@/components/art/Bucket";
import { ItemArt, type ItemKind } from "@/components/art/ItemArt";
import { INK } from "@/lib/theme";

type FeatureProps = {
  variant?: "feature";
  name: string;
  color: string;
  tint: string;
  blurb: string;
  examples: string[];
  item: ItemKind;
  /** Tilt of the floating item above the bucket. */
  itemTilt: number;
};

type CompactProps = {
  variant: "compact";
  name: string;
  color: string;
  tint: string;
  examples: string;
  /** Level the bin unlocks at; 0 = open now. */
  unlock: number;
  locked: boolean;
  rotate: number;
};

/**
 * Bin explainer card.
 * - `feature`: large landing-page card with art header and bullet list.
 * - `compact`: tabletop paper card used on the game page ("Which bin is which").
 */
export function BinGuideCard(props: FeatureProps | CompactProps) {
  if (props.variant === "compact") return <CompactCard {...props} />;
  const { name, color, tint, blurb, examples, item, itemTilt } = props;
  return (
    <div
      style={{
        background: "#fbfbf7",
        border: `2px solid ${INK}`,
        borderRadius: 22,
        boxShadow: `6px 6px 0 ${INK}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background: tint,
          borderBottom: `2px solid ${INK}`,
          height: 190,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: 150, height: 170, marginBottom: -2 }}>
          <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)" }}>
            <Bucket color={color} name={name} scale={1.05} />
          </div>
          <div style={{ position: "absolute", left: "50%", top: -4, transform: `translateX(-50%) rotate(${itemTilt}deg)` }}>
            <ItemArt kind={item} scale={0.7} />
          </div>
        </div>
      </div>
      <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{name}</h3>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45, color: "#5d6a58" }}>{blurb}</p>
        </div>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {examples.map((ex) => (
            <li key={ex} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  flex: "none",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: color,
                  border: `1.5px solid ${INK}`,
                }}
              />
              {ex}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CompactCard({ name, color, tint, examples, unlock, locked, rotate }: CompactProps) {
  return (
    <div
      style={{
        background: "#fbf8f0",
        border: `2px solid ${INK}`,
        borderRadius: 6,
        boxShadow: `3px 3px 0 ${INK}`,
        padding: 14,
        display: "flex",
        gap: 14,
        alignItems: "center",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div style={{ flex: "none", width: 64, height: 80, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <Bucket color={color} name={name} locked={locked} scale={0.6} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <span style={{ fontSize: 18, fontWeight: 700 }}>{name}</span>
        <span style={{ fontSize: 14, lineHeight: 1.35, color: "#3a4a36" }}>{examples}</span>
        <span
          style={{
            alignSelf: "flex-start",
            marginTop: 4,
            fontSize: 12,
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: 4,
            border: locked ? "1.5px dashed #9a8f78" : `1.5px solid ${INK}`,
            background: locked ? "transparent" : tint,
            color: locked ? "#7a6e58" : INK,
          }}
        >
          {locked ? `Unlocks at level ${unlock}` : "Open in this level"}
        </span>
      </div>
    </div>
  );
}
