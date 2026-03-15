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

export const metadata: Metadata = {
  title: "ClearSign — AI Contract Reviewer",
  description: "Upload any contract and get a plain-English breakdown of risky clauses in seconds.",
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
        <footer className="border-t border-slate-200 bg-white px-6 py-3 text-center">
          <p className="text-xs text-slate-400 max-w-2xl mx-auto">
            ClearSign is not a law firm and does not provide legal advice. This analysis is for informational purposes only. Always consult a licensed attorney before signing any contract.
          </p>
        </footer>
      </body>
    </html>
  );
}
