import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MSA Review Tool | Master Service Agreement Analysis',
  description: 'Upload your Master Service Agreement and get an AI-powered review of payment terms, IP clauses, termination rights, liability caps, and more.',
  alternates: { canonical: 'https://readtheprint.com/msa-review' },
  openGraph: {
    title: 'MSA Review Tool | Master Service Agreement Analysis',
    description: 'Upload your Master Service Agreement and get an AI-powered review of payment terms, IP clauses, termination rights, liability caps, and more.',
    url: 'https://readtheprint.com/msa-review',
  },
}

export default function MSAReview() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-slate-900 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            ReadThe<span className="text-blue-600">Print</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">MSA Review Tool</h1>
          <p className="text-slate-500 text-lg leading-relaxed">For agencies, freelancers, and vendors signing Master Service Agreements. Upload your MSA and get an instant AI-powered review of the terms that govern every project you do together.</p>
        </div>

        <div className="mb-10 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">Review your MSA now</p>
          <p className="text-slate-500 text-sm mb-4">Upload your PDF and get an instant breakdown. Free to try — no account needed.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload your MSA — it&apos;s free
          </Link>
        </div>

        <div className="space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What ReadThePrint checks in an MSA</h2>
            <p>An MSA governs every project you do with a client — which means a bad clause in the MSA can affect every SOW that follows. ReadThePrint reviews the full document and flags issues across all the key areas:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong className="text-slate-800">Payment terms</strong> — Net-60 or longer payment windows, approval-gated payment conditions, missing late payment provisions</li>
              <li><strong className="text-slate-800">IP and work product ownership</strong> — when IP transfers, whether drafts and pre-existing tools are included, portfolio rights</li>
              <li><strong className="text-slate-800">Termination rights</strong> — asymmetric termination (client can exit freely; you can&apos;t), missing kill fee provisions for in-progress work</li>
              <li><strong className="text-slate-800">Liability caps and indemnification</strong> — uncapped liability exposure, one-sided indemnification clauses, missing consequential damages exclusions</li>
              <li><strong className="text-slate-800">Non-compete and exclusivity</strong> — industry-wide restrictions, long post-termination non-competes, hidden exclusivity obligations</li>
              <li><strong className="text-slate-800">Confidentiality</strong> — overly broad definitions, perpetual obligations, missing standard carve-outs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How it works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-semibold text-slate-800">Upload your MSA</p>
                  <p className="text-sm mt-1">Upload the PDF. ReadThePrint handles MSAs of any length — from 5-page standard agreements to 30-page enterprise contracts.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-semibold text-slate-800">AI reviews every clause</p>
                  <p className="text-sm mt-1">ReadThePrint analyzes payment, IP, termination, liability, confidentiality, and non-compete sections — identifying unusual terms and missing protections.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-semibold text-slate-800">Review findings before you sign</p>
                  <p className="text-sm mt-1">Get a plain-English summary of each flagged clause, a risk score, and specific guidance on what to negotiate before agreeing to the MSA.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why MSA review matters more than individual contracts</h2>
            <p>Most service providers spend more time reviewing individual project contracts than the MSA that governs all of them. That&apos;s backwards. A one-sided termination clause in an MSA affects every project you do under it. A missing liability cap exposes you on every SOW. IP that transfers before payment is a problem on every engagement.</p>
            <p className="mt-3">Reviewing your MSA carefully before you sign — and pushing back on the terms that don&apos;t work for you — is one of the highest-leverage things you can do to protect your business.</p>
          </section>

        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">Have an MSA to review?</p>
          <p className="text-slate-500 text-sm mb-4">Upload it to ReadThePrint and get an instant AI-powered analysis. Free to try — no account needed.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload your MSA — it&apos;s free
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-2">Want a detailed checklist for MSA review?</p>
          <Link href="/blog/msa-review-checklist" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">Read our guide: MSA Review Checklist: What to Check Before Signing a Master Service Agreement</Link>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 flex items-center gap-6 text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-slate-600 transition-colors">All Guides</Link>
          <Link href="/demo" className="hover:text-slate-600 transition-colors">See a Demo</Link>
        </div>
      </div>
    </div>
  )
}
