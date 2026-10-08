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
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />

      <h1 className="mb-2 text-3xl font-serif">
        Thank you for your order!
      </h1>

      <p className="mb-8 text-muted-foreground">
        Your payment was processed successfully.{" "}
        Order ID:{" "}
        <span className="font-mono font-bold text-foreground">
          {orderId}
        </span>
      </p>

      <Button asChild>
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="container py-24 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}