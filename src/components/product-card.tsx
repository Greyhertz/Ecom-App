
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      aria-label={`View ${product.name}`}
      className="group block min-w-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="h-full overflow-hidden rounded-lg border-border bg-card transition-colors duration-200 group-hover:border-foreground/30">
        {/* Product image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Product information */}
        <CardContent className="min-w-0 break-words p-3 sm:p-4">
          <p className="truncate font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">
            {product.category}
          </p>

          <h3 className="mt-1.5 line-clamp-2 font-serif text-sm font-medium leading-snug tracking-tight text-foreground sm:text-base">
            {product.name}
          </h3>

          <p className="mt-2 font-sans text-sm font-semibold tabular-nums tracking-tight text-foreground sm:mt-2.5 sm:text-base">
            {formatPrice(product.priceCents)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
