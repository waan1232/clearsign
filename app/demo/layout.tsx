import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Contract Review Demo',
  description: 'See ReadThePrint analyze a real freelance agreement in seconds. Spot unfair IP clauses, asymmetric termination terms, and buried payment traps — no upload needed.',
  alternates: { canonical: 'https://readtheprint.com/demo' },
  openGraph: {
    title: 'AI Contract Review Demo | ReadThePrint',
    description: 'Watch ReadThePrint flag risky clauses in a sample freelance agreement. Try it free — no account needed.',
    url: 'https://readtheprint.com/demo',
  },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
