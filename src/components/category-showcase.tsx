"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

import type { Product } from "@/data/products";

type CategoryShowcaseProps = {
  products: Product[];
};

const categories = ["Office", "Body & Care", "Jewelry", "Plants"];

export function CategoryShowcase({
  products,
}: CategoryShowcaseProps) {
  return (
    <section className="border-y bg-muted/20 py-20 sm:py-24">
      <div className="container">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline">
            Explore the collection
          </Badge>

          <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
            Find something you'll love.
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Browse our carefully selected collections across work,
            personal care, style, and home.
          </p>
        </div>

        {/* Categories */}
        <Tabs
          defaultValue={categories[0]}
          className="mt-12"
        >
          <div className="flex justify-center">
            <TabsList className="h-auto flex-wrap">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-5 py-2.5"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category,
            );

            return (
              <TabsContent
                key={category}
                value={category}
                className="mt-12"
              >
                <div className="mx-auto max-w-6xl">
                  <Carousel
                    opts={{
                      align: "start",
                      slidesToScroll: 1,
                    }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {categoryProducts.map((product) => (
                        <CarouselItem
                          key={product.id}
                          className="basis-[85%] sm:basis-1/2 lg:basis-1/2"
                        >
                          <Link
                            href={`/products/${product.id}`}
                            className="group block"
                          >
                            <Card className="overflow-hidden transition-shadow hover:shadow-md">
                              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <Badge
                                  variant="secondary"
                                  className="absolute left-4 top-4"
                                >
                                  {product.category}
                                </Badge>
                              </div>

                              <CardContent className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h3 className="font-medium">
                                      {product.name}
                                    </h3>

                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                      {product.description}
                                    </p>
                                  </div>

                                  <p className="shrink-0 font-medium">
                                    {formatPrice(product.priceCents)}
                                  </p>
                                </div>

                                <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                                  View product
                                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselPrevious className="-left-4 hidden sm:flex" />
                    <CarouselNext className="-right-4 hidden sm:flex" />
                  </Carousel>

                  {/* Footer */}
                  <div className="mt-8 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {categoryProducts.length} products in {category}
                    </p>

                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                    >
                      <Link
                       href={`/collections?category=${encodeURIComponent(category)}`}
                      >
                        View all
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}