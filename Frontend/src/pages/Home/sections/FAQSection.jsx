import { useState } from 'react';
import BracketTitle from '@/components/BracketTitle/BracketTitle';
import { FAQS } from '@/constants/homeData';
import { colors } from '@/constants/colors';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <section style={{ padding: '64px 40px', background: '#eeecfb' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <BracketTitle>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: colors.dark, letterSpacing: '-0.01em' }}>
              Common Questions About Getting Started
            </h2>
          </BracketTitle>
        </div>

        <div className="flex flex-col" style={{ gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq-item anim-fade-in-up delay-${100 + i * 60}`}>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between"
                style={{ padding: '16px 22px', background: 'none', border: 'none', gap: 12, textAlign: 'left' }}
              >
                <span style={{ fontSize: 13.5, fontWeight: 500, color: colors.dark }}>{faq.q}</span>
                <span
                  style={{
                    fontSize:   22,
                    color:      openIndex === i ? colors.purple : '#aaa',
                    fontWeight: 300,
                    flexShrink: 0,
                    lineHeight: 1,
                    transition: 'color 0.2s ease, transform 0.25s ease',
                    transform:  openIndex === i ? 'rotate(0deg)' : 'rotate(0deg)',
                    display:    'inline-block',
                  }}
                >
                  {openIndex === i ? '×' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div
                  className="anim-fade-in-up"
                  style={{ padding: '2px 22px 16px', fontSize: 13, color: colors.muted, lineHeight: 1.7 }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
