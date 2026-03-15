import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase, type Analysis } from '@/lib/supabase'
import { NudgeBanner } from '@/components/NudgeBanner'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ReviewPage({ params }: Props) {
  const { id } = await params

  const { data: contract, error } = await supabase
    .from('contracts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !contract) {
    notFound()
  }

  const analysis = contract.analysis as Analysis

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-slate-900 font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity">
          ReadThe<span className="text-blue-600">Print</span>
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Review another contract &rarr;
        </Link>
      </nav>

      {/* Disclaimer banner */}
      <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 text-center">
        <p className="text-xs text-slate-500">
          ReadThePrint is not a law firm and does not provide legal advice. This analysis is for informational purposes only. Always consult a licensed attorney before signing any contract.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Nudge banner */}
        <div className="mb-6">
          <NudgeBanner />
        </div>

        {/* File name */}
        <p className="text-sm text-slate-400 mb-6 flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          {contract.file_name}
        </p>

        {/* Risk score + summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6 flex flex-col sm:flex-row items-center gap-8">
          <RiskGauge score={analysis.risk_score} />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900 mb-3">Contract Summary</h1>
            <p className="text-slate-600 leading-relaxed">{analysis.summary}</p>
          </div>
        </div>

        {/* Clauses */}
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Flagged Clauses
          <span className="ml-2 text-sm font-normal text-slate-400">
            ({analysis.clauses?.length ?? 0} found)
          </span>
        </h2>

        <div className="space-y-4">
          {analysis.clauses?.map((clause, i) => (
            <ClauseCard key={i} clause={clause} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Review another contract
          </Link>
        </div>
      </div>
    </div>
  )
}

function RiskGauge({ score }: { score: number }) {
  const clampedScore = Math.max(1, Math.min(10, score))
  const pct = (clampedScore - 1) / 9 // 0 → 1

  const r = 52
  const cx = 64
  const cy = 64
  // Half-circle from left (9 o'clock) through top to right (3 o'clock)
  // sweep=0 in SVG y-down = goes upward = top arc
  const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`
  const circumference = Math.PI * r // half-circle arc length ≈ 163
  const fillLength = pct * circumference

  const color =
    clampedScore <= 3 ? '#22c55e' :
    clampedScore <= 6 ? '#f59e0b' :
    '#ef4444'

  const label =
    clampedScore <= 3 ? 'Low Risk' :
    clampedScore <= 6 ? 'Medium Risk' :
    'High Risk'

  return (
    <div className="flex flex-col items-center shrink-0">
      <svg width="128" height="74" viewBox="0 0 128 74" overflow="visible">
        {/* Track */}
        <path
          d={arcPath}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Fill — strokeDasharray reveals only the filled portion from the left */}
        <path
          d={arcPath}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${fillLength} ${circumference}`}
        />
      </svg>
      <div className="text-4xl font-bold text-slate-900 -mt-4">{clampedScore}</div>
      <div className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color }}>
        {label}
      </div>
      <div className="text-xs text-slate-400 mt-0.5">out of 10</div>
    </div>
  )
}

type ClauseType = Analysis['clauses'][number]

function ClauseCard({ clause }: { clause: ClauseType }) {
  const badge = {
    high:   { label: 'High Risk',   bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    dot: 'bg-red-500'    },
    medium: { label: 'Medium Risk', bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200',  dot: 'bg-amber-500'  },
    low:    { label: 'Low Risk',    bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  dot: 'bg-green-500'  },
  }[clause.risk_level] ?? {
    label: 'Unknown', bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400',
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Risk badge header */}
      <div className={`px-5 py-3 flex items-center gap-2 border-b ${badge.bg} ${badge.border}`}>
        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
        <span className={`text-xs font-bold uppercase tracking-wider ${badge.text}`}>
          {badge.label}
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Clause quote */}
        <blockquote className="border-l-4 border-slate-300 pl-4 text-slate-600 text-sm leading-relaxed italic">
          &ldquo;{clause.clause_text}&rdquo;
        </blockquote>

        {/* Explanation */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            What this means
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">{clause.explanation}</p>
        </div>

        {/* Suggestion */}
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
