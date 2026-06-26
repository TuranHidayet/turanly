"use client";

import { useEffect } from "react";

export function ScrollRestorer() {
  useEffect(() => {
    const saved = sessionStorage.getItem("scrollY");
    if (saved) {
      sessionStorage.removeItem("scrollY");
      const target = Number(saved);

      const scroll = () => window.scrollTo(0, target);
      requestAnimationFrame(scroll);
      setTimeout(scroll, 100);
      setTimeout(scroll, 300);
    }
  }, []);

  return null;
}
