import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  DEMO_TOTAL,
  GAME_BINS,
  GAME_ITEMS,
  ITEM_SECONDS,
  LEVEL,
  RESULT_MS,
  START_LIVES,
  isUnlocked,
  pointsFor,
  readTotal,
  writeTotal,
} from "@/lib/game";

export type Drag = { dx: number; dy: number; live: boolean };

export type GameState = {
  idx: number;
  stage: number;
  total: number;
  lives: number;
  combo: number;
  time: number;
  picked: number | null;
  paused: boolean;
  over: boolean;
  round: number;
  drag: Drag | null;
  msg: string;
};

const FRESH = "A fresh start. Make it count.";

/** Demo state matching the designs: item 3 of 11, stage score 13. */
const INITIAL: GameState = {
  idx: 2,
  stage: 13,
  total: DEMO_TOTAL,
  lives: START_LIVES,
  combo: 1,
  time: ITEM_SECONDS,
  picked: null,
  paused: false,
  over: false,
  round: 0,
  drag: null,
  msg: FRESH,
};

/**
 * Game loop for the sorting game: item timer, scoring, lives, combo,
 * locked bins, pause / game-over, keyboard (1–5, P) and drag-to-bucket.
 */
export function useSortGame() {
  const [state, setState] = useState<GameState>(INITIAL);
  const ref = useRef(state);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dragStart = useRef({ x: 0, y: 0 });

  /** Update state and keep the ref in sync immediately, so rapid inputs see the latest state. */
  const update = useCallback((patch: Partial<GameState> | ((s: GameState) => Partial<GameState>)) => {
    const p = typeof patch === "function" ? patch(ref.current) : patch;
    ref.current = { ...ref.current, ...p };
    setState(ref.current);
  }, []);

  const current = (s: GameState) => GAME_ITEMS[s.idx % GAME_ITEMS.length];

  const resolve = useCallback(
    (n: number) => {
      const s = ref.current;
      if (s.picked !== null) return;
      const item = current(s);
      const ok = n === item.bin;
      const pts = pointsFor(s.time, s.combo);
      const lives = ok ? s.lives : s.lives - 1;
      if (ok) writeTotal(s.total + pts);
      update({
        picked: n,
        stage: s.stage + (ok ? pts : 0),
        total: s.total + (ok ? pts : 0),
        combo: ok ? s.combo + 1 : 1,
        lives,
        msg: ok
          ? `Nice sort! +${pts}`
          : `${n < 0 ? "Too slow." : "Not quite."} ${item.name} goes in ${GAME_BINS[item.bin].name}.`,
      });
      clearTimeout(nextTimer.current);
      nextTimer.current = setTimeout(() => {
        if (lives <= 0) {
          update({ over: true });
          return;
        }
        update((x) => ({
          picked: null,
          drag: null,
          time: ITEM_SECONDS,
          idx: (x.idx + 1) % LEVEL.items,
          round: x.round + 1,
        }));
      }, RESULT_MS);
    },
    [update],
  );

  /** Try to sort into bin `n`. Returns true if the pick was accepted. */
  const pick = useCallback(
    (n: number): boolean => {
      const s = ref.current;
      if (s.paused || s.over || s.picked !== null) return false;
      const bin = GAME_BINS[n];
      if (!bin) return false;
      if (!isUnlocked(bin)) {
        update({ msg: `${bin.name} unlocks at level ${bin.unlock}.` });
        return false;
      }
      resolve(n);
      return true;
    },
    [resolve, update],
  );

  const togglePause = useCallback(() => {
    const s = ref.current;
    if (!s.over && s.picked === null) update({ paused: !s.paused });
  }, [update]);

  const restart = useCallback(() => {
    clearTimeout(nextTimer.current);
    update((s) => ({
      idx: 0,
      stage: 0,
      lives: START_LIVES,
      combo: 1,
      time: ITEM_SECONDS,
      picked: null,
      drag: null,
      over: false,
      paused: false,
      round: s.round + 1,
      msg: FRESH,
    }));
  }, [update]);

  /* ---- drag to bucket ---- */
  const onMove = useCallback(
    (e: PointerEvent) => {
      update({ drag: { dx: e.clientX - dragStart.current.x, dy: e.clientY - dragStart.current.y, live: true } });
    },
    [update],
  );

  const onUp = useCallback(
    (e: PointerEvent) => {
      window.removeEventListener("pointermove", onMove);
      const el = document
        .elementsFromPoint(e.clientX, e.clientY)
        .map((x) => x.closest?.("[data-bin]"))
        .find(Boolean);
      const n = el ? Number(el.getAttribute("data-bin")) : -1;
      if (n >= 0 && pick(n)) {
        update((s) => ({ drag: s.drag ? { ...s.drag, live: false } : null }));
        return;
      }
      update({ drag: null });
    },
    [onMove, pick, update],
  );

  const onItemPointerDown = useCallback(
    (e: ReactPointerEvent) => {
      const s = ref.current;
      if (s.picked !== null || s.paused || s.over) return;
      e.preventDefault();
      dragStart.current = { x: e.clientX, y: e.clientY };
      update({ drag: { dx: 0, dy: 0, live: true } });
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp, { once: true });
    },
    [onMove, onUp, update],
  );

  /* ---- lifecycle: saved total, keyboard, item timer ---- */
  useEffect(() => {
    const saved = readTotal();
    if (saved > 0) update({ total: saved });

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= GAME_BINS.length) pick(n - 1);
      if (e.key === "p" || e.key === "P") togglePause();
    };
    window.addEventListener("keydown", onKey);

    const iv = setInterval(() => {
      const s = ref.current;
      if (s.paused || s.over || s.picked !== null || s.drag) return;
      if (s.time <= 1) resolve(-1);
      else update({ time: s.time - 1 });
    }, 1000);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      clearInterval(iv);
      clearTimeout(nextTimer.current);
    };
  }, [onMove, onUp, pick, resolve, togglePause, update]);

  return { state, item: current(state), pick, togglePause, restart, onItemPointerDown };
}
