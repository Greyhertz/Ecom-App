import Stripe from "stripe"

// const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// Set to '2024-06-20' or the latest '2026-08-26.dahlia'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-08-26.dahlia', 
});
