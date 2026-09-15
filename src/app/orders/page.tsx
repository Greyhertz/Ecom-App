import { db } from "@/db";
import { orders, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default async function OrdersPage() {
  // 1. AUTH CHECK
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const user = await decrypt(session);

  if (!user) redirect("/login");

  // 2. DATABASE CHALLENGE
  // Write the query to find orders for this user.
  // Hint: Use 'where' to match user.userId and 'orderBy' to show newest first.
  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userId, user.userId),
    orderBy: [desc(orders.createdAt)],
    with: {
      orderItems: {
        with: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-serif mb-8">My Orders</h1>
      {userOrders.map((order) => (
        <div
          key={order.id}
          className="border p-6 rounded-lg bg-card text-card-foreground shadow-sm"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Order Placed: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-lg font-serif">
                {formatPrice(order.totalPrice)}
              </p>
            </div>
            <Badge variant={order.status === "paid" ? "default" : "secondary"}>
              {order.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Items:</p>
            {/* 
         THE JOINED DATA: 
         order.orderItems now contains the products because of our 'with' query!
      */}
            <ul className="text-sm space-y-1">
              {order.orderItems.map((item: any) => (
                <li
                  key={item.id}
                  className="flex justify-between border-b border-border/50 pb-1"
                >
                  <span>
                    {item.product.name}{" "}
                    <span className="text-muted-foreground">
                      x{item.quantity}
                    </span>
                  </span>
                  <span>{formatPrice(item.priceAtPurchase)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
