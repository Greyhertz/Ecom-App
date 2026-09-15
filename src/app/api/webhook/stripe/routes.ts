import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // 1. Webhooks need the RAW text body, not JSON.
  const body = await req.text();
  
  // 2. Get the signature from headers (Note: headers() is async in Next 15)
  const headerList = await headers();
  const signature = headerList.get("Stripe-signature"); // What is the header name? (Hint: it starts with 'Stripe-')

  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event;

  try {
    // 3. Construct the event
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return new NextResponse("Missing Stripe webhook secret", { status: 500 });
    }

    event = stripe.webhooks.constructEvent(
      body, 
      signature, // Blank A: The signature
      webhookSecret // Blank B: The env variable name for your webhook secret
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ... (Challenge 2 logic goes here)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    // We passed 'orderId' in the metadata during the Checkout Action.
    // How do we extract it from the session object?
    const orderId = session.metadata?.orderId; 

   // Inside your Webhook after the order status is set to "paid"

if (orderId) {
  // 1. Update order status
  await db.update(orders).set({ status: "paid" }).where(eq(orders.id, orderId));

  // 2. GET THE ITEMS BOUGHT
  // We need to know WHAT was bought to reduce stock.
  const itemsBought = await db.query.orderItems.findMany({
    where: eq(orderItems.orderId, orderId),
  });

  // 3. UPDATE STOCK (The Loop)
  for (const item of itemsBought) {
    // Write a Drizzle query here to:
    // UPDATE the 'products' table
    // SET stock = stock - item.quantity
    // WHERE product.id matches item.productId
    
    // HINT: In SQL/Drizzle, you can do math inside the 'set' block!
    // Example: .set({ stock: sql`${products.stock} - ${item.quantity}` })
    
    await db.update(products)
      .set({ 
        stock: sql`${products.stock} - ${item.quantity}` 
      })
      .where(eq(products.id, item.productId));
  }
}
  }

  return NextResponse.json({ received: true }, { status: 200 });
}