'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

export function NudgeBanner() {
  const [state, setState] = useState<'loading' | 'hide' | 'one_left' | 'none_left'>('loading')

  useEffect(() => {
    async function check() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      // Logged-in users: hide the banner (they manage credits from their account)
      if (user) {
        setState('hide')
        return
      }

      // Anonymous users: check localStorage
      const used = parseInt(localStorage.getItem('readtheprint_reviews_used') || '0', 10)
      if (used <= 0) {
        setState('hide')
        return
      }
      const left = Math.max(0, 2 - used)
      setState(left === 1 ? 'one_left' : 'none_left')
    }
    check()
  }, [])

  if (state === 'loading' || state === 'hide') return null

  const isGreen = state === 'one_left'
  const bg = isGreen ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
  const text = isGreen ? 'text-green-800' : 'text-amber-800'
  const icon = isGreen ? (
    <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  )

  const message = state === 'one_left'
    ? 'Liked this? You have 1 free review remaining.'
    : 'Liked this? You have 0 free reviews remaining. Upgrade to keep going.'

  return (
    <div className={`border rounded-lg px-4 py-3 flex items-center gap-2.5 text-sm ${bg} ${text}`}>
      {icon}
      <span>{message}</span>
    </div>
  )
}
