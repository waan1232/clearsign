import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Review an NDA (Non-Disclosure Agreement)',
  description: 'What to look for in an NDA before you sign. Learn which clauses protect you, which go too far, and what to push back on — in plain English.',
  alternates: { canonical: 'https://readtheprint.com/blog/how-to-review-an-nda' },
  openGraph: {
    title: 'How to Review an NDA | ReadThePrint',
    description: 'A plain-English guide to reading NDAs. Know what to look for before you sign.',
    url: 'https://readtheprint.com/blog/how-to-review-an-nda',
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Review an NDA (Non-Disclosure Agreement)',
  description: 'What to look for in an NDA before you sign. Learn which clauses protect you, which go too far, and what to push back on — in plain English.',
  url: 'https://readtheprint.com/blog/how-to-review-an-nda',
  datePublished: '2026-03-24',
  dateModified: '2026-03-24',
  author: {
    '@type': 'Organization',
    name: 'ReadThePrint',
    url: 'https://readtheprint.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ReadThePrint',
    url: 'https://readtheprint.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://readtheprint.com/opengraph-image',
    },
  },
}

export default function HowToReviewAnNDA() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
          <p className="text-blue-600 text-sm font-medium mb-3">NDAs</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">How to Review an NDA (Non-Disclosure Agreement)</h1>
          <p className="text-slate-500 text-lg leading-relaxed">NDAs are common — but that doesn&apos;t mean you should sign one without reading it. Here&apos;s what to look for, what&apos;s reasonable, and what&apos;s not.</p>
          <p className="text-slate-400 text-sm mt-4">March 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What is an NDA?</h2>
            <p>A Non-Disclosure Agreement (NDA) is a contract where one or both parties agree to keep certain information confidential. You&apos;ll encounter them before job interviews, at the start of freelance projects, when exploring a business acquisition, or any time someone wants to share sensitive information with you before a formal agreement is in place.</p>
            <p className="mt-3">NDAs are a normal part of doing business. But the specifics of what you&apos;re agreeing to — and for how long — can vary enormously from one contract to the next.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Mutual vs. one-way NDAs</h2>
            <p>The first thing to check is whether the NDA is <strong className="text-slate-800">mutual</strong> (both parties agree to keep each other&apos;s information confidential) or <strong className="text-slate-800">one-way</strong> (only one party is bound by confidentiality obligations).</p>
            <p className="mt-3">One-way NDAs are common and often fine — for example, if a company is sharing its trade secrets with you, it makes sense that only you are bound by confidentiality. But pay attention to which direction the obligation runs. In some cases, a one-way NDA protects only the company, even when you&apos;re also sharing sensitive information about your own processes or methodology.</p>
            <p className="mt-3">If you&apos;re sharing something valuable, ask for mutual protection.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5 things to look for in any NDA</h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">1. Definition of "Confidential Information"</h3>
            <p>This is the most important clause in the NDA. It defines what you&apos;re actually agreeing to keep secret. Watch for:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li><strong className="text-slate-800">Overly broad definitions</strong>: Language like "all information disclosed in any form" with no exceptions can technically include public information, things you already knew, or information you develop independently.</li>
              <li><strong className="text-slate-800">Standard carve-outs</strong>: A well-drafted NDA should exclude information that is already publicly known, that you independently develop, or that you receive from a third party without restriction.</li>
              <li><strong className="text-slate-800">Oral disclosures</strong>: Some NDAs cover verbal conversations as well as written materials. This creates practical problems — you can&apos;t always know if a casual conversation is covered.</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2. Duration of the obligation</h3>
            <p>How long are you bound by this NDA? Options range from 1 year to indefinite. For most commercial NDAs, 2–5 years is common. Perpetual NDAs (that last forever) are worth questioning — especially for information that will become outdated or publicly available.</p>
            <p className="mt-2">Note: Trade secrets can legitimately require indefinite protection. But general business confidentiality probably shouldn&apos;t follow you for the rest of your career.</p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">3. Permitted disclosures</h3>
            <p>You should always be permitted to disclose confidential information if required by law (e.g., a court order or government investigation). Check that the NDA contains a provision for legally compelled disclosure and ideally requires the disclosing party to notify the other party so they can seek protection.</p>
            <p className="mt-2">Similarly, you should be able to share information with employees, contractors, or advisors who have a legitimate need to know — provided they&apos;re bound by similar confidentiality obligations.</p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">4. Residual knowledge</h3>
            <p>Some NDAs include a "residuals" clause that allows a party to use general knowledge and skills they&apos;ve retained in memory from the disclosure. This is more common in technology agreements. It&apos;s generally a balanced provision — but read it carefully to understand what it permits.</p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">5. Return or destruction of materials</h3>
            <p>When the engagement ends, what happens to any confidential materials you received? The NDA should specify whether you need to return them, destroy them, or both — and provide a process for confirming that you&apos;ve done so.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Red flags in NDAs</h2>
            <ul className="list-disc list-inside space-y-3">
              <li><strong className="text-slate-800">No time limit</strong> on the confidentiality obligation for non-trade-secret information</li>
              <li><strong className="text-slate-800">No standard carve-outs</strong> for publicly known information or independent development</li>
              <li><strong className="text-slate-800">Restrictions on what work you can do</strong> after the engagement (a non-compete hidden inside an NDA)</li>
              <li><strong className="text-slate-800">IP assignment language</strong> buried in the NDA that transfers ownership of what you create during the engagement</li>
              <li><strong className="text-slate-800">No mutual protection</strong> when you are also sharing sensitive information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">When to get a lawyer involved</h2>
            <p>Most NDAs signed before a freelance project or a job interview are low-stakes — a reasonable NDA with reasonable terms. Reading it carefully yourself (or using a tool like ReadThePrint to flag the concerning parts) is usually sufficient.</p>
            <p className="mt-3">For a plain-English overview of how NDAs work under U.S. law, the <a href="https://www.law.cornell.edu/wex/nondisclosure_agreement" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">Cornell Law School Legal Information Institute</a> is a good reference.</p>
            <p className="mt-3">But you should involve a lawyer when:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>The NDA is connected to a major deal (acquisition, licensing, significant partnership)</li>
              <li>The definition of confidential information is unusually broad</li>
              <li>There&apos;s any language that could restrict what work you can do in the future</li>
              <li>There are significant liquidated damages provisions</li>
            </ul>
          </section>

        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">Have an NDA to review right now?</p>
          <p className="text-slate-500 text-sm mb-4">Upload it to ReadThePrint and get an instant breakdown of the risky clauses. Free to try — no account needed.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload a contract — it&apos;s free
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm font-semibold text-slate-700 mb-4">Related guides</p>
          <div className="space-y-2">
            <Link href="/blog/freelance-contract-review" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">How to Review a Freelance Contract: A Complete Guide</Link>
            <Link href="/blog/non-compete-clause-explained" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">What Is a Non-Compete Clause? (And When to Push Back)</Link>
            <Link href="/blog/msa-review-checklist" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">MSA Review Checklist: What to Check Before Signing a Master Service Agreement</Link>
          </div>
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
