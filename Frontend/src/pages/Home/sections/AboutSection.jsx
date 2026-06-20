import { useNavigate } from 'react-router-dom';
import { colors, gradients } from '@/constants/colors';

function ArrowIcon({ direction }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      {direction === 'right'
        ? <path d="M4 2.5L9 6.5L4 10.5" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        : <path d="M9 2.5L4 6.5L9 10.5" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      }
    </svg>
  );
}

export default function AboutSection() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '72px 40px', background: '#eeecfb' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="flex items-center justify-center" style={{ gap: 6, marginBottom: 42 }}>
          {[0,1,2,3].map(i => <ArrowIcon key={`r${i}`} direction="right"/>)}
          <button onClick={() => navigate('/sign-up')} className="btn-primary"
            style={{ margin: '0 12px', padding: '9px 22px', fontSize: 13.5 }}>
            Get Started
          </button>
          {[0,1,2,3].map(i => <ArrowIcon key={`l${i}`} direction="left"/>)}
        </div>
        <blockquote style={{ textAlign: 'center', fontSize: 20, fontWeight: 500, color: '#3d3860', lineHeight: 1.67, marginBottom: 50 }}>
          "We help anyone start a business with AI — no English needed, no tech skills required.
          Our mission is to give every person the tools they need to succeed."
        </blockquote>
        <div style={{ borderRadius: 22, padding: '36px 40px', display: 'flex', alignItems: 'center', gap: 36, background: gradients.founder }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Hi, I'm Areej</h3>
            <p style={{ fontSize: 13, color: '#c4a8e8', marginBottom: 18 }}>Founder of this platform.</p>
            <p style={{ fontSize: 13.5, color: '#ddd0f5', lineHeight: 1.72, maxWidth: 420 }}>
              I created this platform to make starting a business simpler and more accessible for everyone.
              After researching how AI can support women, young people, and underserved entrepreneurs,
              I saw the need for tools that are practical, easy to use, and available in any language.
            </p>
          </div>
          <div style={{ width: 132, height: 152, borderRadius: 18, overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(255,255,255,0.18)' }}>
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80"
              alt="Areej" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </div>
        </div>
      </div>
    </section>
  );
}
