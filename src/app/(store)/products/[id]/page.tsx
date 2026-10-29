
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "./add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/db/schema";
import { Separator } from "@/components/ui/separator";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Fetch the specific product from the database.
  const { id } = await params;

  const product = await db.query.products.findFirst({
    where: eq(products.slug, id),
  });

  if (!product) notFound();

  return (
    <main className="mx-auto grid w-full min-w-0 max-w-screen-xl grid-cols-1 gap-6 px-4 py-6 sm:gap-10 sm:px-6 sm:py-10 md:grid-cols-2 md:gap-12 lg:px-8 lg:py-14">
      {/* Product image */}
      <div className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-sm bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 50vw, (min-width: 640px) 100vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Product information */}
      <section className="flex min-w-0 flex-col md:py-2 lg:py-6">
        <Badge variant="outline" className="w-fit">
          {product.category}
        </Badge>

        <h1 className="mt-3 break-words font-serif text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl">
          {product.name}
        </h1>

        <p className="mt-3 text-lg font-medium sm:text-xl">
          {formatPrice(product.priceCents)}
        </p>

        <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground italic sm:text-base sm:leading-7">
          {product.description}
        </p>

        <Separator className="my-5 sm:my-7" />

        <div className="mt-2 sm:mt-0 md:mt-auto">
          <AddToCartButton product={product} />
        </div>
      </section>
    </main>
  );
}
