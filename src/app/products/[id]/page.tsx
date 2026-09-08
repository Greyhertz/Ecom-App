import { db } from "@/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "./add-to-cart-button"; // Adjust path if needed
import { Badge } from "@/components/ui/badge";
// import Seperator
import { products } from "@/db/schema";
import { Separator } from "@/components/ui/separator";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Fetch the specific product from the DB
  // Note: We await params in Next.js 15
  const { id } = await params;

  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });

  if (!product) notFound();

  return (
    <div className="container grid gap-10 py-12 sm:grid-cols-2 sm:py-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col">
        <Badge variant="outline" className="w-fit">
          {product.category}
        </Badge>
        <h1 className="mt-3 font-serif text-3xl leading-tight">
          {product.name}
        </h1>
        <p className="mt-3 text-lg font-medium">{formatPrice(product.priceCents)}</p>
        <p className="mt-4 max-w-md text-muted-foreground italic">
          {product.description}
        </p>

        <Separator className="my-6" />

        <div className="mt-auto">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}