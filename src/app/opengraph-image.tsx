import { ImageResponse } from 'next/og';

export const alt = 'Lupin, Autonomous Greenhouse Robot';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          backgroundColor: '#0a0e0b',
          backgroundImage:
            'radial-gradient(900px 600px at -5% -20%, rgba(150,210,40,0.16), transparent 60%), radial-gradient(700px 500px at 110% 10%, rgba(40,190,230,0.10), transparent 60%), linear-gradient(rgba(120,140,120,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,120,0.06) 1px, transparent 1px)',
          backgroundSize: 'auto, auto, 56px 56px, 56px 56px',
          color: '#eef2e6',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 8,
              border: '1px solid rgba(196,242,48,0.4)',
              background: 'rgba(196,242,48,0.10)',
              color: '#c4f230',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontStyle: 'italic',
              fontSize: 34,
            }}
          >
            L
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#9bb38a',
              fontFamily: 'monospace',
            }}
          >
            Greenhouse · Mission Console
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, fontStyle: 'italic', maxWidth: 980 }}>
            Your greenhouse, watched by a robot that drives itself.
          </div>
          <div style={{ fontSize: 30, color: '#9bb38a', maxWidth: 900, fontFamily: 'sans-serif' }}>
            Nav2 autonomy · AprilTag + YOLO perception · a live digital twin · voice control.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 14,
            fontSize: 22,
            color: '#c4f230',
            fontFamily: 'monospace',
          }}
        >
          <span>ROS 2</span>
          <span style={{ color: '#3a4636' }}>·</span>
          <span>Sim + Hardware</span>
          <span style={{ color: '#3a4636' }}>·</span>
          <span>Open-source</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
