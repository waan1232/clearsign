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
    "AI contract reviewer",
    "contract analysis",
    "read contract online",
    "NDA review",
    "contract risk analysis",
    "AI legal review",
    "contract checker",
    "freelance contract review",
    "small business contract review",
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
  alternates: { canonical: url },
  verification: {
    google: 'g03dsXVSDFBD2Efynr6krfia2mJDAsRW8SDT7T9YxJM',
  },
};

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
