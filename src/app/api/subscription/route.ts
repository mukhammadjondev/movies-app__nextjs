import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function POST(req: Request) {
  const public_domain = process.env.NEXT_PUBLIC_DOMAIN
  const {email, priceId} = await req.json()
  const customers = await stripe.customers.list({limit: 100})

  const customer = customers.data.find(c => c.email === email)
  console.log(customers.data)

  try {
    const subscription = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{price: priceId, quantity: 1}],
      customer: customer?.id,
      success_url: `${public_domain}/success`,
      cancel_url: `${public_domain}/cancel`
    })
    return NextResponse.json({subscription})
  } catch (err) {
    return NextResponse.json({error: "Error creating checkout session"})
  }
}