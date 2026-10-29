import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductCard } from "@/components/product-card";
import { and, eq, ilike, lte } from "drizzle-orm";
import { SearchBar } from "@/components/search-bar";
import { FilterSidebar } from "@/components/filter-sidebar";
import { MotionRoot, Press, Reveal, Stagger, StaggerItem } from "@/components/motion";
import {
  ActiveFilters,
  AnimatedCount,
  AnimatedTitle,
  CategoryPills,
  DockedToolbar,
} from "./collections-motion";

type Params = { category?: string; q?: string; maxPrice?: string };

// Builds a query-string link that keeps the other active filters.
function buildHref(current: Params, overrides: Partial<Params>) {
  const merged = { ...current, ...overrides };
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    if (value) sp.set(key, value);
  }
  const query = sp.toString();
  return query ? `?${query}` : "?";
}

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const { category, q, maxPrice } = params;

  const [allProducts, categoryRows] = await Promise.all([
    db.query.products.findMany({
      where: and(
        category ? eq(products.category, category) : undefined,
        q ? ilike(products.name, `%${q}%`) : undefined,
        maxPrice ? lte(products.priceCents, Number(maxPrice)) : undefined,
      ),
    }),
    db.selectDistinct({ category: products.category }).from(products),
  ]);

  const categories = categoryRows
    .map((row) => row.category)
    .filter(Boolean)
    .sort();

  const priceLabel = maxPrice ? `Under $${Number(maxPrice) / 100}` : null;
  const hasActiveFilters = Boolean(q || priceLabel);
  const count = allProducts.length;
  const clearHref = buildHref(params, { q: undefined, maxPrice: undefined });

  const pills = [
    { label: "All", href: buildHref(params, { category: undefined }), active: !category },
    ...categories.map((name) => ({
      label: name,
      href: buildHref(params, { category: name }),
      active: category === name,
    })),
  ];

  const chips = [
    ...(q
      ? [{
          id: "q",
          label: `“${q}”`,
          href: buildHref(params, { q: undefined }),
          ariaLabel: `Remove search ${q}`,
        }]
      : []),
    ...(priceLabel
      ? [{
          id: "price",
          label: priceLabel,
          href: buildHref(params, { maxPrice: undefined }),
          ariaLabel: `Remove filter ${priceLabel}`,
        }]
      : []),
  ];

  // Changing any filter changes this key, so the grid re-plays its entrance.
  const gridKey = `${category ?? ""}|${q ?? ""}|${maxPrice ?? ""}`;

  return (
    <MotionRoot>
      <main className="mx-auto w-full max-w-screen-2xl px-4 pb-16 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pt-12">
        {/* Header */}
        <Stagger immediate stagger={0.07} className="mb-5 sm:mb-8">
          <StaggerItem>
            <nav aria-label="Breadcrumb" className="mb-3 text-xs text-muted-foreground">
              <ol className="flex items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-foreground">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  {category ? (
                    <Link href="?" className="hover:text-foreground">Shop</Link>
                  ) : (
                    <span className="text-foreground">Shop</span>
                  )}
                </li>
                {category && (
                  <>
                    <li aria-hidden="true">/</li>
                    <li className="truncate text-foreground" aria-current="page">
                      {category}
                    </li>
                  </>
                )}
              </ol>
            </nav>
          </StaggerItem>

          <StaggerItem>
            <div className="min-w-0">
              <AnimatedTitle text={category ?? "Everything"} />
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                {category
                  ? `Our ${category.toLowerCase()} collection, made to be used every day.`
                  : "Thoughtful goods for your desk, home, and everyday rituals."}
              </p>
            </div>
          </StaggerItem>

          <StaggerItem className="mt-5 sm:mt-6 sm:max-w-xl">
            <SearchBar />
          </StaggerItem>

          {categories.length > 0 && (
            <StaggerItem>
              <nav
                aria-label="Categories"
                className="-mx-4 mt-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
              >
                <CategoryPills items={pills} />
              </nav>
            </StaggerItem>
          )}
        </Stagger>

        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <FilterSidebar mode="desktop" />
          </aside>

          <section className="min-w-0">
            {/* On mobile, a compact copy of this bar docks under the navbar while scrolling */}
            <DockedToolbar count={count} />

            <div className="mb-5 flex flex-col gap-3 border-y py-3">
              <div className="flex min-h-9 items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  <AnimatedCount count={count} /> {count === 1 ? "product" : "products"}
                </p>
                <FilterSidebar mode="mobile" />
              </div>

              <ActiveFilters chips={chips} clearHref={clearHref} />
            </div>

            {count > 0 ? (
              <Stagger
                key={gridKey}
                stagger={0.045}
                className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-10 xl:grid-cols-3"
              >
                {allProducts.map((product) => (
                  <StaggerItem key={product.id} className="min-w-0">
                    <Press scale={0.98} className="h-full">
                      <ProductCard
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
                    </Press>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <Reveal key={gridKey} y={16}>
                <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed px-5 text-center sm:min-h-80">
                  <p className="font-serif text-xl">No products found</p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    Try a different search or remove a filter.
                  </p>
                  {hasActiveFilters && (
                    <Link
                      href={clearHref}
                      className="mt-5 inline-flex h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors hover:bg-muted active:bg-muted"
                    >
                      Clear filters
                    </Link>
                  )}
                </div>
              </Reveal>
            )}
          </section>
        </div>
      </main>
    </MotionRoot>
  );
}