"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { Check, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { spring } from "@/components/motion";

type FilterSidebarProps = {
  mode?: "mobile" | "desktop" | "both";
};

const PRICE_OPTIONS = [
  { label: "Under $50", value: "5000" },
  { label: "Under $100", value: "10000" },
  { label: "All prices", value: undefined },
] as const;

function PriceOptions({
  current,
  onSelect,
  group,
}: {
  current: string | null;
  onSelect: (value?: string) => void;
  group: string;
}) {
  return (
    <div role="group" aria-label="Price" className="flex flex-col gap-1">
      {PRICE_OPTIONS.map((option) => {
        const selected = (option.value ?? null) === current;
        return (
          <motion.button
            key={option.label}
            type="button"
            aria-pressed={selected}
            whileTap={{ scale: 0.98 }}
            transition={spring}
            onClick={() => onSelect(option.value)}
            className="relative flex h-12 w-full items-center justify-between rounded-xl px-3 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:h-10"
          >
            {selected && (
              <motion.span
                layoutId={`price-highlight-${group}`}
                transition={spring}
                className="absolute inset-0 rounded-xl bg-secondary"
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                selected ? "font-medium text-foreground" : "text-muted-foreground"
              }`}
            >
              {option.label}
            </span>
            <AnimatePresence initial={false}>
              {selected && (
                <motion.span
                  className="relative z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={spring}
                >
                  <Check className="size-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

export function FilterSidebar({ mode = "both" }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dragControls = useDragControls();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const currentMaxPrice = searchParams.get("maxPrice");
  // Selection updates instantly on tap, then re-syncs with the URL.
  const [selection, setSelection] = useState<string | null>(currentMaxPrice);
  useEffect(() => setSelection(currentMaxPrice), [currentMaxPrice]);
  useEffect(() => setMounted(true), []);

  const showMobile = mode === "mobile" || mode === "both";
  const showDesktop = mode === "desktop" || mode === "both";

  // Lock page scroll and close on Escape while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function applyPriceFilter(maxPrice?: string) {
    setSelection(maxPrice ?? null);

    const params = new URLSearchParams(searchParams.toString());
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });

    // Brief pause so the selection animation is seen before the sheet closes.
    if (open) window.setTimeout(() => setOpen(false), 200);
  }

  return (
    <>
      {/* Mobile: filter button + draggable bottom sheet */}
      {showMobile && (
        <div className="lg:hidden">
          <motion.div whileTap={{ scale: 0.95 }} transition={spring} className="w-fit">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 gap-2 rounded-full px-4 text-sm font-medium"
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <SlidersHorizontal className="size-4" />
              Filters
              <AnimatePresence initial={false}>
                {currentMaxPrice && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={spring}
                    className="flex size-5 items-center justify-center rounded-full bg-foreground text-[11px] text-background"
                  >
                    1
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Portal: the sticky toolbar's backdrop blur would otherwise trap a fixed sheet. */}
          {mounted &&
            createPortal(
              <AnimatePresence>
                {open && (
                  <div className="fixed inset-0 z-[60] lg:hidden">
                    <motion.button
                      type="button"
                      aria-label="Close filters"
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setOpen(false)}
                    />

                    <motion.div
                      role="dialog"
                      aria-modal="true"
                      aria-label="Filters"
                      className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-[28px] border-t bg-card px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-card-foreground shadow-2xl"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", stiffness: 380, damping: 40 }}
                      drag="y"
                      dragControls={dragControls}
                      dragListener={false}
                      dragConstraints={{ top: 0, bottom: 0 }}
                      dragElastic={{ top: 0, bottom: 0.6 }}
                      onDragEnd={(_, info) => {
                        if (info.offset.y > 100 || info.velocity.y > 500) setOpen(false);
                      }}
                    >
                      {/* Grab handle: drag down to dismiss */}
                      <div
                        onPointerDown={(e) => dragControls.start(e)}
                        className="-mx-5 flex cursor-grab touch-none justify-center pb-3 pt-3.5"
                      >
                        <span className="h-1 w-10 rounded-full bg-border" />
                      </div>

                      <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Filters</h2>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-9 rounded-full"
                          aria-label="Close filters"
                          onClick={() => setOpen(false)}
                        >
                          <X className="size-5" />
                        </Button>
                      </div>

                      <Separator className="mb-4" />

                      <p className="mb-2 text-sm font-medium">Price</p>
                      <PriceOptions
                        current={selection}
                        onSelect={applyPriceFilter}
                        group="sheet"
                      />

                      <motion.div whileTap={{ scale: 0.98 }} transition={spring} className="mt-5">
                        <Button
                          type="button"
                          className="h-12 w-full rounded-full text-base"
                          onClick={() => setOpen(false)}
                        >
                          Show results
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>,
              document.body,
            )}
        </div>
      )}

      {/* Desktop sidebar */}
      {showDesktop && (
        <motion.aside
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-24 hidden h-fit rounded-2xl border bg-card p-5 lg:block"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 shrink-0" />
            <h2 className="text-sm font-semibold">Filters</h2>
          </div>
          <Separator className="my-4" />
          <p className="mb-2 text-sm font-medium">Price</p>
          <PriceOptions current={selection} onSelect={applyPriceFilter} group="desktop" />
        </motion.aside>
      )}
    </>
  );
}