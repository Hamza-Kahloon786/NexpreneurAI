import { useRef, useEffect } from 'react';
import BracketTitle from '@/components/BracketTitle/BracketTitle';
import { GALLERY_IMAGES } from '@/constants/homeData';
import { colors } from '@/constants/colors';

const ITEM_W  = 240;
const ITEM_H  = 220;
const GAP     = 14;
const STRIDE  = ITEM_W + GAP;
const SET_W   = GALLERY_IMAGES.length * STRIDE;

/* 6× copies — enough to fill any screen from edge to edge */
const TRACK_IMAGES = [
  ...GALLERY_IMAGES, ...GALLERY_IMAGES,
  ...GALLERY_IMAGES, ...GALLERY_IMAGES,
  ...GALLERY_IMAGES, ...GALLERY_IMAGES,
];

export default function GallerySection() {
  const wrapRef    = useRef(null);
  const trackRef   = useRef(null);
  const posRef     = useRef(SET_W);   /* start mid-track so both edges are pre-filled */
  const rafRef     = useRef(null);
  const paused     = useRef(false);
  const prevCenter = useRef(-1);

  useEffect(() => {
    const wrap  = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    /* Apply initial position BEFORE first paint */
    track.style.transform = `translateX(-${posRef.current}px)`;

    const SPEED = 0.7;

    const tick = () => {
      if (!paused.current) {
        posRef.current += SPEED;
        /* Seamless reset: loop between SET_W and SET_W*3 */
        if (posRef.current >= SET_W * 3) posRef.current = SET_W;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }

      /* Center-focus: find image closest to viewport center and scale it up */
      const wrapRect = wrap.getBoundingClientRect();
      const centerX  = wrapRect.left + wrapRect.width / 2;
      const items    = track.children;

      let minDist   = Infinity;
      let centerIdx = -1;
      for (let i = 0; i < items.length; i++) {
        const rect   = items[i].getBoundingClientRect();
        const itemCX = rect.left + rect.width / 2;
        const dist   = Math.abs(itemCX - centerX);
        if (dist < minDist) { minDist = dist; centerIdx = i; }
      }

      if (centerIdx !== prevCenter.current) {
        if (prevCenter.current >= 0 && items[prevCenter.current]) {
          items[prevCenter.current].style.transform  = 'scale(1)';
          items[prevCenter.current].style.zIndex     = '1';
          items[prevCenter.current].style.boxShadow  = '0 4px 14px rgba(0,0,0,0.08)';
        }
        if (centerIdx >= 0 && items[centerIdx]) {
          items[centerIdx].style.transform  = 'scale(1.5)';
          items[centerIdx].style.zIndex     = '10';
          items[centerIdx].style.boxShadow  = '0 20px 60px rgba(0,0,0,0.22), 0 0 0 4px #fff';
        }
        prevCenter.current = centerIdx;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onEnter = () => { paused.current = true;  };
    const onLeave = () => { paused.current = false; };
    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(rafRef.current);
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
    };
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
            <div key={i} style={{
              flexShrink:      0,
              width:           ITEM_W,
              height:          ITEM_H,
              borderRadius:    20,
              overflow:        'hidden',
              boxShadow:       '0 4px 14px rgba(0,0,0,0.08)',
              transform:       'scale(1)',
              transition:      'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
              transformOrigin: 'center center',
              zIndex:          1,
            }}>
              <img src={img.url} alt={img.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
