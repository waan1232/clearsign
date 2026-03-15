import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account — ClearSign',
}

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?next=/account')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, credits, created_at')
    .eq('id', user.id)
    .single()

  const planLabel: Record<string, string> = {
    free: 'Free',
    per_review: 'Pay per review',
    subscription: 'Unlimited subscription',
  }

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-slate-900 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            Clear<span className="text-blue-600">Sign</span>
          </Link>
          <form action={signOut}>
            <button type="submit" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-16 w-full">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">My account</h1>

        <div className="space-y-4">
          {/* Email */}
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</p>
            <p className="text-slate-800 font-medium">{user.email}</p>
          </div>

          {/* Plan */}
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Plan</p>
            <p className="text-slate-800 font-medium">{planLabel[profile?.plan ?? 'free'] ?? 'Free'}</p>
          </div>

          {/* Credits */}
          {(profile?.plan === 'per_review' || profile?.plan === 'free') && (
            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Reviews remaining</p>
              <p className="text-slate-800 font-medium">{profile?.credits ?? 0}</p>
            </div>
          )}
        </div>

        {/* Upgrade CTA if free */}
        {(profile?.plan === 'free' || !profile) && (
          <div className="mt-8 border-2 border-blue-100 rounded-2xl p-6 bg-blue-50">
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

        <div className="mt-10 pt-8 border-t border-slate-200">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            ← Back to ClearSign
          </Link>
        </div>
      </div>
    </div>
  )
}
