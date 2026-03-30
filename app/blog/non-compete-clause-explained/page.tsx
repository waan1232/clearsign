import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is a Non-Compete Clause? (And When to Push Back)',
  description: 'Non-compete clauses can restrict your career for years. Learn what they mean, what makes them enforceable, and how to negotiate better terms.',
  alternates: { canonical: 'https://readtheprint.com/blog/non-compete-clause-explained' },
  openGraph: {
    title: 'What Is a Non-Compete Clause? | ReadThePrint',
    description: 'Non-competes can follow you for years. Learn what to look for and when to push back.',
    url: 'https://readtheprint.com/blog/non-compete-clause-explained',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a non-compete clause?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A non-compete clause (also called a covenant not to compete) is a contract provision that restricts you from working for competitors or starting a competing business for a defined period after the contract ends. They appear in employment contracts, freelance agreements, and consulting contracts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are non-compete clauses enforceable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the state. California, Minnesota, North Dakota, and Oklahoma generally do not enforce non-competes. Most other states enforce them if the duration, geographic scope, and restricted activities are reasonable. Courts increasingly refuse to enforce broad or one-sided non-competes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a non-compete clause unenforceable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common reasons a non-compete is unenforceable: the duration is too long (courts often reject restrictions beyond 1–2 years), the geographic scope is unlimited or worldwide, the definition of "competitor" is vague or covers your entire profession, or the state where you work does not allow non-competes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long can a non-compete clause last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Courts generally view non-competes of 6 months to 1 year as reasonable for most engagements. Restrictions of 2 years or more are subject to more scrutiny, and anything over 3–5 years is rarely enforced, especially for freelancers and independent contractors.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a freelancer refuse to sign a non-compete?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Freelancers can and should push back on unreasonable non-competes. You can negotiate to reduce the duration, narrow the scope to specific named competitors, add a geographic limit, or remove the clause entirely if it is not appropriate to the engagement. Courts also scrutinize non-competes more strictly for independent contractors than for full-time employees.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a non-compete and a non-solicitation clause?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A non-compete restricts you from working for competitors or starting a competing business. A non-solicitation clause restricts you from poaching clients or employees from a former employer or client. Non-solicitation clauses are generally narrower and easier to enforce than non-competes.',
      },
    },
  ],
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Is a Non-Compete Clause? (And When to Push Back)',
  description: 'Non-compete clauses can restrict your career for years. Learn what they mean, what makes them enforceable, and how to negotiate better terms.',
  url: 'https://readtheprint.com/blog/non-compete-clause-explained',
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

