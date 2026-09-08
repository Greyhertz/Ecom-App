export type Product = {
  id: string;
  name: string;
  category: string;
  priceCents: number;
  description: string;
  details: string[];
  image: string;
};

export const products: Product[] = [
  {
    id: "fountain-pen-oak",
    name: "Oakwood Fountain Pen",
    category: "Writing",
    priceCents: 6800,
    description:
      "A weighted brass-and-oak pen with a fine steel nib, built for daily correspondence.",
    details: [
      "Brass barrel with hand-turned oak grip",
      "Fine steel nib, converter included",
      "Weighted for long writing sessions",
    ],
    image:
      "https://images.unsplash.com/photo-1583485088034-697b5bc36b32?w=800&q=80",
  },
  {
    id: "notebook-ruled-a5",
    name: "Fieldstone Ruled Notebook",
    category: "Paper",
    priceCents: 2200,
    description:
      "192 pages of 100gsm ivory paper, stitched into a linen cover that softens with use.",
    details: [
      "A5, 192 ruled pages, 100gsm paper",
      "Linen-bound cover, lies flat when open",
      "Elastic closure and ribbon marker",
    ],
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80",
  },
  {
    id: "desk-lamp-brass",
    name: "Meridian Desk Lamp",
    category: "Desk",
    priceCents: 12400,
    description:
      "An articulating brass lamp with a warm 2700K bulb, designed to sit quietly on a full desk.",
    details: [
      "Solid brass with hand-patina finish",
      "Adjustable arm, three-way dimmer",
      "Includes 2700K warm LED bulb",
    ],
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
  },
  {
    id: "letter-tray-walnut",
    name: "Walnut Letter Tray",
    category: "Desk",
    priceCents: 4600,
    description:
      "Solid walnut tray for incoming mail and loose paper, finished with beeswax.",
    details: [
      "Solid American walnut",
      "Beeswax finish, hand-sanded edges",
      "Stackable up to three trays",
    ],
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
  },
  {
    id: "pencil-set-graphite",
    name: "Graphite Pencil Set of 6",
    category: "Writing",
    priceCents: 1800,
    description:
      "Six unlacquered cedar pencils in graded hardness, from 2H to 4B.",
    details: [
      "Unlacquered cedar, natural finish",
      "Graded 2H through 4B",
      "Packaged in a kraft slide box",
    ],
    image:
      "https://images.unsplash.com/photo-1568205612837-017257d2310a?w=800&q=80",
  },
  {
    id: "card-holder-leather",
    name: "Saddle Card Holder",
    category: "Leather",
    priceCents: 3400,
    description:
      "Vegetable-tanned leather card holder that darkens and softens with age.",
    details: [
      "Full-grain vegetable-tanned leather",
      "Holds 4-8 cards",
      "Deepens in color over time",
    ],
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
  },
  {
    id: "desk-mat-wool",
    name: "Wool Felt Desk Mat",
    category: "Desk",
    priceCents: 3900,
    description:
      "5mm merino wool felt mat that softens keystrokes and protects the desk surface.",
    details: [
      "5mm merino wool felt",
      "60cm x 35cm, non-slip backing",
      "Available in three colorways",
    ],
    image:
      "https://images.unsplash.com/photo-1518384401463-d3876163c195?w=800&q=80",
  },
  {
    id: "ink-bottle-indigo",
    name: "Indigo Bottled Ink",
    category: "Writing",
    priceCents: 1600,
    description:
      "A deep, slow-drying indigo ink made for fountain pens, bottled in glass.",
    details: [
      "50ml glass bottle",
      "Iron-gall free, safe for most fountain pens",
      "Deep indigo, low sheen",
    ],
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80",
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
