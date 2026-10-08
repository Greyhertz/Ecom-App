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
  // ==================================================
  // OFFICE
  // ==================================================

  {
    id: "ergonomic-office-chair",
    name: "Aero Ergonomic Chair",
    category: "Office",
    priceCents: 18500,
    description:
      "A breathable ergonomic office chair with adjustable lumbar support, armrests, and seat height.",
    details: [
      "Adjustable lumbar support",
      "Breathable mesh back",
      "Adjustable armrests and seat height",
      "Tilt and lock mechanism",
    ],
    image:
  "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=900&q=80",
  },

  {
    id: "executive-office-chair",
    name: "Atlas Executive Chair",
    category: "Office",
    priceCents: 24500,
    description:
      "A premium executive chair with a high back, padded seat, and reclining support for long work sessions.",
    details: [
      "High-back ergonomic design",
      "Padded seat and backrest",
      "Adjustable reclining angle",
      "Heavy-duty five-wheel base",
    ],
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=900&q=80",
  },

  {
    id: "minimal-office-chair",
    name: "Form Office Chair",
    category: "Office",
    priceCents: 12900,
    description:
      "A clean, compact office chair designed for modern workspaces and smaller desks.",
    details: [
      "Compact ergonomic profile",
      "Adjustable seat height",
      "Soft upholstered seat",
      "Five-star swivel base",
    ],
    image:
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=900&q=80",
  },

  {
    id: "standing-desk",
    name: "Rise Standing Desk",
    category: "Office",
    priceCents: 28900,
    description:
      "A height-adjustable standing desk that lets you switch naturally between sitting and standing.",
    details: [
      "Electric height adjustment",
      "Memory height presets",
      "Large work surface",
      "Cable management system",
    ],
    image:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=900&q=80",
  },

  {
    id: "monitor-stand-oak",
    name: "Oak Monitor Stand",
    category: "Office",
    priceCents: 6800,
    description:
      "A solid oak monitor stand that raises your screen while creating useful storage beneath.",
    details: [
      "Solid oak construction",
      "Raises monitor to comfortable viewing height",
      "Open storage underneath",
      "Natural oil finish",
    ],
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80",
  },

  {
    id: "desk-lamp-modern",
    name: "Arc Desk Lamp",
    category: "Office",
    priceCents: 7600,
    description:
      "A modern adjustable desk lamp with a warm, focused light for reading and focused work.",
    details: [
      "Adjustable arm",
      "Warm LED illumination",
      "Touch brightness control",
      "Minimal metal construction",
    ],
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80",
  },

  {
    id: "office-storage-cabinet",
    name: "Oak Office Cabinet",
    category: "Office",
    priceCents: 19800,
    description:
      "A compact storage cabinet for documents, stationery, and everyday office equipment.",
    details: [
      "Two adjustable shelves",
      "Solid wood exterior",
      "Soft-close doors",
      "Compact footprint",
    ],
    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=900&q=80",
  },

  {
    id: "desk-organizer",
    name: "Modular Desk Organizer",
    category: "Office",
    priceCents: 4200,
    description:
      "A modular organizer for pens, notebooks, cables, and small desk essentials.",
    details: [
      "Multiple storage compartments",
      "Stackable design",
      "Cable slot",
      "Matte finish",
    ],
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=900&q=80",
  },

  // ==================================================
  // BODY & CARE
  // ==================================================

  {
    id: "amber-eau-de-parfum",
    name: "Amber Eau de Parfum",
    category: "Body & Care",
    priceCents: 8900,
    description:
      "A warm fragrance built around amber, soft woods, and subtle spice.",
    details: [
      "50ml eau de parfum",
      "Amber and woody notes",
      "Long-lasting fragrance",
      "Glass bottle with spray applicator",
    ],
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=80",
  },

  {
    id: "citrus-perfume",
    name: "Citrus Bloom Perfume",
    category: "Body & Care",
    priceCents: 7200,
    description:
      "A bright everyday fragrance combining fresh citrus with delicate floral notes.",
    details: [
      "50ml fragrance",
      "Fresh citrus opening",
      "Soft floral heart",
      "Light everyday scent",
    ],
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900&q=80",
  },

  {
    id: "shea-body-cream",
    name: "Shea Body Cream",
    category: "Body & Care",
    priceCents: 3600,
    description:
      "A rich body cream formulated with shea butter for soft, moisturized skin.",
    details: [
      "Shea butter enriched",
      "Deep moisturizing formula",
      "Non-greasy finish",
      "Suitable for daily use",
    ],
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=900&q=80",
  },

  {
    id: "coconut-body-oil",
    name: "Coconut Body Oil",
    category: "Body & Care",
    priceCents: 3200,
    description:
      "A lightweight body oil designed to leave skin feeling smooth and nourished.",
    details: [
      "Coconut-based formula",
      "Lightweight texture",
      "Fast absorbing",
      "Natural satin finish",
    ],
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&q=80",
  },

  {
    id: "oatmeal-soap",
    name: "Oat & Honey Soap",
    category: "Body & Care",
    priceCents: 1500,
    description:
      "A gentle handcrafted soap with oat and honey-inspired notes for everyday bathing.",
    details: [
      "Handcrafted soap bar",
      "Oat and honey blend",
      "Gentle cleansing formula",
      "100g bar",
    ],
    image:
      "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=900&q=80",
  },

  {
    id: "lavender-body-wash",
    name: "Lavender Body Wash",
    category: "Body & Care",
    priceCents: 2800,
    description:
      "A softly scented body wash designed to turn everyday bathing into a calming ritual.",
    details: [
      "Lavender-inspired fragrance",
      "Gentle cleansing formula",
      "250ml bottle",
      "Suitable for daily use",
    ],
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=900&q=80",
  },

  {
    id: "lip-care-set",
    name: "Lip Care Set",
    category: "Body & Care",
    priceCents: 2400,
    description:
      "A simple daily lip-care set combining moisturizing balm and gentle exfoliation.",
    details: [
      "Moisturizing lip balm",
      "Gentle lip scrub",
      "Compact travel case",
      "Two-piece set",
    ],
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=900&q=80",
  },

  // ==================================================
  // JEWELRY
  // ==================================================

  {
    id: "gold-chain-necklace",
    name: "Classic Gold Chain",
    category: "Jewelry",
    priceCents: 9500,
    description:
      "A refined chain necklace designed to work equally well on its own or layered with other pieces.",
    details: [
      "Classic chain design",
      "Adjustable length",
      "Lightweight construction",
      "Everyday styling piece",
    ],
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80",
  },

  {
    id: "pearl-drop-earrings",
    name: "Pearl Drop Earrings",
    category: "Jewelry",
    priceCents: 6800,
    description:
      "Elegant drop earrings finished with luminous pearl accents.",
    details: [
      "Pearl detail",
      "Lightweight design",
      "Secure fastening",
      "Suitable for everyday and formal wear",
    ],
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80",
  },

  {
    id: "minimal-gold-ring",
    name: "Minimal Gold Ring",
    category: "Jewelry",
    priceCents: 4900,
    description:
      "A simple polished ring designed for understated everyday styling.",
    details: [
      "Minimal profile",
      "Polished finish",
      "Comfortable everyday design",
      "Available in multiple sizes",
    ],
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80",
  },

  {
    id: "silver-bracelet",
    name: "Sculpted Silver Bracelet",
    category: "Jewelry",
    priceCents: 7400,
    description:
      "A clean sculptural bracelet with a subtle polished finish.",
    details: [
      "Sculptural silhouette",
      "Polished silver-tone finish",
      "Adjustable closure",
      "Designed for everyday wear",
    ],
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80",
  },

  {
    id: "layered-necklace",
    name: "Layered Pendant Necklace",
    category: "Jewelry",
    priceCents: 6200,
    description:
      "A delicate layered necklace with small pendant details.",
    details: [
      "Multi-layer design",
      "Delicate pendant",
      "Adjustable chain",
      "Lightweight construction",
    ],
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=80",
  },

  {
    id: "pearl-bracelet",
    name: "Freshwater Pearl Bracelet",
    category: "Jewelry",
    priceCents: 5800,
    description:
      "A delicate pearl bracelet combining classic elegance with everyday simplicity.",
    details: [
      "Freshwater-style pearls",
      "Elasticated fit",
      "Lightweight design",
      "Classic neutral styling",
    ],
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80",
  },

  // ==================================================
  // FLOWERING PLANTS
  // ==================================================

  {
    id: "peace-lily",
    name: "Peace Lily",
    category: "Plants",
    priceCents: 4500,
    description:
      "A graceful flowering indoor plant with dark green leaves and elegant white blooms.",
    details: [
      "Indoor flowering plant",
      "Prefers indirect light",
      "Decorative ceramic pot",
      "Beginner friendly",
    ],
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=900&q=80",
  },

  {
    id: "orchid-white",
    name: "White Orchid",
    category: "Plants",
    priceCents: 7200,
    description:
      "A refined flowering orchid that brings a clean, elegant touch to interiors.",
    details: [
      "White flowering orchid",
      "Indoor friendly",
      "Decorative planter",
      "Prefers bright indirect light",
    ],
    image:
      "https://images.unsplash.com/photo-1566907225471-7e3c7f9c1a0e?w=900&q=80",
  },

  {
    id: "pink-anthurium",
    name: "Pink Anthurium",
    category: "Plants",
    priceCents: 5600,
    description:
      "A vibrant flowering houseplant with glossy leaves and long-lasting pink blooms.",
    details: [
      "Indoor flowering plant",
      "Glossy green foliage",
      "Pink blooms",
      "Prefers bright indirect light",
    ],
    image:
      "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=900&q=80",
  },

  {
    id: "african-violet",
    name: "African Violet",
    category: "Plants",
    priceCents: 3800,
    description:
      "A compact flowering plant with soft foliage and delicate violet blooms.",
    details: [
      "Compact indoor plant",
      "Purple flowering variety",
      "Ideal for desks and shelves",
      "Prefers bright indirect light",
    ],
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=900&q=80",
  },

  {
    id: "begonia-bloom",
    name: "Begonia Bloom",
    category: "Plants",
    priceCents: 4200,
    description:
      "A colorful flowering houseplant with decorative foliage and bright blooms.",
    details: [
      "Indoor flowering plant",
      "Decorative foliage",
      "Bright seasonal blooms",
      "Easy-care variety",
    ],
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=900&q=80",
  },

  {
    id: "rose-miniature",
    name: "Miniature Rose Plant",
    category: "Plants",
    priceCents: 4900,
    description:
      "A compact rose plant grown for indoor displays, balconies, and small spaces.",
    details: [
      "Compact flowering rose",
      "Suitable for bright spaces",
      "Decorative planter",
      "Requires regular watering",
    ],
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&q=80",
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

