import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { gradients, colors } from '@/constants/colors';

const COMMON_FAQS = [
  {
    q: 'Do I need technical skills to use this platform?',
    a: 'No. The platform is designed for beginners. Everything is guided step by step, using simple language and clear buttons.',
  },
  {
    q: "Can I use this even if I don't know English?",
    a: 'Yes! The platform supports multiple languages including Urdu, Hindi, Arabic, Bengali, and more.',
  },
  {
    q: 'What kind of businesses can I start with this?',
    a: 'Any kind — products, services, creative work, handmade goods, consulting, and more. The AI guides you based on your goals.',
  },
  {
    q: 'How does the AI help me?',
    a: 'AI creates your business plan, writes product descriptions, suggests pricing, and helps generate content for social media.',
  },
  {
    q: 'Is this platform free to use?',
    a: 'You can get started for free. Premium plans are available for businesses that need more advanced tools.',
  },
  {
    q: 'Will I be able to track my progress?',
    a: "Yes — your dashboard shows every step completed and what's next, so you always know how your business is growing.",
  },
];

const TROUBLE_FAQS = [
  {
    q: 'Image not generating',
    a: "If your image isn't generating, it may be due to a large file size, unsupported format, or a weak internet connection. Try uploading a JPG or PNG under 10MB, check your connection, and generate the image again.",
  },
  {
    q: 'Upload failed',
    a: 'Upload failures can occur due to file size limits, unsupported formats, or connectivity issues. Make sure your file is under 10MB and in a supported format (JPG, PNG, PDF), then try again.',
  },
  {
    q: 'Wrong price suggestion',
    a: 'Price suggestions are generated based on your product details. If the suggestion seems off, try updating your product description with more specific details about materials, time, and target market.',
  },
  {
    q: 'Language not changing',
    a: "If the language isn't switching, try refreshing the page after selecting your language. Make sure your browser is not blocking cookies or local storage.",
  },
];

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div style={{
      background:   '#ffffff',
      borderRadius: 14,
      border:       '1.5px solid rgba(200,195,225,0.4)',
      overflow:     'hidden',
      boxShadow:    '0 2px 12px rgba(100,80,180,0.05)',
    }}>
      <button
        onClick={onToggle}
        style={{
          width:          '100%',
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          padding:        '18px 24px',
          background:     'none',
          border:         'none',
          cursor:         'pointer',
          textAlign:      'left',
          gap:            16,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 500, color: colors.dark, lineHeight: 1.4 }}>
          {question}
        </span>
        <span style={{
          flexShrink:     0,
          width:          22,
          height:         22,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          borderRadius:   '50%',
          border:         `1.5px solid ${isOpen ? '#e0e0e8' : '#c0bcd4'}`,
          color:          isOpen ? '#666' : '#888',
          fontSize:       16,
          lineHeight:     1,
          transition:     'all 0.2s',
        }}>
          {isOpen ? '×' : '+'}
        </span>
      </button>
      {isOpen && (
        <div style={{ padding: '0 24px 18px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: 14, color: colors.muted, lineHeight: 1.7, marginTop: 14 }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function HelpSupport() {
  const [openFaq,     setOpenFaq]     = useState(0);
  const [openTrouble, setOpenTrouble] = useState(0);

  const toggleFaq     = (i) => setOpenFaq(openFaq === i ? null : i);
  const toggleTrouble = (i) => setOpenTrouble(openTrouble === i ? null : i);

  return (
    <div style={{ minHeight: '100vh', background: gradients.hero, display: 'flex', flexDirection: 'column', fontFamily: '"Outfit", sans-serif' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '52px 40px 64px' }}>

        {/* ── Header ─────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: colors.dark, marginBottom: 12, letterSpacing: '-0.02em' }}>
            Help &amp; Support
          </h1>
          <p style={{ fontSize: 15, color: colors.muted }}>
            Find quick answers or talk to us if you need help
          </p>
        </div>

        {/* ── Contact card ────────────────────────── */}
        <div style={{
          background:   '#ffffff',
          borderRadius: 20,
          border:       '1.5px solid rgba(200,195,225,0.4)',
          boxShadow:    '0 2px 12px rgba(100,80,180,0.05)',
          display:      'grid',
          gridTemplateColumns: '300px 1fr',
          overflow:     'hidden',
          marginBottom: 28,
        }}>
          {/* Left — purple panel */}
          <div style={{
            background:    `linear-gradient(160deg, ${colors.purpleDeep} 0%, ${colors.purpleMid} 60%, ${colors.purpleGlow} 100%)`,
            padding:       '44px 36px',
            display:       'flex',
            flexDirection: 'column',
            justifyContent:'center',
            gap:           16,
          }}>
            <div style={{
              width:          48,
              height:         48,
              background:     'rgba(255,255,255,0.15)',
              borderRadius:   14,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              marginBottom:   8,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.41 2 2 0 0 1 3.62 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.62 16.91z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3 }}>
              Contact Details
            </h3>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.7 }}>
              Reach out through any of these channels and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Right — contact rows */}
          <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {[
              {
                icon: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={colors.purple} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
                label: 'Email',
                value: 'info@nexpreneuai.co.uk',
              },
              {
                icon: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={colors.purple} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.41 2 2 0 0 1 3.62 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.62 16.91z"/>
                  </svg>
                ),
                label: 'Phone',
                value: '+44 7448 781708',
              },
              {
                icon: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={colors.purple} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                ),
                label: 'LinkedIn',
                value: 'linkedin.com/company/nexpreneuai',
              },
              {
                icon: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={colors.purple} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: 'Registered Office',
                value: 'Worcester, United Kingdom',
              },
              {
                icon: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={colors.purple} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                ),
                label: 'Company',
                value: 'NexpreneurAI Ltd — Reg. No. 17256706',
              },
            ].map(({ icon, label, value }, i, arr) => (
              <div key={label} style={{
                display:      'flex',
                alignItems:   'center',
                gap:          16,
                padding:      '14px 0',
                borderBottom: i < arr.length - 1 ? '1px solid rgba(200,195,225,0.4)' : 'none',
              }}>
                <div style={{
                  width:          36,
                  height:         36,
                  background:     'rgba(124,92,204,0.07)',
                  borderRadius:   10,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</p>
                  <p style={{ fontSize: 14, color: colors.dark, margin: 0 }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Common Questions ─────────────────────── */}
        <div style={{
          background:   '#ffffff',
          borderRadius: 16,
          padding:      '32px 32px',
          border:       '1.5px solid rgba(200,195,225,0.4)',
          boxShadow:    '0 2px 12px rgba(100,80,180,0.05)',
          marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.dark, marginBottom: 24, letterSpacing: '-0.01em' }}>
            Common Questions About Getting Started
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {COMMON_FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                question={item.q}
                answer={item.a}
                isOpen={openFaq === i}
                onToggle={() => toggleFaq(i)}
              />
            ))}
          </div>
        </div>

        {/* ── Having Trouble? ──────────────────────── */}
        <div style={{
          background:   '#ffffff',
          borderRadius: 16,
          padding:      '32px 32px',
          border:       '1.5px solid rgba(200,195,225,0.4)',
          boxShadow:    '0 2px 12px rgba(100,80,180,0.05)',
          marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.dark, marginBottom: 24, letterSpacing: '-0.01em' }}>
            Having Trouble?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {TROUBLE_FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                question={item.q}
                answer={item.a}
                isOpen={openTrouble === i}
                onToggle={() => toggleTrouble(i)}
              />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.purple} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span style={{ fontSize: 13.5, color: colors.purple }}>
              This platform supports multiple languages to help you learn and sell comfortably.
            </span>
          </div>
        </div>

        {/* ── Still need help? ─────────────────────── */}
        <div style={{
          background:   '#ffffff',
          borderRadius: 16,
          padding:      '48px 32px',
          border:       '1.5px solid rgba(200,195,225,0.4)',
          boxShadow:    '0 2px 12px rgba(100,80,180,0.05)',
          textAlign:    'center',
        }}>
          <h3 style={{ fontSize: 24, fontWeight: 600, color: colors.dark, marginBottom: 10, letterSpacing: '-0.01em' }}>
            Still need help?
          </h3>
          <p style={{ fontSize: 15, color: colors.muted, marginBottom: 28 }}>
            We're here to support you at every step of your journey.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <button
              style={{
                padding:      '11px 28px',
                background:   colors.authBtn,
                color:        '#fff',
                border:       'none',
                borderRadius: 99,
                fontSize:     14,
                fontWeight:   600,
                cursor:       'pointer',
                transition:   'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#3d3870'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = colors.authBtn; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Contact Us
            </button>
            <button
              style={{
                padding:      '11px 28px',
                background:   '#fff',
                color:        colors.dark,
                border:       '1.5px solid #d1d5db',
                borderRadius: 99,
                fontSize:     14,
                fontWeight:   500,
                cursor:       'pointer',
                transition:   'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.purple; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Chat Support
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
