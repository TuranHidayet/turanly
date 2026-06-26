"use client";

import { useEffect } from "react";

export function ScrollRestorer() {
  useEffect(() => {
    const saved = sessionStorage.getItem("scrollY");

    if (saved) {
      sessionStorage.removeItem("scrollY");
      const target = Number(saved);

      const scroll = () => window.scrollTo(0, target);

      scroll();
      setTimeout(scroll, 50);
      setTimeout(scroll, 200);
      setTimeout(scroll, 500);
      setTimeout(scroll, 1000);
    }
  }, []);

  return null;
}
