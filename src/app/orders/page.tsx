import { db } from "@/db";
import { orders } from "@/db/schema";
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

  if (typeof user.userId !== "string") {
    redirect("/login");
  }

  // 2. DATABASE QUERY
  // Find orders belonging to the authenticated user,
  // with the newest orders shown first.
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
      <h1 className="mb-8 text-3xl font-serif">My Orders</h1>

      {userOrders.map((order) => (
        <div
          key={order.id}
          className="mb-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
        >
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Order Placed:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p className="text-lg font-serif">
                {formatPrice(order.totalPrice)}
              </p>
            </div>

            <Badge
              variant={
                order.status === "paid" ? "default" : "secondary"
              }
            >
              {order.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              Items:
            </p>

            <ul className="space-y-1 text-sm">
              {order.orderItems.map((item) => (
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