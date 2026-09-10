import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import { Navbar } from "../components/navbar";
import "./globals.css";
import { Footer } from "../components/footer";

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
      <body className="flex min-h-screen flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
