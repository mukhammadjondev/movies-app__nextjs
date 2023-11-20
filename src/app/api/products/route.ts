import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function GET() {
  const products = await stripe.products.list({
    expand: ['data.default_price']
  })
  return NextResponse.json({products})
}