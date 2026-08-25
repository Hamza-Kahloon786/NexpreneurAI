import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Footer          from '@/components/Footer/Footer';
import { gradients, colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

/* ── Product catalogue ──────────────────────────── */
const PRODUCT_TYPES = [
  { value: 'handmade-candle',    label: 'Handmade scented candle',      category: 'Home décor'         },
  { value: 'handmade-jewelry',   label: 'Handmade jewelry & accessories', category: 'Fashion & Beauty'  },
  { value: 'handmade-soap',      label: 'Handmade soap & bath products', category: 'Health & Beauty'    },
  { value: 'handmade-clothing',  label: 'Handmade clothing & fashion',   category: 'Fashion'            },
  { value: 'handmade-food',      label: 'Handmade food & baked goods',   category: 'Food & Beverage'    },
  { value: 'handmade-art',       label: 'Handmade art & prints',         category: 'Art & Collectibles' },
  { value: 'handmade-decor',     label: 'Handmade home décor',           category: 'Home décor'         },
  { value: 'handmade-stationery',label: 'Handmade stationery & gifts',   category: 'Gifts & Stationery' },
  { value: 'digital-product',    label: 'Digital product / download',    category: 'Digital Goods'      },
  { value: 'service',            label: 'Service / consulting',          category: 'Services'           },
  { value: 'clothing-retail',    label: 'Clothing & fashion (retail)',    category: 'Fashion'            },
  { value: 'electronics',        label: 'Electronics & gadgets',         category: 'Electronics'        },
  { value: 'beauty-product',     label: 'Beauty & skincare product',     category: 'Health & Beauty'    },
  { value: 'food-beverage',      label: 'Food & beverage (retail)',      category: 'Food & Beverage'    },
  { value: 'custom',             label: 'Other / custom product',        category: 'General'            },
];

/* ── Currencies ─────────────────────────────────── */
const CURRENCIES = [
  { code: 'GBP', label: 'Great British Pound (GBP)' },
  { code: 'USD', label: 'US Dollar (USD)'            },
  { code: 'EUR', label: 'Euro (EUR)'                 },
  { code: 'PKR', label: 'Pakistani Rupee (PKR)'      },
  { code: 'INR', label: 'Indian Rupee (INR)'         },
  { code: 'AED', label: 'UAE Dirham (AED)'           },
  { code: 'SAR', label: 'Saudi Riyal (SAR)'          },
  { code: 'CAD', label: 'Canadian Dollar (CAD)'      },
  { code: 'AUD', label: 'Australian Dollar (AUD)'    },
  { code: 'BDT', label: 'Bangladeshi Taka (BDT)'     },
];

function detectCurrency() {
  const lang = (navigator.language || 'en-US').toLowerCase();
  if (lang.includes('en-gb')) return 'GBP';
  if (lang.includes('pk') || lang.startsWith('ur')) return 'PKR';
  if (lang.includes('in') || lang.startsWith('hi')) return 'INR';
  if (lang.includes('ae') || lang.startsWith('ar-ae')) return 'AED';
  if (lang.includes('sa')) return 'SAR';
  if (lang.includes('bd')) return 'BDT';
  if (lang.includes('en-ca')) return 'CAD';
  if (lang.includes('en-au')) return 'AUD';
  if (lang.startsWith('de') || lang.startsWith('fr') || lang.startsWith('it') || lang.startsWith('nl')) return 'EUR';
  return 'USD';
}

/* ── Chip card ──────────────────────────────────── */
function InfoChip({ topLabel, value }) {
  return (
    <div style={{
      flex:         1,
      minWidth:     160,
      background:   'rgba(255,255,255,0.72)',
      backdropFilter: 'blur(12px)',
      border:       '1px solid rgba(200,195,225,0.5)',
      borderRadius: 16,
      padding:      '18px 22px',
      boxShadow:    '0 2px 12px rgba(100,80,180,0.06)',
    }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, textTransform: 'capitalize', marginBottom: 8, letterSpacing: '0.04em' }}>
        {topLabel}
      </p>
      <p style={{ fontSize: 15, fontWeight: 600, color: colors.dark, lineHeight: 1.4 }}>{value}</p>
    </div>
  );
}

