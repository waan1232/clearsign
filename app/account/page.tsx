import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase'
import { AnonCarryoverBanner } from '@/components/AnonCarryoverBanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account — ReadThePrint',
}

const planLabel: Record<string, string> = {
  free: 'Free',
  per_review: 'Pay per review',
  subscription: 'Unlimited subscription',
}

type Props = {
  searchParams: Promise<{ payment?: string }>
}

export default async function AccountPage({ searchParams }: Props) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?next=/account')
  }

  const params = await searchParams
  const paymentSuccess = params.payment === 'success'

  const db = supabaseAdmin()

  const [{ data: profile }, { data: contracts }] = await Promise.all([
    db.from('profiles').select('plan, credits').eq('id', user.id).single(),
    db.from('contracts')
      .select('id, file_name, risk_score, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10),
  ])

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  const isFree = !profile || profile.plan === 'free'

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-slate-900 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            ReadThe<span className="text-blue-600">Print</span>
          </Link>
          <form action={signOut}>
            <button type="submit" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-16 w-full">

        {/* Payment success banner */}
        {paymentSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-5 flex items-start gap-4">
            <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-green-900">Payment successful!</p>
              <p className="text-sm text-green-700 mt-0.5">
                Your account has been upgraded. It may take a moment to reflect below — refresh if needed.
              </p>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-bold text-slate-900 mb-6">My account</h1>

        {/* Anonymous carryover note (client-side localStorage check) */}
        {isFree && <AnonCarryoverBanner />}

        {/* Account details */}
        <div className="space-y-3">
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</p>
            <p className="text-slate-800 font-medium">{user.email}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Plan</p>
            <p className="text-slate-800 font-medium">{planLabel[profile?.plan ?? 'free']}</p>
          </div>

          {(profile?.plan === 'per_review' || profile?.plan === 'free') && (
            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Reviews remaining</p>
              <p className="text-slate-800 font-medium">{profile?.credits ?? 0}</p>
            </div>
          )}
        </div>

        {/* Upgrade CTA */}
        {isFree && (
          <div className="mt-6 border-2 border-blue-100 rounded-2xl p-6 bg-blue-50">
            <h2 className="font-bold text-slate-900 mb-1">Upgrade for more reviews</h2>
            <p className="text-sm text-slate-500 mb-4">Buy a single review for $9, or go unlimited for $29/month.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://buy.stripe.com/cNifZgck48eg8Qi5jxbII04?client_reference_id=${user.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                Buy 1 review — $9
              </a>
              <a
                href={`https://buy.stripe.com/3cIbJ097SgKMgiK7rFbII05?client_reference_id=${user.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                Start free trial — $29/mo
              </a>
            </div>
          </div>
        )}

        {/* Review history */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent reviews</h2>
          {!contracts || contracts.length === 0 ? (
            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <p className="text-slate-400 text-sm">No reviews yet.</p>
              <Link
                href="/#upload"
                className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Upload your first contract →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {contracts.map((c) => (
                <Link
                  key={c.id}
                  href={`/review/${c.id}`}
                  className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 rounded-xl px-5 py-4 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <span className="text-sm text-slate-700 font-medium truncate">{c.file_name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      c.risk_score >= 7 ? 'bg-red-100 text-red-700' :
                      c.risk_score >= 4 ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      Risk {c.risk_score}/10
                    </span>
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            ← Back to ReadThePrint
          </Link>
        </div>
      </div>
    </div>
  )
}
