'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PaywallModal } from '@/components/PaywallModal'

const FREE_LIMIT = 2
const STORAGE_KEY = 'clearsign_reviews_used'

export default function Home() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [reviewsUsed, setReviewsUsed] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
    setReviewsUsed(stored)
  }, [])

  async function handleFile(file: File) {
    if (!file.name.endsWith('.pdf')) {
      setError('Please upload a PDF file.')
      return
    }
    const used = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
    if (used >= FREE_LIMIT) {
      setShowPaywall(true)
      return
    }
    setError(null)
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/review', { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      const { id } = await res.json()
      const newCount = used + 1
      localStorage.setItem(STORAGE_KEY, String(newCount))
      setReviewsUsed(newCount)
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

  const remaining = Math.max(0, FREE_LIMIT - reviewsUsed)

  return (
    <>
      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}

      <div className="min-h-screen bg-white flex flex-col">

        {/* ── Nav ────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="text-slate-900 font-bold text-xl tracking-tight">
              Clear<span className="text-blue-600">Sign</span>
            </span>
            <div className="flex items-center gap-6">
              {reviewsUsed > 0 && remaining > 0 && (
                <span className="hidden sm:block text-xs text-slate-400">
                  {remaining} free review{remaining !== 1 ? 's' : ''} remaining
                </span>
              )}
              <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
                Pricing
              </a>
              <a
                href="#upload"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Try free
              </a>
            </div>
          </div>
        </nav>

        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-slate-50 to-white px-6 pt-20 pb-24 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              AI-powered contract review
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              Know what you&rsquo;re signing
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
              Most people sign contracts they don&rsquo;t understand. ClearSign reads the fine print
              and tells you exactly what to watch out for&nbsp;&mdash; in plain English.
            </p>
            {/* Trust badges */}
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
              Upload a contract — it&rsquo;s free
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
                { step: '1', title: 'Upload your contract', desc: 'Drop any PDF — NDA, lease, freelance agreement, whatever you need reviewed.', icon: (
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
                  {/* Connector line */}
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
              The clauses most people skip over — and regret later.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: '⚠️',
                  title: 'Unfair termination clauses',
                  desc: 'We flag clauses that let the other party walk away without penalty while locking you in.',
                  color: 'border-red-200 bg-red-50',
                  badge: 'High risk',
                  badgeColor: 'bg-red-100 text-red-700',
                },
                {
                  icon: '🔒',
                  title: 'Perpetual obligations',
                  desc: 'NDAs and non-competes with no expiry that follow you forever.',
                  color: 'border-amber-200 bg-amber-50',
                  badge: 'Medium risk',
                  badgeColor: 'bg-amber-100 text-amber-700',
                },
                {
                  icon: '⚖️',
                  title: 'One-sided liability',
                  desc: 'Terms that make you responsible for things entirely outside your control.',
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

        {/* ── Social proof ───────────────────────────────────── */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">What people are saying</h2>
            <p className="text-slate-500 text-center mb-12">Real feedback from people who&rsquo;ve been burned before.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  quote: "I signed a client contract last year without reading the IP clause. Ended up losing rights to work I did on my own time. ClearSign caught the exact same clause in my next contract before I signed.",
                  name: 'Marcus T.',
                  role: 'Freelance designer, 6 years',
                  initial: 'M',
                },
                {
                  quote: "Our landlord tried to slip in a clause that made us liable for structural repairs. ClearSign flagged it immediately and explained exactly what it meant. Saved us thousands.",
                  name: 'Priya & James K.',
                  role: 'Small business owners',
                  initial: 'P',
                },
                {
                  quote: "I manage 4 rental properties and review leases constantly. ClearSign cuts my review time in half. I still use a lawyer for the final check, but this catches 90% of the issues first.",
                  name: 'Dale R.',
                  role: 'Independent landlord',
                  initial: 'D',
                },
              ].map((t) => (
                <div key={t.name} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Upload ─────────────────────────────────────────── */}
        <section id="upload" className="px-6 py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Ready?</h2>
            <p className="text-slate-500 mb-10">
              Upload your contract below&nbsp;&mdash; first 2 reviews are free, no account needed.
            </p>

            <div
              onClick={() => !isUploading && inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={[
                'border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 bg-white',
                isDragging
                  ? 'border-blue-500 bg-blue-50 scale-[1.01]'
                  : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50',
                isUploading ? 'pointer-events-none opacity-80' : '',
              ].join(' ')}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={onInputChange}
              />
              {isUploading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
                  <p className="text-slate-600 font-medium">Analyzing your contract&hellip;</p>
                  <p className="text-slate-400 text-sm">This usually takes 15&ndash;30 seconds</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-700 font-semibold text-lg">Upload your contract</p>
                    <p className="text-slate-400 text-sm mt-1">PDF files only &middot; Drag and drop or click to browse</p>
                  </div>
                  <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
                    Choose PDF
                  </button>
                </div>
              )}
            </div>

            {error && (
              <p className="mt-4 text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                {error}
              </p>
            )}
          </div>
        </section>

        {/* ── Pricing ────────────────────────────────────────── */}
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
                <a
                  href="https://buy.stripe.com/cNifZgck48eg8Qi5jxbII04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-semibold py-3 rounded-xl text-sm transition-colors"
                >
                  Buy now
                </a>
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
                <a
                  href="https://buy.stripe.com/3cIbJ097SgKMgiK7rFbII05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
                >
                  Start free trial
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
