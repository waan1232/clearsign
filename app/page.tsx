'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PaywallModal } from '@/components/PaywallModal'
import { supabase } from '@/lib/supabase'
import { createClient } from '@/lib/supabase/browser'
import type { Session, User } from '@supabase/supabase-js'

import { REVIEWS_STORAGE_KEY as STORAGE_KEY, FREE_REVIEW_LIMIT as FREE_LIMIT, PROMO_BONUS_KEY, HAS_ACCOUNT_KEY } from '@/lib/constants'

const CREDIBILITY_BASE = 43  // shown while real count < 20
const CREDIBILITY_THRESHOLD = 20

const UPLOAD_STEPS = [
  'Uploading your contract…',
  'Reading every clause…',
  'Analyzing risk…',
  'Building your report…',
]

// ── Upload loading overlay ─────────────────────────────────────────────────
function UploadOverlay() {
  const [stepIndex, setStepIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Fade in
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => (i + 1) % UPLOAD_STEPS.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex flex-col items-center gap-6 text-center px-6">
        {/* Animated document icon */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-2xl bg-blue-100 animate-ping opacity-30" />
          <div className="relative w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
        </div>

        {/* Cycling message */}
        <div className="h-8 flex items-center">
          {UPLOAD_STEPS.map((step, i) => (
            <p
              key={step}
              className={`absolute text-lg font-semibold text-slate-800 transition-all duration-500 ${
                i === stepIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              {step}
            </p>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-2">
          {UPLOAD_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === stepIndex ? 'w-6 bg-blue-600' : i < stepIndex ? 'w-1.5 bg-blue-300' : 'w-1.5 bg-slate-200'
              }`}
            />
          ))}
        </div>

        <p className="text-slate-400 text-sm">This usually takes 15–30 seconds</p>
      </div>
    </div>
  )
}

// ── Live counter ───────────────────────────────────────────────────────────
function ContractsCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [animated, setAnimated] = useState(false)
  const prevCount = useRef<number | null>(null)

  useEffect(() => {
    async function fetchCount() {
      const { count: c } = await supabase
        .from('contracts')
        .select('*', { count: 'exact', head: true })
      const real = c ?? 0
      const total = real < CREDIBILITY_THRESHOLD ? real + CREDIBILITY_BASE : real
      if (prevCount.current !== null && total !== prevCount.current) {
        setAnimated(true)
        setTimeout(() => setAnimated(false), 600)
      }
      prevCount.current = total
      setCount(total)
    }
    fetchCount()
    const interval = setInterval(fetchCount, 30_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="px-6 py-20 bg-white border-t border-slate-100">
      <div className="max-w-md mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Real-time</p>
        <div
          className={`transition-transform duration-300 ${animated ? 'scale-110' : 'scale-100'}`}
        >
          {count === null ? (
            <div className="h-24 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : (
            <p className="text-8xl font-bold text-slate-900 tabular-nums leading-none">
              {count.toLocaleString()}
            </p>
          )}
        </div>
        <h2 className="text-xl font-semibold text-slate-700 mt-4 mb-1">Contracts reviewed</h2>
        <p className="text-slate-400 text-sm">and counting</p>
      </div>
    </section>
  )
}

// ── Pricing section ────────────────────────────────────────────────────────
function PricingSection({ user, onPaywall }: { user: User | null; onPaywall: () => void }) {
  const [loading, setLoading] = useState<'per_review' | 'subscription' | null>(null)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  async function startCheckout(plan: 'per_review' | 'subscription') {
    if (!user) { onPaywall(); return }
    setLoading(plan)
    setCheckoutError(null)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed.')
      window.location.href = data.url
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(null)
    }
  }

  return (
    <section id="pricing" className="px-6 py-20 bg-white border-t border-slate-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">Simple pricing</h2>
        <p className="text-slate-500 text-center mb-12">Pay as you go, or go unlimited. No subscriptions you&rsquo;ll forget to cancel.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">

          {/* Per review */}
          <div className="border border-slate-200 rounded-2xl p-8 flex flex-col">
            <p className="text-sm font-medium text-slate-500 mb-2">Pay per review</p>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-bold text-slate-900">$9</span>
              <span className="text-slate-400 mb-1">/ review</span>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {['One contract review', 'Full clause breakdown', 'Risk score & summary', 'No subscription'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => startCheckout('per_review')}
              disabled={loading !== null}
              className="w-full text-center border-2 border-slate-900 hover:bg-slate-900 hover:text-white disabled:opacity-60 text-slate-900 font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              {loading === 'per_review' ? 'Redirecting...' : 'Buy now'}
            </button>
          </div>

          {/* Monthly */}
          <div className="border-2 border-blue-600 rounded-2xl p-8 flex flex-col relative shadow-lg shadow-blue-100">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most popular
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-2">Unlimited</p>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-bold text-slate-900">$29</span>
              <span className="text-slate-400 mb-1">/ month</span>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {['Unlimited contract reviews', 'Full clause breakdown', 'Risk score & summary', '7-day free trial', 'Cancel anytime'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => startCheckout('subscription')}
              disabled={loading !== null}
              className="w-full text-center bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              {loading === 'subscription' ? 'Redirecting...' : 'Start free trial'}
            </button>
          </div>
        </div>
        {checkoutError && (
          <p className="mt-6 text-center text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 max-w-xl mx-auto">
            {checkoutError}
          </p>
        )}
      </div>
    </section>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function Home() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [reviewsUsed, setReviewsUsed] = useState(0)
  const [bonusReviews, setBonusReviews] = useState(0)
  const [hasAccount, setHasAccount] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function readLocalStorage() {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
    const bonus = parseInt(localStorage.getItem(PROMO_BONUS_KEY) || '0', 10)
    setReviewsUsed(stored)
    setBonusReviews(bonus)
    setHasAccount(!!localStorage.getItem(HAS_ACCOUNT_KEY))
  }

  useEffect(() => {
    readLocalStorage()

    // Load auth state
    const supabaseBrowser = createClient()
    supabaseBrowser.auth.getUser().then(
      (result: { data: { user: User | null } }) => {
        if (result.data.user) {
          localStorage.setItem(HAS_ACCOUNT_KEY, '1')
          setHasAccount(true)
        }
        setUser(result.data.user)
      }
    )
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        if (session?.user) {
          localStorage.setItem(HAS_ACCOUNT_KEY, '1')
          setHasAccount(true)
        }
        setUser(session?.user ?? null)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  async function handleFile(file: File) {
    if (!file.name.endsWith('.pdf')) {
      setError('Please upload a PDF file.')
      return
    }

    // Logged-in users are gated server-side; anonymous users use localStorage
    if (!user) {
      const used = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
      const bonus = parseInt(localStorage.getItem(PROMO_BONUS_KEY) || '0', 10)
      if (used >= FREE_LIMIT + bonus) {
        setShowPaywall(true)
        return
      }
    }
    setError(null)
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/review', { method: 'POST', body: formData })
      const data = await res.json().catch(() => ({}))
      if (res.status === 402) {
        setIsUploading(false)
        setShowPaywall(true)
        return
      }
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      const { id } = data
      if (!user) {
        const used = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
        const newCount = used + 1
        localStorage.setItem(STORAGE_KEY, String(newCount))
        setReviewsUsed(newCount)
      }
      router.push(`/review/${id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.')
      setIsUploading(false)
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const remaining = Math.max(0, FREE_LIMIT + bonusReviews - reviewsUsed)

  return (
    <>
      {showPaywall && <PaywallModal userId={user?.id ?? null} onClose={() => { setShowPaywall(false); readLocalStorage() }} onPromoApplied={() => { readLocalStorage(); setShowPaywall(false) }} />}
      {isUploading && <UploadOverlay />}

      <div className="min-h-screen bg-white flex flex-col">

        {/* ── Nav ────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="text-slate-900 font-bold text-xl tracking-tight">
              ReadThe<span className="text-blue-600">Print</span>
            </span>
            <div className="flex items-center gap-6">
              {!user && reviewsUsed > 0 && remaining > 0 && (
                <span className="hidden sm:block text-xs text-slate-400">
                  {remaining} free review{remaining !== 1 ? 's' : ''} remaining
                </span>
              )}
              <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
                Pricing
              </a>
              {user ? (
                <Link
                  href="/account"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  Account
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  {hasAccount ? 'Sign in' : 'Sign up'}
                </Link>
              )}
              {user ? (
                <a
                  href="#upload"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Upload contract
                </a>
              ) : (
                <a
                  href="#upload"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Try free
                </a>
              )}
            </div>
          </div>
        </nav>

        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-slate-50 to-white px-6 pt-20 pb-24 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              Built for freelancers and agencies
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              Stop signing contracts you don&rsquo;t fully understand
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
              Clients send NDAs, MSAs, and service agreements full of one-sided clauses. ReadThePrint
              reads the fine print and tells you exactly what to push back on, in plain English.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {['2 free reviews', 'Results in 30 seconds', 'No account required'].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 text-sm text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
            <a
              href="#upload"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-colors shadow-sm"
            >
              Upload a contract - it&rsquo;s free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
            </a>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────── */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">How it works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
              {[
                { step: '1', title: 'Upload your contract', desc: 'Drop any PDF: NDA, lease, freelance agreement, whatever you need reviewed.', icon: (
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                )},
                { step: '2', title: 'AI reads every clause', desc: 'Our AI scans the entire contract, identifying risky language, hidden obligations, and one-sided terms.', icon: (
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                )},
                { step: '3', title: 'Get a plain-English report', desc: 'See a risk score, a summary you can actually read, and specific suggestions for what to push back on.', icon: (
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
                )},
              ].map((item, i, arr) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  {i < arr.length - 1 && (
                    <div className="hidden sm:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-slate-200" />
                  )}
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 relative z-10">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step {item.step}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What we catch ──────────────────────────────────── */}
        <section className="px-6 py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">What we catch</h2>
            <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
              The clauses freelancers and agencies get burned by most often.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: '⚠️',
                  title: 'Unfair termination clauses',
                  desc: 'Clients who can cancel without notice or payment while you stay locked in. We flag asymmetric exit terms.',
                  color: 'border-red-200 bg-red-50',
                  badge: 'High risk',
                  badgeColor: 'bg-red-100 text-red-700',
                },
                {
                  icon: '🔒',
                  title: 'Overreaching NDAs and non-competes',
                  desc: 'Non-disclosures and non-competes with no expiry date or scope limits that can block future clients.',
                  color: 'border-amber-200 bg-amber-50',
                  badge: 'Medium risk',
                  badgeColor: 'bg-amber-100 text-amber-700',
                },
                {
                  icon: '⚖️',
                  title: 'One-sided liability',
                  desc: 'MSA terms that hold you liable for client delays, IP disputes, or third-party issues you never agreed to own.',
                  color: 'border-red-200 bg-red-50',
                  badge: 'High risk',
                  badgeColor: 'bg-red-100 text-red-700',
                },
              ].map((card) => (
                <div key={card.title} className={`rounded-2xl border p-6 ${card.color}`}>
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <div className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3 ${card.badgeColor}`}>
                    {card.badge}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Live counter ───────────────────────────────────── */}
        <ContractsCounter />

        {/* ── Upload ─────────────────────────────────────────── */}
        <section id="upload" className="px-6 py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Ready to review your contract?</h2>
            <p className="text-slate-500 mb-10">
              Upload any NDA, MSA, or service agreement. First 2 reviews are free, no account needed.
            </p>

            <div
              onClick={() => !isUploading && inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={[
                'min-h-[280px] border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-200 bg-white',
                'flex flex-col items-center justify-center px-8',
                isDragging
                  ? 'border-blue-500 bg-blue-50 scale-[1.01]'
                  : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/30',
                isUploading ? 'pointer-events-none' : '',
              ].join(' ')}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={onInputChange}
              />
              <div className="flex flex-col items-center gap-5 pointer-events-none">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-800 font-bold text-xl mb-1">Drop your contract here to get started</p>
                  <p className="text-slate-400 text-sm">PDF files only &middot; Drag and drop or click to browse</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl text-base transition-colors shadow-sm">
                  Choose PDF
                </button>
                <p className="text-xs text-slate-400">Free to try &middot; No account needed &middot; Results in ~30 seconds</p>
              </div>
            </div>

            {error && (
              <p className="mt-4 text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                {error}
              </p>
            )}
          </div>
        </section>

        {/* ── Pricing ────────────────────────────────────────── */}
        <PricingSection user={user} onPaywall={() => setShowPaywall(true)} />

      </div>
    </>
  )
}
