import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contract Review Guides & Tips',
  description: 'Practical guides for freelancers and small businesses on reviewing contracts, spotting red flags, and understanding common legal terms — in plain English.',
  alternates: { canonical: 'https://readtheprint.com/blog' },
  openGraph: {
    title: 'Contract Review Guides | ReadThePrint',
    description: 'Learn how to review NDAs, freelance agreements, MSAs, and more. Plain-English guides for freelancers and small businesses.',
    url: 'https://readtheprint.com/blog',
  },
}

const posts = [
  {
    slug: 'saas-agreement-checklist',
    title: 'SaaS Agreement Checklist: What to Review Before Signing',
    description: 'Data ownership, auto-renewal traps, SLA terms, liability caps, and termination rights — what to check in any SaaS agreement before you commit.',
    date: 'March 2026',
  },
  {
    slug: 'freelance-contract-review',
    title: 'How to Review a Freelance Contract: A Complete Guide',
    description: 'Everything freelancers need to know before signing a client contract — from payment terms to IP ownership to kill fees.',
    date: 'March 2026',
  },
  {
    slug: 'how-to-review-an-nda',
    title: 'How to Review an NDA (Non-Disclosure Agreement)',
    description: 'What to look for in an NDA before you sign. Learn which clauses protect you and which ones go too far.',
    date: 'March 2026',
  },
  {
    slug: 'non-compete-clause-explained',
    title: 'What Is a Non-Compete Clause? (And When to Push Back)',
    description: 'Non-compete clauses can follow you for years after a job ends. Here\'s how to spot overreaching ones and what to do about them.',
    date: 'March 2026',
  },
  {
    slug: 'msa-review-checklist',
    title: 'MSA Review Checklist: What to Check Before Signing a Master Service Agreement',
    description: 'A practical checklist for reviewing Master Service Agreements — the long-term contracts that govern how agencies and vendors work together.',
    date: 'March 2026',
  },
  {
    slug: 'contract-red-flags-freelancers',
    title: '7 Red Flags in Freelance Contracts You Should Never Ignore',
    description: 'These common contract clauses may look harmless but can cost freelancers thousands. Know what to watch for before you sign.',
    date: 'March 2026',
  },
  {
    slug: 'how-to-read-a-contract',
    title: 'How to Read a Contract (Even If You\'re Not a Lawyer)',
    description: 'A step-by-step approach to reading any legal contract, understanding what the clauses actually mean, and knowing when to ask for changes.',
    date: 'March 2026',
  },
]

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-slate-900 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            ReadThe<span className="text-blue-600">Print</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Contract Review Guides</h1>
        <p className="text-slate-500 mb-12">Plain-English guides for freelancers and small businesses navigating contracts without a lawyer.</p>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-slate-100 pb-8">
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-3">{post.description}</p>
                <span className="text-sm text-slate-400">{post.date}</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 p-6 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-slate-700 font-medium mb-2">Ready to review a contract now?</p>
          <p className="text-slate-500 text-sm mb-4">Skip the reading and upload your PDF. ReadThePrint flags the risky clauses in seconds — free to try, no account needed.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload a contract — it&apos;s free
          </Link>
        </div>
      </div>
    </div>
  )
}
