import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Review a Freelance Contract: A Complete Guide',
  description: 'Everything freelancers need to know before signing a client contract — from payment terms to IP ownership to kill fees. Learn what to look for and what to push back on.',
  alternates: { canonical: 'https://readtheprint.com/blog/freelance-contract-review' },
  openGraph: {
    title: 'How to Review a Freelance Contract | ReadThePrint',
    description: 'A complete guide to reviewing client contracts as a freelancer. Know what to look for before you sign.',
    url: 'https://readtheprint.com/blog/freelance-contract-review',
  },
}

export default function FreelanceContractReview() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-slate-900 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            ReadThe<span className="text-blue-600">Print</span>
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/blog" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Guides</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-blue-600 text-sm font-medium mb-3">Freelance Contracts</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">How to Review a Freelance Contract: A Complete Guide</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Before you sign any client contract, you need to know what you&apos;re agreeing to. This guide covers the clauses that matter most — and the ones that can cost you if you miss them.</p>
          <p className="text-slate-400 text-sm mt-4">March 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why most freelancers skip this step</h2>
            <p>When a client sends over a contract, it&apos;s tempting to skim it or sign without reading. You&apos;re excited about the project, you trust the client, and legal documents are boring.</p>
            <p className="mt-3">But freelance contracts contain clauses that can determine who owns your work, whether you can work for competitors, when you get paid — and whether you can get paid at all if the project falls through.</p>
            <p className="mt-3">Reading a contract carefully before signing isn&apos;t paranoia. It&apos;s how you protect your work, your time, and your income.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The 7 clauses that matter most in freelance contracts</h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">1. Payment terms</h3>
            <p>This is the most important clause in any freelance contract. Look for:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li><strong className="text-slate-800">Payment schedule</strong>: When do you get paid? Net-30 means 30 days after invoice, which can be 30+ days after project completion.</li>
              <li><strong className="text-slate-800">Late payment penalties</strong>: Does the contract say anything about interest or fees if the client pays late?</li>
              <li><strong className="text-slate-800">Deposit or upfront payment</strong>: For larger projects, you should be getting something up front.</li>
              <li><strong className="text-slate-800">Conditions on payment</strong>: Watch for language like "upon client approval" — this can let a client delay payment indefinitely by withholding approval.</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2. Intellectual property ownership</h3>
            <p>Who owns the work you create? Most client contracts include a "work for hire" or IP assignment clause that transfers ownership to the client upon payment. That&apos;s usually fine — but watch for:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Transfer of IP <em>before</em> payment is made</li>
              <li>Transfer of all work including drafts, unused concepts, or prior work you bring to the project</li>
              <li>Claims to work you create independently outside the scope of the engagement</li>
              <li>No right to use the work in your portfolio</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">3. Kill fee / cancellation terms</h3>
            <p>What happens if the client cancels the project halfway through? A kill fee clause protects you by guaranteeing partial payment for work already completed. If the contract has no kill fee, you may end up doing weeks of work for nothing.</p>
            <p className="mt-2">A typical kill fee is 25–50% of the remaining contract value. If a client refuses to include one, that&apos;s a red flag.</p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">4. Scope of work</h3>
            <p>The scope defines exactly what you&apos;re agreeing to deliver. Vague scope language is one of the biggest sources of conflict between freelancers and clients. Make sure the contract specifies:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Exactly what deliverables are included</li>
              <li>How many revision rounds are included</li>
              <li>What is explicitly out of scope</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">5. Non-compete and exclusivity clauses</h3>
            <p>Some client contracts include non-compete clauses that restrict you from working with competitors, or exclusivity clauses that require you to work for only one client in an industry. These can severely limit your earning potential — especially if you&apos;re a specialist.</p>
            <p className="mt-2">Always check the scope and duration of any non-compete. A 6-month restriction in a narrow niche might be manageable; a 2-year industry-wide restriction is not.</p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">6. NDA and confidentiality</h3>
            <p>Most freelance contracts include some form of confidentiality clause. These are generally reasonable — you agree not to share the client&apos;s trade secrets or internal information. But watch for:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Clauses that prevent you from listing the client in your portfolio</li>
              <li>Overly broad definitions of "confidential information"</li>
              <li>No time limit on the confidentiality obligation</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">7. Liability and indemnification</h3>
            <p>Indemnification clauses can require you to pay the client&apos;s legal costs if a third party sues them over your work. Look for asymmetric indemnification — where you indemnify the client but they don&apos;t indemnify you. A fair contract should either be mutual or narrowly scoped to your actual negligence.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What to do when you find a problem</h2>
            <p>Most clients expect some back-and-forth on contract terms — especially if you&apos;re bringing clear, specific concerns. You don&apos;t need a lawyer to say "I&apos;d like to add a kill fee of 50% for cancellation after project kickoff" or "I&apos;d like IP to transfer upon receipt of final payment, not upon delivery."</p>
            <p className="mt-3">If a client refuses to negotiate any terms, that&apos;s a signal about what it will be like to work with them.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The faster way to review contracts</h2>
            <p>Reading a 10-page contract carefully takes time — and most freelancers don&apos;t have a lawyer on retainer to review every engagement. ReadThePrint lets you upload any contract as a PDF and get an instant breakdown of the risky clauses, a risk score, and plain-English explanations of what each clause means for you.</p>
            <p className="mt-3">It won&apos;t replace a lawyer for high-stakes contracts, but it&apos;s a fast way to catch the things you might have missed.</p>
          </section>

        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">Ready to review your contract?</p>
          <p className="text-slate-500 text-sm mb-4">Upload your PDF and get an instant AI-powered breakdown of risky clauses. Free to try — no account needed.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload a contract — it&apos;s free
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex items-center gap-6 text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-slate-600 transition-colors">All Guides</Link>
          <Link href="/demo" className="hover:text-slate-600 transition-colors">See a Demo</Link>
        </div>
      </div>
    </div>
  )
}
