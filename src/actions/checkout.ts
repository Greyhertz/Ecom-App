"use server";

import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { cookies } from "next/headers";
import { createSession, decrypt } from "@/lib/session";
import { redirect } from "next/navigation";

export async function createCheckoutSession(cartItems: any[]) {
  // --- STEP 1: AUTHENTICATION ---
  // 1. Get the session cookie.
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value
  // 2. Decrypt it to find the user.
   const user = await decrypt(session)
  // 3. If no user, redirect to login.
  // YOUR CODE HERE...
  if(!user) {
    redirect("/login")
  }
  
  // --- STEP 2: DATABASE ENTRIES ---
  // We need to record this order in Neon BEFORE we go to Stripe.
  
  // 1. Calculate the total price in CENTS.
  const total = cartItems.reduce((acc, item) => acc + (item.product.priceCents * item.quantity), 0);

  // 2. Insert into the 'orders' table. 
  // Status should be 'pending'.
  const [newOrder] = await db.insert(orders).values({
    userId: user.userId as string,
    totalPrice: total,
    status: "pending",
  }).returning();

  // 3. Insert into the 'orderItems' table.
  // Loop through cartItems and map them to the orderItems schema.
  await db.insert(orderItems).values(
    cartItems.map(item => ({
      orderId: newOrder.id,
      productId: item.product.id,
      quantity: item.quantity,
      priceAtPurchase: item.product.priceCents,
    }))
  );

  // --- STEP 3: STRIPE SESSION ---
  // This creates the actual checkout page on Stripe's servers.
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { 
            name: item.product.name,
            images: [item.product.image] 
        },
        unit_amount: item.product.priceCents,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    // These URLs use your NEXT_PUBLIC_URL from .env
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?id=${newOrder.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    metadata: {
      orderId: newOrder.id, // Very important for Step 4 later!
    }
  });

  // --- STEP 4: THE REDIRECT ---
  // Send the user to the Stripe URL.
  redirect(stripeSession.url!);
}