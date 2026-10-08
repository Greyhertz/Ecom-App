"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal } from "lucide-react";

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentMaxPrice = searchParams.get("maxPrice");

  function applyPriceFilter(maxPrice?: string) {
    const params = new URLSearchParams(searchParams);

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className="sticky top-24 h-fit rounded-lg border bg-card p-5">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="size-4" />

        <h2 className="text-sm font-medium">
          Filters
        </h2>
      </div>

      <Separator className="my-4" />

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Price
        </p>

        <div className="flex flex-col gap-1">
          <Button
            variant={currentMaxPrice === "5000" ? "secondary" : "ghost"}
            size="sm"
            className="justify-start text-sm"
            onClick={() => applyPriceFilter("5000")}
          >
            Under $50
          </Button>

          <Button
            variant={currentMaxPrice === "10000" ? "secondary" : "ghost"}
            size="sm"
            className="justify-start text-sm"
            onClick={() => applyPriceFilter("10000")}
          >
            Under $100
          </Button>

          <Button
            variant={!currentMaxPrice ? "secondary" : "ghost"}
            size="sm"
            className="justify-start text-sm"
            onClick={() => applyPriceFilter()}
          >
            All Prices
          </Button>
        </div>
      </div>
    </aside>
  );
}