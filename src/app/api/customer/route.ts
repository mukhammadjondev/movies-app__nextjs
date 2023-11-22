import { Stripe } from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function POST(req: Response) {
  const {email} = await req.json()
  await stripe.customers.create({email})
}