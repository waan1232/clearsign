import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SaaS Agreement Checklist: What to Review Before Signing',
  description: 'A practical SaaS agreement checklist covering data ownership, auto-renewal traps, SLA terms, liability caps, and termination rights — before you sign.',
  alternates: { canonical: 'https://readtheprint.com/blog/saas-agreement-checklist' },
  openGraph: {
    title: 'SaaS Agreement Checklist | ReadThePrint',
    description: 'What to check before signing a SaaS agreement. Covers data ownership, auto-renewal, SLAs, liability, and termination rights.',
    url: 'https://readtheprint.com/blog/saas-agreement-checklist',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a SaaS agreement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A SaaS agreement (Software as a Service agreement) is a contract between a software vendor and a customer that defines how the software can be used, how data is handled, what the uptime guarantees are, and what happens if the relationship ends. It replaces a traditional software license with a subscription-based terms-of-service.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I look for in a SaaS agreement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key things to check: who owns your data (you should), what the auto-renewal terms are, whether there is a meaningful SLA with remedies, what the liability cap is, whether termination-for-convenience rights are mutual, and what happens to your data when you cancel.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are common red flags in SaaS agreements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Red flags include: vendor claiming ownership or broad license rights over your data, auto-renewal with no cancellation window, no SLA or SLA with no actual remedies, one-sided termination rights, no data export or portability on cancellation, and uncapped liability for the customer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who owns the data in a SaaS agreement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You should own your data. The SaaS vendor should only have a license to use your data to provide the service — not to sell it, analyze it for other purposes, or retain it after termination. Check the "data ownership" or "intellectual property" section carefully and look for broad license grants that go beyond service delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an SLA in a SaaS agreement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An SLA (Service Level Agreement) defines the minimum uptime the vendor commits to — typically expressed as a percentage (e.g., 99.9% uptime). A good SLA also defines remedies: what credits or refunds you receive if the vendor fails to meet the commitment. An SLA with no remedies is effectively meaningless.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to my data if I cancel a SaaS subscription?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This varies by vendor. Before signing, confirm: (1) you can export your data in a usable format before cancellation, (2) the vendor will delete your data within a defined period after termination, and (3) there is no obligation to continue paying in order to access your own data.',
      },
    },
  ],
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'SaaS Agreement Checklist: What to Review Before Signing',
  description: 'A practical SaaS agreement checklist covering data ownership, auto-renewal traps, SLA terms, liability caps, and termination rights.',
  url: 'https://readtheprint.com/blog/saas-agreement-checklist',
  datePublished: '2026-03-30',
  dateModified: '2026-03-30',
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

