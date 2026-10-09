"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckoutButton } from "./checkout-button";

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="container flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="font-serif text-2xl">Your cart is empty</h1>
        <p className="text-muted-foreground">
          Nothing here yet — browse the shop and add a few pieces.
        </p>
        <Button asChild>
          <Link href="/">Back to shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="mb-6 font-serif text-2xl">Your cart</h1>
        <div className="flex flex-col divide-y divide-border">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 py-5">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-secondary">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-serif leading-snug">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(product.priceCents)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-sm border border-border hover:bg-secondary"
                    )}
                    onClick={() => setQuantity(product.id, quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-4 text-center text-sm">{quantity}</span>
                  <button
                    className="flex h-7 w-7 items-center justify-center rounded-sm border border-border hover:bg-secondary"
                    onClick={() => setQuantity(product.id, quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="h-fit rounded-sm border border-border p-5">
        <h2 className="font-serif text-lg">Order summary</h2>
        <Separator className="my-4" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal())}</span>
        </div>
        <div className="mt-1 flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-muted-foreground">Calculated at checkout</span>
        </div>
        <Separator className="my-4" />
        {/* <Button variant="accent" size="lg" className="w-full" onClick={CheckoutButton}>
          Checkout
        </Button> */}
        <CheckoutButton />
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Checkout isn&apos;t wired up in this starter — plug in Stripe here.
        </p>
      </aside>
    </div>
  );
}
