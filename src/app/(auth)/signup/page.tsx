"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "@/actions/auth";
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
  UserRound,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (data: UserFormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    await signup(formData);
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
            <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              A place for the considered
            </p>

            <h1 className="font-serif text-5xl leading-[1.12] tracking-tight xl:text-6xl">
              Make room for
              <br />
              <span className="italic text-accent">the things</span>
              <br />
              that matter.
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
              Create your account to explore thoughtful finds, keep track of
              your orders, and make Shelfmark your own.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border/70 bg-card/80 p-4 transition-colors hover:border-accent/40">
                <p className="font-serif text-xl text-accent">01</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Discover your favorites
                </p>
              </div>

              <div className="rounded-lg border border-border/70 bg-card/80 p-4 transition-colors hover:border-accent/40">
                <p className="font-serif text-xl text-accent">02</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Keep everything in one place
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>Objects with intention</span>
            <span>Your story starts here</span>
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

        {/* Sign-up form */}
        <section className="flex min-w-0 items-center justify-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16">
          <div className="w-full max-w-sm">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-accent lg:hidden"
            >
              <ArrowLeft className="size-3.5" />
              Back to storefront
            </Link>

            <div className="mb-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                Join Shelfmark
              </p>

              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                A considered collection starts with you.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignup)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-medium">
                        Full name
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            placeholder="Your name"
                            autoComplete="name"
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
                            placeholder="At least 6 characters"
                            autoComplete="new-password"
                            {...field}
                            className="h-11 w-full rounded-md border-border bg-card pl-10 text-sm shadow-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-accent"
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

                <Button
                  type="submit"
                  className="group h-11 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Creating your account..."
                    : "Create account"}

                  {!form.formState.isSubmitting && (
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>

                <p className="text-center text-[11px] leading-5 text-muted-foreground">
                  By creating an account, you agree to our applicable terms and
                  privacy practices.
                </p>
              </form>
            </Form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />

              <span className="text-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Already a member?
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            <Link href="/login" className="block">
              <Button
                variant="outline"
                className="h-11 w-full rounded-md border-border bg-card text-sm font-medium text-foreground transition-colors"
              >
                Sign in instead
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
