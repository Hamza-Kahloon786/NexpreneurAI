import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar  from '@/components/Navbar/Navbar';
import { LANGUAGES } from '@/constants/languages';
import { gradients, colors } from '@/constants/colors';

/* ── Flag image ─────────────────────────────────── */
function FlagImg({ code, name }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      alt={`${name} flag`}
      width={28}
      height={20}
      style={{
        objectFit:    'cover',
        borderRadius: 4,
        border:       '0.5px solid rgba(0,0,0,0.1)',
        display:      'block',
        flexShrink:   0,
      }}
    />
  );
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function LanguageSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('en');

  return (
    <div style={{ minHeight: '100vh', background: gradients.hero, display: 'flex', flexDirection: 'column' }}>

      <Navbar />

      {/* ── Content ─────────────────────────────── */}
      <div style={{
        flex:           1,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '60px 32px',
      }}>
        <h1
          className="anim-fade-in-down"
          style={{
            fontSize:      38,
            fontWeight:    700,
            color:         colors.dark,
            textAlign:     'center',
            marginBottom:  52,
            letterSpacing: '-0.02em',
          }}
        >
          Choose Your Preferred Language
        </h1>

        {/* Row 1 — 6 languages */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
          {LANGUAGES.slice(0, 6).map((lang, i) => (
            <button
              key={lang.code}
              className={`lang-btn anim-fade-in-up delay-${['100','150','200','250','300','350'][i]}${selected === lang.code ? ' selected' : ''}`}
              onClick={() => setSelected(lang.code)}
            >
              <FlagImg code={lang.flagCode} name={lang.name} />
              {lang.name}
            </button>
          ))}
        </div>

        {/* Row 2 — 4 languages */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 52 }}>
          {LANGUAGES.slice(6).map((lang, i) => (
            <button
              key={lang.code}
              className={`lang-btn anim-fade-in-up delay-${['400','500','400','500'][i]}${selected === lang.code ? ' selected' : ''}`}
              onClick={() => setSelected(lang.code)}
            >
              <FlagImg code={lang.flagCode} name={lang.name} />
              {lang.name}
            </button>
          ))}
        </div>

        {/* Continue button */}
        <button
          className="anim-fade-in-up delay-500"
          onClick={() => navigate('/home')}
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          10,
            background:   colors.authBtn,
            color:        '#fff',
            border:       'none',
            borderRadius: 99,
            padding:      '13px 38px',
            fontSize:     15,
            fontWeight:   600,
            cursor:       'pointer',
            transition:   'all 0.2s',
            boxShadow:    '0 4px 16px rgba(45,42,78,0.22)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#3d3870';
            e.currentTarget.style.transform  = 'translateY(-2px)';
            e.currentTarget.style.boxShadow  = '0 8px 24px rgba(45,42,78,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = colors.authBtn;
            e.currentTarget.style.transform  = 'translateY(0)';
            e.currentTarget.style.boxShadow  = '0 4px 16px rgba(45,42,78,0.22)';
          }}
        >
          Continue <ArrowIcon />
        </button>
      </div>

      {/* ── Footer ──────────────────────────────── */}
      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid rgba(200,195,225,0.3)' }}>
        <p style={{ fontSize: 10.5, letterSpacing: '0.13em', color: '#aaa', textTransform: 'uppercase' }}>
          © 2026 NexpreneurAI. All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
