'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-slate-900 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            Clear<span className="text-blue-600">Sign</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h1>
              <p className="text-slate-500 text-sm leading-relaxed">
                We sent a sign-in link to <strong className="text-slate-700">{email}</strong>.
                Click it to sign in — no password needed.
              </p>
              <button
                onClick={() => { setSent(false); setEmail('') }}
                className="mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign in to ClearSign</h1>
                <p className="text-slate-500 text-sm">We&rsquo;ll email you a magic link — no password needed.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors"
                >
                  {loading ? 'Sending…' : 'Send magic link'}
                </button>
              </form>

              <p className="text-center text-xs text-slate-400 mt-6">
                By signing in you agree to our{' '}
                <Link href="/terms" className="underline hover:text-slate-600">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
