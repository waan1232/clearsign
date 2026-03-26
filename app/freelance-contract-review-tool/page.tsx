import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Freelance Contract Review Tool | AI Contract Analysis',
  description: 'Upload any freelance contract and get an instant AI breakdown of payment terms, IP ownership, kill fees, and risky clauses. Free to try.',
  alternates: { canonical: 'https://readtheprint.com/freelance-contract-review-tool' },
  openGraph: {
    title: 'Freelance Contract Review Tool | AI Contract Analysis',
    description: 'Upload any freelance contract and get an instant AI breakdown of payment terms, IP ownership, kill fees, and risky clauses. Free to try.',
    url: 'https://readtheprint.com/freelance-contract-review-tool',
  },
}

export default function FreelanceContractReviewTool() {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">Freelance Contract Review Tool</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Built for freelancers who sign client contracts. Upload any freelance agreement and get an instant AI breakdown of the clauses that put your payment, your IP, and your time at risk.</p>
        </div>

        <div className="mb-10 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">Review your contract now</p>
          <p className="text-slate-500 text-sm mb-4">Upload your PDF and get an instant breakdown. Free to try — no account needed.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload a contract — it&apos;s free
          </Link>
        </div>

        <div className="space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What ReadThePrint catches in freelance contracts</h2>
            <p>Most problematic clauses in freelance contracts don&apos;t look dangerous at first glance. They&apos;re buried in standard legal language and easy to miss if you&apos;re not reading carefully. ReadThePrint flags:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong className="text-slate-800">IP traps</strong> — work-for-hire clauses that transfer ownership before you&apos;re paid, or that claim rights to your pre-existing tools and methods</li>
              <li><strong className="text-slate-800">Missing kill fees</strong> — no protection if the client cancels halfway through and you&apos;ve already done weeks of work</li>
              <li><strong className="text-slate-800">Scope creep language</strong> — vague deliverable descriptions that let clients add work indefinitely without additional pay</li>
              <li><strong className="text-slate-800">Late payment traps</strong> — "upon client approval" payment conditions that let clients withhold payment indefinitely</li>
              <li><strong className="text-slate-800">Overly broad non-competes</strong> — restrictions that prevent you from working in your entire industry after the engagement ends</li>
              <li><strong className="text-slate-800">One-sided termination rights</strong> — clients can exit instantly while you&apos;re locked in with long notice periods</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How it works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-semibold text-slate-800">Upload your contract</p>
                  <p className="text-sm mt-1">Upload the PDF your client sent you. Works with any freelance agreement, SOW, or service contract.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-semibold text-slate-800">AI reviews every clause</p>
                  <p className="text-sm mt-1">ReadThePrint identifies risky language, missing protections, and anything that deviates from standard freelance contract terms.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-semibold text-slate-800">Know what to push back on</p>
                  <p className="text-sm mt-1">Get a plain-English explanation of each flagged clause and specific suggestions for what to request before you sign.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Built for freelancers, not lawyers</h2>
            <p>Most freelancers don&apos;t have a lawyer on retainer to review every client contract. ReadThePrint is designed to give you the same baseline protection — identifying the clauses that actually matter and explaining what they mean in plain English — without the cost of legal review for every engagement.</p>
            <p className="mt-3">For high-stakes contracts (large retainers, long-term exclusivity, significant IP transfers), it&apos;s still worth consulting a lawyer. But for the typical client agreement, ReadThePrint gives you what you need to negotiate from an informed position.</p>
          </section>

        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">Have a contract to review?</p>
          <p className="text-slate-500 text-sm mb-4">Upload your freelance contract and get an instant AI-powered breakdown of risky clauses. Free to try — no account needed.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload a contract — it&apos;s free
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-2">Want to learn more about freelance contracts first?</p>
          <Link href="/blog/freelance-contract-review" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">Read our guide: How to Review a Freelance Contract: A Complete Guide</Link>
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
