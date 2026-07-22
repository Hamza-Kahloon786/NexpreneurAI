import { useRef, useEffect } from 'react';
import BracketTitle from '@/components/BracketTitle/BracketTitle';
import { GALLERY_IMAGES } from '@/constants/homeData';
import { colors } from '@/constants/colors';

const ITEM_W  = 240;
const ITEM_H  = 220;
const GAP     = 14;
const STRIDE  = ITEM_W + GAP;
const SET_W   = GALLERY_IMAGES.length * STRIDE;

const TRACK_IMAGES = [
  ...GALLERY_IMAGES, ...GALLERY_IMAGES,
  ...GALLERY_IMAGES, ...GALLERY_IMAGES,
  ...GALLERY_IMAGES, ...GALLERY_IMAGES,
];

export default function GallerySection() {
  const wrapRef  = useRef(null);
  const trackRef = useRef(null);
  const posRef   = useRef(SET_W);
  const rafRef   = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transform = `translateX(-${posRef.current}px)`;

    const SPEED = 0.7;

    const tick = () => {
      posRef.current += SPEED;
      if (posRef.current >= SET_W * 3) posRef.current = SET_W;
      track.style.transform = `translateX(-${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section style={{ paddingBottom: 80 }}>

      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', padding: '0 40px 44px' }}>
        <BracketTitle>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: colors.dark, letterSpacing: '-0.015em' }}>
            Transform Simple Ideas Into Profitable Brands
          </h2>
        </BracketTitle>
      </div>

      {/* Full-viewport-width wrapper with edge fade */}
      <div style={{
        width:    '100vw',
        position: 'relative',
        left:     '50%',
        transform:'translateX(-50%)',
        overflow: 'hidden',
        padding:  '60px 0',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        maskImage:       'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }} ref={wrapRef}>
        <div
          ref={trackRef}
          style={{ display: 'flex', alignItems: 'center', gap: GAP, willChange: 'transform' }}
        >
          {TRACK_IMAGES.map((img, i) => (
            <div
              key={i}
              style={{
                flexShrink:      0,
                width:           ITEM_W,
                height:          ITEM_H,
                borderRadius:    20,
                overflow:        'hidden',
                boxShadow:       '0 4px 14px rgba(0,0,0,0.08)',
                transform:       'scale(1)',
                transition:      'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
                transformOrigin: 'center center',
                zIndex:          1,
                cursor:          'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.25)';
                e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.22)';
                e.currentTarget.style.zIndex    = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.08)';
                e.currentTarget.style.zIndex    = '1';
              }}
            >
              <img src={img.url} alt={img.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
