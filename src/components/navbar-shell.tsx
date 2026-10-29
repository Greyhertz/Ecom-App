"use client";

import { useState, type ReactNode } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

/** Sticky header that gains a frosted surface and soft shadow once the page scrolls. */
export function NavbarShell({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 8));

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-border/60 bg-background/80 shadow-[0_8px_28px_rgba(0,0,0,0.06)]"
          : "border-transparent bg-background/95"
      }`}
    >
      {children}
    </header>
  );
}