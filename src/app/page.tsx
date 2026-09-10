import Image from "next/image";
import Link from "next/link";
import { db } from "../db"; // Import your DB client
import { formatPrice } from "@/lib/utils";
import { ilike, or } from "drizzle-orm";
import { products } from "@/db/schema";
import { SearchBar } from "@/components/search-bar";

// This is now a Server Component by default
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = (await searchParams).q;
  // 1. Fetch data directly from Postgres
  const allProducts = await db.query.products.findMany({
    where: query
      ? or(
          ilike(products.name, `%${query}%`),
          ilike(products.category, `%${query}%`),
        )
      : undefined,
  });

  return (
    <div className="container py-12">
      <SearchBar/>
      <h1 className="font-serif text-4xl mb-8">Desk Goods</h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {allProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="mt-4 text-sm font-medium">{product.name}</h3>
            <p className="text-sm text-muted-foreground">
              {formatPrice(product.priceCents)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
