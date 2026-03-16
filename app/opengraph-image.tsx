import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ReadThePrint | AI Contract Reviewer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '80px',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '64px', fontWeight: 800, color: '#0f172a', letterSpacing: '-2px' }}>
            ReadThe
          </span>
          <span style={{ fontSize: '64px', fontWeight: 800, color: '#2563eb', letterSpacing: '-2px' }}>
            Print
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: '42px',
          fontWeight: 700,
          color: '#0f172a',
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: '24px',
          maxWidth: '900px',
        }}>
          Know what you&apos;re signing before you sign it
        </div>

        {/* Subtext */}
        <div style={{
          fontSize: '24px',
          color: '#64748b',
          textAlign: 'center',
          maxWidth: '750px',
          lineHeight: 1.4,
          marginBottom: '48px',
        }}>
          Upload any contract, get a plain-English breakdown of risky clauses in seconds.
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['AI-Powered', 'Free to try', 'No account needed'].map((badge) => (
            <div key={badge} style={{
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '100px',
              padding: '10px 24px',
              fontSize: '18px',
              color: '#475569',
              fontWeight: 500,
            }}>
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
