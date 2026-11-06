import { INK } from "@/lib/theme";

/** Life heart: filled pink when `on`, faded outline when lost. */
export function Heart({ on }: { on: boolean }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill={on ? "#c0456b" : "none"}
      stroke={INK}
      strokeWidth={2}
      strokeLinejoin="round"
      style={{ opacity: on ? 1 : 0.35, transition: "all .2s" }}
      aria-hidden
    >
      <path d="M12 20s-7-4.4-9.2-8.8A5.2 5.2 0 0 1 12 6.4a5.2 5.2 0 0 1 9.2 4.8C19 15.6 12 20 12 20z" />
    </svg>
  );
}

/** Padlock used on locked bins. */
export function Lock() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#7a7f74" strokeWidth={2.6} strokeLinecap="round" aria-hidden>
      <rect x={5} y={11} width={14} height={10} rx={2} />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export const LEAF_PATH = "M5 19C5 10 11 5 20 4c-1 9-6 15-15 15z";
export const HEX_PATH = "M12 3l8 4.5v9L12 21l-8-4.5v-9z";
export const DROP_PATH = "M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z";
export const BOLT_PATH = "M13 2L5 14h6l-1 8 8-12h-6z";
