"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const clearCart = useCartStore((state) => state.clear); // Get your clear function

  useEffect(() => {
    // 1. Logic: Clear the cart here so it's empty for the next shopping trip
  clearCart(); 
  }, [clearCart]);

  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-serif mb-2">Thank you for your order!</h1>
      <p className="text-muted-foreground mb-8">
        Your payment was processed successfully. 
        Order ID: <span className="font-mono text-foreground font-bold">{orderId}</span>
      </p>
      
      <Button asChild>
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
}