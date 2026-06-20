import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Footer          from '@/components/Footer/Footer';
import { gradients, colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

/* ── Icons ─────────────────────────────────────── */
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const RegenerateIcon = ({ spinning }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
    style={{ animation: spinning ? 'spin 0.8s linear infinite' : 'none' }}>
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const PhotoIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const PriceIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const MarketingIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

/* ── Copy button (inline text style) ───────────── */
function CopyBtn({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={handle}
      style={{
        display:     'inline-flex',
        alignItems:  'center',
        gap:         5,
        background:  'none',
        border:      'none',
        cursor:      'pointer',
        color:       copied ? '#22c55e' : '#9ca3af',
        fontSize:    13,
        fontWeight:  500,
        padding:     0,
        transition:  'color 0.18s',
      }}
      onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = colors.purple; }}
      onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = '#9ca3af'; }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

/* ── Main Page ──────────────────────────────────── */
export default function ProductDescriptionResult() {
  const navigate  = useNavigate();
  const { state } = useLocation();
  const { token } = useAuth();

  const [product,     setProduct]     = useState(state?.product || '');
  const [description, setDescription] = useState(state?.description || null);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState('');

  if (!description) {
    navigate('/product-description');
    return null;
  }

  const titles   = description.title_suggestions || [];
  const desc     = description.description || '';

  const handleRegenerate = async () => {
    if (!product.trim() || regenerating) return;
    setRegenerating(true);
    setError('');
    try {
      const res  = await fetch('/api/product-description/generate', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ product: product.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Something went wrong.'); return; }
      setDescription(data.description);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setRegenerating(false);
    }
  };

  const divider = <div style={{ borderBottom: '1px solid rgba(200,195,225,0.4)' }} />;

  return (
    <div style={{ minHeight: '100vh', background: gradients.hero, display: 'flex', flexDirection: 'column' }}>
      <DashboardNavbar />

      <main style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '44px 40px 64px' }}>

        {/* ── Header ───────────────────────────── */}
        <div style={{
          display:        'flex',
          alignItems:     'flex-start',
          justifyContent: 'space-between',
          gap:            24,
          marginBottom:   36,
          paddingBottom:  28,
          borderBottom:   '1px solid rgba(200,195,225,0.4)',
        }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.dark, marginBottom: 8, letterSpacing: '-0.015em' }}>
              Your Product Description Is Ready
            </h1>
            <p style={{ fontSize: 14, color: colors.muted, lineHeight: 1.6 }}>
              SEO-ready descriptions designed to attract customers and improve visibility.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, marginTop: 4 }}>
            <button onClick={() => navigate('/product-description')}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: 'none', border: '1.5px solid #d1d5db',
                borderRadius: 99, padding: '9px 18px',
                fontSize: 13.5, fontWeight: 500, color: '#374151',
                cursor: 'pointer', transition: 'all 0.18s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.purple; e.currentTarget.style.color = colors.purple; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#374151'; }}>
              <EditIcon /> Edit input
            </button>

            <button onClick={handleRegenerate} disabled={regenerating}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: colors.authBtn, border: 'none',
                borderRadius: 99, padding: '9px 20px',
                fontSize: 13.5, fontWeight: 600, color: '#fff',
                cursor: regenerating ? 'not-allowed' : 'pointer',
                opacity: regenerating ? 0.75 : 1, transition: 'all 0.18s',
              }}
              onMouseEnter={(e) => { if (!regenerating) e.currentTarget.style.background = '#3d3870'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = colors.authBtn; }}>
              <RegenerateIcon spinning={regenerating} />
              {regenerating ? 'Regenerating…' : 'Regenerate'}
            </button>
          </div>
        </div>

        {error && (
          <p style={{ marginBottom: 16, fontSize: 13, color: '#ef4444', textAlign: 'center' }}>{error}</p>
        )}

        {/* ── Product Title Suggestions ─────────── */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.dark, marginBottom: 6 }}>
            Product Title Suggestions
          </h2>
          <p style={{ fontSize: 13, color: colors.purple, marginBottom: 20 }}>
            Optimized titles based on your product and description
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {titles.map((title, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
                background: '#ffffff', borderRadius: 16, padding: '18px 24px',
                border: '1px solid rgba(200,195,225,0.35)', boxShadow: '0 2px 12px rgba(100,80,180,0.05)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(100,80,180,0.10)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(100,80,180,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span style={{ fontSize: 15, color: colors.dark, fontWeight: 500, lineHeight: 1.5 }}>{title}</span>
                <CopyBtn text={title} label="Copy title" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Description ──────────────────────── */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.dark, marginBottom: 20 }}>
            Description
          </h2>
          <div style={{
            background: '#ffffff', borderRadius: 16, padding: '24px 26px 20px',
            border: '1px solid rgba(200,195,225,0.35)', boxShadow: '0 2px 12px rgba(100,80,180,0.05)',
          }}>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.75, marginBottom: 16 }}>{desc}</p>
            <CopyBtn text={desc} label="Copy description" />
          </div>
        </div>

        {/* ── What next ────────────────────────── */}
        <div style={{
          background: '#ffffff', borderRadius: 16, padding: '48px 32px',
          border: '1px solid rgba(200,195,225,0.35)', boxShadow: '0 2px 12px rgba(100,80,180,0.05)',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: colors.dark, marginBottom: 28, letterSpacing: '-0.015em' }}>
            What would you like to do next?
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            {[
              { label: 'Generate product photos', Icon: PhotoIcon,      route: '/dashboard' },
              { label: 'Set pricing with AI',      Icon: PriceIcon,     route: '/dashboard' },
              { label: 'Create marketing posts',   Icon: MarketingIcon, route: '/dashboard' },
            ].map(({ label, Icon, route }) => (
              <button key={label} onClick={() => navigate(route)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  background: colors.authBtn, color: '#fff',
                  border: 'none', borderRadius: 99, padding: '13px 24px',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.18s', boxShadow: '0 4px 14px rgba(45,42,78,0.18)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#3d3870'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = colors.authBtn; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Icon /> {label}
              </button>
            ))}
          </div>
        </div>

      </main>

      <Footer />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
