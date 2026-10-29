import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { Press, Stagger, StaggerItem } from "./motion";
import { BackToTop } from "./back-to-top";

const shopLinks = [
  { label: "All products", href: "/collections" },
  { label: "Desk & office", href: "/collections?category=Office" },
  { label: "Body & care", href: "/collections?category=Body%20%26%20Care" },
  { label: "Jewelry", href: "/collections?category=Jewelry" },
];

const helpLinks = [
  { label: "My orders", href: "/orders" },
  { label: "Shopping bag", href: "/cart" },
  { label: "Contact us", href: "mailto:hello@shelfmark.store" },
];

const linkClass =
  "inline-flex min-h-9 items-center text-sm text-muted-foreground transition-colors hover:text-foreground active:opacity-60";

export function Footer() {
  return (
    <footer className="rounded-t-[28px] border-t border-border bg-card sm:rounded-none">
      <div className="container px-5 sm:px-6 lg:px-8">
        <Stagger
          stagger={0.1}
          className="grid grid-cols-2 gap-x-6 gap-y-9 pb-8 pt-10 sm:gap-x-10 sm:py-14 lg:grid-cols-4 lg:gap-10"
        >
          {/* Brand: full width on mobile, two columns on desktop */}
          <StaggerItem className="col-span-2 space-y-4 lg:col-span-2">
            <Press scale={0.97} className="w-fit">
              <Link href="/" className="group flex w-fit items-center gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent font-serif text-lg font-semibold text-accent-foreground transition-transform duration-200 group-hover:rotate-[-4deg]">
                  S
                </span>
                <span className="font-serif text-xl font-semibold tracking-tight">
                  Shelfmark
                </span>
              </Link>
            </Press>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Thoughtful goods for the spaces you live and work in. Everyday
              essentials chosen to be useful, beautiful, and made to last.
            </p>

            <Link
              href="/collections"
              className="group inline-flex min-h-9 items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent active:opacity-60"
            >
              Explore the collection
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </StaggerItem>

          {/* Explore */}
          <StaggerItem className="min-w-0">
            <h2 className="text-sm font-semibold">Explore</h2>
            <ul className="mt-3 flex flex-col items-start">
              {shopLinks.map((link) => (
                <li key={link.label} className="max-w-full">
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Customer care */}
          <StaggerItem className="min-w-0">
            <h2 className="text-sm font-semibold">Customer care</h2>
            <ul className="mt-3 flex flex-col items-start">
              {helpLinks.map((link) => (
                <li key={link.label} className="max-w-full">
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className={`${linkClass} gap-1.5`}
                >
                  <Instagram className="size-4 shrink-0" />
                  Follow along
                  <ArrowUpRight className="size-3 shrink-0" />
                </Link>
              </li>
            </ul>
          </StaggerItem>
        </Stagger>

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-4 border-t border-border pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 text-xs text-muted-foreground">
          <div className="min-w-0">
            <p>© {new Date().getFullYear()} Shelfmark. All rights reserved.</p>
            <p className="mt-1 hidden sm:block">Considered goods. Everyday living.</p>
          </div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}