export default function NonCompeteClauseExplained() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          <p className="text-blue-600 text-sm font-medium mb-3">Contract Clauses</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">What Is a Non-Compete Clause? (And When to Push Back)</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Non-compete clauses can limit where you work and who you work for — sometimes for years after a contract ends. Here&apos;s how to read them and what to do when they go too far.</p>
          <p className="text-slate-400 text-sm mt-4">March 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a non-compete clause?</h2>
            <p>A non-compete clause (also called a non-competition agreement or covenant not to compete) is a provision in a contract that restricts you from working for competitors or starting a competing business — typically for a defined period of time after the contract ends.</p>
            <p className="mt-3">They appear in employment contracts, freelance agreements, and partnership agreements. The basic idea is that an employer or client wants to protect themselves from you taking what you learned and immediately using it against them.</p>
            <p className="mt-3">That&apos;s a legitimate concern. But non-competes vary enormously in how reasonable they are — and courts in many states are increasingly unwilling to enforce the broad ones.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The three elements of a non-compete</h2>
            <p>Every non-compete has three components that determine whether it&apos;s reasonable:</p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">1. Duration</h3>
            <p>How long does the restriction last? Six months, one year, two years, five years? Courts generally view restrictions longer than 1–2 years as suspect. A 5-year non-compete for a short freelance engagement is almost certainly unreasonable.</p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2. Geographic scope</h3>
            <p>What area does the restriction cover? Local, regional, national, worldwide? For online freelancers or remote workers, a geographic non-compete makes very little sense — almost all competitors are &quot;everywhere.&quot; Watch for non-competes with no geographic limit at all.</p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">3. Scope of restricted activities</h3>
            <p>What are you actually prohibited from doing? A narrow non-compete might restrict you from working for two or three specific named competitors. A broad one might bar you from any work in your entire industry.</p>
            <p className="mt-2">The narrower the restriction, the more likely it is to be enforced — and the less damaging it is to you. Broad, industry-wide restrictions are worth pushing back on.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Are non-competes even enforceable?</h2>
            <p>It depends heavily on which state&apos;s law governs the contract and your specific circumstances. A few things to know:</p>
            <ul className="list-disc list-inside mt-2 space-y-3">
              <li><strong className="text-slate-800">California, Minnesota, North Dakota, and Oklahoma</strong> generally do not enforce non-competes at all (with narrow exceptions).</li>
              <li><strong className="text-slate-800">Most other states</strong> will enforce non-competes if they are reasonable in duration, geography, and scope.</li>
              <li><strong className="text-slate-800">The FTC issued a rule in 2024</strong> attempting to ban most non-competes at the federal level. As of 2026, enforcement status varies — see the <a href="https://www.ftc.gov/legal-library/browse/rules/noncompete-rule" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">FTC&apos;s non-compete rule page</a> for current status and consult a lawyer if this matters for your situation.</li>
              <li><strong className="text-slate-800">For independent contractors and freelancers</strong>, courts often scrutinize non-competes more carefully than for full-time employees, since contractors typically work for multiple clients.</li>
            </ul>
            <p className="mt-3">An unenforceable non-compete can still cause problems — you might have to hire a lawyer to fight it, and some employers will threaten litigation regardless of legal merit. It&apos;s better to negotiate the terms upfront than to rely on a court refusing to enforce it later.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Red flags to watch for</h2>
            <ul className="list-disc list-inside space-y-3">
              <li><strong className="text-slate-800">No geographic limit</strong>: A worldwide restriction for a local business is unreasonable.</li>
              <li><strong className="text-slate-800">Duration longer than 2 years</strong>: Especially concerning for freelance or short-term engagements.</li>
              <li><strong className="text-slate-800">Vague definition of &quot;competitor&quot;</strong>: If you can&apos;t clearly determine what companies are off-limits, the clause is too broad.</li>
              <li><strong className="text-slate-800">Restrictions on your general skills or specialty</strong>: A non-compete can prevent you from working at specific companies; it generally should not prevent you from using your professional skills entirely.</li>
              <li><strong className="text-slate-800">Non-solicitation of clients you had before this engagement</strong>: You shouldn&apos;t have to give up pre-existing relationships.</li>
              <li><strong className="text-slate-800">Non-competes hidden in NDAs or IP agreements</strong>: Sometimes competition restrictions are buried under a different section heading. Search the full document for relevant terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to negotiate a non-compete</h2>
            <p>If a contract has a non-compete you&apos;re uncomfortable with, here are reasonable requests to make:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Reduce the duration (from 2 years to 6 months, for example)</li>
              <li>Narrow the scope to specific named competitors rather than a broad industry</li>
              <li>Add a geographic limit if one doesn&apos;t exist</li>
              <li>Carve out clients you already have relationships with</li>
              <li>Remove it entirely if it&apos;s not appropriate to the engagement (e.g., a short project with no access to trade secrets)</li>
            </ul>
            <p className="mt-3">Most clients who include a non-compete have a specific concern — usually that you&apos;ll take their customers or internal information to a direct competitor. If you can address that concern more narrowly, they&apos;re often willing to revise the language.</p>
          </section>

        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">What is a non-compete clause?</h3>
              <p className="text-slate-600">A non-compete clause (also called a covenant not to compete) is a contract provision that restricts you from working for competitors or starting a competing business for a defined period after the contract ends. They appear in employment contracts, freelance agreements, and consulting contracts.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Are non-compete clauses enforceable?</h3>
              <p className="text-slate-600">It depends on the state. California, Minnesota, North Dakota, and Oklahoma generally do not enforce non-competes. Most other states enforce them if the duration, geographic scope, and restricted activities are reasonable. Courts increasingly refuse to enforce broad or one-sided non-competes.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">What makes a non-compete clause unenforceable?</h3>
              <p className="text-slate-600">Common reasons: the duration is too long (courts often reject restrictions beyond 1–2 years), the geographic scope is unlimited or worldwide, the definition of &quot;competitor&quot; is vague or covers your entire profession, or the state where you work does not allow non-competes.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">How long can a non-compete clause last?</h3>
              <p className="text-slate-600">Courts generally view non-competes of 6 months to 1 year as reasonable. Restrictions of 2 years or more are subject to more scrutiny, and anything over 3–5 years is rarely enforced — especially for freelancers and independent contractors.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Can a freelancer refuse to sign a non-compete?</h3>
              <p className="text-slate-600">Yes. You can negotiate to reduce the duration, narrow the scope to specific named competitors, add a geographic limit, or remove it entirely. Courts scrutinize non-competes more strictly for independent contractors than for full-time employees, so you have more leverage than you think.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">What is the difference between a non-compete and a non-solicitation clause?</h3>
              <p className="text-slate-600">A non-compete restricts you from working for competitors or starting a competing business. A non-solicitation clause restricts you from poaching clients or employees from a former employer or client. Non-solicitation clauses are generally narrower and easier to enforce than non-competes.</p>
            </div>
          </div>
        </section>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">See what&apos;s in your contract</p>
          <p className="text-slate-500 text-sm mb-4">Upload your PDF and ReadThePrint will flag any non-compete, non-solicitation, or other restrictive clauses — with plain-English explanations of what they mean for you.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload a contract — it&apos;s free
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm font-semibold text-slate-700 mb-4">Related guides</p>
          <div className="space-y-2">
            <Link href="/blog/how-to-review-an-nda" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">How to Review an NDA (Non-Disclosure Agreement)</Link>
            <Link href="/blog/msa-review-checklist" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">MSA Review Checklist: What to Check Before Signing a Master Service Agreement</Link>
            <Link href="/blog/freelance-contract-review" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">How to Review a Freelance Contract: A Complete Guide</Link>
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
