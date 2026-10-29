"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

const userSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (data: UserFormValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name.trim());
      formData.append("email", data.email.trim().toLowerCase());
      formData.append("password", data.password);

      const result = await signup(formData);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Account created successfully.");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputClassName =
    "h-12 w-full rounded-lg border-border/80 bg-card pl-10 pr-10 font-sans text-sm shadow-sm transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:ring-offset-0";

  return (
    <main className="min-h-svh bg-background font-sans text-foreground">
      <div className="grid min-h-svh w-full lg:grid-cols-2">
        {/* Brand panel: desktop and large screens */}
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
            <p className="mb-6 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              A place for the considered
            </p>

            <h1 className="font-serif text-5xl leading-[1.12] tracking-tight xl:text-6xl">
              Make room for
              <br />
              <span className="italic text-accent">the things</span>
              <br />
              that matter.
            </h1>

            <p className="mt-6 max-w-sm font-sans text-sm leading-7 text-muted-foreground">
              Create your account to explore thoughtful finds, keep track of
              your orders, and make Shelfmark your own.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-card/80 p-4 shadow-sm transition-shadow hover:shadow-md">
                <p className="font-serif text-xl text-accent">01</p>
                <p className="mt-2 font-sans text-xs leading-5 text-muted-foreground">
                  Discover your favorites
                </p>
              </div>

              <div className="rounded-xl bg-card/80 p-4 shadow-sm transition-shadow hover:shadow-md">
                <p className="font-serif text-xl text-accent">02</p>
                <p className="mt-2 font-sans text-xs leading-5 text-muted-foreground">
                  Keep everything in one place
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>Objects with intention</span>
            <span>Your story starts here</span>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-20 size-64 rounded-full border border-accent/15 sm:size-80 lg:-bottom-32 lg:-right-24 lg:size-96"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-10 size-48 rounded-full border border-accent/10 sm:size-60 lg:-bottom-20 lg:-right-12 lg:size-72"
          />
        </section>

        {/* Sign-up form */}
        <section className="flex min-w-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile navigation */}
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="inline-flex min-h-10 items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                <ArrowLeft className="size-4" />
                Back to storefront
              </Link>
            </div>

            <div className="mb-8 sm:mb-9">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Join Shelfmark
              </p>

              <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 font-sans text-sm leading-6 text-muted-foreground">
                A considered collection starts with you.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignup)}
                className="space-y-5"
                noValidate
              >
                {/* Full name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="min-w-0 space-y-2">
                      <FormLabel className="font-sans text-sm font-medium">
                        Full name
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <UserRound
                            aria-hidden="true"
                            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                          />

                          <Input
                            {...field}
                            type="text"
                            placeholder="Your name"
                            autoComplete="name"
                            autoCapitalize="words"
                            spellCheck={false}
                            className={inputClassName}
                          />
                        </div>
                      </FormControl>

                      <FormMessage className="font-sans text-xs leading-5" />
                    </FormItem>
                  )}
                />

                {/* Email */}
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
                            placeholder="At least 6 characters"
                            autoComplete="new-password"
                            className={inputClassName}
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

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="group h-12 w-full rounded-lg bg-primary font-sans text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {form.formState.isSubmitting
                    ? "Creating your account..."
                    : "Create account"}

                  {!form.formState.isSubmitting && (
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>

                <p className="px-1 text-center font-sans text-xs leading-5 text-muted-foreground">
                  By creating an account, you agree to our applicable terms and
                  privacy practices.
                </p>
              </form>
            </Form>

            <div className="my-7 flex items-center gap-3 sm:gap-4">
              <div className="h-px flex-1 bg-border" />

              <span className="shrink-0 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Already a member?
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            <Link href="/login" className="block">
              <Button
                variant="outline"
                className="h-12 w-full rounded-lg border-border/80 font-sans text-sm font-medium text-foreground shadow-sm transition-colors mt-7"
              >
                Sign in instead
              </Button>
            </Link>

            <p className="mt-6 text-center font-sans text-xs text-muted-foreground lg:hidden">
              Thoughtful finds. A little more you.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
