'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/browser'
import type { AuthResponse } from '@supabase/supabase-js'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Why can't I upload my PDF?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "ReadThePrint requires PDFs with selectable text. Scanned documents or image-only PDFs won't work. Try opening the PDF in a browser. If you can highlight text, it will work.",
      },
    },
    {
      '@type': 'Question',
      name: "I paid but my credits aren't showing.",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Credits are added automatically after payment. Try refreshing your account page. If it's been more than 5 minutes, contact support.",
      },
    },
    {
      '@type': 'Question',
      name: "How do I cancel my subscription?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Email support@readtheprint.com and we'll cancel immediately. You keep access until the end of your billing period.",
      },
    },
  ],
}

const SUBJECTS = [
  "I can't upload my contract",
  "My payment didn't go through",
  "My credits aren't showing up",
  'The analysis seems wrong',
  'I need to cancel my subscription',
  'Other',
]

const INPUT = 'w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'

export default function HelpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then((res: AuthResponse) => {
      if (res.data.user?.email) setEmail(res.data.user.email)
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <nav className="border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-slate-900 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            ReadThe<span className="text-blue-600">Print</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16 w-full">
        {submitted ? (
          <div className="text-center py-12">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">We got your message</h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
              We&rsquo;ll get back to you at <strong className="text-slate-700">{email}</strong> as soon as possible, usually within 1 business day.
            </p>
            <Link
              href="/"
              className="mt-8 inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to ReadThePrint
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Help & Support</h1>
              <p className="text-slate-500">
                Having an issue? Fill out the form below and we&rsquo;ll get back to you.
              </p>
            </div>

            {/* Common questions */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-10">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Common questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: "Why can't I upload my PDF?",
                    a: "ReadThePrint requires PDFs with selectable text. Scanned documents or image-only PDFs won't work. Try opening the PDF in a browser. If you can highlight text, it will work.",
                  },
                  {
                    q: "I paid but my credits aren't showing.",
                    a: "Credits are added automatically after payment. Try refreshing your account page. If it's been more than 5 minutes, contact us below.",
                  },
                  {
                    q: "How do I cancel my subscription?",
                    a: "Email us at support@readtheprint.com and we'll cancel it immediately. You keep access until the end of your billing period.",
                  },
                ].map(({ q, a }) => (
                  <details key={q} className="group">
                    <summary className="text-sm font-medium text-slate-800 cursor-pointer list-none flex items-center justify-between gap-2">
                      {q}
                      <svg className="w-4 h-4 text-slate-400 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </summary>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <h2 className="text-lg font-bold text-slate-900 mb-6">Still need help?</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className={INPUT}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className={INPUT}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">What&rsquo;s the issue?</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className={INPUT}
                >
                  <option value="">Select a topic...</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tell us more</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe what happened..."
                  required
                  rows={5}
                  className={`${INPUT} resize-none`}
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm bg-red-50 px-4 py-2.5 rounded-lg border border-red-200">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl px-4 py-3 text-sm transition-colors"
              >
                {loading ? 'Sending...' : 'Send message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
