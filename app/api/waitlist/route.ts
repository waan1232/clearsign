import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email, plan } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const db = supabaseAdmin()
    await db.from('waitlist').insert({ email, plan_selected: plan ?? 'unknown' })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save.' }, { status: 500 })
  }
}
