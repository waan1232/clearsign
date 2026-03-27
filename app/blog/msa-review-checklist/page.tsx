import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MSA Review Checklist: What to Check Before Signing a Master Service Agreement',
  description: 'A practical checklist for reviewing Master Service Agreements. Know what to look for in MSAs before signing a long-term client or vendor relationship.',
  alternates: { canonical: 'https://readtheprint.com/blog/msa-review-checklist' },
  openGraph: {
    title: 'MSA Review Checklist | ReadThePrint',
    description: 'What to check before signing a Master Service Agreement. A practical guide for freelancers and small businesses.',
    url: 'https://readtheprint.com/blog/msa-review-checklist',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a master service agreement checklist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A master service agreement checklist is a list of key clauses and provisions to review before signing an MSA. It covers payment terms, IP ownership, termination rights, liability caps, confidentiality obligations, non-compete restrictions, and dispute resolution — helping you identify unfair or missing protections before you sign.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I look for when reviewing an MSA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When reviewing an MSA, check: when IP transfers (should be upon payment, not delivery), whether termination rights are mutual, whether there is a liability cap protecting you, whether indemnification is one-sided, what the payment terms are and whether late payment is addressed, and whether there are any non-compete or exclusivity restrictions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an MSA and a SOW?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An MSA (Master Service Agreement) is a framework contract that sets the overall terms of the relationship between two parties. A SOW (Statement of Work) is a project-specific document that defines deliverables, timelines, and fees for a specific engagement. The MSA governs all SOWs under it.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are common red flags in a Master Service Agreement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common red flags in an MSA include: IP transferring before payment is received, one-sided termination rights that favor the client, no liability cap for the service provider, uncapped indemnification, Net-60 or longer payment terms with no late payment penalties, broad non-compete clauses, and the client\'s right to unilaterally modify the agreement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a lawyer to review an MSA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For high-value or long-term engagements, a lawyer review is recommended. For smaller engagements, an AI contract review tool like ReadThePrint can quickly flag risky clauses, unusual terms, and missing protections — giving you a starting point for negotiation before deciding whether to involve a lawyer.',
      },
    },
  ],
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'MSA Review Checklist: What to Check Before Signing a Master Service Agreement',
  description: 'A practical checklist for reviewing Master Service Agreements. Know what to look for in MSAs before signing a long-term client or vendor relationship.',
  url: 'https://readtheprint.com/blog/msa-review-checklist',
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

