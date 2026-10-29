"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { spring} from "@/components/motion";
import { FilterSidebar } from "@/components/filter-sidebar";

/** Title that slides in fresh whenever the category changes. */
export function AnimatedTitle({ text }: { text: string }) {
  return (
    <motion.h1
      key={text}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="break-words font-serif text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl"
    >
      {text}
    </motion.h1>
  );
}

type Pill = { label: string; href: string; active: boolean };

/** Category pills with a selection that glides between them and scrolls into view. */
export function CategoryPills({ items }: { items: Pill[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current
      ?.querySelector<HTMLElement>('[aria-current="page"]')
      ?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [items]);

  return (
    <div ref={ref} className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
      {items.map((item) => (
        <motion.div
          key={item.label}
          whileTap={{ scale: 0.94 }}
          transition={spring}
          className="shrink-0"
        >
          <Link
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className="relative inline-flex h-9 items-center whitespace-nowrap rounded-full border border-border bg-background px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {item.active && (
              <motion.span
                layoutId="collection-pill"
                transition={spring}
                className="absolute -inset-px rounded-full bg-foreground"
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                item.active ? "text-background" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

type Chip = { id: string; label: string; href: string; ariaLabel: string };

/** Active filter chips that pop in and out, with the row collapsing when empty. */
export function ActiveFilters({ chips, clearHref }: { chips: Chip[]; clearHref: string }) {
  return (
    <AnimatePresence initial={false}>
      {chips.length > 0 && (
        <motion.div
          key="active-filters"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap items-center gap-2">
            <AnimatePresence initial={false} mode="popLayout">
              {chips.map((chip) => (
                <motion.div
                  key={chip.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={spring}
                  whileTap={{ scale: 0.94 }}
                  className="max-w-full"
                >
                  <Link
                    href={chip.href}
                    aria-label={chip.ariaLabel}
                    className="inline-flex h-8 max-w-full items-center gap-1.5 rounded-full bg-muted px-3 text-xs font-medium hover:bg-muted/70"
                  >
                    <span className="truncate">{chip.label}</span>
                    <X className="size-3 shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.div layout transition={spring}>
              <Link
                href={clearHref}
                className="inline-flex h-8 items-center px-1 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Clear all
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Number that rolls up or down when the result count changes. */
export function AnimatedCount({ count }: { count: number }) {
  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={count}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={spring}
          className="inline-block font-medium tabular-nums text-foreground"
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Compact bar that slides in under the navbar once the real toolbar scrolls out of view.
 * It is fixed to the viewport (via a portal), so it works even when an ancestor
 * has overflow set, which silently breaks CSS `position: sticky`.
 */
export function DockedToolbar({ count }: { count: number }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [docked, setDocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const top = sentinelRef.current?.getBoundingClientRect().top ?? 1;
      setDocked(top < 56);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-0" />
      {mounted &&
        createPortal(
          <AnimatePresence>
            {docked && (
              <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={spring}
                className="fixed inset-x-0 top-14 z-30 flex items-center justify-between gap-3 border-b bg-background/85 px-4 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:top-16 sm:px-6 lg:hidden"
              >
                <p className="text-sm text-muted-foreground">
                  <AnimatedCount count={count} /> {count === 1 ? "product" : "products"}
                </p>
                <FilterSidebar mode="mobile" />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}