
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { addProduct } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Package,
  Tag,
  ImagePlus,
  AlertCircle,
} from "lucide-react";
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
    mobileTitle: "Details",
    description: "Give your product a name and category.",
    icon: Package,
  },
  {
    number: 2,
    title: "Pricing & inventory",
    mobileTitle: "Pricing",
    description: "Set the price and available stock.",
    icon: Tag,
  },
  {
    number: 3,
    title: "Description & media",
    mobileTitle: "Media",
    description: "Add details and a product image.",
    icon: ImagePlus,
  },
];

const inputClassName =
  "h-11 font-sans text-base sm:text-sm";

const labelClassName =
  "font-sans text-sm font-medium";

const helperClassName =
  "font-sans text-xs leading-5 text-muted-foreground";

function isValidHttpsUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function ProductForm() {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [stepError, setStepError] = useState("");
  const [formError, setFormError] = useState("");

  function generateSlug(value: string) {
    const generated = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setName(value);
    setSlug(generated);
    setStepError("");
    setFormError("");
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
      const parsedPrice = Number(price);
      const parsedStock = Number(stock);

      return (
        price.trim() !== "" &&
        Number.isFinite(parsedPrice) &&
        parsedPrice > 0 &&
        stock.trim() !== "" &&
        Number.isInteger(parsedStock) &&
        parsedStock >= 0
      );
    }

    const validImage =
      isUrlMode
        ? isValidHttpsUrl(imageUrl)
        : imageUrl.trim().length > 0 &&
          imageUrl.trim() !== "https://";

    return description.trim().length >= 10 && validImage;
  }

  function nextStep() {
    if (!isStepValid()) {
      setStepError(getStepError());
      return;
    }

    setStepError("");

    if (step < 3) {
      setStep((current) => current + 1);
    }
  }

  function previousStep() {
    if (step > 1) {
      setStep((current) => current - 1);
      setStepError("");
      setFormError("");
    }
  }

  function getStepError() {
    if (step === 1) {
      if (name.trim().length < 2) {
        return "Enter a product name containing at least 2 characters.";
      }

      if (slug.trim().length < 2) {
        return "Enter a valid product slug.";
      }

      if (category.trim().length < 2) {
        return "Choose a product category.";
      }
    }

    if (step === 2) {
      const parsedPrice = Number(price);
      const parsedStock = Number(stock);

      if (
        price.trim() === "" ||
        !Number.isFinite(parsedPrice) ||
        parsedPrice <= 0
      ) {
        return "Enter a valid price greater than zero.";
      }

      if (
        stock.trim() === "" ||
        !Number.isInteger(parsedStock) ||
        parsedStock < 0
      ) {
        return "Enter a whole number of available units, zero or greater.";
      }
    }

    if (step === 3) {
      if (description.trim().length < 10) {
        return "Add a description containing at least 10 characters.";
      }

      if (!imageUrl.trim() || imageUrl.trim() === "https://") {
        return "Upload a product image or provide an image URL.";
      }

      if (isUrlMode && !isValidHttpsUrl(imageUrl)) {
        return "Enter a valid HTTPS image URL.";
      }
    }

    return "Please check your product details and try again.";
  }

  function isProductValid() {
    return productSchema.safeParse({
      name: name.trim(),
      slug: slug.trim(),
      category,
      price: Number(price),
      description: description.trim(),
      stock: Number(stock),
      image: imageUrl.trim(),
    }).success;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setFormError("");

    if (!isProductValid()) {
      event.preventDefault();

      if (
        name.trim().length < 2 ||
        slug.trim().length < 2 ||
        category.trim().length < 2
      ) {
        setStep(1);
      } else if (
        !price.trim() ||
        !Number.isFinite(Number(price)) ||
        Number(price) <= 0 ||
        !stock.trim() ||
        !Number.isInteger(Number(stock)) ||
        Number(stock) < 0
      ) {
        setStep(2);
      } else {
        setStep(3);
      }

      setFormError(
        "Some product details are invalid. Review this step before creating your product."
      );
      return;
    }
  }

  const currentStep = steps[step - 1];

  // The URL mode is entered through the "Paste URL" button.
  const isUrlMode =
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("http://");

  const hasValidPreview = isValidHttpsUrl(imageUrl);

  return (
    <main className="container mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-7 sm:mb-9">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Admin / Catalog
        </p>

        <h1 className="mt-2 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Add product
        </h1>

        <p className="mt-2 max-w-lg font-sans text-sm leading-6 text-muted-foreground sm:text-base">
          Add a product to your catalog, set its price, and prepare it for your
          customers.
        </p>
      </header>

      <nav
        aria-label="Product creation progress"
        className="mb-7 sm:mb-9"
      >
        <div className="grid grid-cols-3 gap-1 sm:gap-4">
          {steps.map((item) => {
            const active = step === item.number;
            const completed = step > item.number;
            const canVisit = item.number <= step;

            return (
              <button
                key={item.number}
                type="button"
                onClick={() => {
                  if (canVisit) {
                    setStep(item.number);
                    setStepError("");
                    setFormError("");
                  }
                }}
                disabled={!canVisit}
                aria-current={active ? "step" : undefined}
                className="min-w-0 rounded-lg p-2 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default sm:p-3"
              >
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border font-sans text-sm font-medium transition-colors sm:size-9 ${
                      active || completed
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {completed ? (
                      <Check className="size-4" />
                    ) : (
                      item.number
                    )}
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`block font-sans text-xs font-semibold leading-4 sm:text-sm ${
                        active
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span className="sm:hidden">
                        {item.mobileTitle}
                      </span>
                      <span className="hidden sm:inline">
                        {item.title}
                      </span>
                    </span>

                    <span className="mt-1 hidden font-sans text-xs leading-5 text-muted-foreground md:block">
                      {item.description}
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div
          className="mt-4 h-1 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label="Product creation progress"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step}
        >
          <div
            className="h-full rounded-full bg-foreground transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </nav>

      <Separator className="mb-7 sm:mb-9" />

      <form action={addProduct} onSubmit={handleSubmit}>
        <input type="hidden" name="name" value={name.trim()} />
        <input type="hidden" name="slug" value={slug.trim()} />
        <input type="hidden" name="category" value={category} />
        <input type="hidden" name="price" value={price} />
        <input type="hidden" name="stock" value={stock} />
        <input
          type="hidden"
          name="description"
          value={description.trim()}
        />
        <input type="hidden" name="image" value={imageUrl.trim()} />

        <div className="mb-6 sm:mb-8">
          <p className="font-sans text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Step {step} of 3
          </p>

          <h2 className="mt-1.5 font-sans text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
            {currentStep.title}
          </h2>

          <p className="mt-1.5 font-sans text-sm leading-6 text-muted-foreground">
            {currentStep.description}
          </p>
        </div>

        {step === 1 && (
          <section className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className={labelClassName}>
                Product name
              </Label>

              <Input
                id="name"
                value={name}
                onChange={(event) => generateSlug(event.target.value)}
                placeholder="Atlas Executive Chair"
                className={inputClassName}
                autoComplete="off"
                required
              />

              <p className={helperClassName}>
                Use a clear name customers can recognize.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className={labelClassName}>
                Product slug
              </Label>

              <Input
                id="slug"
                value={slug}
                onChange={(event) => {
                  setSlug(event.target.value);
                  setStepError("");
                  setFormError("");
                }}
                placeholder="atlas-executive-chair"
                className={inputClassName}
                autoComplete="off"
                required
              />

              <p className={helperClassName}>
                This is the URL-friendly identifier for your product.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className={labelClassName}>
                Category
              </Label>

              <Select
                value={category}
                onValueChange={(value) => {
                  setCategory(value);
                  setStepError("");
                  setFormError("");
                }}
              >
                <SelectTrigger
                  id="category"
                  className="h-11 w-full font-sans text-base sm:text-sm"
                >
                  <SelectValue placeholder="Choose a category" />
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

        {step === 2 && (
          <section className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="price" className={labelClassName}>
                Product price
              </Label>

              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                  setStepError("");
                  setFormError("");
                }}
                placeholder="245.00"
                className={inputClassName}
                required
              />

              <p className={helperClassName}>
                Enter the selling price. Your server action handles conversion
                to the database format.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className={labelClassName}>
                Available stock
              </Label>

              <Input
                id="stock"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={stock}
                onChange={(event) => {
                  setStock(event.target.value);
                  setStepError("");
                  setFormError("");
                }}
                placeholder="20"
                className={inputClassName}
                required
              />

              <p className={helperClassName}>
                Enter the number of units currently available for sale.
              </p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-sans text-sm font-medium">
                Pricing summary
              </p>

              <div className="mt-3 flex items-center justify-between gap-4 font-sans text-sm">
                <span className="text-muted-foreground">
                  Selling price
                </span>
                <span className="font-semibold tabular-nums tracking-tight">
                  {price.trim() &&
                  Number.isFinite(Number(price)) &&
                  Number(price) > 0
                    ? Number(price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "—"}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between gap-4 font-sans text-sm">
                <span className="text-muted-foreground">
                  Available units
                </span>
                <span className="font-medium tabular-nums">
                  {stock.trim() !== "" &&
                  Number.isInteger(Number(stock)) &&
                  Number(stock) >= 0
                    ? Number(stock).toLocaleString()
                    : "—"}
                </span>
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description" className={labelClassName}>
                Product description
              </Label>

              <Textarea
                id="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setStepError("");
                  setFormError("");
                }}
                placeholder="Describe the product, its features, materials, and how it can be used..."
                className="min-h-36 resize-y font-sans text-base leading-6 sm:text-sm"
                required
              />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className={helperClassName}>
                  Give customers useful details to help them make a decision.
                </p>

                <span
                  className={`font-sans text-xs tabular-nums ${
                    description.trim().length < 10
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {description.trim().length} characters
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className={labelClassName}>Product image</p>

                <p className={`mt-1 ${helperClassName}`}>
                  Upload a product photo or provide an HTTPS image URL.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-1 rounded-lg border bg-muted/40 p-1">
                <Button
                  type="button"
                  variant={!isUrlMode ? "default" : "ghost"}
                  className="h-10 font-sans text-sm"
                  onClick={() => {
                    setImageUrl("");
                    setStepError("");
                    setFormError("");
                  }}
                >
                  <ImagePlus className="mr-2 size-4" />
                  Upload image
                </Button>

                <Button
                  type="button"
                  variant={isUrlMode ? "default" : "ghost"}
                  className="h-10 font-sans text-sm"
                  onClick={() => {
                    setImageUrl("https://");
                    setStepError("");
                    setFormError("");
                  }}
                >
                  Paste URL
                </Button>
              </div>

              {isUrlMode ? (
                <div className="space-y-2">
                  <Label htmlFor="image-url" className={labelClassName}>
                    Image URL
                  </Label>

                  <Input
                    id="image-url"
                    type="url"
                    inputMode="url"
                    value={imageUrl}
                    onChange={(event) => {
                      setImageUrl(event.target.value);
                      setStepError("");
                      setFormError("");
                    }}
                    placeholder="https://example.com/image.jpg"
                    className={inputClassName}
                    autoComplete="url"
                    aria-invalid={
                      imageUrl.trim().length > "https://".length &&
                      !isValidHttpsUrl(imageUrl)
                    }
                  />

                  <p className={helperClassName}>
                    Use a complete HTTPS URL that points to your product image.
                  </p>
                </div>
              ) : (
                <ImageUploader
                  onUploadComplete={(url) => {
                    setImageUrl(url);
                    setStepError("");
                    setFormError("");
                  }}
                />
              )}

              {hasValidPreview && (
                <div className="space-y-2">
                  <p className="font-sans text-sm font-medium">
                    Image preview
                  </p>

                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-muted sm:aspect-[16/9]">
                    <Image
                      src={imageUrl}
                      alt="Product image preview"
                      fill
                      sizes="(max-width: 640px) 100vw, 672px"
                      unoptimized
                      className="object-contain"
                    />
                  </div>

                  <p className="break-all font-sans text-xs leading-5 text-muted-foreground">
                    {imageUrl}
                  </p>
                </div>
              )}

              {isUrlMode && imageUrl.trim() === "https://" && (
                <p className={helperClassName}>
                  Paste the full image URL to see its preview.
                </p>
              )}
            </div>
          </section>
        )}

        {(stepError || formError) && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <p className="font-sans leading-5">
              {formError || stepError}
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 border-t pt-5 sm:mt-10 sm:pt-6">
          <Button
            type="button"
            variant="outline"
            className="min-h-11 px-4 font-sans"
            onClick={previousStep}
            disabled={step === 1}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Button>

          <span className="font-sans text-xs text-muted-foreground sm:hidden">
            {step} of 3
          </span>

          {step < 3 ? (
            <Button
              type="button"
              className="min-h-11 px-4 font-sans"
              onClick={nextStep}
            >
              Continue
              <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="min-h-11 px-4 font-sans"
            >
              <Check className="mr-2 size-4" />
              Create product
            </Button>
          )}
        </div>
      </form>
    </main>
  );
}
