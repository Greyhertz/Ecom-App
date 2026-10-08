import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { and, eq, ilike, lte } from "drizzle-orm";
import { SearchBar } from "@/components/search-bar";
import { FilterSidebar } from "@/components/filter-sidebar";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    q?: string;
    maxPrice?: string;
  }>;
}) {
  const { category, q, maxPrice } = await searchParams;

  const allProducts = await db.query.products.findMany({
    where: and(
      category ? eq(products.category, category) : undefined,
      q ? ilike(products.name, `%${q}%`) : undefined,
      maxPrice ? lte(products.priceCents, Number(maxPrice)) : undefined,
    ),
  });

  return (
    <main className="container py-10 sm:py-14">
      {/* Header */}
      <section className="mb-10">
        <div className="flex items-center gap-3">
          <Badge variant="outline">Collection</Badge>

          {category && (
            <span className="text-xs text-muted-foreground">
              {allProducts.length}{" "}
              {allProducts.length === 1 ? "product" : "products"}
            </span>
          )}
        </div>

        <div className="mt-5">
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
            {category ?? "Everything"}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {category
              ? `Explore our ${category.toLowerCase()} collection.`
              : "Browse the complete Shelfmark collection."}
          </p>
        </div>

        {/* Search */}
        <div className="mt-7">
          <SearchBar />
        </div>
      </section>

      {/* Main content */}
      <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
        {/* Filters */}
        <FilterSidebar />

        {/* Products */}
        <section>
          {/* Results header */}
          <div className="mb-5 flex items-center justify-between border-b pb-4">
            <p className="text-sm text-muted-foreground">
              {allProducts.length}{" "}
              {allProducts.length === 1 ? "product" : "products"}
            </p>

            {q && (
              <p className="text-xs text-muted-foreground">
                Results for{" "}
                <span className="font-medium text-foreground">
                  "{q}"
                </span>
              </p>
            )}
          </div>

          {allProducts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {allProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.slug,
                    name: product.name,
                    category: product.category,
                    priceCents: product.priceCents,
                    description: product.description,
                    details: [],
                    image: product.image,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed px-6 text-center">
              <p className="font-medium">No products found</p>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Try changing your search or removing one of the filters.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}