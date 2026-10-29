"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";
import { Press, Reveal, spring } from "@/components/motion";

type CategoryShowcaseProps = {
  products: Product[];
};

const categories = ["Office", "Body & Care", "Jewelry", "Plants"];

const panelVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -28 }),
};

function CategoryCarousel({
  products,
  category,
}: {
  products: Product[];
  category: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  const getStep = useCallback(() => {
    const el = scrollerRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  const measure = useCallback(() => {
    const el = scrollerRef.current;
    const step = getStep();
    if (!el || !step) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 1) {
      setCount(0);
      setIndex(0);
      return;
    }
    const last = Math.ceil(max / step);
    setCount(last + 1);
    setIndex(Math.min(last, Math.round(el.scrollLeft / step)));
  }, [getStep]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  function scrollToIndex(i: number) {
    scrollerRef.current?.scrollTo({ left: i * getStep(), behavior: "smooth" });
  }

  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed bg-background/60 px-6 py-14 text-center">
        <p className="font-serif text-xl">Something good is on its way.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          New products for this collection are coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      {/*
        Native scroll-snap scroller: a two-finger trackpad swipe or a touch swipe
        scrolls it the moment the pointer is over it, with no click or focus first.
        overscroll-x-contain stops macOS from treating the swipe as browser back/forward.
      */}
      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label={`${category} products`}
        className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto overscroll-x-contain px-5 pb-1 [scrollbar-width:none] focus-visible:outline-none sm:mx-0 sm:scroll-pl-0 sm:gap-5 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-0 shrink-0 basis-[76%] snap-start sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]"
          >
            <Press className="h-full" scale={0.98}>
              <Link
                href={`/products/${product.id}`}
                draggable={false}
                className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                <div className="relative aspect-[4/4.6] overflow-hidden rounded-3xl bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 76vw"
                    className="select-none object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-start justify-between gap-3 px-1 pt-3.5">
                  <div className="min-w-0">
                    <h3 className="line-clamp-1 text-base font-medium leading-snug">
                      {product.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold tabular-nums">
                    {formatPrice(product.priceCents)}
                  </p>
                </div>
              </Link>
            </Press>
          </div>
        ))}
      </div>

      {count > 1 && (
        <div
          className="mt-5 flex items-center justify-center"
          role="group"
          aria-label={`${category} carousel navigation`}
        >
          {Array.from({ length: count }, (_, i) => {
            const active = index === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to ${category} slide ${i + 1}`}
                aria-current={active ? "true" : undefined}
                className="flex h-8 min-w-6 items-center justify-center rounded-full px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <motion.span
                  className="block h-2 rounded-full bg-foreground"
                  animate={{ width: active ? 24 : 8, opacity: active ? 1 : 0.25 }}
                  transition={spring}
                />
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-border/70 pt-4">
        <p className="text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>

        <div className="flex items-center gap-1">
          {count > 1 && (
            <div className="mr-1 hidden items-center gap-1 sm:flex">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9 rounded-full"
                aria-label="Previous products"
                disabled={index === 0}
                onClick={() => scrollToIndex(index - 1)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9 rounded-full"
                aria-label="Next products"
                disabled={index >= count - 1}
                onClick={() => scrollToIndex(index + 1)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}

          <Button asChild variant="ghost" size="sm" className="shrink-0">
            <Link href={`/collections?category=${encodeURIComponent(category)}`}>
              View collection
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CategoryShowcase({ products }: CategoryShowcaseProps) {
  const [[active, direction], setTab] = useState<[number, number]>([0, 0]);

  function select(index: number) {
    if (index === active) return;
    setTab([index, index > active ? 1 : -1]);
  }

  const category = categories[active];
  const categoryProducts = products.filter((p) => p.category === category);

  return (
    <section className="overflow-hidden border-y bg-[#F8F6F2] py-12 dark:bg-background sm:py-20 lg:py-24">
      <div className="container min-w-0 px-5 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Find something you&apos;ll love.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Considered pieces for the spaces you work in, the rituals you
              keep, and the things that make a place feel like yours.
            </p>
          </div>

          <Link
            href="/collections"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium transition-colors hover:text-muted-foreground"
          >
            Explore all collections
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        {/* Segmented control with a sliding selection, like iOS */}
        <div
          role="tablist"
          aria-label="Product categories"
          className="-mx-5 mt-7 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <div className="mx-auto flex w-max gap-1 rounded-full bg-black/[0.06] p-1 dark:bg-white/10">
            {categories.map((name, index) => {
              const selected = index === active;
              return (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  id={`showcase-tab-${index}`}
                  aria-selected={selected}
                  aria-controls="showcase-panel"
                  onClick={() => select(index)}
                  className="relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-5"
                >
                  {selected && (
                    <motion.span
                      layoutId="showcase-segment"
                      transition={spring}
                      className="absolute inset-0 rounded-full bg-background shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      selected ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="showcase-panel"
          role="tabpanel"
          aria-labelledby={`showcase-tab-${active}`}
          className="mt-7 min-w-0 sm:mt-9"
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={category}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <CategoryCarousel products={categoryProducts} category={category} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}