import { FEATURES } from '@/constants/homeData';
import { colors } from '@/constants/colors';

export default function FeaturesStrip() {
  return (
    <section style={{ padding: '40px', background: '#e5e2f5' }}>
      <div
        style={{
          maxWidth:            1000,
          margin:              '0 auto',
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 16,
        }}
      >
        {FEATURES.map((feature, i) => (
          <div key={i} className={`feature-card anim-fade-in-up delay-${100 + i * 100}`}>
            <h3 style={{ fontSize: 14.5, fontWeight: 600, color: colors.dark, marginBottom: 8 }}>
              {feature.title}
            </h3>
            <p style={{ fontSize: 13, color: colors.muted, lineHeight: 1.65 }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
