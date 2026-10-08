import "dotenv/config";
import { db } from "./index";
import { products, orderItems, orders } from "./schema";
import { products as catalogProducts } from "../../data/products";

async function main() {
  console.log("⏳ Seeding database...");

  // Remove dependent order data first
  await db.delete(orderItems);
  await db.delete(orders);

  // Remove the old products
  await db.delete(products);

  // Insert the new catalog
  await db.insert(products).values(
    catalogProducts.map((product) => ({
      slug: product.id,
      name: product.name,
      category: product.category,
      priceCents: product.priceCents,
      description: product.description,
      image: product.image,
      stock: 20,
    })),
  );

  console.log(`✅ Seeded ${catalogProducts.length} products!`);

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed");
  console.error(err);
  process.exit(1);
});