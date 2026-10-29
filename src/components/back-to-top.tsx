"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { spring } from "./motion";

export function BackToTop() {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={spring}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-4 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ArrowUp className="size-3.5" />
      Back to top
    </motion.button>
  );
}