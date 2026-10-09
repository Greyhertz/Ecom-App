"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { createCheckoutSession } from "@/actions/checkout";

export function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const items = useCartStore((state) => state.items);

  const handleCheckout = async () => {
    // BLOCK 1: Validation
    // If there are no items in the cart, we shouldn't do anything.
    if(items.length === 0) return null
    // Write a check here.

    // BLOCK 2: The Transition
    // Set the loading state to true.
       setIsLoading(true)

    try {
      // BLOCK 3: The Call
      // Call the server action 'createCheckoutSession' and pass it the 'items'.
    await createCheckoutSession(items)
      // Note: This function will redirect the user away from our site.
    } catch (error) {
      console.error("Checkout Error:", error);
      // If something fails, we must allow the user to try again.
      // What should we do to the loading state?
      setIsLoading(false)
    }
  };

  return (
    <Button 
      size="lg" 
      className="w-full" 
      onClick={handleCheckout} 
      disabled={!items || isLoading} // What two conditions should disable this button?
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Redirecting to Stripe...
        </>
      ) : (
        "Checkout"
      )}
    </Button>
  );
}