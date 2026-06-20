import { useNavigate } from 'react-router-dom';
import { colors } from '@/constants/colors';

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '72px 40px', background: '#eeecfb', textAlign: 'center' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: colors.dark, marginBottom: 14, letterSpacing: '-0.01em' }}>
          Choose how you want to move forward
        </h2>
        <p style={{ fontSize: 13.5, color: colors.muted, lineHeight: 1.72, marginBottom: 34 }}>
          Use AI tools to get tasks done instantly, or explore guides to learn more about selling and growing on the platform.
        </p>
        <div className="flex items-center justify-center" style={{ gap: 14 }}>
          <button onClick={() => navigate('/sign-up')}
            style={{ background: colors.dark, color: 'white', border: 'none', borderRadius: 99,
              padding: '12px 30px', fontSize: 14, fontWeight: 500, transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#2d2a50'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = colors.dark; e.currentTarget.style.transform = 'scale(1)'; }}>
            Get Started
          </button>
          <button
            style={{ background: '#fff', color: colors.text, border: '1.5px solid #d1d5db',
              borderRadius: 99, padding: '12px 30px', fontSize: 14, fontWeight: 500, transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.purple; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.transform = 'scale(1)'; }}>
            Visit Learning Hub
          </button>
        </div>
      </div>
    </section>
  );
}
