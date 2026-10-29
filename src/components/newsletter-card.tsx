"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { spring } from "@/components/motion";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: send `email` to your newsletter endpoint before showing success.
    setDone(true);
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-[#244A3A] px-6 py-9 text-center sm:px-10 sm:py-12">
      <h2 className="font-serif text-2xl font-medium tracking-tight text-[#FAF7F0] sm:text-3xl">
        Good things, occasionally.
      </h2>

      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring}
            className="mt-6 flex flex-col items-center gap-3"
            role="status"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-[#D5A17D] text-[#24392F]">
              <Check className="size-6" />
            </span>
            <p className="text-sm text-white/80">
              You&apos;re on the list. Watch your inbox.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/70">
              New collections and thoughtful finds, sent when we have something
              worth sharing.
            </p>

            <form
              onSubmit={onSubmit}
              className="mx-auto mt-6 flex w-full max-w-md flex-col gap-2.5 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Your email address
              </label>
              {/* text-base stops iOS Safari from zooming the page on focus */}
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-base text-white outline-none placeholder:text-white/50 focus:border-[#D5A17D] focus:ring-2 focus:ring-[#D5A17D]/40 sm:text-sm"
              />
              <motion.div whileTap={{ scale: 0.97 }} transition={spring}>
                <Button
                  type="submit"
                  className="h-12 w-full rounded-full bg-[#D5A17D] px-6 text-sm font-medium text-[#24392F] hover:bg-[#E2B18F] sm:w-auto"
                >
                  Subscribe
                </Button>
              </motion.div>
            </form>

            <p className="mt-4 text-xs text-white/50">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}