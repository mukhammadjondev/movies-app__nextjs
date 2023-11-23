import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function GET(req: NextRequest, route: {params: {id: string}}) {
  const {id} = await route.params

  const customers = await stripe.customers.list({limit: 100})
  const customer = customers.data.find(c => c.metadata.user_id === id)

  const subscription = await stripe.subscriptions.list({
    limit: 1,
    customer: customer?.id
  })

  return NextResponse.json({subscription})
}