import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help & Support',
  description: 'Get help with ReadThePrint. Common questions about uploading contracts, billing, credits, and canceling your subscription. Contact support directly.',
  alternates: { canonical: 'https://readtheprint.com/help' },
  openGraph: {
    title: 'Help & Support | ReadThePrint',
    description: 'Get answers to common questions or contact ReadThePrint support directly.',
    url: 'https://readtheprint.com/help',
  },
}

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return children
}
