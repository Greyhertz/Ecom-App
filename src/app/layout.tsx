
import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "@/app/globals.css";

const display = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shelfmark — Desk goods, made to be used",
  description:
    "A small shop of writing instruments, paper, and desk goods. Built with Next.js, Tailwind, and shadcn/ui.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}