"use client";

import { useState } from "react";
// import { useCartStore } from "@/lib/store";
import type { Product } from "@/data/products";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { products } from "@/db/schema";
export function AddToCartButton({
  product,
}: {
  product: Product & { stock: number };
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  function handleAdd() {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.product.id === product.id),
  );
  const currentQtyInCart = cartItem?.quantity || 0;

  // 2. Disable if cart quantity reaches total stock
  const isLimitReached = currentQtyInCart >= product.stock;

  return (
    <Button onClick={handleAdd} disabled={outOfStock || isLimitReached}>
      {outOfStock
        ? "Out of Stock"
        : isLimitReached
          ? "Limit Reached"
          : "Add to Cart"}
    </Button>
  );

  return (
    <Button
      variant="accent"
      size="lg"
      onClick={handleAdd}
      className="gap-2"
      disabled={outOfStock}
    >
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
