
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const formData = new FormData();

      formData.append("email", data.email.trim().toLowerCase());
      formData.append("password", data.password);

      const result = await login(formData);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Signed in successfully.");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Unable to sign in right now. Please try again.");
    }
  };

  const inputClassName =
    "h-12 w-full rounded-lg border-border/80 bg-card pl-10 font-sans text-sm shadow-sm transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:ring-offset-0";

  return (
    <main className="min-h-svh bg-background font-sans text-foreground">
      <div className="grid min-h-svh w-full lg:grid-cols-2">
        {/* Brand panel */}
        <section className="relative hidden min-w-0 flex-col justify-between overflow-hidden bg-secondary/60 p-8 sm:p-10 lg:flex lg:p-12 xl:p-16">
          <Link
            href="/"
            className="group relative z-10 flex w-fit items-center gap-3"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent font-serif text-lg font-semibold text-accent-foreground shadow-sm transition-transform duration-200 group-hover:-rotate-3">
              S
            </span>

            <span className="font-serif text-xl font-semibold tracking-tight">
              Shelfmark
            </span>
          </Link>

          <div className="relative z-10 my-12 max-w-lg">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-card/80 px-3 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground shadow-sm">
              <Sparkles className="size-3 text-accent" />
              Considered living
            </span>

            <h1 className="font-serif text-5xl leading-[1.12] tracking-tight xl:text-6xl">
              Good things
              <br />
              belong in
              <br />
              <span className="italic text-accent">good spaces.</span>
            </h1>

            <p className="mt-6 max-w-sm font-sans text-sm leading-7 text-muted-foreground">
              Discover thoughtfully selected essentials for your space, your
              routine, and everything in between.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>Objects with intention</span>
            <span>Est. Shelfmark</span>
          </div>

          {/* Decorative circles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-20 size-64 rounded-full border border-accent/15 sm:size-80 lg:-bottom-32 lg:-right-24 lg:size-96"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-10 size-48 rounded-full border border-accent/10 sm:size-60 lg:-bottom-20 lg:-right-12 lg:size-72"
          />
        </section>

        {/* Login form */}
        <section className="flex min-w-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile storefront navigation */}
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="inline-flex min-h-10 items-center gap-2 rounded-md font-sans text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                <ArrowLeft className="size-4" />
                Back to storefront
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8 sm:mb-9">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Welcome back
              </p>

              <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                Sign in to Shelfmark
              </h2>

              <p className="mt-3 font-sans text-sm leading-6 text-muted-foreground">
                Your next favorite find is just around the corner.
              </p>
            </div>

            {/* Login form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-5"
                noValidate
              >
                {/* Email address */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="min-w-0 space-y-2">
                      <FormLabel className="font-sans text-sm font-medium">
                        Email address
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Mail
                            aria-hidden="true"
                            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                          />

                          <Input
                            {...field}
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            inputMode="email"
                            autoCapitalize="none"
                            spellCheck={false}
                            className={inputClassName}
                          />
                        </div>
                      </FormControl>

                      <FormMessage className="font-sans text-xs leading-5" />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="min-w-0 space-y-2">
                      <FormLabel className="font-sans text-sm font-medium">
                        Password
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <LockKeyhole
                            aria-hidden="true"
                            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                          />

                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className={`${inputClassName} pr-12`}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((visible) => !visible)
                            }
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            aria-pressed={showPassword}
                            className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                          >
                            {showPassword ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage className="font-sans text-xs leading-5" />
                    </FormItem>
                  )}
                />

                {/* Root-level form error */}
                {form.formState.errors.root && (
                  <p className="font-sans text-xs text-destructive" role="alert">
                    {form.formState.errors.root.message}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="group h-12 w-full rounded-lg bg-primary font-sans text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {form.formState.isSubmitting ? "Signing in..." : "Sign in"}

                  {!form.formState.isSubmitting && (
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </form>
            </Form>

            {/* Sign-up link */}
            <div className="my-7 flex items-center gap-3 sm:gap-4">
              <div className="h-px flex-1 bg-border" />

              <span className="shrink-0 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                New to Shelfmark?
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            <Link href="/signup" className="block">
              <Button
                variant="outline"
                className="h-12 w-full rounded-lg border-border/80 bg-card font-sans text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-secondary/60"
              >
                Create an account
              </Button>
            </Link>

            <p className="mt-6 text-center font-sans text-xs leading-5 text-muted-foreground">
              By continuing, you agree to use Shelfmark responsibly.
            </p>

            {/* Small-screen brand note */}
            <p className="mt-5 text-center font-sans text-xs text-muted-foreground lg:hidden">
              Thoughtful finds. A little more you.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
