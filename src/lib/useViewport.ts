import { useEffect, useState } from "react";

export type Viewport = { w: number; h: number };

const read = (): Viewport => ({ w: window.innerWidth, h: window.innerHeight });

/** Current window size, kept up to date on resize. */
export function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>(read);
  useEffect(() => {
    const onResize = () => setVp(read());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return vp;
}
