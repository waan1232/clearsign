'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/browser'

export default function WelcomePage() {
  const [email, setEmail] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(4)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }: { data: { user: { email?: string } | null } }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [])

  useEffect(() => {
    if (countdown <= 0) {
      router.push('/account')
      return
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">

        {/* Success icon */}
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">You&rsquo;re signed in</h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-1">
          Welcome to ReadThe<span className="text-blue-600 font-semibold">Print</span>.
        </p>
        {email && (
          <p className="text-slate-400 text-xs mb-8">
            Signed in as <span className="text-slate-600 font-medium">{email}</span>
          </p>
        )}

        {/* CTA */}
        <Link
          href="/account"
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors mb-4"
        >
          Go to your account
        </Link>

        <Link
          href="/"
          className="w-full inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-600 font-medium px-6 py-3 rounded-xl text-sm transition-colors"
        >
          Upload a contract
        </Link>

        {/* Auto-redirect notice */}
        <p className="text-xs text-slate-400 mt-6">
          Redirecting to your account in {countdown}s...
        </p>
      </div>
    </div>
  )
}