export default function MSAReviewChecklist() {
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
          <p className="text-blue-600 text-sm font-medium mb-3">MSAs</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">MSA Review Checklist: What to Check Before Signing a Master Service Agreement</h1>
          <p className="text-slate-500 text-lg leading-relaxed">MSAs govern the entire relationship between you and a client or vendor — sometimes for years. Here&apos;s what to check before you sign one.</p>
          <p className="text-slate-400 text-sm mt-4">March 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a Master Service Agreement?</h2>
            <p>A Master Service Agreement (MSA) is a framework contract that sets the terms for an ongoing relationship between two parties — typically a service provider (freelancer, agency, vendor) and a client. Individual projects or engagements are then handled through separate Statements of Work (SOWs) that reference the MSA.</p>
            <p className="mt-3">Because the MSA governs the entire relationship, its terms can affect every project you do together. A bad clause in an MSA can create problems on every SOW that follows. This makes the MSA review more important than any individual project contract.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MSA review checklist</h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Payment and invoicing</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>What are the payment terms? (Net-30, Net-60, upon completion?)</li>
              <li>Is there a late payment provision or interest on overdue invoices?</li>
              <li>What is the invoicing process — are there approval requirements that could delay payment?</li>
              <li>Are there conditions under which the client can withhold payment?</li>
              <li>Who pays for out-of-pocket expenses, and is there a reimbursement process?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Intellectual property</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>When does IP transfer? Upon delivery or upon full payment?</li>
              <li>Does the IP transfer include all work product, including drafts and concepts?</li>
              <li>Does the client claim rights to tools, frameworks, or methodologies you bring to the engagement?</li>
              <li>Are you permitted to use the work in your portfolio?</li>
              <li>Are there any license-back provisions that let you use the work after the engagement?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Termination rights</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Can either party terminate the MSA for convenience (i.e., for any reason)?</li>
              <li>What is the notice period for termination?</li>
              <li>What happens to in-progress SOWs if the MSA is terminated?</li>
              <li>Is there a kill fee or compensation for work completed at time of termination?</li>
              <li>Are your termination rights symmetric with the client&apos;s?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Liability and indemnification</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Is there a cap on liability? (Usually a good thing — caps your exposure to a reasonable amount.)</li>
              <li>Is the indemnification clause mutual or one-sided?</li>
              <li>Are you being asked to indemnify the client for their own negligence or misconduct?</li>
              <li>What types of damages are excluded? (Consequential, indirect, lost profits?)</li>
              <li>Are there any uncapped liability provisions?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Confidentiality and NDA</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>What counts as confidential information?</li>
              <li>Are there standard carve-outs for publicly known information?</li>
              <li>How long does the confidentiality obligation last?</li>
              <li>Can you disclose information if legally required?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Non-compete and exclusivity</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Are there any restrictions on working with competitors?</li>
              <li>Is there any exclusivity obligation — can you only work with one client in this space?</li>
              <li>How long do any restrictions last after the MSA ends?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Change orders and scope</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>How are changes to scope handled?</li>
              <li>Is there a change order process that requires written approval before additional work is done?</li>
              <li>What happens if the client requests changes verbally — are you protected?</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Governing law and disputes</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Which state&apos;s laws govern the agreement?</li>
              <li>Where must disputes be resolved? (If it&apos;s far from you, litigation becomes impractical.)</li>
              <li>Is there a mandatory arbitration clause?</li>
              <li>Are class action rights waived?</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Common MSA red flags</h2>
            <ul className="list-disc list-inside space-y-3">
              <li><strong className="text-slate-800">IP transfers before payment is received</strong></li>
              <li><strong className="text-slate-800">One-sided termination rights</strong> — client can terminate for convenience but you cannot</li>
              <li><strong className="text-slate-800">No liability cap</strong> for the service provider (you)</li>
              <li><strong className="text-slate-800">Uncapped indemnification</strong> for third-party claims</li>
              <li><strong className="text-slate-800">Net-60 or longer payment terms</strong> with no late payment provisions</li>
              <li><strong className="text-slate-800">Broad non-compete</strong> that restricts your entire industry</li>
              <li><strong className="text-slate-800">Client&apos;s right to unilaterally modify the MSA</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MSA vs. SOW: which governs?</h2>
            <p>Most MSAs specify that in the event of a conflict between the MSA and a SOW, one takes precedence over the other. Check which document wins in a conflict. This matters because clients sometimes try to negotiate favorable terms into individual SOWs that override the protections in the MSA.</p>
            <p className="mt-3">Ideally, your MSA should establish the minimum protections that apply to every engagement, with SOWs adding project-specific details only.</p>
          </section>

        </div>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">What is a master service agreement checklist?</h3>
                <p>A master service agreement checklist is a list of key clauses to review before signing an MSA. It covers payment terms, IP ownership, termination rights, liability caps, confidentiality, non-compete restrictions, and dispute resolution — helping you identify unfair or missing protections before you sign.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">What is the difference between an MSA and a SOW?</h3>
                <p>An MSA sets the overall terms of the relationship between two parties. A SOW (Statement of Work) is project-specific — it defines deliverables, timelines, and fees for a single engagement. The MSA governs all SOWs under it, which is why getting the MSA right matters more than any individual project contract.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">What are the most common red flags in an MSA?</h3>
                <p>IP transferring before payment, one-sided termination rights, no liability cap for the service provider, uncapped indemnification, Net-60+ payment terms with no late penalty, broad non-competes, and the client&apos;s right to modify the agreement unilaterally.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Do I need a lawyer to review an MSA?</h3>
                <p>For high-value or long-term engagements, yes. For smaller projects, an AI tool like ReadThePrint can quickly flag risky clauses and give you a starting point for negotiation — helping you decide whether the contract needs legal review before you invest in one.</p>
              </div>
            </div>
          </section>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-slate-800 font-semibold mb-2">Have an MSA to review?</p>
          <p className="text-slate-500 text-sm mb-4">Upload it to ReadThePrint and get an instant analysis of the key clauses, risk areas, and anything you should push back on — before you sign.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload a contract — it&apos;s free
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm font-semibold text-slate-700 mb-4">Related guides</p>
          <div className="space-y-2">
            <Link href="/blog/freelance-contract-review" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">How to Review a Freelance Contract: A Complete Guide</Link>
            <Link href="/blog/how-to-review-an-nda" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">How to Review an NDA (Non-Disclosure Agreement)</Link>
            <Link href="/blog/contract-red-flags-freelancers" className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">7 Red Flags in Freelance Contracts You Should Never Ignore</Link>
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
