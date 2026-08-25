import { useNavigate, useLocation } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Footer          from '@/components/Footer/Footer';
import { colors }      from '@/constants/colors';

const SYMBOLS = { GBP:'£', USD:'$', EUR:'€', PKR:'₨', INR:'₹', AED:'د.إ', SAR:'﷼', CAD:'C$', AUD:'A$', BDT:'৳' };

/* ── Demand factor colour ───────────────────────────── */
function demandColor(factor) {
  const f = (factor || '').toLowerCase();
  if (f === 'high')    return '#16a34a';
  if (f === 'low')     return '#dc2626';
  return '#16a34a'; // neutral → green (matches Figma)
}

/* ── Small dashed-border stat box ──────────────────── */
function CalcBox({ label, value, valueColor }) {
  return (
    <div style={{
      flex: 1, minWidth: 140,
      border: '1.5px dashed #c4bfdc',
      borderRadius: 12,
      padding: '18px 14px',
      textAlign: 'center',
      background: 'rgba(255,255,255,0.5)',
    }}>
      <p style={{ fontSize: 12.5, color: '#6b7280', marginBottom: 10, lineHeight: 1.4 }}>{label}</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: valueColor || colors.dark }}>{value}</p>
    </div>
  );
}

/* ── Rounded white card box ─────────────────────────── */
function CompBox({ label, value, sym }) {
  return (
    <div style={{
      flex: 1, minWidth: 160,
      background: '#fff',
      border: '1.5px solid #e5e1f0',
      borderRadius: 14,
      padding: '20px 16px',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: 12.5, color: '#6b7280', marginBottom: 10, lineHeight: 1.4 }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 700, color: colors.dark }}>{sym}{value}</p>
    </div>
  );
}

export default function PriceSuggestionResult() {
  const navigate  = useNavigate();
  const { state } = useLocation();

  if (!state?.suggestions) {
    navigate('/price-suggestions');
    return null;
  }

  const { product, condition, currency, suggestions } = state;
  const sym   = suggestions.currency_symbol || SYMBOLS[currency] || currency;
  const rec   = suggestions.recommended   || {};
  const calc  = suggestions.calculation   || {};
  const comp  = suggestions.market_comparison || {};

  /* format condition_adjustment with sign */
  const fmtAdj = (n) => {
    if (n == null) return '—';
    return n >= 0 ? `+${sym}${n}` : `-${sym}${Math.abs(n)}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0eef8', display: 'flex', flexDirection: 'column' }}>
      <DashboardNavbar />

      <main style={{ flex: 1, maxWidth: 960, margin: '0 auto', width: '100%', padding: '52px 28px 80px' }}>

        {/* ── Outer card ───────────────────────────────── */}
        <div style={{
          background: '#f7f6fc',
          border: '1.5px solid #e3dff0',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 2px 20px rgba(100,80,180,0.07)',
        }}>

          {/* Card header row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '28px 32px 24px',
            borderBottom: '1px solid #e3dff0',
            flexWrap: 'wrap', gap: 12,
          }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: colors.dark, margin: 0 }}>
              Your Recommended Price Range
            </h1>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => navigate('/price-suggestions')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'transparent', border: '1.5px solid #d1d5db',
                  borderRadius: 99, padding: '8px 18px', fontSize: 13.5, fontWeight: 500,
                  color: colors.dark, cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.purple}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit input
              </button>
              <button onClick={() => navigate('/price-suggestions')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: colors.authBtn, border: 'none',
                  borderRadius: 99, padding: '8px 20px', fontSize: 13.5, fontWeight: 600,
                  color: '#fff', cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#3d3870'}
                onMouseLeave={(e) => e.currentTarget.style.background = colors.authBtn}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
                Regenerate
              </button>
            </div>
          </div>

          <div style={{ padding: '32px' }}>

            {/* ── Recommended Price ─────────────────────── */}
            <p style={{ fontSize: 14, fontWeight: 600, color: colors.dark, marginBottom: 16 }}>Recommended Price</p>
            <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
              {/* Price range box */}
              <div style={{
                flex: 1, minWidth: 220,
                background: '#fff',
                border: '1.5px solid #e3dff0',
                borderRadius: 16,
                padding: '28px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 1px 6px rgba(100,80,180,0.06)',
              }}>
                <p style={{ fontSize: 26, fontWeight: 700, color: colors.dark, textAlign: 'center', lineHeight: 1.3 }}>
                  {sym}{rec.min} – {sym}{rec.max} per {product?.toLowerCase().split(' ')[0] || 'item'}
                </p>
              </div>

              {/* Tagline box (purple gradient) */}
              <div style={{
                flex: 1, minWidth: 220,
                background: 'linear-gradient(135deg, #5b3fa6 0%, #7c5cc4 60%, #9b7fe0 100%)',
                borderRadius: 16,
                padding: '28px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(91,63,166,0.25)',
              }}>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.4 }}>
                  {rec.tagline || 'Best balance of profit & competitiveness'}
                </p>
              </div>
            </div>

            {/* ── How we calculated this ───────────────── */}
            <p style={{ fontSize: 14, fontWeight: 600, color: colors.dark, marginBottom: 16 }}>How we calculated this</p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
              <CalcBox label="Market average"      value={`${sym}${calc.market_average ?? '—'}`} />
              <CalcBox label="Condition adjustment" value={fmtAdj(calc.condition_adjustment)} />
              <CalcBox label="Handmade value"      value={calc.handmade_value ? `+${sym}${calc.handmade_value}` : `${sym}0`} />
              <CalcBox label="Demand factor"       value={calc.demand_factor || 'Neutral'} valueColor={demandColor(calc.demand_factor)} />
            </div>

            {/* ── Market comparison ────────────────────── */}
            <p style={{ fontSize: 14, fontWeight: 600, color: colors.dark, marginBottom: 16 }}>Market comparison</p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
              <CompBox label="Average similar price"   value={comp.average  ?? '—'} sym={sym} />
              <CompBox label="Lowest competitor price" value={comp.lowest   ?? '—'} sym={sym} />
              <CompBox label="Highest competitor price" value={comp.highest ?? '—'} sym={sym} />
            </div>

            {/* ── Tips ─────────────────────────────────── */}
            {suggestions.tips?.length > 0 && (
              <>
                <p style={{ fontSize: 14, fontWeight: 600, color: colors.dark, marginBottom: 14 }}>Pricing Tips</p>
                <div style={{
                  background: '#fff', border: '1.5px solid #e3dff0', borderRadius: 14,
                  padding: '20px 24px', marginBottom: 28,
                }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {suggestions.tips.map((tip, i) => (
                      <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#374151', lineHeight: 1.65 }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: colors.purple, flexShrink: 0, marginTop: 7 }} />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* ── Market insight ───────────────────────── */}
            {suggestions.market_insight && (
              <>
                <p style={{ fontSize: 14, fontWeight: 600, color: colors.dark, marginBottom: 14 }}>Market Insight</p>
                <div style={{
                  background: '#fff', border: '1.5px solid #e3dff0', borderRadius: 14,
                  padding: '20px 24px',
                }}>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.75, margin: 0 }}>
                    {suggestions.market_insight}
                  </p>
                </div>
              </>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
