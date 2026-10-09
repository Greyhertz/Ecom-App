"use client";

import { useState } from "react";
import Link from "next/link";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    // The server action does the actual credential check.
    // If it redirects on success, nothing below runs.
  };

  return (
    <main className="min-h-svh bg-background">
      <div className="grid min-h-svh w-full lg:grid-cols-2">
        {/* Brand panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-border/70 bg-secondary/60 p-8 sm:p-10 lg:flex lg:p-12 xl:p-16">
          <Link href="/" className="group flex w-fit items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-accent font-serif text-lg font-semibold text-accent-foreground shadow-sm transition-transform duration-200 group-hover:rotate-[-4deg]">
              S
            </span>

            <span className="font-serif text-xl font-semibold tracking-tight">
              Shelfmark
            </span>
          </Link>

          <div className="relative z-10 max-w-lg">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
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

            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
              Discover thoughtfully selected essentials for your space, your
              routine, and everything in between.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>Objects with intention</span>
            <span>Est. Shelfmark</span>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-20 size-64 rounded-full border border-accent/20 sm:size-80 lg:-bottom-32 lg:-right-24 lg:size-96"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-10 size-48 rounded-full border border-accent/15 sm:size-60 lg:-bottom-20 lg:-right-12 lg:size-72"
          />
        </section>

        {/* Login form */}
        <section className="flex min-w-0 items-center justify-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16">
          <div className="w-full max-w-sm">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-accent lg:hidden"
            >
              <ArrowLeft className="size-3.5" />
              Back to storefront
            </Link>

            <div className="mb-9">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                Welcome back
              </p>

              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                Sign in to Shelfmark
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Your next favorite find is just around the corner.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-medium">
                        Email address
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            {...field}
                            className="h-11 w-full rounded-md border-border bg-card pl-10 text-sm shadow-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-accent"
                          />
                        </div>
                      </FormControl>

                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-medium">
                        Password
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            {...field}
                            className="h-11 w-full rounded-md border-border bg-card pl-10 pr-10 text-sm shadow-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-accent"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((visible) => !visible)
                            }
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-accent"
                          >
                            {showPassword ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root && (
                  <p className="text-xs text-destructive" role="alert">
                    {form.formState.errors.root.message}
                  </p>
                )}

                <Button
                  type="submit"
                  className="group h-11 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Signing in..." : "Sign in"}

                  {!form.formState.isSubmitting && (
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </form>
            </Form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />

              <span className="text-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                New to Shelfmark?
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            <Link href="/signup" className="block">
              <Button
                variant="outline"
                className="h-11 w-full rounded-md border-border bg-card text-sm font-medium text-foreground transition-colors"
              >
                Create an account
              </Button>
            </Link>

            <p className="mt-8 text-center text-[11px] leading-5 text-muted-foreground">
              By continuing, you agree to use Shelfmark responsibly.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
