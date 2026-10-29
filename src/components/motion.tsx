"use client";

import { useRef, type ReactNode } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

/** One spring and one easing curve shared by the whole app, so motion feels consistent. */
export const spring = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.8,
} as const;

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Wrap the page once. Users with "reduce motion" on get fades only, no movement. */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type BoxProps = { children: ReactNode; className?: string };

/** Fades and lifts into place when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: BoxProps & { delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants = (stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/** Children animate in one after another. `immediate` plays on load instead of on scroll. */
export function Stagger({
  children,
  className,
  immediate = false,
  stagger = 0.08,
}: BoxProps & { immediate?: boolean; stagger?: number }) {
  return (
    <motion.div
      className={className}
      variants={containerVariants(stagger)}
      initial="hidden"
      animate={immediate ? "show" : undefined}
      whileInView={immediate ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: BoxProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/** Native-feeling press: shrinks slightly under the finger and springs back. */
export function Press({
  children,
  className,
  scale = 0.97,
}: BoxProps & { scale?: number }) {
  return (
    <motion.div className={className} whileTap={{ scale }} transition={spring}>
      {children}
    </motion.div>
  );
}

/** Image frame whose content drifts slightly slower than the page scroll. */
export function ParallaxFrame({ children, className }: BoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}