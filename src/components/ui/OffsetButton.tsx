import { Link } from "react-router-dom";
import type { CSSProperties, ReactNode } from "react";
import { INK } from "@/lib/theme";

type Common = {
  children: ReactNode;
  /** Offset shadow distance in px (also the press-down distance). */
  shadow?: number;
  /**
   * `lift`  – moves up-left by `lift` px and grows the shadow (landing page buttons)
   * `nudge` – moves up-left by 1px, shadow unchanged (game / achievements links)
   * `none`  – no hover movement
   */
  hover?: "lift" | "nudge" | "none";
  lift?: number;
  /** Press flat on click. */
  press?: boolean;
  style?: CSSProperties;
  className?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
};

type AsLink = Common & { href: string; onClick?: never; type?: never };
type AsButton = Common & { href?: undefined; onClick?: () => void; type?: "button" | "submit" };

export type OffsetButtonProps = AsLink | AsButton;

/** Pill / chip with a 2px ink border and solid offset shadow that lifts on hover and presses flat on click. */
export function OffsetButton(props: OffsetButtonProps) {
  const { children, shadow = 4, hover = "lift", lift = 2, press = true, style, className, href } = props;
  const vars = {
    "--ob-sh": `${shadow}px`,
    "--ob-lift": `${lift}px`,
    "--ob-hsh": `${shadow + lift}px`,
  } as CSSProperties;
  const base: CSSProperties = {
    border: `2px solid ${INK}`,
    borderRadius: 999,
    cursor: "pointer",
    fontFamily: "inherit",
    ...vars,
    ...style,
  };
  const data = { "data-hover": hover, "data-press": press ? "true" : "false" };
  const cls = ["ob", className].filter(Boolean).join(" ");

  if (href !== undefined) {
    if (href.startsWith("/")) {
      return (
        <Link to={href} className={cls} style={base} aria-label={props["aria-label"]} {...data}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} style={base} aria-label={props["aria-label"]} {...data}>
        {children}
      </a>
    );
  }
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={cls}
      style={base}
      aria-label={props["aria-label"]}
      aria-expanded={props["aria-expanded"]}
      {...data}
    >
      {children}
    </button>
  );
}
