import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export const alt = 'Valentine\'s Day Menu Preview'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #fecdd3, #fce7f3)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          padding: '40px',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px 60px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div style={{ fontSize: 60, marginBottom: '10px' }}>💝</div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #be123c, #e11d48)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            Valentine&apos;s Day
          </div>
          <div
            style={{
              fontSize: 48,
              background: 'linear-gradient(to right, #be123c, #e11d48)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Special Menu
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: 32 }}>
            🍣 • 🐟 • 🥬 • 🍮
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 24,
            color: '#be123c',
            opacity: 0.8,
          }}
        >
          A romantic dinner for two
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 