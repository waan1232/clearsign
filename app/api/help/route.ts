import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (message.trim().length < 10) {
      return NextResponse.json({ error: 'Message is too short.' }, { status: 400 })
    }

    // Attach user_id if logged in
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const db = supabaseAdmin()
    const { error } = await db.from('support_requests').insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      user_id: user?.id ?? null,
    })

    if (error) {
      console.error('Support insert error:', error)
      return NextResponse.json({ error: 'Failed to submit request.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Help API error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
