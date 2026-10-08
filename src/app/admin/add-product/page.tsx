"use client";

import { useState } from "react";
import { addProduct } from "@/actions/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { productSchema } from "@/lib/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const steps = [
  {
    number: 1,
    title: "Basic information",
    description: "Give your product a name and category.",
  },
  {
    number: 2,
    title: "Pricing & inventory",
    description: "Set the price and available stock.",
  },
  {
    number: 3,
    title: "Description & media",
    description: "Add details and a product image.",
  },
];

export default function AddProductPage() {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function generateSlug(value: string) {
    const generated = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setName(value);
    setSlug(generated);
  }

  function isStepValid() {
    if (step === 1) {
      return (
        name.trim().length >= 2 &&
        slug.trim().length >= 2 &&
        category.trim().length >= 2
      );
    }

    if (step === 2) {
      return Number(price) > 0 && stock !== "" && Number(stock) >= 0;
    }

    return description.trim().length >= 10 && imageUrl.trim().length > 0;
  }

  function nextStep() {
    if (!isStepValid()) return;

    if (step < 3) {
      setStep(step + 1);
    }
  }

  function previousStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function isProductValid() {
    return productSchema.safeParse({
      name,
      slug,
      category,
      price: Number(price),
      description,
      stock: Number(stock),
      image: imageUrl,
    }).success;
  }

  return (
    <main className="container max-w-3xl py-10 sm:py-14">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Admin
        </p>

        <h1 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
          Add product
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Create a new product for your Shelfmark catalog.
        </p>
      </div>

      {/* Steps */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {steps.map((item) => {
          const active = step === item.number;
          const completed = step > item.number;

          return (
            <button
              key={item.number}
              type="button"
              onClick={() => {
                if (item.number <= step) {
                  setStep(item.number);
                }
              }}
              className="text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : completed
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {completed ? <Check className="size-3.5" /> : item.number}
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-xs font-medium ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </p>

                  <p className="mt-0.5 hidden text-[11px] text-muted-foreground sm:block">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Separator className="mb-10" />

      <form action={addProduct}>
        <Input type="hidden" name="name" value={name} />
        <Input type="hidden" name="slug" value={slug} />
        <Input type="hidden" name="category" value={category} />
        <Input type="hidden" name="price" value={price} />
        <Input type="hidden" name="stock" value={stock} />
        <Input type="hidden" name="description" value={description} />
        <Input type="hidden" name="image" value={imageUrl} />

        {/* steps */}
        {/* STEP 1 */}
        {step === 1 && (
          <section className="space-y-7">
            <div>
              <h2 className="text-lg font-medium">Basic information</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Start with the essentials of your product.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs">
                Product name
              </Label>

              <Input
                id="name"
                value={name}
                onChange={(e) => generateSlug(e.target.value)}
                placeholder="Atlas Executive Chair"
                className="text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-xs">
                Slug
              </Label>

              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="atlas-executive-chair"
                className="text-sm"
                required
              />

              <p className="text-[11px] text-muted-foreground">
                Used in the product URL.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-xs">
                Category
              </Label>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent className="bg-background">
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Body & Care">Body & Care</SelectItem>
                  <SelectItem value="Jewelry">Jewelry</SelectItem>
                  <SelectItem value="Plants">Plants</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <section className="space-y-7">
            <div>
              <h2 className="text-lg font-medium">Pricing & inventory</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Set how much the product costs and how many are available.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-xs">
                Price
              </Label>

              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="245.00"
                className="text-sm"
                required
              />

              <p className="text-[11px] text-muted-foreground">
                Enter the normal product price. The server will convert it to
                the database format.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-xs">
                Stock
              </Label>

              <Input
                id="stock"
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="20"
                className="text-sm"
                required
              />

              <p className="text-[11px] text-muted-foreground">
                Number of units currently available.
              </p>
            </div>
          </section>
        )}

        {/* STEP 3 */}
        {/* STEP 3 */}
        {step === 3 && (
          <section className="space-y-7">
            <div>
              <h2 className="text-lg font-medium">Description & media</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Give customers more information about the product.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs">
                Description
              </Label>

              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A premium executive chair designed for..."
                className="min-h-32 resize-none text-sm"
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-xs">Product image</Label>

              <ImageUploader
                onUploadComplete={(res) => {
                  setImageUrl(res[0]);
                }}
              />

              <input type="hidden" name="image" value={imageUrl} />

              {imageUrl && (
                <div className="overflow-hidden rounded-md border bg-muted">
                  <img
                    src={imageUrl}
                    alt="Product preview"
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between border-t pt-6">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={previousStep}
            disabled={step === 1}
          >
            <ChevronLeft className="mr-1 size-4" />
            Back
          </Button>

          {step < 3 ? (
            <Button
              type="button"
              size="sm"
              onClick={nextStep}
              disabled={!isStepValid()}
            >
              Continue
              <ChevronRight className="ml-1 size-4" />
            </Button>
          ) : (
            <Button type="submit" size="sm" disabled={!isProductValid()}>
              <Check className="mr-1 size-4" />
              Create product
            </Button>
          )}
        </div>
      </form>
    </main>
  );
}
