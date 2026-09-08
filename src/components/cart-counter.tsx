"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function CartCounter() {
  const totalItems = useCartStore((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Link href="/cart" className="relative flex items-center gap-2 text-sm">
      <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
      {mounted && totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}