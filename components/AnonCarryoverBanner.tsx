'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'clearsign_reviews_used'

export function AnonCarryoverBanner() {
  const [anonCount, setAnonCount] = useState(0)

  useEffect(() => {
    const count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
    setAnonCount(count)
  }, [])

  if (anonCount === 0) return null

  return (
    <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
      <strong>Heads up:</strong> You used {anonCount} free review{anonCount !== 1 ? 's' : ''} before signing in.
      Guest reviews don&rsquo;t carry over to your account — purchase a plan below to keep going.
    </div>
  )
}
