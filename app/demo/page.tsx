'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ── Demo data ───────────────────────────────────────────────────────────────
const DEMO_FILE = 'sample-freelance-agreement.pdf'

const DEMO_ANALYSIS = {
  risk_score: 7,
  summary:
    'This agreement contains several one-sided clauses favoring the client. Key concerns include broad IP ownership, no kill fee, and payment terms buried in the definitions section.',
  clauses: [
    {
      risk_level: 'high' as const,
      clause_text:
        'All work product, deliverables, and any intellectual property created by Contractor during the term of this Agreement — including work created outside of business hours or using personal equipment — shall be considered works made for hire and shall be the sole property of the Client.',
      explanation:
        'This clause claims ownership of everything you create during the contract period, including personal side projects built on your own time with your own tools. It is not limited to work done for this client.',
      suggestion:
        'Negotiate to limit IP assignment strictly to deliverables created specifically for this client using their resources or specifications. Add a carve-out: "excluding work unrelated to Client\'s business and created solely on Contractor\'s own time and equipment."',
    },
    {
      risk_level: 'high' as const,
      clause_text:
        'Client may terminate this Agreement for any reason upon twenty-four (24) hours written notice. Contractor may terminate this Agreement upon sixty (60) days written notice. Upon termination by Client, no further compensation shall be owed for incomplete milestones.',
      explanation:
        'The termination terms are heavily asymmetric. The client can walk away in 24 hours with no penalty, while you are locked in for 60 days. You also receive no kill fee if the client cancels mid-project, even if you have already done significant work.',
      suggestion:
        'Push for equal notice periods (14 days each), or negotiate a kill fee of at least 25% of the remaining contract value if the client terminates early. Add: "Client shall pay for all work completed through the termination date."',
    },
    {
      risk_level: 'medium' as const,
      clause_text:
        'Payment terms, invoicing requirements, and dispute resolution procedures are defined in Section 1.4 (Definitions). Invoices not submitted in the required format within 7 days of milestone completion shall be deemed waived.',
      explanation:
        'Critical payment terms are buried in the definitions section rather than a dedicated payment clause, which is unusual and makes it easy to miss. The 7-day invoice window is short, and missing it means waiving your right to payment for that milestone.',
      suggestion:
        'Request that payment terms be moved to a clear, standalone section. Negotiate the invoice window to at least 30 days. Remove the "deemed waived" language entirely — you should always be entitled to payment for completed work regardless of invoice timing.',
    },
  ],
}

const LOADING_STEPS = [
  'Uploading your contract\u2026',
  'Reading every clause\u2026',
  'Analyzing risk\u2026',
  'Building your report\u2026',
]

type Screen = 'upload' | 'loading' | 'results'

// ── Main page ───────────────────────────────────────────────────────────────
export default function DemoPage() {
  const [screen, setScreen] = useState<Screen>('upload')

  function startDemo() {
    setScreen('loading')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-slate-900 font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity">
          ReadThe<span className="text-blue-600">Print</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          Back to home &rarr;
        </Link>
      </nav>

      {screen === 'upload' && <UploadScreen onStart={startDemo} />}
      {screen === 'loading' && <LoadingScreen onDone={() => setScreen('results')} />}
      {screen === 'results' && <ResultsScreen />}
    </div>
  )
}

