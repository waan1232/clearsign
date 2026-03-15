'use client'

import { useState } from 'react'

type Plan = 'subscription' | 'per_review'

type Props = {
  onClose: () => void
}

export function PaywallModal({ onClose }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !selectedPlan) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan: selectedPlan }),
      })
      if (!res.ok) throw new Error('Failed to save')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 z-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">You&rsquo;re on the list!</h2>
            <p className="text-slate-500 text-sm">We&rsquo;ll email you as soon as it&rsquo;s ready.</p>
            <button
              onClick={onClose}
              className="mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to ClearSign
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-50 rounded-full mb-4">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">You&rsquo;ve used your 2 free reviews</h2>
              <p className="text-slate-500 mt-2">Unlock unlimited contract reviews for $29/month</p>
            </div>

            {/* Plan buttons */}
            {!selectedPlan ? (
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedPlan('subscription')}
                  className="w-full border-2 border-blue-600 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 py-3.5 text-sm transition-colors flex items-center justify-between"
                >
                  <span>Start free trial</span>
                  <span className="text-blue-200 font-normal">7 days free</span>
                </button>
                <button
                  onClick={() => setSelectedPlan('per_review')}
                  className="w-full border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold rounded-xl px-5 py-3.5 text-sm transition-colors flex items-center justify-between"
                >
                  <span>Pay per review</span>
                  <span className="text-slate-400 font-normal">$9 each</span>
                </button>
                <p className="text-center text-xs text-slate-400 pt-1">No commitment. Cancel anytime.</p>
              </div>
            ) : (
              <div>
                <div className="mb-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-600 text-center">
                  <span className="font-medium">
                    {selectedPlan === 'subscription' ? 'Free trial — 7 days free' : 'Pay per review — $9 each'}
                  </span>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="ml-2 text-blue-600 hover:text-blue-700 text-xs"
                  >
                    change
                  </button>
                </div>

                <p className="text-sm font-medium text-slate-700 mb-1 text-center">
                  Coming soon — enter your email to be notified
                </p>

                <form onSubmit={handleSubmit} className="mt-3 space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {error && <p className="text-red-600 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors"
                  >
                    {loading ? 'Saving…' : 'Notify me'}
                  </button>
                </form>
                <p className="text-center text-xs text-slate-400 mt-3">No commitment. Cancel anytime.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
