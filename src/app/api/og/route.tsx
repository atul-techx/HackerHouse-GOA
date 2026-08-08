import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'HH GOA 2026';
  const role = searchParams.get('role') || 'BUILD IN GOA, SHIP FROM PARADISE';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#011c14',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #044f37 2%, transparent 0%)',
          backgroundSize: '50px 50px',
          color: '#fffbea',
          fontFamily: 'sans-serif',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: '#ff1e79',
            padding: '12px 28px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(255,30,121,0.5)',
          }}
        >
          <span style={{ fontSize: 36 }}>🌴</span>
          <span style={{ fontSize: 28, fontWeight: 900, color: '#ffffff' }}>
            HH GOA 2026
          </span>
        </div>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: '#ffc700',
            marginTop: 30,
            marginBottom: 10,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#fffbea',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          {role}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '30px',
            backgroundColor: '#044f37',
            padding: '10px 24px',
            borderRadius: '16px',
            border: '2px solid #ffc700',
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 900, color: '#ffc700' }}>
            ✨ #FrameInGoa Builder Badge
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
