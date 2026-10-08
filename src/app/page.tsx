import Image from "next/image";
import Link from "next/link";

import { ArrowRight, MoveUpRight } from "lucide-react";

import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

import { CategoryShowcase } from "@/components/category-showcase";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
export default function Home() {
  
  const featuredProducts = products.slice(0, 4);
  const categories = ["Office", "Body & Care", "Jewelry", "Plants"]; 

  return (
    <main className="min-h-screen">
      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <section className="border-b">
        <div className="container grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="max-w-xl">
            <Badge variant="outline">
              Curated for everyday living
            </Badge>

            <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Things worth having around.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              Thoughtfully selected pieces for your workspace,
              personal care, style, and home.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/products">
                  Shop the collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
              >
                <Link href="#collections">
                  Explore collections
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <span>Curated selection</span>
              <span>•</span>
              <span>Everyday essentials</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
              <Image
                src={featuredProducts[0]?.image ?? ""}
                alt={
                  featuredProducts[0]?.name ??
                  "Featured product"
                }
                fill
                priority
                className="object-cover"
              />
            </div>

            <Card className="absolute -bottom-6 -left-6 hidden w-64 shadow-lg sm:block">
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Featured
                </p>

                <p className="mt-2 font-medium">
                  {featuredProducts[0]?.name}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {featuredProducts[0]
                    ? formatPrice(
                        featuredProducts[0].priceCents,
                      )
                    : ""}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* FEATURED PRODUCTS */}
      {/* ================================================== */}

      <section className="container py-20 sm:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Badge variant="outline">
              Featured
            </Badge>

            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              A few things we like.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              Start with a selection of pieces chosen to
              make everyday spaces and routines a little
              better.
            </p>
          </div>

          <Button
            asChild
            variant="ghost"
            className="hidden sm:flex"
          >
            <Link href="/collections">
              View everything
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <Card className="overflow-hidden border-0 bg-transparent shadow-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <CardContent className="px-0 pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {product.category}
                      </p>
                    </div>

                    <p className="text-sm font-medium">
                      {formatPrice(product.priceCents)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* CATEGORY CAROUSEL */}
      {/* ================================================== */}

      <div id="collections">
        <CategoryShowcase products={products} />
      </div>

      {/* ================================================== */}
      {/* EDITORIAL */}
      {/* ================================================== */}

      <section className="container py-20 sm:py-28">
        <div className="grid overflow-hidden rounded-2xl border bg-muted/30 lg:grid-cols-2">
          <div className="relative min-h-[400px]">
            <Image
              src={
                "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80"
              }
              alt="Modern workspace"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <Badge
              variant="outline"
              className="w-fit"
            >
              The workspace edit
            </Badge>

            <h2 className="mt-5 max-w-lg font-serif text-4xl tracking-tight sm:text-5xl">
              Make your everyday space feel intentional.
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">
              From ergonomic seating and functional desks to
              the smaller objects that keep everything in
              place, build a workspace that works for you.
            </p>

            <div className="mt-8">
              <Button asChild>
                <Link href={`/collections?category=${encodeURIComponent("Office")}`}>
                  Explore Office
                  <MoveUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* COLLECTION LINKS */}
      {/* ================================================== */}

      <section className="container pb-20 sm:pb-28">
        <Separator className="mb-12" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Office",
              description: "Better tools for better work.",
            },
            {
              name: "Body & Care",
              description: "Small rituals for everyday life.",
            },
            {
              name: "Jewelry",
              description: "Simple pieces with character.",
            },
            {
              name: "Plants",
              description: "Bring something living indoors.",
            },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/collections?category=${encodeURIComponent(
                category.name,
              )}`}
              className="group rounded-xl border p-6 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">
                  {category.name}
                </h3>

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* NEWSLETTER */}
      {/* ================================================== */}

      <section className="border-t bg-muted/30">
        <div className="container py-20 text-center sm:py-24">
          <Badge variant="outline">
            Stay in the loop
          </Badge>

          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
            Good things, occasionally.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
            New collections, useful finds, and occasional
            inspiration. No unnecessary noise.
          </p>

          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />

            <Button>
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}