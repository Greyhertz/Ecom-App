"use client";

import { useState } from "react";
// import { useCartStore } from "@/lib/store";
import type { Product } from "@/data/products";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Button variant="accent" size="lg" onClick={handleAdd} className="gap-2">
      {added ? (
        <>
          <Check className="h-4 w-4" /> Added
        </>
      ) : (
        "Add to cart"
      )}
    </Button>
  );
}
