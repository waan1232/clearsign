'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PROMO_CODES, PROMO_USED_KEY, PROMO_BONUS_KEY } from '@/lib/constants'

type Props = {
  userId: string | null
  onClose: () => void
  onPromoApplied?: () => void
}

export function PaywallModal({ userId, onClose, onPromoApplied }: Props) {
  const [loading, setLoading] = useState<'per_review' | 'subscription' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [promoInput, setPromoInput] = useState('')
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [promoMessage, setPromoMessage] = useState('')

  function applyPromo() {
    const code = promoInput.trim().toUpperCase()
    const alreadyUsed = localStorage.getItem(PROMO_USED_KEY)
    if (alreadyUsed) {
      setPromoStatus('error')
      setPromoMessage('You have already used a promo code.')
      return
    }
    const bonus = PROMO_CODES[code]
    if (!bonus) {
      setPromoStatus('error')
      setPromoMessage('Invalid promo code.')
      return
    }
    localStorage.setItem(PROMO_USED_KEY, code)
    localStorage.setItem(PROMO_BONUS_KEY, String(bonus))
    setPromoStatus('success')
    setPromoMessage(`Code applied! You now have ${bonus} extra free reviews.`)
    onPromoApplied?.()
  }

  async function startCheckout(plan: 'per_review' | 'subscription') {
    setLoading(plan)
    setError(null)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(null)
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

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-50 rounded-full mb-4">
            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">You&rsquo;ve used your 2 free reviews</h2>
          <p className="text-slate-500 mt-2 text-sm">Unlock more reviews below.</p>
        </div>

        {/* Anonymous: must sign in before purchasing */}
        {!userId ? (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-slate-600 text-center">
              <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
              {' '}first so your credits are tied to your account.
            </div>
            <Link
              href="/auth/login"
              className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 py-3.5 text-sm transition-colors"
            >
              Sign in to purchase
            </Link>
          </div>
        ) : (
          /* Logged-in: dynamic checkout */
          <div className="space-y-3">
            <button
              onClick={() => startCheckout('subscription')}
              disabled={loading !== null}
              className="w-full border-2 border-blue-600 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl px-5 py-3.5 text-sm transition-colors flex items-center justify-between"
            >
              <span>{loading === 'subscription' ? 'Redirecting...' : 'Start free trial - unlimited reviews'}</span>
              <span className="text-blue-200 font-normal">$29/mo</span>
            </button>
            <button
              onClick={() => startCheckout('per_review')}
              disabled={loading !== null}
              className="w-full border-2 border-slate-200 hover:border-slate-300 disabled:opacity-60 text-slate-700 font-semibold rounded-xl px-5 py-3.5 text-sm transition-colors flex items-center justify-between"
            >
              <span>{loading === 'per_review' ? 'Redirecting...' : 'Buy a single review'}</span>
              <span className="text-slate-400 font-normal">$9</span>
            </button>

            {error && (
              <p className="text-red-600 text-sm text-center bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                {error}
              </p>
            )}
          </div>
        )}

        {/* Promo code */}
        <div className="mt-5 pt-5 border-t border-slate-100">
          {promoStatus === 'success' ? (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <p className="text-sm text-green-700 font-medium">{promoMessage}</p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-400 mb-2">Have a promo code?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => { setPromoInput(e.target.value); setPromoStatus('idle') }}
                  onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                  placeholder="Enter code"
                  className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={applyPromo}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoStatus === 'error' && (
                <p className="text-xs text-red-600 mt-1.5">{promoMessage}</p>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">7-day free trial on monthly plan. Cancel anytime.</p>
      </div>
    </div>
  )
}
