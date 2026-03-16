import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const SUBSCRIPTION_LINK = 'https://buy.stripe.com/00weVfgqJdZQ5kmdHD7g401'
const PER_REVIEW_LINK = 'https://buy.stripe.com/4gM9AV3DXf3U3ce6fb7g400'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Must be signed in to purchase.' }, { status: 401 })
  }

  const { plan } = await req.json() as { plan: 'per_review' | 'subscription' }

  const base = plan === 'subscription' ? SUBSCRIPTION_LINK : PER_REVIEW_LINK
  const url = `${base}?client_reference_id=${user.id}`

  return NextResponse.json({ url })
}
