import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function POST(req: NextApiRequest) {
  const public_domain = process.env.NEXT_PUBLIC_DOMAIN
  const {email, priceId} = req.body
  const customers = await stripe.customers.list({limit: 100})

  const customer = customers.data.find(c => c.email === email)

  const subscription = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{price: priceId, quantity: 1}],
    customer: customer?.id,
    success_url: `${public_domain}/success`,
    cancel_url: `${public_domain}/cancel`
  })
  return NextResponse.json({subscription})
}