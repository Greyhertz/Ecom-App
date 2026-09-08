import { db } from "./index";
import { products } from "./schema";
import "dotenv/config";

const mockProducts = [
  {
    name: "Oakwood Fountain Pen",
    slug: "oakwood-fountain-pen",
    category: "Writing",
    priceCents: 6800,
    description: "A weighted brass-and-oak pen with a fine steel nib, built for daily correspondence.",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc36b32?w=800&q=80",
  },
  {
    name: "Fieldstone Ruled Notebook",
    slug: "fieldstone-ruled-notebook",
    category: "Paper",
    priceCents: 2200,
    description: "192 pages of 100gsm ivory paper, stitched into a linen cover that softens with use.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80",
  },
  // Add 1 or 2 more from your previous list here...
];

async function main() {
  console.log("⏳ Seeding database...");

  // Clear existing products to avoid duplicates
  // This is a "destructive" seed, common in development
  await db.delete(products);

  await db.insert(products).values(mockProducts);

  console.log("✅ Seeding finished!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed");
  console.error(err);
  process.exit(1);
});