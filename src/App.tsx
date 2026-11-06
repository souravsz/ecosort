import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AchievementsPage from "./pages/AchievementsPage";
import LandingPage from "./pages/LandingPage";
import PlayPage from "./pages/PlayPage";

/** Scroll to the top on route changes (but leave in-page #anchors alone). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
