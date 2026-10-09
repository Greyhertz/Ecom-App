"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";

type CartProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  priceCents: number;
  description: string;
  image: string;
  stock: number;
};

export function AddToCartButton({
  product,
}: {
  product: CartProduct;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock <= 0;

  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.product.id === product.id),
  );

  const currentQtyInCart = cartItem?.quantity || 0;

  const isLimitReached = currentQtyInCart >= product.stock;

  function handleAdd() {
    if (outOfStock || isLimitReached) return;

    addItem(product, 1);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleAdd}
      className="gap-2"
      disabled={outOfStock || isLimitReached}
    >
      {outOfStock ? (
        "Out of Stock"
      ) : isLimitReached ? (
        "Limit Reached"
      ) : added ? (
        <>
          <Check className="h-4 w-4" />
          Added
        </>
      ) : (
        "Add to cart"
      )}
    </Button>
  );
}