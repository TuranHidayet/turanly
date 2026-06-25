"use client";

import { useEffect } from "react";

export function ScrollRestorer() {
  useEffect(() => {
    const saved = sessionStorage.getItem("scrollY");
    if (saved) {
      window.scrollTo(0, Number(saved));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  return null;
}