/* ── Main ───────────────────────────────────────── */
export default function PriceSuggestionInput() {
  const navigate    = useNavigate();
  const { token }   = useAuth();

  const [productKey,  setProductKey]  = useState('handmade-candle');
  const [customLabel, setCustomLabel] = useState('');
  const [condition,   setCondition]   = useState('New (handmade)');
  const [currency,    setCurrency]    = useState(detectCurrency);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');

  const selectedProduct = PRODUCT_TYPES.find((p) => p.value === productKey) || PRODUCT_TYPES[0];
  const productLabel    = productKey === 'custom' ? (customLabel || 'Custom product') : selectedProduct.label;
  const category        = selectedProduct.category;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const finalProduct = productKey === 'custom' ? customLabel.trim() : selectedProduct.label;
    if (!finalProduct) { setError('Please describe your product.'); return; }

    setError('');
    setLoading(true);
    try {
      const res  = await fetch('/api/price-suggestions/generate', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ product: finalProduct, condition, currency }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Something went wrong.'); return; }
      navigate('/price-suggestions/result', { state: { product: finalProduct, condition, currency, suggestions: data.suggestions } });
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    fontSize: 14, color: colors.dark,
    background: '#fff', border: '1.5px solid #e5e7eb',
    borderRadius: 10, outline: 'none',
    appearance: 'none', WebkitAppearance: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.18s',
    cursor: 'pointer',
  };

  return (
    <div style={{ minHeight: '100vh', background: gradients.hero, display: 'flex', flexDirection: 'column' }}>
      <DashboardNavbar />

      <main style={{ flex: 1, maxWidth: 860, margin: '0 auto', width: '100%', padding: '56px 32px 72px' }}>

        {/* ── Header ─────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: colors.purple,
            textTransform: 'uppercase', marginBottom: 14 }}>
            DO YOUR TASKS WITH AI
          </p>
          <h1 style={{ fontSize: 38, fontWeight: 700, color: colors.dark, marginBottom: 16, letterSpacing: '-0.02em' }}>
            AI Price Suggestions
          </h1>
          <p style={{ fontSize: 15, color: colors.muted, lineHeight: 1.75, maxWidth: 540, margin: '0 auto' }}>
            Get intelligent price recommendations based on your product type, market trends, and
            competitive benchmarks. Our AI helps you strike the right balance between
            profitability and market demand.
          </p>
        </div>

        {/* ── Info chips ─────────────────────────── */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 44, flexWrap: 'wrap' }}>
          <InfoChip topLabel="Product"  value={productLabel} />
          <InfoChip topLabel="Category" value={category} />
          <InfoChip topLabel="Status"   value="From your business plan" />
        </div>

        {/* ── Form card ──────────────────────────── */}
        <form onSubmit={handleSubmit}>
          <div style={{
            background:   'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(16px)',
            border:       '1px solid rgba(200,195,225,0.45)',
            borderRadius: 20,
            padding:      '40px 36px 36px',
            boxShadow:    '0 4px 24px rgba(100,80,180,0.07)',
            marginBottom: 28,
          }}>

            {/* Row 1: Product Type + Condition */}
            <div style={{ display: 'flex', gap: 32, marginBottom: 28, flexWrap: 'wrap' }}>

              {/* Product Type */}
              <div style={{ flex: 1, minWidth: 220 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: colors.dark, marginBottom: 10 }}>
                  Product Type
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={productKey}
                    onChange={(e) => setProductKey(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = colors.purple)}
                    onBlur={(e)  => (e.target.style.borderColor = '#e5e7eb')}
                  >
                    {PRODUCT_TYPES.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                  <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>

                {/* Custom product text field */}
                {productKey === 'custom' && (
                  <input
                    type="text"
                    placeholder="Describe your product…"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    style={{ ...inputStyle, marginTop: 10, cursor: 'text' }}
                    onFocus={(e) => (e.target.style.borderColor = colors.purple)}
                    onBlur={(e)  => (e.target.style.borderColor = '#e5e7eb')}
                  />
                )}
              </div>

              {/* Condition */}
              <div style={{ minWidth: 160, paddingTop: 2 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: colors.dark, marginBottom: 14 }}>
                  Condition
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['New (handmade)', 'Used'].map((opt) => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={condition === opt}
                        onChange={() => setCondition(opt)}
                        style={{ width: 16, height: 16, accentColor: colors.purple, cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: 14, color: colors.dark }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Currency */}
            <div style={{ maxWidth: 280 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: colors.dark, marginBottom: 10 }}>
                Currency <span style={{ fontSize: 11.5, color: colors.muted, fontWeight: 400 }}>(Auto-detected)</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = colors.purple)}
                  onBlur={(e)  => (e.target.style.borderColor = '#e5e7eb')}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
                <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p style={{ textAlign: 'center', fontSize: 13, color: '#ef4444', marginBottom: 16 }}>{error}</p>
          )}

          {/* Generate button */}
          <div style={{ textAlign: 'center' }}>
            <button type="submit" disabled={loading}
              style={{
                background:   loading ? '#9ca3af' : colors.authBtn,
                color:        '#fff',
                border:       'none',
                borderRadius: 99,
                padding:      '14px 44px',
                fontSize:     15,
                fontWeight:   600,
                cursor:       loading ? 'not-allowed' : 'pointer',
                transition:   'all 0.2s',
                boxShadow:    '0 4px 16px rgba(45,42,78,0.2)',
              }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = '#3d3870'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = loading ? '#9ca3af' : colors.authBtn; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {loading ? 'Generating…' : 'Generate Price Suggestions'}
            </button>
            <p style={{ fontSize: 12.5, color: colors.muted, marginTop: 12 }}>
              Note: Prices are adjusted for your local market.
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
