import { pgTable, text, integer, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(), // for /products/oak-pen instead of /products/UUID
  category: text("category").notNull(),
  priceCents: integer("price_cents").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  stock: integer("stock").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

// Add these to src/db/schema.ts

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId").references(() => users.id).notNull(),
  totalPrice: integer("total_price").notNull(),
  status: text("status").default("pending").notNull(), // 'pending', 'paid', 'shipped'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id).notNull(),
  productId: uuid("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  priceAtPurchase: integer("price_at_purchase").notNull(), // CRITICAL: Prices change over time!
});

export const ordersRelations = relations(orders, ({ many }) => ({
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));