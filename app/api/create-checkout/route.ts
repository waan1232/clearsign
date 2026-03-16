import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Must be signed in to purchase.' }, { status: 401 })
  }

  const { plan } = await req.json() as { plan: 'per_review' | 'subscription' }
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? 'https://readtheprint.com'

  let session: Stripe.Checkout.Session

  if (plan === 'subscription') {
    session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      client_reference_id: user.id,
      customer_email: user.email,
      line_items: [{ price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID!, quantity: 1 }],
      subscription_data: { trial_period_days: 7 },
      success_url: `${origin}/account?payment=success`,
      cancel_url: `${origin}/`,
    })
  } else {
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      client_reference_id: user.id,
      customer_email: user.email,
      line_items: [{ price: process.env.STRIPE_PER_REVIEW_PRICE_ID!, quantity: 1 }],
      success_url: `${origin}/account?payment=success`,
      cancel_url: `${origin}/`,
    })
  }

  return NextResponse.json({ url: session.url })
}
