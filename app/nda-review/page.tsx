import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free NDA Review Tool | AI-Powered NDA Analysis',
  description: 'Upload your NDA and get an instant AI-powered analysis of the key clauses, risks, and red flags. Free to try — no account needed.',
  alternates: { canonical: 'https://readtheprint.com/nda-review' },
  openGraph: {
    title: 'Free NDA Review Tool | AI-Powered NDA Analysis',
    description: 'Upload your NDA and get an instant AI-powered analysis of the key clauses, risks, and red flags. Free to try — no account needed.',
    url: 'https://readtheprint.com/nda-review',
  },
}

export default function NDAReview() {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">NDA Review Tool</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Upload your NDA and get an instant AI-powered analysis of the key clauses, risks, and red flags — in plain English. Free to try, no account needed.</p>
        </div>

        <div className="mb-10 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">Ready to review your NDA?</p>
          <p className="text-slate-500 text-sm mb-4">Upload your PDF and get an instant breakdown in about 30 seconds. No account required.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload your NDA — it&apos;s free
          </Link>
        </div>

        <div className="space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What ReadThePrint checks in an NDA</h2>
            <p>NDAs vary enormously — a one-page mutual NDA before a sales call is very different from a 10-page agreement before a corporate acquisition. ReadThePrint analyzes your specific NDA and flags the clauses that actually matter:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong className="text-slate-800">Overly broad definitions of "Confidential Information"</strong> — language that could cover everything you know, say, or do</li>
              <li><strong className="text-slate-800">Missing standard carve-outs</strong> — NDAs should exclude publicly known information, independently developed knowledge, and legally compelled disclosures</li>
              <li><strong className="text-slate-800">Perpetual obligations</strong> — confidentiality that lasts forever, even for non-trade-secret information</li>
              <li><strong className="text-slate-800">Hidden non-competes</strong> — restrictions on future work buried inside NDA language</li>
              <li><strong className="text-slate-800">IP assignment clauses</strong> — ownership transfers hidden in confidentiality agreements</li>
              <li><strong className="text-slate-800">One-sided obligations</strong> — you&apos;re bound but the other party isn&apos;t</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How it works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-semibold text-slate-800">Upload your NDA</p>
                  <p className="text-sm mt-1">Drag and drop your PDF or paste the text. Supports any NDA format — mutual, one-way, employment, freelance, or vendor.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-semibold text-slate-800">AI analyzes the clauses</p>
                  <p className="text-sm mt-1">ReadThePrint reads every clause and identifies the ones that carry risk, are unusually broad, or are missing standard protections.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-semibold text-slate-800">Review the findings</p>
                  <p className="text-sm mt-1">Get a plain-English breakdown of each flagged clause, a risk score, and specific guidance on what to push back on before you sign.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who this is for</h2>
            <p>ReadThePrint is built for anyone who signs NDAs without a lawyer reviewing every one — freelancers, consultants, startup founders, job candidates, and small business owners. It won&apos;t replace legal counsel for high-stakes deals, but it gives you a fast, reliable baseline review so you know what you&apos;re signing and what to ask about.</p>
          </section>

        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">Upload your NDA now</p>
          <p className="text-slate-500 text-sm mb-4">Get an instant AI-powered review of your NDA. Free to try — no account needed.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload your NDA — it&apos;s free
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-2">Want to learn more about NDAs first?</p>
          <Link href="/blog/how-to-review-an-nda" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">Read our guide: How to Review an NDA (Non-Disclosure Agreement)</Link>
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
