
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
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
      <main className="mx-auto flex min-h-[60vh] w-full max-w-screen-xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
        <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="size-6 text-muted-foreground" />
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl">
          Your cart is empty
        </h1>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Nothing here yet. Browse the shop and find something you'll love.
        </p>

        <Button asChild className="mt-6">
          <Link href="/">Back to shop</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto grid w-full min-w-0 max-w-screen-xl grid-cols-1 gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:px-8 lg:py-14">
      {/* Cart items */}
      <section className="min-w-0">
        <div className="mb-5 flex items-end justify-between gap-3 sm:mb-7">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
              Your selection
            </p>
            <h1 className="font-serif text-2xl tracking-tight sm:text-3xl">
              Your cart
            </h1>
          </div>

          <p className="pb-1 text-xs text-muted-foreground sm:text-sm">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {items.map(({ product, quantity }) => (
            <article
              key={product.id}
              className="flex min-w-0 gap-3 py-4 sm:gap-5 sm:py-5"
            >
              <Link
                href={`/products/${product.id}`}
                className="relative h-28 w-24 shrink-0 overflow-hidden rounded-sm bg-secondary sm:h-32 sm:w-28"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                <div className="flex min-w-0 items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      href={`/products/${product.id}`}
                      className="break-words font-serif text-sm leading-snug hover:underline sm:text-base"
                    >
                      {product.name}
                    </Link>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatPrice(product.priceCents)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="flex size-9 shrink-0 -mr-2 -mt-2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex h-9 items-center rounded-sm border border-border">
                    <button
                      type="button"
                      className="flex size-9 items-center justify-center rounded-l-sm transition-colors hover:bg-secondary"
                      onClick={() =>
                        setQuantity(product.id, quantity - 1)
                      }
                      aria-label={`Decrease quantity of ${product.name}`}
                    >
                      <Minus className="size-3.5" />
                    </button>

                    <span className="min-w-8 text-center text-sm tabular-nums">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      className="flex size-9 items-center justify-center rounded-r-sm transition-colors hover:bg-secondary"
                      onClick={() =>
                        setQuantity(product.id, quantity + 1)
                      }
                      aria-label={`Increase quantity of ${product.name}`}
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>

                  <p className="text-sm font-medium tabular-nums">
                    {formatPrice(product.priceCents * quantity)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <Button
          asChild
          variant="ghost"
          className="mt-5 -ml-3 text-sm text-muted-foreground"
        >
          <Link href="/">Continue shopping</Link>
        </Button>
      </section>

      {/* Order summary */}
      <aside className="h-fit min-w-0 rounded-md border border-border bg-card p-4 sm:p-6 lg:sticky lg:top-24">
        <h2 className="font-serif text-xl">Order summary</h2>

        <Separator className="my-4" />

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium tabular-nums">
            {formatPrice(subtotal())}
          </span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-4 text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="max-w-[60%] text-right text-xs leading-5 text-muted-foreground">
            Calculated at checkout
          </span>
        </div>

        <Separator className="my-4" />

        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="font-medium">Total</span>
          <span className="font-serif text-lg tabular-nums">
            {formatPrice(subtotal())}
          </span>
        </div>

        <CheckoutButton />

        <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
          Shipping and any applicable charges are confirmed at checkout.
        </p>
      </aside>
    </main>
  );
}
