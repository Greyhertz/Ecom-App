export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { ProductForm } from "./product-form"; // Import your form here

export default async function AddProductPage() {
  // The "Bodyguard" checks if you are allowed in
  const authorized = await isAdmin();

  if (!authorized) {
    redirect("/");
  }

  // If you are admin, it renders the form
  return (
    <main className="container max-w-3xl py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="text-3xl font-serif">Add product</h1>
      </div>
      <ProductForm />
    </main>
  );
}
