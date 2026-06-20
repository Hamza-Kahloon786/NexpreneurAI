import { gradients } from '@/constants/colors';
import { AUTH_CHECKLIST } from '@/constants/homeData';
import Logo from '@/components/Logo/Logo';

/** Full-height purple left panel — no outer card wrapper needed. */
export default function AuthLeftPanel() {
  return (
    <div
      className="anim-slide-left flex flex-col"
      style={{
        width:      '46%',
        minHeight:  '100vh',
        background: gradients.auth,
        padding:    'clamp(40px, 6vh, 72px) clamp(32px, 4vw, 56px)',
        overflowY:  'auto',
        flexShrink: 0,
      }}
    >
      {/* Overlapping floating images */}
      <div style={{ position: 'relative', height: 210, marginBottom: 36, flexShrink: 0 }}>

        {/* Back image — upper right, 58% wide */}
        <div
          className="float-slow absolute overflow-hidden"
          style={{
            top: 0, right: 0,
            width: '58%', height: 162,
            borderRadius: 16,
            boxShadow: '0 14px 36px rgba(0,0,0,0.3)',
            zIndex: 1,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80"
            alt="Business owner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Front image — lower left, 50% wide — overlaps back image by ~8% */}
        <div
          className="float-fast absolute overflow-hidden"
          style={{
            top: 48, left: 0,
            width: '50%', height: 144,
            borderRadius: 14,
            border: '3px solid white',
            boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
            zIndex: 2,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80"
            alt="Business meeting"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div style={{ marginBottom: 20 }} className="anim-fade-in delay-200">
        <Logo light size={32} />
      </div>

      <h2
        className="font-bold text-white anim-fade-in-up delay-250"
        style={{ fontSize: 22, lineHeight: 1.38, marginBottom: 24 }}
      >
        A simple AI-powered hub to<br />help you grow your business.
      </h2>

      <div className="flex flex-col" style={{ gap: 14 }}>
        {AUTH_CHECKLIST.map((item, i) => (
          <div
            key={i}
            className={`flex items-center anim-fade-in-up delay-${300 + i * 60}`}
            style={{ gap: 11 }}
          >
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 20, height: 20, borderRadius: 5,
                background: 'rgba(255,255,255,0.22)',
                border: '1.5px solid rgba(255,255,255,0.38)',
              }}
            >
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.93)', lineHeight: 1.45 }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
