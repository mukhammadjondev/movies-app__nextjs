import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function POST(req: NextApiRequest) {
  const {email} = req.body
  await stripe.customers.create({email})
}