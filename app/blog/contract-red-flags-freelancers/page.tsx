import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '7 Red Flags in Freelance Contracts You Should Never Ignore',
  description: 'These common contract clauses may look harmless but can cost freelancers thousands. Learn the 7 red flags to spot before you sign any client contract.',
  alternates: { canonical: 'https://readtheprint.com/blog/contract-red-flags-freelancers' },
  openGraph: {
    title: '7 Red Flags in Freelance Contracts | ReadThePrint',
    description: 'Common contract clauses that can cost freelancers thousands. Know what to look for before you sign.',
    url: 'https://readtheprint.com/blog/contract-red-flags-freelancers',
  },
}

export default function ContractRedFlagsFreelancers() {
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
          <p className="text-blue-600 text-sm font-medium mb-3">Contract Red Flags</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">7 Red Flags in Freelance Contracts You Should Never Ignore</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Most problematic contract clauses don&apos;t look dangerous at first glance. They&apos;re written in standard legal language and buried in long documents. Here are the ones that cost freelancers the most.</p>
          <p className="text-slate-400 text-sm mt-4">March 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Red Flag #1: IP transfers before payment</h2>
            <p>Many contracts include a clause that says something like: "All work product created under this agreement shall be the sole property of Client upon delivery."</p>
            <p className="mt-3">The problem: delivery happens before payment. Once the client owns the work, they have little incentive to pay you — and if they don&apos;t, your legal options are limited because they technically own the work.</p>
            <p className="mt-3"><strong className="text-slate-800">What to ask for instead:</strong> IP transfers upon receipt of final payment, not upon delivery. This keeps the leverage where it belongs until you&apos;re paid.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Red Flag #2: &quot;Upon client approval&quot; payment language</h2>
            <p>Payment conditions that require client approval before payment is released create an easy path for clients to delay or avoid payment forever. Language like "payment due upon client&apos;s written acceptance" or "final payment contingent on client approval of deliverables" can mean you never get paid if the client simply refuses to approve.</p>
            <p className="mt-3"><strong className="text-slate-800">What to ask for instead:</strong> Payment triggered by delivery or a defined timeframe (e.g., "net-30 from invoice date"), with a clear process for handling disputes about quality — not a unilateral approval right.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Red Flag #3: No kill fee</h2>
            <p>If a client can cancel a project at any time with no financial obligation, you bear all the risk. You might spend weeks on a project, turn down other work, and end up with nothing if the client decides to pull the plug.</p>
            <p className="mt-3">A kill fee protects you by guaranteeing partial payment for work already completed if the client cancels. The absence of a kill fee in a project of any significant size is a red flag.</p>
            <p className="mt-3"><strong className="text-slate-800">Standard kill fee:</strong> 25–50% of the remaining project value, or payment for all work completed to date at your hourly rate.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Red Flag #4: Unlimited revisions</h2>
            <p>You wouldn&apos;t sign a contract that says you&apos;ll deliver "as many revisions as the client requests" — but a surprising number of freelancers do, just not in those words. Watch for language like "until client is satisfied," "all changes requested by client," or revision terms with no limit or no additional compensation after a certain point.</p>
            <p className="mt-3"><strong className="text-slate-800">What to ask for instead:</strong> A defined number of revision rounds (e.g., "up to 2 rounds of revisions") with additional revisions billed at your hourly rate.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Red Flag #5: Vague scope of work</h2>
            <p>Scope creep is one of the most common reasons freelancers get underpaid. If the contract doesn&apos;t clearly define what&apos;s included, clients can add work indefinitely while arguing it falls within the original agreement.</p>
            <p className="mt-3">Watch for contracts with vague deliverable descriptions ("ongoing web support," "marketing assistance," "design as needed") and no explicit out-of-scope list.</p>
            <p className="mt-3"><strong className="text-slate-800">What to ask for instead:</strong> Specific, numbered deliverables. Explicit exclusions. A defined process for change orders when scope expands.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Red Flag #6: Overly broad non-compete</h2>
            <p>Non-compete clauses that cover your entire industry, have no geographic limit, or last more than a year or two can seriously restrict your ability to earn a living after the engagement ends — especially if you&apos;re a specialist.</p>
            <p className="mt-3">This is especially common in agency-to-freelancer contracts, where the agency wants to prevent you from working directly with their clients. Some restriction on this is reasonable; a blanket industry-wide non-compete for a design project is not.</p>
            <p className="mt-3"><strong className="text-slate-800">What to ask for instead:</strong> A narrowly scoped non-solicitation (don&apos;t pitch clients you met through this engagement) rather than a broad non-compete, with a clear time limit.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Red Flag #7: One-sided termination rights</h2>
            <p>Some contracts allow the client to terminate the agreement immediately and for any reason, while requiring the freelancer to give 30 or 60 days notice — or limiting the freelancer&apos;s ability to terminate at all. This asymmetry leaves you with no protection if a project turns toxic, while the client can exit the moment it&apos;s convenient for them.</p>
            <p className="mt-3">Look for clauses that say something like "Client may terminate this agreement upon written notice" without a corresponding right for you.</p>
            <p className="mt-3"><strong className="text-slate-800">What to ask for instead:</strong> Symmetric termination rights — if the client can terminate with 2 weeks notice, so can you. Or at minimum, ensure your termination rights are reasonable even if they&apos;re not identical.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The common thread</h2>
            <p>All seven of these red flags share something in common: they transfer risk from the client to you, often without any corresponding compensation. A well-balanced contract allocates risk fairly — not perfectly equally, but proportionally to each party&apos;s ability to manage it.</p>
            <p className="mt-3">When you spot these clauses, don&apos;t panic. Most clients expect some negotiation on contract terms. Raise specific concerns clearly, explain why the language is problematic, and propose specific alternative language. Most clients who are acting in good faith will engage with reasonable requests.</p>
          </section>

        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">Don&apos;t read every clause manually</p>
          <p className="text-slate-500 text-sm mb-4">Upload your contract PDF to ReadThePrint and get an instant breakdown of risky clauses, a risk score, and plain-English explanations. Free to try — no account needed.</p>
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
