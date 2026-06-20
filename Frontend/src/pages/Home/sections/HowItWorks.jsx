import BracketTitle from '@/components/BracketTitle/BracketTitle';
import { HOW_IT_WORKS } from '@/constants/homeData';
import { colors, gradients } from '@/constants/colors';

export default function HowItWorks() {
  return (
    <section style={{ padding: '72px 40px', background: '#f2f0fb' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <BracketTitle>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: colors.dark, letterSpacing: '-0.015em' }}>
              How It Works
            </h2>
          </BracketTitle>
          <p style={{ fontSize: 13.5, color: colors.muted, lineHeight: 1.72, maxWidth: 400, margin: '18px auto 0' }}>
            We simplify the entire business-building process into clear, guided steps,
            so you always know what to do next.
          </p>
        </div>

        <div className="flex flex-col" style={{ gap: 20 }}>
          {HOW_IT_WORKS.map((step, i) => (
            <div key={i} className={`step-card anim-fade-in-up delay-${150 + i * 100}`}>
              <div className="flex items-start" style={{ gap: 20, padding: '24px 24px 20px' }}>
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 52, height: 52, borderRadius: 14, border: '1.5px solid #e0dcea' }}
                >
                  <span style={{ fontSize: 28, fontWeight: 300, color: '#c8c4d8' }}>{step.num}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 style={{ fontSize: 15.5, fontWeight: 600, color: colors.dark, marginBottom: 8 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 13, color: colors.muted, lineHeight: 1.68 }}>{step.desc}</p>
                </div>
                <img
                  src={step.img}
                  alt={step.title}
                  style={{ width: 148, height: 108, objectFit: 'cover', borderRadius: 16, flexShrink: 0,
                    transition: 'transform 0.3s ease', }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ height: 3, background: gradients.bar }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
