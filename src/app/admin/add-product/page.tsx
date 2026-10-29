
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { ProductForm } from "./product-form";

export default async function AddProductPage() {
  const authorized = await isAdmin();

  if (!authorized) {
    redirect("/");
  }

  return <ProductForm />;
}
