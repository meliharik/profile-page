import { ImageResponse } from 'next/og';

export const alt = 'Melih Arık, Software Engineer';
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
          justifyContent: 'center',
          padding: '96px',
          background: '#0a0a0a',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: '-2px' }}>
          Melih Arık
        </div>
        <div style={{ fontSize: 36, color: '#a3a3a3', marginTop: 20 }}>
          Software Engineer
        </div>
        <div style={{ fontSize: 28, color: '#525252', marginTop: 12 }}>
          Tallinn, Estonia · meliharik.dev
        </div>
      </div>
    ),
    size
  );
}
