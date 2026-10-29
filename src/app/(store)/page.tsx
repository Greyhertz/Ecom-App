import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, MoveUpRight } from "lucide-react";

import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { CategoryShowcase } from "@/components/category-showcase";
import { NewsletterCard } from "@/components/newsletter-card";
import {
  MotionRoot,
  ParallaxFrame,
  Press,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion";

import { Button } from "@/components/ui/button";

const categories = [
  { name: "Office", description: "Better tools for better work." },
  { name: "Body & Care", description: "Small rituals for everyday life." },
  { name: "Jewelry", description: "Simple pieces with character." },
  { name: "Plants", description: "Bring something living indoors." },
];

export default function Home() {
  const hero = products[0];

  return (
    <MotionRoot>
      <main className="min-h-screen min-w-0 overflow-x-clip font-sans">
        {/* Hero: compact and stacked on mobile, large and split on desktop */}
        <section className="bg-[#F5F0E7]">
          <div className="container grid min-w-0 gap-6 px-5 pb-8 pt-5 md:grid-cols-2 md:items-center md:gap-12 md:px-8 md:py-20 lg:gap-16 lg:py-24">
            <Stagger immediate className="min-w-0 max-w-xl">
              <StaggerItem>
                <span className="inline-flex rounded-full bg-[#E4D7C6] px-3.5 py-1.5 text-xs font-medium text-[#315747]">
                  The everyday edit
                </span>
              </StaggerItem>

              <StaggerItem>
                <h1 className="mt-4 font-serif text-[2.5rem] font-medium leading-[1.02] tracking-[-0.045em] text-[#244A3A] md:mt-5 md:text-6xl lg:text-7xl">
                  Live well.
                  <span className="mt-1 block italic text-[#B5684C]">
                    Choose well.
                  </span>
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="mt-3 max-w-md text-[15px] leading-6 text-[#655F55] md:mt-4 md:text-base md:leading-7">
                  Thoughtfully chosen essentials for your workspace, personal
                  care, style, and home.
                </p>
              </StaggerItem>

              <StaggerItem className="mt-6 flex flex-col gap-2 md:mt-7 md:flex-row md:items-center md:gap-3">
                <Press className="md:w-auto">
                  <Button
                    asChild
                    className="h-[52px] w-full rounded-full bg-[#244A3A] px-7 text-base text-white hover:bg-[#19382B] md:w-auto"
                  >
                    <Link href="/collections">
                      Shop the collection
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </Press>

                <Press className="md:w-auto">
                  <Button
                    asChild
                    variant="ghost"
                    className="h-11 w-full rounded-full text-base font-medium text-[#315747] hover:bg-[#E4D7C6]/60 md:h-12 md:w-auto"
                  >
                    <Link href="#collections">Browse categories</Link>
                  </Button>
                </Press>
              </StaggerItem>
            </Stagger>

            {hero && (
              <Reveal delay={0.15} y={28} className="relative min-w-0">
                <Press scale={0.985}>
                  <Link
                    href={`/products/${hero.id}`}
                    className="group relative block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] focus-visible:ring-offset-4 md:rounded-[28px]"
                  >
                    {/* Short banner on mobile, tall portrait on desktop */}
                    <ParallaxFrame className="relative aspect-[16/10] rounded-3xl bg-[#E6DCCB] shadow-[0_12px_32px_rgba(36,74,58,0.12)] md:aspect-[4/5] md:rounded-[28px] md:shadow-[0_16px_40px_rgba(36,74,58,0.14)]">
                      <Image
                        src={hero.image}
                        alt={hero.name}
                        fill
                        priority
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </ParallaxFrame>

                    {/* Frosted product chip, like an iOS widget */}
                    <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-3.5 py-2.5 backdrop-blur-xl md:inset-x-3 md:bottom-3 md:px-4 md:py-3">
                      <div className="min-w-0">
                        <p className="text-xs text-[#655F55]">Editor&apos;s pick</p>
                        <p className="truncate text-sm font-medium text-[#244A3A]">
                          {hero.name}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold tabular-nums text-[#244A3A]">
                        {formatPrice(hero.priceCents)}
                      </p>
                    </div>
                  </Link>
                </Press>
              </Reveal>
            )}
          </div>
        </section>

        {/* Category showcase (the only product area on the page) */}
        <div id="collections" className="min-w-0 scroll-mt-20">
          <CategoryShowcase products={products} />
        </div>

        {/* Workspace feature (tablet and up) */}
        <section className="container hidden min-w-0 px-6 py-16 md:block lg:px-8 lg:py-24">
          <Reveal>
            <div className="grid min-w-0 overflow-hidden rounded-3xl bg-card shadow-[0_4px_24px_rgba(0,0,0,0.05)] lg:grid-cols-2">
              <ParallaxFrame className="relative aspect-[5/3] w-full bg-muted lg:aspect-auto lg:min-h-[440px]">
                <Image
                  src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80"
                  alt="Modern workspace"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </ParallaxFrame>

              <div className="flex min-w-0 flex-col justify-center p-8 md:p-12 lg:p-14 xl:p-16">
                <h2 className="max-w-lg break-words font-serif text-4xl font-medium leading-tight tracking-tight lg:text-5xl">
                  Make your everyday space feel intentional.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
                  From ergonomic seating and functional desks to the smaller
                  objects that keep everything in place, build a workspace that
                  works for you.
                </p>
                <div className="mt-8">
                  <Press className="w-fit">
                    <Button asChild className="rounded-full px-6">
                      <Link href={`/collections?category=${encodeURIComponent("Office")}`}>
                        Explore Office
                        <MoveUpRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </Press>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Shop by category: iOS-style grouped list on mobile, cards on larger screens */}
        <section className="container min-w-0 px-5 py-12 sm:px-6 sm:pb-16 sm:pt-0 lg:px-8 lg:pb-24">
          <Reveal>
            <h2 className="mb-4 font-serif text-2xl font-medium tracking-tight sm:mb-6 sm:text-3xl">
              Shop by category
            </h2>
          </Reveal>

          <Stagger
            stagger={0.06}
            className="divide-y divide-border/70 overflow-hidden rounded-3xl bg-card shadow-[0_3px_18px_rgba(0,0,0,0.04)] sm:grid sm:grid-cols-2 sm:gap-4 sm:divide-y-0 sm:overflow-visible sm:rounded-none sm:bg-transparent sm:shadow-none lg:grid-cols-4"
          >
            {categories.map((category) => (
              <StaggerItem key={category.name} className="sm:h-full">
                <Link
                  href={`/collections?category=${encodeURIComponent(category.name)}`}
                  className="group flex min-h-16 min-w-0 items-center justify-between gap-4 px-5 py-4 transition-colors active:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:h-full sm:rounded-2xl sm:bg-card sm:p-6 sm:shadow-[0_3px_18px_rgba(0,0,0,0.04)] sm:hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                >
                  <div className="min-w-0">
                    <h3 className="text-base font-medium">{category.name}</h3>
                    <p className="mt-0.5 text-sm leading-5 text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Newsletter */}
        <section className="bg-[#F3EFE6] px-4 pb-8 pt-8 sm:px-6 sm:py-14 lg:px-8">
          <Reveal>
            <NewsletterCard />
          </Reveal>
        </section>
      </main>
    </MotionRoot>
  );
}