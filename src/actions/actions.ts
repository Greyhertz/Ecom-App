"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  // 1. Authorization: Only allow Admins
  if (!(await isAdmin())) throw new Error("Unauthorized");

  // 2. Extract form data
  const name = formData.get("name") as string;
  const priceCents = Number(formData.get("priceCents"));
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  // 3. Database Insert
  await db.insert(products).values({
    name,
    priceCents,
    description,
    category,
    image,
    slug,
  });

  revalidatePath("/"); // Tells Next.js to refresh the homepage automatically!
}