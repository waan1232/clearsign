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

const url = 'https://clearsigner.onrender.com'

export const metadata: Metadata = {
  title: "ClearSign — AI Contract Reviewer",
  description: "Upload any contract and get a plain-English breakdown of risky clauses in seconds. Powered by AI. Free to try.",
  metadataBase: new URL(url),
  openGraph: {
    title: "ClearSign — Know what you're signing",
    description: "Most people sign contracts they don't understand. ClearSign reads the fine print and tells you exactly what to watch out for — in plain English.",
    url,
    siteName: 'ClearSign',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ClearSign — AI Contract Reviewer",
    description: "Upload any contract, get a plain-English breakdown of risky clauses in seconds.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center">
          <p className="text-xs text-slate-400 max-w-2xl mx-auto mb-2">
            ClearSign is not a law firm and does not provide legal advice. This analysis is for informational purposes only. Always consult a licensed attorney before signing any contract.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="/terms" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</a>
            <span className="text-slate-200">·</span>
            <a href="/privacy" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
