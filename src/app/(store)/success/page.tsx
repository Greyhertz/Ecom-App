
"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const clearCart = useCartStore((state) => state.clear);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-screen-xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 sm:py-20 lg:py-24">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-secondary sm:size-20">
        <CheckCircle2 className="size-9 text-green-600 sm:size-11" />
      </div>

      <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
        Order confirmation
      </p>

      <h1 className="max-w-full break-words font-serif text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl">
        Thank you for your order!
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
        Your order confirmation is ready.
      </p>

      {orderId && (
        <div className="mt-6 w-full max-w-sm rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Order ID</p>
          <p className="mt-1 break-all font-mono text-sm font-medium text-foreground">
            {orderId}
          </p>
        </div>
      )}

      <Button asChild className="mt-7 w-full sm:w-auto">
        <Link href="/">Continue shopping</Link>
      </Button>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center px-4 py-12 text-center text-sm text-muted-foreground">
          Loading your confirmation...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
