import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";

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

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container">
        {/* Main footer */}
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-16">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-2">
            {/* Brand */}
            <Link href="/" className="group flex w-fit items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-md bg-accent font-serif text-lg font-semibold text-accent-foreground shadow-sm transition-transform duration-200 group-hover:rotate-[-4deg]">
                S
              </span>

              <span className="font-serif text-xl font-semibold tracking-tight">
                Shelfmark
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Thoughtful goods for the spaces you live and work in. Discover
              everyday essentials chosen to be useful, beautiful, and made to
              last.
            </p>

            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
            >
              Explore the collection
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          {/* Shop */}
          <div className="space-y-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em]">
              Explore
            </h2>

            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer care */}
          <div className="space-y-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em]">
              Customer care
            </h2>

            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 pt-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Instagram className="size-4" />
              Follow along
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Shelfmark. All rights reserved.</p>

          <p className="tracking-wide">Considered goods. Everyday living.</p>
        </div>
      </div>
    </footer>
  );
}
