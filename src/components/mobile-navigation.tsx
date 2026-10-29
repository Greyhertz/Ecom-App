"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronRight, House, Layers3, Plus, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { spring } from "./motion";

type MobileNavigationProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: spring },
};

export function MobileNavigation({ isLoggedIn, isAdmin }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: House },
    { href: "/collections", label: "Collections", icon: Layers3 },
    ...(isLoggedIn ? [{ href: "/orders", label: "My orders", icon: ShoppingBag }] : []),
    ...(isAdmin ? [{ href: "/admin/add-product", label: "Studio", icon: Plus }] : []),
  ];

  useEffect(() => setMounted(true), []);

  // Close whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.button
        type="button"
        whileTap={{ scale: 0.88 }}
        transition={spring}
        className="relative flex size-9 shrink-0 items-center justify-center rounded-full active:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Three bars that morph into an X */}
        <span className="relative block h-4 w-5">
          <motion.span
            className="absolute left-0 block h-0.5 w-5 rounded-full bg-foreground"
            animate={open ? { top: 7, rotate: 45 } : { top: 0, rotate: 0 }}
            transition={spring}
          />
          <motion.span
            className="absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-foreground"
            animate={open ? { opacity: 0, scaleX: 0.3 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="absolute left-0 block h-0.5 w-5 rounded-full bg-foreground"
            animate={open ? { top: 7, rotate: -45 } : { top: 14, rotate: 0 }}
            transition={spring}
          />
        </span>
      </motion.button>

      {/* Rendered in a portal: the header's backdrop blur would otherwise trap fixed children. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-40 md:hidden">
                <motion.button
                  type="button"
                  aria-label="Close navigation"
                  className="absolute inset-0 bg-black/35 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(false)}
                />

                <motion.div
                  id="mobile-navigation-panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation"
                  className="absolute inset-x-0 top-0 rounded-b-[28px] bg-background pt-14 shadow-2xl sm:pt-16"
                  initial={{ y: "-6%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: spring }}
                  exit={{ y: "-4%", opacity: 0, transition: { duration: 0.18 } }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={{ top: 0.3, bottom: 0.03 }}
                  onDragEnd={(_, info) => info.offset.y < -50 && setOpen(false)}
                >
                  <motion.nav
                    aria-label="Mobile navigation"
                    className="mx-auto max-w-7xl px-4 pb-3 pt-3"
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                  >
                    <ul className="flex flex-col gap-1">
                      {links.map(({ href, label, icon: Icon }) => {
                        const active =
                          pathname === href ||
                          (href !== "/" && pathname.startsWith(`${href}/`));
                        return (
                          <motion.li key={href} variants={rowVariants}>
                            <Link
                              href={href}
                              aria-current={active ? "page" : undefined}
                              className="relative flex min-h-14 items-center gap-4 rounded-2xl px-3 transition-colors active:bg-secondary/60"
                            >
                              {active && (
                                <motion.span
                                  layoutId="mobile-nav-active"
                                  transition={spring}
                                  className="absolute inset-0 rounded-2xl bg-secondary"
                                />
                              )}
                              <span className="relative z-10 flex size-10 items-center justify-center rounded-xl bg-background shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                                <Icon className="size-[18px]" />
                              </span>
                              <span className="relative z-10 font-serif text-xl tracking-tight">
                                {label}
                              </span>
                              <ChevronRight className="relative z-10 ml-auto size-5 text-muted-foreground" />
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>

                    {!isLoggedIn && (
                      <motion.div
                        variants={rowVariants}
                        className="mt-3 grid grid-cols-2 gap-2.5 border-t border-border pt-4"
                      >
                        <Button asChild variant="outline" className="h-12 rounded-full text-base">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild className="h-12 rounded-full text-base">
                          <Link href="/signup">Create account</Link>
                        </Button>
                      </motion.div>
                    )}
                  </motion.nav>

                  {/* Drag handle: swipe up to dismiss */}
                  <div className="flex justify-center pb-3 pt-1">
                    <span className="h-1 w-10 rounded-full bg-border" />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}