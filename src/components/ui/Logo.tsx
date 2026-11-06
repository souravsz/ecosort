import { GREEN, INK } from "@/lib/theme";

type LogoProps = {
  /** Diameter of the round mark. */
  size?: number;
  fontSize?: number;
  fontWeight?: number;
  iconSize?: number;
  /** Draw the leaf midrib line (landing variant). */
  midrib?: boolean;
  gap?: number;
  letterSpacing?: string;
  /** Size the mark including its border (footer/achievements variants). */
  borderBox?: boolean;
};

/** Green leaf mark + "ecosort" wordmark. */
export function Logo({
  size = 36,
  fontSize = 24,
  fontWeight = 800,
  iconSize = 16,
  midrib = true,
  gap = 10,
  letterSpacing = "-0.02em",
  borderBox = false,
}: LogoProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap, fontWeight, fontSize, letterSpacing }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: GREEN,
          border: `2px solid ${INK}`,
          display: "grid",
          placeItems: "center",
          boxSizing: borderBox ? "border-box" : "content-box",
        }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth={midrib ? 2.4 : 2.8}
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M5 19C5 10 11 5 20 4c-1 9-6 15-15 15z" />
          {midrib && <path d="M5 19l8-8" />}
        </svg>
      </div>
      ecosort
    </div>
  );
}
