// "use client";

// import { Input } from "@/components/ui/input";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Button } from "./ui/button";
// import { Search } from "lucide-react";

// export function SearchBar() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   function handleSearch(term: string) {
//     const params = new URLSearchParams(searchParams);
//     if (term) {
//       params.set("q", term);
//     } else {
//       params.delete("q");
//     }
//     // Update the URL without a full page reload
//     router.replace(`/?${params.toString()}`);
//   }

//   function handleSubmit(formData: FormData) {
//     const query = formData.get("q")?.toString().trim();
//     if (!query) {
//       router.push("/");
//       return;
//     }
//     router.push(`/?q=${encodeURIComponent(query)}`);
//   }

//   return (
//     <form action={handleSubmit} className="flex w-full gap-2">
//       {" "}
//        <Input
//         placeholder="Search products..."
//         onChange={(e) => handleSearch(e.target.value)}
//         defaultValue={searchParams.get("q")?.toString()}
//       />{" "}
//       <Button type="submit" size="icon" className="h-11 w-11">
//         {" "}
//         <Search className="h-4 w-4" />{" "}
//         <span className="sr-only">Search</span>{" "}
//       </Button>{" "}
//     </form>
//   );
// }

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term.trim()) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleSubmit(formData: FormData) {
    const query = formData.get("q")?.toString().trim();

    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      action={handleSubmit}
      className="flex w-full max-w-xl items-center gap-2"
    >
      <Input
        name="q"
        placeholder="Search products..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("q") ?? ""}
        className="h-11 bg-background"
      />

      <Button type="submit" size="icon" className="size-11 shrink-0">
        <Search className="size-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}