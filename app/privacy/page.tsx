import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | ReadThePrint',
}

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-12">Last updated: March 2026</p>

        <div className="prose prose-slate max-w-none space-y-10">

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">What we collect</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li><strong className="text-slate-800">Email address</strong>: only if you choose to join our waitlist or sign up for a paid plan. We do not require an account to use ReadThePrint.</li>
              <li><strong className="text-slate-800">Contract text</strong>: temporarily, during analysis only. Text extracted from your PDF is sent to our AI provider to generate your review. It is not stored after processing is complete.</li>
              <li><strong className="text-slate-800">Analysis results</strong>: the risk score, summary, and clause breakdown are stored so you can access your review via its unique link.</li>
              <li><strong className="text-slate-800">Usage data</strong>: basic information such as pages visited and features used, collected to understand how people use ReadThePrint and improve the product.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">What we don&rsquo;t do</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li><strong className="text-slate-800">We do not sell your data.</strong> Your information is never sold, rented, or shared with third parties for marketing purposes.</li>
              <li><strong className="text-slate-800">We do not store contract text after analysis.</strong> Once your review is generated, the raw document text is discarded. Only the analysis output is retained.</li>
              <li><strong className="text-slate-800">We do not use your contracts to train AI models.</strong> Your documents are not used for any purpose beyond generating your review.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              ReadThePrint uses basic cookies for analytics purposes only to understand how visitors use the site so we can improve it. We do not use advertising cookies or cross-site tracking. You can disable cookies in your browser settings, though this may affect some functionality.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions about this privacy policy or how we handle your data, you can reach us at{' '}
              <a href="mailto:privacy@readtheprint.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                privacy@readtheprint.com
              </a>.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex items-center gap-6 text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  )
}
