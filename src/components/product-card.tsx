import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden transition-colors hover:border-foreground/30">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <CardContent className="pt-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 font-serif text-base leading-snug">
            {product.name}
          </h3>
          <p className="mt-2 text-sm">{formatPrice(product.priceCents)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
