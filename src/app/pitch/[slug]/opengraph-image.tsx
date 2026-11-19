import { ImageResponse } from 'next/og';
import { getPitch, pitches } from '@/lib/data/pitches';

export const alt = 'Native iOS & Android prototype';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pitches).map((slug) => ({ slug }));
}

export default async function PitchOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pitch = getPitch(slug);

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
        <div
          style={{
            fontSize: 24,
            color: '#737373',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          Prototype for
        </div>
        <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: '-2px', marginTop: 16 }}>
          {pitch?.company ?? 'Melih Arık'}
        </div>
        <div style={{ fontSize: 40, color: '#a3a3a3', marginTop: 20 }}>
          Native iOS & Android prototype
        </div>
        {!pitch?.showcase && (
          <div style={{ fontSize: 28, color: '#525252', marginTop: 48 }}>
            Melih Arık · meliharik.dev
          </div>
        )}
      </div>
    ),
    size,
  );
}
