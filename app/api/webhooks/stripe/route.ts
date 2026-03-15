import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Webhook error'
    console.error('Stripe webhook error:', msg)
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.client_reference_id

    if (!userId) {
      console.error('No client_reference_id on session', session.id)
      return NextResponse.json({ received: true })
    }

    const db = supabaseAdmin()

    if (session.mode === 'subscription') {
      // Monthly subscription
      await db.from('profiles').upsert({
        id: userId,
        plan: 'subscription',
        credits: 0,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
      }, { onConflict: 'id' })

    } else if (session.mode === 'payment') {
      // Per-review one-time purchase — add 1 credit
      const { data: profile } = await db
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .single()

      const currentCredits = profile?.credits ?? 0
      await db.from('profiles').upsert({
        id: userId,
        plan: 'per_review',
        credits: currentCredits + 1,
        stripe_customer_id: session.customer as string,
      }, { onConflict: 'id' })
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    const db = supabaseAdmin()

    // Find profile by stripe_subscription_id
    const { data: profile } = await db
      .from('profiles')
      .select('id')
      .eq('stripe_subscription_id', sub.id)
      .single()

    if (profile) {
      await db.from('profiles')
        .update({ plan: 'free', stripe_subscription_id: null })
        .eq('id', profile.id)
    }
  }

  return NextResponse.json({ received: true })
}
