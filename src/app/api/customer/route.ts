import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function POST(req: Response) {
  try {
    const {email, user_id} = await req.json()
    await stripe.customers.create({email, metadata: {user_id}})
  } catch (err) {
    return NextResponse.json({error: "Error creating customer"})
  }
}