export default function SaasAgreementChecklist() {
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
          <p className="text-blue-600 text-sm font-medium mb-3">SaaS Contracts</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">SaaS Agreement Checklist: What to Review Before Signing</h1>
          <p className="text-slate-500 text-lg leading-relaxed">SaaS agreements are easy to click through — and full of traps. Here&apos;s what to actually check before you commit your data and your budget to a vendor.</p>
          <p className="text-slate-400 text-sm mt-4">March 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a SaaS agreement?</h2>
            <p>A SaaS agreement (Software as a Service agreement) is a contract between a software vendor and a customer that defines the terms of access to a cloud-based software product. Unlike a traditional software license where you buy the software outright, a SaaS agreement is a subscription — meaning the vendor can change the terms, raise prices, or shut down the service.</p>
            <p className="mt-3">That makes the contract terms more important, not less. You&apos;re not just buying access to software — you&apos;re trusting a vendor with your data, your workflow, and in many cases, your customers&apos; information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">SaaS agreement checklist</h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Data ownership and usage</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Who owns the data you put into the platform? (It should be you.)</li>
              <li>What license does the vendor have over your data — is it limited to providing the service, or broader?</li>
              <li>Can the vendor use your data to train AI models, improve their product, or for any purpose beyond delivering the service?</li>
              <li>Are there any provisions that let them share your data with third parties?</li>
              <li>What happens to your data after termination — how long does the vendor retain it, and how is it deleted?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Auto-renewal and pricing</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Does the agreement auto-renew? What is the notice window to cancel before renewal?</li>
              <li>Can the vendor increase the price at renewal? Is there a cap on price increases?</li>
              <li>Are there any minimum commitment periods beyond the initial term?</li>
              <li>What are the fees for exceeding usage limits (seats, storage, API calls)?</li>
              <li>Is there a refund policy for annual prepayments if you cancel early?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Uptime and SLA</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Is there an SLA? What is the uptime commitment (99%, 99.9%, 99.99%)?</li>
              <li>What counts as downtime — does scheduled maintenance count?</li>
              <li>Are there actual remedies if the SLA is breached? (Service credits are common; refunds are rare but worth asking for.)</li>
              <li>Is there an incident response or support SLA for critical outages?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Termination rights</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Can you terminate the agreement for convenience before the term ends?</li>
              <li>Are termination rights mutual — can the vendor terminate your account for convenience?</li>
              <li>What notice period is required for termination?</li>
              <li>What happens to in-flight work or data at the moment of termination?</li>
              <li>Can the vendor suspend your account without terminating it, and under what conditions?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Data portability and exit</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Can you export all of your data before canceling, in a usable format (CSV, JSON, etc.)?</li>
              <li>Is there a transition period after cancellation during which you can still access your data?</li>
              <li>Does the vendor offer migration assistance or data export on request?</li>
              <li>How long after termination before data is permanently deleted?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Liability and indemnification</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Is there a liability cap? (Typically limited to fees paid in the prior 12 months.)</li>
              <li>Are consequential and indirect damages excluded for both parties?</li>
              <li>Is the indemnification clause mutual or one-sided?</li>
              <li>Does the vendor indemnify you for IP infringement claims arising from their software?</li>
              <li>Are you required to indemnify the vendor for your use of the platform in ways that exceed its intended purpose?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Security and compliance</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>What security standards does the vendor comply with (SOC 2, ISO 27001, etc.)?</li>
              <li>Are you required to sign a Data Processing Agreement (DPA) for GDPR or CCPA compliance?</li>
              <li>What is the vendor&apos;s breach notification obligation — how quickly must they notify you of a data breach?</li>
              <li>Are subprocessors listed and auditable?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Changes to the agreement</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Can the vendor modify the terms unilaterally? With what notice?</li>
              <li>If the vendor changes the terms materially, do you have the right to exit without penalty?</li>
              <li>Are changes to pricing governed by the same change provision, or is pricing handled separately?</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Common red flags in SaaS agreements</h2>
            <ul className="list-disc list-inside space-y-3">
              <li><strong className="text-slate-800">Broad data license</strong> — vendor claims rights to use your data beyond delivering the service</li>
              <li><strong className="text-slate-800">Auto-renewal with a short cancellation window</strong> — e.g., must cancel 60+ days before renewal or you&apos;re locked in for another year</li>
              <li><strong className="text-slate-800">SLA with no remedies</strong> — a 99.9% uptime promise is worthless if there&apos;s no credit or refund for failing it</li>
              <li><strong className="text-slate-800">One-sided termination rights</strong> — vendor can terminate your account for any reason, but you can&apos;t exit early</li>
              <li><strong className="text-slate-800">No data export on cancellation</strong> — data is effectively held hostage until you&apos;re paid up</li>
              <li><strong className="text-slate-800">Uncapped liability for the customer</strong> — you bear unlimited liability for your use of the platform</li>
              <li><strong className="text-slate-800">Unilateral right to modify pricing mid-term</strong> — vendor can raise rates without notice or exit rights</li>
              <li><strong className="text-slate-800">No breach notification timeline</strong> — vendor has no defined obligation to tell you when your data has been compromised</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">SaaS agreements vs. traditional software licenses</h2>
            <p>With a traditional software license, you pay once and own a perpetual right to use that version of the software. With a SaaS agreement, you&apos;re renting access — and that means the vendor can:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Raise prices at renewal</li>
              <li>Change the features you rely on</li>
              <li>Shut down the product entirely</li>
              <li>Change the data terms without much notice</li>
            </ul>
            <p className="mt-3">This is why data portability, termination rights, and change-of-terms provisions matter more in a SaaS agreement than in a traditional license. Your leverage is highest at signing, not after you&apos;re dependent on the product.</p>
          </section>

        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">What is a SaaS agreement?</h3>
              <p className="text-slate-600">A SaaS agreement is a contract between a software vendor and a customer that defines terms of access to a cloud-based product — including data ownership, uptime guarantees, pricing, and what happens when the relationship ends.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">What should I look for in a SaaS agreement?</h3>
              <p className="text-slate-600">Key areas: who owns your data, what the auto-renewal terms are, whether there is a meaningful SLA with remedies, what the liability cap is, whether termination rights are mutual, and what happens to your data when you cancel.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">What are common red flags in SaaS agreements?</h3>
              <p className="text-slate-600">Broad data license grants, auto-renewal with a 60+ day cancellation window, SLA with no remedies, one-sided termination rights, no data export on cancellation, and the vendor&apos;s right to modify pricing mid-term without an exit option.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Who owns the data in a SaaS agreement?</h3>
              <p className="text-slate-600">You should. The vendor should only have a license to use your data to provide the service — not to sell it, train AI on it, or retain it after termination. Read the &quot;data ownership&quot; and &quot;intellectual property&quot; sections carefully for any broad license grants.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">What is an SLA in a SaaS agreement?</h3>
              <p className="text-slate-600">An SLA (Service Level Agreement) defines the minimum uptime the vendor commits to — typically 99.9% or higher. A good SLA also specifies remedies: the service credits or refunds you receive if the vendor fails to meet the commitment. An SLA without remedies is not worth much.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">What happens to my data if I cancel a SaaS subscription?</h3>
              <p className="text-slate-600">Confirm before signing: (1) you can export your data in a usable format, (2) there is a grace period after cancellation to retrieve it, and (3) the vendor will delete it within a defined timeframe. Some vendors make data inaccessible the moment you cancel.</p>
            </div>
          </div>
        </section>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">Have a SaaS agreement to review?</p>
          <p className="text-slate-500 text-sm mb-4">Upload your PDF to ReadThePrint and get an instant breakdown of the data rights, auto-renewal terms, SLA, and anything you should push back on — before you sign.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload a contract — it&apos;s free
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm font-semibold text-slate-700 mb-4">Related guides</p>
          <div className="space-y-2">
            <Link href="/blog/msa-review-checklist" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">MSA Review Checklist: What to Check Before Signing a Master Service Agreement</Link>
            <Link href="/blog/how-to-review-an-nda" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">How to Review an NDA (Non-Disclosure Agreement)</Link>
            <Link href="/blog/non-compete-clause-explained" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">What Is a Non-Compete Clause? (And When to Push Back)</Link>
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
