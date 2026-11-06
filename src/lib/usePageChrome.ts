import { useEffect } from "react";

/** Sets the document title and the body background (visible on overscroll) for a page. */
export function usePageChrome(title: string, background: string) {
  useEffect(() => {
    document.title = title;
    const prev = document.body.style.background;
    document.body.style.background = background;
    return () => {
      document.body.style.background = prev;
    };
  }, [title, background]);
}