// ── Screen 1: Upload ────────────────────────────────────────────────────────
function UploadScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
          Interactive demo
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">See ReadThePrint in action</h1>
        <p className="text-slate-500">
          Upload a real contract, or click below to instantly see a sample review of a freelance agreement.
        </p>
      </div>

      <div className="max-w-2xl w-full">
        {/* Upload drop zone (non-functional in demo) */}
        <div className="min-h-[220px] border-2 border-dashed border-slate-300 rounded-2xl bg-white flex flex-col items-center justify-center px-8 mb-4 opacity-50 cursor-not-allowed select-none">
          <div className="flex flex-col items-center gap-4 pointer-events-none">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-slate-700 font-semibold mb-1">Drop your contract here</p>
              <p className="text-slate-400 text-sm">PDF files only</p>
            </div>
            <Link
              href="/"
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              Upload a real contract
            </Link>
          </div>
        </div>

        {/* Demo CTA */}
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 shadow-sm shadow-blue-50">
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-slate-900 mb-1">See a sample review — no upload needed</p>
            <p className="text-sm text-slate-500">
              We&rsquo;ll walk you through a real-looking review of a freelance agreement with common red flags.
            </p>
          </div>
          <button
            onClick={onStart}
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
            Try the demo
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Screen 2: Loading ───────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    if (stepIndex < LOADING_STEPS.length - 1) {
      const t = setTimeout(() => setStepIndex((i) => i + 1), 1500)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(onDone, 1500)
      return () => clearTimeout(t)
    }
  }, [stepIndex, onDone])

  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm">
        {/* Animated icon */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-2xl bg-blue-100 animate-ping opacity-30" />
          <div className="relative w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
        </div>

        {/* Cycling step text */}
        <div className="h-8 relative w-full flex items-center justify-center">
          {LOADING_STEPS.map((step, i) => (
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
        <div className="flex items-center gap-2">
          {LOADING_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === stepIndex ? 'w-6 bg-blue-600' : i < stepIndex ? 'w-1.5 bg-blue-300' : 'w-1.5 bg-slate-200'
              }`}
            />
          ))}
        </div>

        <p className="text-slate-400 text-sm">This usually takes 15-30 seconds</p>
      </div>
    </div>
  )
}

// ── Screen 3: Results ───────────────────────────────────────────────────────
function ResultsScreen() {
  return (
    <div className="flex-1">
      {/* Demo banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 text-center">
        <p className="text-sm text-amber-800 font-medium">
          This is a sample review.{' '}
          <Link href="/" className="underline font-semibold hover:text-amber-900">
            Upload your own contract
          </Link>
          {' '}to get a real analysis.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 text-center">
        <p className="text-xs text-slate-500">
          ReadThePrint is not a law firm and does not provide legal advice. This analysis is for informational purposes only. Always consult a licensed attorney before signing any contract.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* File name */}
        <p className="text-sm text-slate-400 mb-6 flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          {DEMO_FILE}
        </p>

        {/* Risk score + summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6 flex flex-col sm:flex-row items-center gap-8">
          <RiskGauge score={DEMO_ANALYSIS.risk_score} />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900 mb-3">Contract Summary</h1>
            <p className="text-slate-600 leading-relaxed">{DEMO_ANALYSIS.summary}</p>
          </div>
        </div>

        {/* Clauses */}
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Flagged Clauses
          <span className="ml-2 text-sm font-normal text-slate-400">
            ({DEMO_ANALYSIS.clauses.length} found)
          </span>
        </h2>

        <div className="space-y-4">
          {DEMO_ANALYSIS.clauses.map((clause, i) => (
            <ClauseCard key={i} clause={clause} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to review your own contract?</h3>
          <p className="text-slate-500 text-sm mb-6">
            Your first 2 reviews are free. No account needed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Review your own contract — first 2 free
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Shared components (mirrored from /review/[id]) ──────────────────────────
function RiskGauge({ score }: { score: number }) {
  const clampedScore = Math.max(1, Math.min(10, score))
  const pct = (clampedScore - 1) / 9
  const r = 52, cx = 64, cy = 64
  const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`
  const circumference = Math.PI * r
  const fillLength = pct * circumference
  const color = clampedScore <= 3 ? '#22c55e' : clampedScore <= 6 ? '#f59e0b' : '#ef4444'
  const label = clampedScore <= 3 ? 'Low Risk' : clampedScore <= 6 ? 'Medium Risk' : 'High Risk'

  return (
    <div className="flex flex-col items-center shrink-0">
      <svg width="128" height="74" viewBox="0 0 128 74" overflow="visible">
        <path d={arcPath} fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
        <path d={arcPath} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={`${fillLength} ${circumference}`} />
      </svg>
      <div className="text-4xl font-bold text-slate-900 -mt-4">{clampedScore}</div>
      <div className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color }}>{label}</div>
      <div className="text-xs text-slate-400 mt-0.5">out of 10</div>
    </div>
  )
}

type Clause = {
  risk_level: 'high' | 'medium' | 'low'
  clause_text: string
  explanation: string
  suggestion: string
}

function ClauseCard({ clause }: { clause: Clause }) {
  const badge = {
    high:   { label: 'High Risk',   bg: 'bg-red-50',   text: 'text-red-700',   border: 'border-red-200',   dot: 'bg-red-500'   },
    medium: { label: 'Medium Risk', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    low:    { label: 'Low Risk',    bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
  }[clause.risk_level]

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className={`px-5 py-3 flex items-center gap-2 border-b ${badge.bg} ${badge.border}`}>
        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
        <span className={`text-xs font-bold uppercase tracking-wider ${badge.text}`}>{badge.label}</span>
      </div>
      <div className="p-5 space-y-4">
        <blockquote className="border-l-4 border-slate-300 pl-4 text-slate-600 text-sm leading-relaxed italic">
          &ldquo;{clause.clause_text}&rdquo;
        </blockquote>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">What this means</p>
          <p className="text-slate-700 text-sm leading-relaxed">{clause.explanation}</p>
        </div>
        <div className="bg-blue-50 rounded-lg px-4 py-3 flex gap-3 items-start">
          <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          <div>
            <p className="text-xs font-semibold text-blue-700 mb-0.5">Suggestion</p>
            <p className="text-blue-800 text-sm leading-relaxed">{clause.suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
