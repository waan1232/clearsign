import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function supabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const key = serviceRoleKey || supabaseAnonKey
  return createClient(supabaseUrl, key)
}

export type Contract = {
  id: string
  file_name: string
  file_text: string
  risk_score: number
  analysis: Analysis
  created_at: string
}

export type Clause = {
  id: string
  contract_id: string
  clause_text: string
  risk_level: 'high' | 'medium' | 'low'
  explanation: string
  suggestion: string
  created_at: string
}

export type Analysis = {
  risk_score: number
  summary: string
  clauses: {
    clause_text: string
    risk_level: 'high' | 'medium' | 'low'
    explanation: string
    suggestion: string
  }[]
}

export type Profile = {
  id: string
  email: string | null
  plan: 'free' | 'subscription' | 'per_review'
  credits: number
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  created_at: string
}
