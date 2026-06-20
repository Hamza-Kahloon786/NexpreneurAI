import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import { gradients, colors } from '@/constants/colors';

const PURPLE = colors.purple;       // #7c5ccc
const DARK   = colors.dark;         // #1c1a2e
const MUTED  = colors.muted;        // #6b7280
const BORDER = 'rgba(200,195,225,0.4)';
const CARD   = '#ffffff';
const CARD2  = '#f8f7ff';

/* ── Icons ─────────────────────────────────── */
const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const EmailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const GlobeIcon2 = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const SparkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={PURPLE} stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
  </svg>
);
const TargetIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CREDENTIALS = [
  'Business Administration & Entrepreneurship',
  'AI & Technology Research',
  'Digital Marketing & E-Commerce',
  'Multilingual Business Development',
];

const COMPANY_INFO = [
  { label: 'Company Name',    value: 'NexpreneurAI' },
  { label: 'Founded',         value: '2026' },
  { label: 'Platform Type',   value: 'AI-Powered SaaS' },
  { label: 'Target Audience', value: 'Beginner Entrepreneurs' },
  { label: 'Languages',       value: '10+ Supported' },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ background: gradients.hero, minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────── */}
      <section style={{ padding: '80px 40px 72px', textAlign: 'center', borderBottom: `1px solid ${BORDER}` }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(124,92,204,0.08)', border: `1px solid rgba(124,92,204,0.25)`,
          borderRadius: 99, padding: '6px 18px', marginBottom: 36 }}>
          <SparkIcon />
          <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.18em', color: PURPLE, textTransform: 'uppercase' }}>
            About NexpreneurAI
          </span>
        </div>

        <h1 style={{
          fontSize:      46,
          fontWeight:    700,
          color:         DARK,
          lineHeight:    1.2,
          letterSpacing: '-0.02em',
          maxWidth:      1060,
          margin:        '0 auto',
        }}>
          Built by someone who believed everyone deserves<br />a chance to build something real
        </h1>
      </section>

      {/* ── FOUNDER ──────────────────────────────── */}
      <section style={{ padding: '72px 40px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 64, alignItems: 'flex-start' }}>

          {/* Left — profile card */}
          <div style={{ flexShrink: 0, width: 300 }}>
            {/* Circular photo */}
            <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto 28px' }}>
              <div style={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden',
                border: `3px solid rgba(124,92,204,0.35)`, boxShadow: '0 8px 32px rgba(124,92,204,0.15)' }}>
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80"
                  alt="Areej"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ position: 'absolute', bottom: 10, right: 10, width: 36, height: 36,
                borderRadius: '50%', background: PURPLE, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '3px solid #fff', boxShadow: '0 2px 8px rgba(124,92,204,0.3)' }}>
                <SparkIcon />
              </div>
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 4, textAlign: 'center' }}>Areej</h2>
            <p style={{ fontSize: 13.5, color: PURPLE, fontWeight: 600, textAlign: 'center', marginBottom: 20 }}>
              Founder &amp; CEO, NexpreneurAI
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
              {[
                { Icon: LinkedInIcon, label: 'LinkedIn' },
                { Icon: EmailIcon,    label: 'Email'    },
                { Icon: GlobeIcon2,   label: 'Website'  },
              ].map(({ Icon, label }) => (
                <button key={label} title={label}
                  style={{ width: 38, height: 38, borderRadius: 10, background: CARD,
                    border: `1.5px solid ${BORDER}`, color: MUTED, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.18s',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = PURPLE; e.currentTarget.style.color = PURPLE; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MUTED; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <Icon />
                </button>
              ))}
            </div>

            {/* Credentials */}
            <div style={{ background: CARD, borderRadius: 16, padding: '20px', border: `1.5px solid ${BORDER}`, boxShadow: '0 2px 12px rgba(100,80,180,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <SparkIcon />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: PURPLE, textTransform: 'uppercase' }}>
                  Background
                </span>
              </div>
              {CREDENTIALS.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: i < CREDENTIALS.length - 1 ? 10 : 0 }}>
                  <span style={{ color: PURPLE, marginTop: 1, flexShrink: 0, fontWeight: 700 }}>›</span>
                  <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.55 }}>{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — story */}
          <div style={{ flex: 1, paddingTop: 8 }}>
            <p style={{ fontSize: 16.5, color: DARK, lineHeight: 1.8, marginBottom: 24, fontWeight: 500 }}>
              NexpreneurAI was founded by Areej with a clear conviction: starting a business should not require technical knowledge,
              fluency in English, or access to expensive consultants. Every person — regardless of background — deserves
              the tools to turn their idea into a real, profitable business.
            </p>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.85, marginBottom: 24 }}>
              After researching the barriers that stop beginners from launching businesses — language gaps,
              overwhelming complexity, and lack of personalised guidance — Areej saw a critical opportunity:
              AI could remove every one of those barriers. That insight became the foundation for NexpreneurAI.
            </p>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.85, marginBottom: 24 }}>
              NexpreneurAI is developing AI-powered business guidance tools that help anyone — women entrepreneurs,
              young people, and underserved communities — create business plans, generate product descriptions,
              manage pricing, and build a brand presence across social media platforms, all in their own language.
            </p>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.85, marginBottom: 24 }}>
              The platform is built around simplicity. Whether you speak English, Urdu, Arabic, Hindi, or any
              of 10 supported languages, NexpreneurAI guides you step by step — from your very first idea all
              the way to launching, pricing, and marketing your product with confidence.
            </p>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.85, marginBottom: 24 }}>
              Through AI-powered tools like business plan generation, product description writing, and social
              media content creation, we remove the technical and financial barriers that have historically
              prevented talented people from becoming successful entrepreneurs.
            </p>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.85 }}>
              Our long-term vision is to make AI-powered entrepreneurship accessible to every person on earth —
              empowering individuals to build real businesses with confidence, clarity, and purpose.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPANY INFO + MISSION ───────────────── */}
      <section style={{ padding: '72px 40px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>

          {/* Company Information */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <BuildingIcon />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: PURPLE, textTransform: 'uppercase' }}>
                Company Information
              </span>
            </div>
            <div style={{ background: CARD, borderRadius: 16, border: `1.5px solid ${BORDER}`, overflow: 'hidden', boxShadow: '0 2px 12px rgba(100,80,180,0.06)' }}>
              {COMPANY_INFO.map(({ label, value }, i) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '15px 22px',
                  borderBottom: i < COMPANY_INFO.length - 1 ? `1px solid ${BORDER}` : 'none',
                }}>
                  <span style={{ fontSize: 13.5, color: MUTED }}>{label}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: DARK }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Our Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <TargetIcon />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: PURPLE, textTransform: 'uppercase' }}>
                Our Mission
              </span>
            </div>
            <div style={{ background: CARD, borderRadius: 16, border: `1.5px solid ${BORDER}`,
              padding: '28px 26px', boxShadow: '0 2px 12px rgba(100,80,180,0.06)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: 260 }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: DARK, lineHeight: 1.45, marginBottom: 28 }}>
                Making AI-powered entrepreneurship accessible to every person — because great businesses
                can come from anyone, anywhere.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/sign-up')}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: colors.authBtn, color: '#fff',
                    border: 'none', borderRadius: 99, padding: '11px 22px', fontSize: 14, fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#3d3870'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = colors.authBtn; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  Get Started <ArrowIcon />
                </button>
                <button
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', color: DARK,
                    border: `1.5px solid ${BORDER}`, borderRadius: 99, padding: '11px 22px', fontSize: 14,
                    fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = PURPLE; e.currentTarget.style.color = PURPLE; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = DARK; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OWN FOOTER ───────────────────────────── */}
      <footer style={{ padding: '28px 40px', borderTop: `1px solid ${BORDER}`, background: 'rgba(255,255,255,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: colors.authBtn,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
                <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: DARK, marginBottom: 1 }}>NexpreneurAI</p>
              <p style={{ fontSize: 11.5, color: MUTED }}>AI-Powered Business Guidance &nbsp;|&nbsp; info@nexpreneurai.com</p>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {[
              { Icon: LinkedInIcon, label: 'LinkedIn' },
              { Icon: EmailIcon,    label: 'Email'    },
              { Icon: GlobeIcon2,   label: 'Website'  },
            ].map(({ Icon, label }) => (
              <button key={label} title={label}
                style={{ width: 34, height: 34, borderRadius: 8, background: CARD,
                  border: `1.5px solid ${BORDER}`, color: MUTED, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.18s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = PURPLE; e.currentTarget.style.color = PURPLE; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MUTED; }}>
                <Icon />
              </button>
            ))}
            <span style={{ fontSize: 11, color: MUTED, letterSpacing: '0.08em', marginLeft: 6 }}>
              © 2026 NexpreneurAI
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}
