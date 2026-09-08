# Shelfmark — Next.js E-commerce Starter

A small, real e-commerce app scaffold for practicing full-stack React:
product listing, product detail pages, and a persistent cart — built with
Next.js (App Router), Tailwind CSS, shadcn/ui-style components, and Zustand.

## Stack

| Piece            | Choice                                   |
|-------------------|-------------------------------------------|
| Framework         | Next.js 15 (App Router, React 19)        |
| Styling           | Tailwind CSS 3                            |
| Components        | shadcn/ui pattern (Button, Card, Badge…) |
| Cart state        | Zustand (persisted to localStorage)      |
| Icons             | lucide-react                              |
| Fonts             | Lora (display) + Inter (body), next/font |

## Getting started

```bash
# 1. install dependencies
npm install

# 2. run the dev server
npm run dev
```

Then open http://localhost:3000.

## Adding more shadcn/ui components

This project already has `components.json` set up, so the shadcn CLI works
out of the box. A few primitives (button, card, badge, separator) are
included by hand so the app runs without network access to shadcn's
registry. To pull in more official components later:

```bash
npx shadcn@latest add dialog input select
```

## Project structure

```
app/
  layout.tsx          root layout, fonts, navbar/footer
  page.tsx             home page — hero + category grids
  products/[id]/       product detail page + add-to-cart button
  cart/page.tsx         cart page with quantity controls
components/
  ui/                   hand-built shadcn-style primitives
  navbar.tsx, footer.tsx, product-card.tsx
lib/
  store.ts              Zustand cart store
  utils.ts               cn() + formatPrice()
data/
  products.ts             mock product catalog (swap for a real DB/CMS)
```

## Where to go next

- **Real data**: replace `data/products.ts` with calls to a database
  (Postgres + Prisma, or a headless CMS like Sanity/Shopify).
- **Checkout**: the cart page has a "Checkout" button that isn't wired up —
  a natural next step is Stripe Checkout or Stripe Elements.
- **Auth**: add NextAuth.js if you need accounts/order history.
- **Search & filtering**: the category sections on the home page are a
  good place to add a filter bar or search input.
- **Images**: currently pulling from Unsplash for placeholders — swap in
  your own product photography and update `next.config.mjs` if you use a
  different image host.

## Primary dependencies (why they're here)

- `next`, `react`, `react-dom` — the framework itself.
- `tailwindcss`, `postcss`, `autoprefixer` — utility-first styling.
- `class-variance-authority`, `clsx`, `tailwind-merge` — the standard
  shadcn/ui trio for building variant-based component APIs.
- `@radix-ui/react-slot`, `@radix-ui/react-separator` — unstyled,
  accessible primitives that shadcn/ui components wrap.
- `tailwindcss-animate` — small animation utilities shadcn components rely on.
- `zustand` — minimal cart state, with `persist` middleware for localStorage.
- `lucide-react` — icon set used throughout (cart, plus/minus, etc).
