import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/constants/colors';

export default function HeroSection() {
  const navigate = useNavigate();
  const [hov, setHov] = useState(false);
  return (
    <section style={{ padding: '84px 40px 64px', textAlign: 'center' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#888', marginBottom: 22 }}>
          AI-Powered Business Guidance For Everyone
        </p>
        <h1 style={{ fontSize: 58, fontWeight: 800, color: colors.dark, lineHeight: 1.11, letterSpacing: '-0.025em', marginBottom: 24 }}>
          Turn Your Skills Into a Real<br />Business With AI by Your Side
        </h1>
        <p style={{ fontSize: 14.5, color: colors.muted, lineHeight: 1.78, maxWidth: 490, margin: '0 auto 40px' }}>
          A guided platform that helps anyone start, build, and grow a business step by step.
          No technical knowledge. No complicated tools. No language barriers.
        </p>
        <button
          onClick={() => navigate('/sign-up')}
          onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{ background: colors.dark, color: 'white', border: 'none', borderRadius: 99,
            padding: '13px 36px', fontSize: 14, fontWeight: 500,
            boxShadow: hov ? '0 14px 36px rgba(28,26,46,0.38)' : '0 8px 24px rgba(28,26,46,0.25)',
            transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'all 0.2s ease' }}>
          Get Started
        </button>
        <p style={{ fontSize: 10.5, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#bbb', marginTop: 52 }}>
          Built to Support Beginners and Growing Businesses From Day One
        </p>
      </div>
    </section>
  );
}
