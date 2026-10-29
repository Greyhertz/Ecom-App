import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import {
  Package,
  ShoppingBag,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

function formatOrderDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/10";
    case "pending":
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/10";
    case "cancelled":
    case "canceled":
    case "failed":
      return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10";
    case "refunded":
      return "bg-stone-100 text-stone-700 ring-1 ring-inset ring-stone-500/10";
    default:
      return "bg-secondary text-secondary-foreground ring-1 ring-inset ring-border/40";
  }
}

export default async function OrdersPage() {
  // Authentication
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const user = await decrypt(session);

  if (!user || typeof user.userId !== "string") {
    redirect("/login");
  }

  // Fetch only the current user's orders
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

  const totalItems = userOrders.reduce(
    (total, order) =>
      total +
      order.orderItems.reduce((count, item) => count + item.quantity, 0),
    0,
  );

  return (
    <main className="mx-auto min-h-[60vh] w-full min-w-0 max-w-screen-2xl px-4 py-8 font-sans sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      {/* Page header */}
      <header className="mb-8 sm:mb-10">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
          Your account
        </p>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <h1 className="font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              My orders
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
              Keep track of your purchases and revisit the things you love.
            </p>
          </div>

          {userOrders.length > 0 && (
            <div className="flex w-fit items-center gap-2 rounded-full bg-card px-3.5 py-2 text-xs text-muted-foreground shadow-sm">
              <ShoppingBag className="size-3.5" aria-hidden="true" />
              <span>
                {userOrders.length}{" "}
                {userOrders.length === 1 ? "order" : "orders"}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Empty state */}
      {userOrders.length === 0 ? (
        <section
          aria-label="Your orders"
          className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl bg-card px-6 py-12 text-center shadow-[0_4px_24px_rgba(0,0,0,0.045)] sm:min-h-[400px]"
        >
          <div className="flex size-16 items-center justify-center rounded-2xl bg-secondary">
            <Package
              className="size-7 text-muted-foreground"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>

          <h2 className="mt-5 font-serif text-2xl font-medium tracking-tight sm:text-3xl">
            Nothing here yet
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Your orders will appear here after your first purchase. Take a
            look around and find something worth keeping.
          </p>

          <Link
            href="/collections"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Explore the collection
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>
      ) : (
        /* Orders grid: 1 mobile, 2 tablet, 4 desktop */
        <section
          aria-label="Your orders"
          className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
        >
          {userOrders.map((order) => (
            <article
              key={order.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-card p-4 text-card-foreground shadow-[0_4px_24px_rgba(0,0,0,0.045)] transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              {/* Order summary */}
              <div className="flex min-w-0 flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{formatOrderDate(order.createdAt)}</span>
                </div>

                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="min-w-0 font-serif text-2xl font-medium tracking-tight">
                    {formatPrice(order.totalPrice)}
                  </p>

                  <span
                    className={`inline-flex w-fit max-w-full items-center rounded-full px-2.5 py-1 font-sans text-[10px] font-medium capitalize ${getStatusStyles(order.status)}`}
                  >
                    <span
                      className="mr-1.5 size-1.5 shrink-0 rounded-full bg-current"
                      aria-hidden="true"
                    />
                    {order.status}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">
                  {order.orderItems.length}{" "}
                  {order.orderItems.length === 1 ? "product" : "products"} in
                  this order
                </p>
              </div>

              {/* Order items */}
              <div className="mt-4 flex-1 rounded-xl bg-background/70 p-3">
                <p className="mb-2 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Order details
                </p>

                {order.orderItems.length > 0 ? (
                  <ul className="min-w-0 divide-y divide-border/50">
                    {order.orderItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex min-w-0 items-start justify-between gap-2 py-3 first:pt-1 last:pb-1"
                      >
                        <div className="flex min-w-0 flex-1 items-start gap-2">
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <Package
                              className="size-3.5 text-muted-foreground"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="break-words font-sans text-xs font-medium leading-5 sm:text-sm">
                              {item.product.name}
                            </p>
                            <p className="mt-0.5 font-sans text-[11px] text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <span className="shrink-0 text-right font-sans text-xs font-medium tabular-nums">
                          {formatPrice(item.priceAtPurchase)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-3 text-xs text-muted-foreground">
                    No item details available.
                  </p>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}