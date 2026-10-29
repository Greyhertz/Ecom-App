"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { spring } from "./motion";

type DesktopNavProps = { isLoggedIn: boolean; isAdmin: boolean };

export function DesktopNav({ isLoggedIn, isAdmin }: DesktopNavProps) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const links = [
    { href: "/", label: "Home" },
    { href: "/collections", label: "Collections" },
    ...(isLoggedIn ? [{ href: "/orders", label: "Orders" }] : []),
    ...(isAdmin ? [{ href: "/admin/add-product", label: "Studio", external: true }] : []),
  ];

  const activeHref =
    links.find(
      (l) => pathname === l.href || (l.href !== "/" && pathname.startsWith(`${l.href}/`)),
    )?.href ?? null;

  // The pill follows the cursor, and returns to the current page when the cursor leaves.
  const highlighted = hovered ?? activeHref;

  return (
    <nav aria-label="Main" className="hidden flex-1 items-center justify-center md:flex">
      <div
        className="relative flex items-center rounded-full border border-border/70 bg-muted/30 p-1"
        onMouseLeave={() => setHovered(null)}
      >
        {links.map(({ href, label, external }) => (
          <Link
            key={href}
            href={href}
            onMouseEnter={() => setHovered(href)}
            onFocus={() => setHovered(href)}
            onBlur={() => setHovered(null)}
            aria-current={href === activeHref ? "page" : undefined}
            className="group relative flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:px-4"
          >
            {highlighted === href && (
              <motion.span
                layoutId="desktop-nav-pill"
                transition={spring}
                className="absolute inset-0 rounded-full bg-background shadow-sm"
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                highlighted === href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {external && (
              <ArrowUpRight className="relative z-10 size-3 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}