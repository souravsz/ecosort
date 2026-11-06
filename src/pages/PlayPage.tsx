import { GameExtras } from "@/components/game/GameExtras";
import { GameScreen, type Layout } from "@/components/game/GameScreen";
import { useSortGame } from "@/components/game/useSortGame";
import { LEVEL } from "@/lib/game";
import { WOOD } from "@/lib/theme";
import { usePageChrome } from "@/lib/usePageChrome";
import { useViewport } from "@/lib/useViewport";

/** Below this width the compact layout is used (the desktop HUD would wrap and push the buckets off-screen). */
const NARROW = 768;
/** Desktops shorter than this also use the compact layout. */
const SHORT_DESKTOP = 780;
/** Below this width the compact buckets are drawn smaller so all five fit. */
const PHONE = 480;

export default function PlayPage() {
  usePageChrome(`${LEVEL.name} · ecosort`, WOOD);
  const vp = useViewport();
  const game = useSortGame();

  const compact = vp.w < NARROW || vp.h < SHORT_DESKTOP;
  const layout: Layout = {
    compact,
    BS: compact ? (vp.w < PHONE ? 0.6 : 0.72) : 1,
    IS: compact ? 80 : 110,
  };

  return (
    <>
      <GameScreen
        layout={layout}
        state={game.state}
        item={game.item}
        pick={game.pick}
        togglePause={game.togglePause}
        restart={game.restart}
        onItemPointerDown={game.onItemPointerDown}
      />
      <GameExtras total={game.state.total} />
    </>
  );
}
