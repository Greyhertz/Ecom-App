import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters"),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    ),

  category: z
    .string()
    .min(2, "Category is required"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  image: z
    .string()
    .min(1, "Product image is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;