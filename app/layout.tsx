import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const url = 'https://readtheprint.com'

export const metadata: Metadata = {
  title: {
    default: "ReadThePrint | AI Contract Reviewer",
    template: "%s | ReadThePrint",
  },
  description: "Upload any contract and get a plain-English breakdown of risky clauses in seconds. AI-powered contract review for small businesses and freelancers. Free to try, no account needed.",
  metadataBase: new URL(url),
  keywords: [
    "AI freelance contract reviewer",
    "NDA risk analyzer",
    "freelance contract review tool",
    "MSA review for freelancers",
    "AI contract analysis for agencies",
    "review NDA online free",
    "contract risk checker",
    "plain English contract review",
    "AI legal review for freelancers",
    "identify risky contract clauses",
    "contract review small business",
    "non-compete clause analyzer",
  ],
  openGraph: {
    title: "ReadThePrint | Know what you're signing",
    description: "Most people sign contracts they don't understand. ReadThePrint reads the fine print and tells you exactly what to watch out for, in plain English. Free to try.",
    url,
    siteName: 'ReadThePrint',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'ReadThePrint | AI Contract Reviewer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "ReadThePrint | AI Contract Reviewer",
    description: "Upload any contract, get a plain-English breakdown of risky clauses in seconds. Free to try.",
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'g03dsXVSDFBD2Efynr6krfia2mJDAsRW8SDT7T9YxJM',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is ReadThePrint free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — your first 2 contract reviews are completely free with no account required. After that, you can pay $9 per review or $29/month for unlimited reviews with a 7-day free trial.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of contracts can ReadThePrint review?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ReadThePrint works with any PDF contract including NDAs, MSAs (Master Service Agreements), freelance agreements, service contracts, employment agreements, and lease agreements.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does an AI contract review take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most contract reviews are completed in 15–30 seconds. You get a full clause-by-clause breakdown, a risk score from 1–10, and plain-English explanations of every risky term.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an account to review a contract?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No account is required for your first 2 free reviews. Simply upload your PDF and get instant results. An account is only needed if you want to save your reviews or purchase additional credits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my contract kept private?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Your contracts are processed securely and are never shared with third parties or used to train AI models. ReadThePrint is not a law firm and does not provide legal advice.',
      },
    },
    {
      '@type': 'Question',
      name: 'What risky clauses does ReadThePrint flag?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ReadThePrint flags unfair termination clauses, overreaching NDAs and non-competes, one-sided IP ownership, asymmetric liability terms, buried payment conditions, and other clauses that commonly disadvantage freelancers and small businesses.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ReadThePrint',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url,
  description: 'AI-powered contract review tool for small businesses and freelancers. Upload a PDF contract and get a plain-English breakdown of risky clauses, a risk score, and actionable suggestions.',
  offers: [
    {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: '2 free contract reviews, no account needed',
    },
    {
      '@type': 'Offer',
      price: '9.00',
      priceCurrency: 'USD',
      description: 'Single contract review',
    },
    {
      '@type': 'Offer',
      price: '29.00',
      priceCurrency: 'USD',
      description: 'Unlimited monthly subscription',
      billingPeriod: 'P1M',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center">
          <p className="text-xs text-slate-400 max-w-2xl mx-auto mb-2">
            ReadThePrint is not a law firm and does not provide legal advice. This analysis is for informational purposes only. Always consult a licensed attorney before signing any contract.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="/terms" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</a>
            <span className="text-slate-200">·</span>
            <a href="/privacy" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</a>
            <span className="text-slate-200">·</span>
            <a href="/help" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Help & Support</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
