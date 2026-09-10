"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    // Update the URL without a full page reload
    router.replace(`/?${params.toString()}`);
  }

  return (
    <div className="relative w-full max-w-sm justify-center">
      <Input
        placeholder="Search products..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("q")?.toString()}
      />
    </div>
  );
}