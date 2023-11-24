import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function GET(req: Request) {
  try {
    const {user_id} = await req.json()
    const customers = await stripe.customers.list({limit: 100})
    const customer = customers.data.find(c => c.metadata.user_id === user_id) as Stripe.Customer

    const portal = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/account`
    })
    return NextResponse.json({portal: portal.url})
  } catch (error) {
    console.log(error)
    return NextResponse.json({error})
  }
}