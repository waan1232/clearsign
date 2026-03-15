'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { MarketingIdea } from '@/app/api/marketing/route'
import { createClient } from '@/lib/supabase/browser'

const ADMIN_EMAIL = 'nathanstorm2006@gmail.com'

const PLATFORM_COLORS: Record<string, { bg: string; text: string }> = {
  reddit:        { bg: 'bg-orange-100', text: 'text-orange-700' },
  twitter:       { bg: 'bg-sky-100',    text: 'text-sky-700' },
  x:             { bg: 'bg-sky-100',    text: 'text-sky-700' },
  producthunt:   { bg: 'bg-rose-100',   text: 'text-rose-700' },
  'product hunt':{ bg: 'bg-rose-100',   text: 'text-rose-700' },
  tiktok:        { bg: 'bg-pink-100',   text: 'text-pink-700' },
  linkedin:      { bg: 'bg-blue-100',   text: 'text-blue-700' },
  'cold email':  { bg: 'bg-slate-100',  text: 'text-slate-700' },
  email:         { bg: 'bg-slate-100',  text: 'text-slate-700' },
  instagram:     { bg: 'bg-purple-100', text: 'text-purple-700' },
  youtube:       { bg: 'bg-red-100',    text: 'text-red-700' },
  newsletter:    { bg: 'bg-amber-100',  text: 'text-amber-700' },
  hackernews:    { bg: 'bg-orange-100', text: 'text-orange-700' },
  'hacker news': { bg: 'bg-orange-100', text: 'text-orange-700' },
}

function platformColor(platform: string) {
  const key = platform.toLowerCase()
  for (const [k, v] of Object.entries(PLATFORM_COLORS)) {
    if (key.includes(k)) return v
  }
  return { bg: 'bg-indigo-100', text: 'text-indigo-700' }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
          </svg>
          Copy hook
        </>
      )}
    </button>
  )
}

function IdeaCard({ idea, index }: { idea: MarketingIdea; index: number }) {
  const color = platformColor(idea.platform)
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${color.bg} ${color.text}`}>
          {idea.platform}
        </span>
        <span className="text-xs text-slate-300 font-mono">#{index + 1}</span>
      </div>

      <p className="text-slate-900 font-semibold text-lg leading-snug">
        &ldquo;{idea.hook}&rdquo;
      </p>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">The angle</p>
          <p className="text-slate-700 text-sm leading-relaxed">{idea.idea}</p>
        </div>
        <div className="bg-blue-50 rounded-lg px-4 py-3">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Why it works</p>
          <p className="text-blue-800 text-sm leading-relaxed">{idea.why}</p>
        </div>
      </div>

      <div className="pt-1 border-t border-slate-100">
        <CopyButton text={idea.hook} />
      </div>
    </div>
  )
}

export default function MarketingPage() {
  const [update, setUpdate] = useState('')
  const [ideas, setIdeas] = useState<MarketingIdea[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState('')
  const [authed, setAuthed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    createClient().auth.getUser().then((res: { data: { user: { email?: string } | null } }) => {
      if (res.data.user?.email === ADMIN_EMAIL) {
        setAuthed(true)
      } else {
        router.replace('/')
      }
    })
  }, [router])

  if (!authed) return null

  async function generate(prompt: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ update: prompt }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate ideas.')
      setIdeas(data.ideas)
      setLastUpdate(prompt)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (update.trim()) generate(update.trim())
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-slate-900 font-bold text-lg tracking-tight">
                ReadThe<span className="text-blue-600">Print</span>
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500 text-sm font-medium">Marketing Lab</span>
            </div>
            <p className="text-xs text-slate-400">Internal tool — not public</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 ring-4 ring-green-100" title="Internal only" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Input card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
          <h1 className="text-xl font-bold text-slate-900 mb-1">Marketing idea generator</h1>
          <p className="text-slate-500 text-sm mb-6">
            Tell Claude what&rsquo;s happening with ReadThePrint today. Get 10 specific, actionable ideas.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What&rsquo;s new or interesting about ReadThePrint today?
              </label>
              <textarea
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
                placeholder='e.g. "just launched", "user said it saved them $3k", "added a new feature", "got 10 signups today"'
                rows={3}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading || !update.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                    </svg>
                    Generate 10 ideas
                  </>
                )}
              </button>
              {ideas.length > 0 && !loading && (
                <button
                  type="button"
                  onClick={() => generate(lastUpdate)}
                  className="border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Regenerate
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-700 text-sm mb-6">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
                <div className="h-5 w-20 bg-slate-100 rounded-full mb-4" />
                <div className="h-6 bg-slate-100 rounded mb-2" />
                <div className="h-4 w-3/4 bg-slate-100 rounded mb-6" />
                <div className="h-16 bg-slate-100 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && ideas.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-slate-900">
                {ideas.length} ideas for&nbsp;
                <span className="text-blue-600">&ldquo;{lastUpdate}&rdquo;</span>
              </h2>
              <span className="text-xs text-slate-400">{ideas.length} generated</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ideas.map((idea, i) => (
                <IdeaCard key={i} idea={idea} index={i} />
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && ideas.length === 0 && !error && (
          <div className="text-center py-20 text-slate-400">
            <div className="text-5xl mb-4">💡</div>
            <p className="font-medium text-slate-500">Your 10 ideas will appear here</p>
            <p className="text-sm mt-1">Type something above and hit Generate</p>
          </div>
        )}
      </div>
    </div>
  )
}
