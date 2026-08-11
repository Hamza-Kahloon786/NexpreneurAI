import { useState, useEffect } from 'react';
import { useNavigate }         from 'react-router-dom';
import DashboardNavbar         from '@/components/DashboardNavbar/DashboardNavbar';
import Footer                  from '@/components/Footer/Footer';
import { gradients, colors }   from '@/constants/colors';
import { useAuth }             from '@/context/AuthContext';
import {
  getProgressStatsAPI,
  getProgressRecentAPI,
  getProgressChartAPI,
} from '@/services/api';

/* ── Helpers ─────────────────────────────────────── */
function timeAgo(dateStr) {
  const secs = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (secs < 60)   return 'just now';
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  const days = Math.floor(secs / 86400);
  return days === 1 ? 'yesterday' : `${days}d ago`;
}

/* ── SVG Line Chart ──────────────────────────────── */
const PAD_LEFT  = 56;
const PAD_RIGHT = 24;
const PAD_TOP   = 20;
const PAD_BOT   = 52;

function LineChart({ data }) {
  const W = 860, H = 300;
  const plotW = W - PAD_LEFT - PAD_RIGHT;
  const plotH = H - PAD_TOP  - PAD_BOT;

  const maxVal = Math.max(4, ...data.map((d) => d.value));
  const MAX_Y  = Math.ceil((maxVal + 1) / 4) * 4 + 2;
  const step   = Math.ceil(MAX_Y / 5);
  const Y_TICKS = [step, step * 2, step * 3, step * 4, step * 5];

  const xOf = (i) => PAD_LEFT + (i / (data.length - 1)) * plotW;
  const yOf = (v) => PAD_TOP  + (1 - v / MAX_Y) * plotH;

  const points   = data.map((d, i) => ({ x: xOf(i), y: yOf(d.value) }));
  const gridY    = PAD_TOP + plotH;

  const linePath = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpX  = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y} ${cpX} ${pt.y} ${pt.x} ${pt.y}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${gridY} L ${points[0].x} ${gridY} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {/* horizontal grid lines */}
      {Y_TICKS.map((tick) => {
        const y = yOf(tick);
        return (
          <g key={tick}>
            <line x1={PAD_LEFT} y1={y} x2={W - PAD_RIGHT} y2={y}
              stroke="#e5e7eb" strokeWidth="1" />
            <text x={PAD_LEFT - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#9ca3af">{tick}</text>
          </g>
        );
      })}

      {/* Y-axis label */}
      <text transform={`translate(14, ${PAD_TOP + plotH / 2}) rotate(-90)`}
        textAnchor="middle" fontSize="11" fill="#9ca3af">
        AI tasks completed
      </text>

      {/* vertical grid lines */}
      {points.map((pt, i) => (
        <line key={i} x1={pt.x} y1={PAD_TOP} x2={pt.x} y2={gridY}
          stroke="#f0f0f4" strokeWidth="1" />
      ))}

      {/* area fill */}
      <path d={areaPath} fill="url(#areaGrad)" opacity="0.5" />

      {/* line */}
      <path d={linePath} fill="none" stroke={colors.authBtn} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />

      {/* data points */}
      {points.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="3.5"
          fill="#fff" stroke={colors.authBtn} strokeWidth="2" />
      ))}

      {/* X-axis labels */}
      {data.map((d, i) => {
        const x = xOf(i);
        return (
          <g key={i}>
            <text x={x} y={gridY + 16} textAnchor="middle" fontSize="10.5" fill="#9ca3af">{d.label[0]}</text>
            <text x={x} y={gridY + 28} textAnchor="middle" fontSize="10.5" fill="#9ca3af">{d.label[1]}</text>
          </g>
        );
      })}

      <text x={PAD_LEFT + plotW / 2} y={H - 2} textAnchor="middle" fontSize="11.5" fill="#6b7280" fontWeight="500">
        Months / Weeks
      </text>

      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={colors.authBtn} stopOpacity="0.18" />
          <stop offset="100%" stopColor={colors.authBtn} stopOpacity="0.02" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Stat Card ───────────────────────────────────── */
function StatCard({ label, value, valueColor, glow, loading }) {
  return (
    <div style={{
      flex:           1,
      background:     '#ffffff',
      borderRadius:   20,
      padding:        '28px 24px',
      minHeight:      100,
      border:         glow ? '1.5px solid rgba(134,239,172,0.4)' : '1.5px solid rgba(200,195,225,0.4)',
      boxShadow:      glow
        ? '0 0 28px rgba(134,239,172,0.15), 0 2px 12px rgba(100,80,180,0.05)'
        : '0 2px 12px rgba(100,80,180,0.05)',
      textAlign:      'center',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
    }}>
      <p style={{ fontSize: 13, color: colors.muted, marginBottom: 10, fontWeight: 500 }}>{label}</p>
      {loading
        ? <div style={{ width: 64, height: 36, borderRadius: 8, background: '#f3f4f6', animation: 'pulse 1.4s ease-in-out infinite' }} />
        : <p style={{ fontSize: 36, fontWeight: 700, color: valueColor || colors.dark, lineHeight: 1 }}>{value}</p>
      }
    </div>
  );
}

/* ── Main Page ───────────────────────────────────── */
export default function MyProgress() {
  const navigate   = useNavigate();
  const { token }  = useAuth();

  const [stats,    setStats]    = useState(null);
  const [chart,    setChart]    = useState(null);
  const [recent,   setRecent]   = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    if (!token) return;
    setLoading(true);

    Promise.all([
      getProgressStatsAPI(token),
      getProgressChartAPI(token),
      getProgressRecentAPI(token),
    ])
      .then(([s, c, r]) => {
        if (s.message) throw new Error(s.message);
        setStats(s);
        setChart(Array.isArray(c) ? c : null);
        setRecent(Array.isArray(r) ? r : []);
      })
      .catch((err) => setError(err.message || 'Failed to load progress data.'))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div style={{ minHeight: '100vh', background: gradients.hero, display: 'flex', flexDirection: 'column' }}>
      <DashboardNavbar />

      <main style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '52px 40px 64px' }}>

        {/* ── Header ─────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: colors.dark, marginBottom: 12, letterSpacing: '-0.02em' }}>
            My Progress
          </h1>
          <p style={{ fontSize: 15, color: colors.muted }}>
            A quick look at how you're building and growing with AI.
          </p>
        </div>

        {error && (
          <p style={{ textAlign: 'center', fontSize: 14, color: '#ef4444', marginBottom: 32 }}>{error}</p>
        )}

        {/* ── Stat Cards ─────────────────────────── */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 44, flexWrap: 'wrap' }}>
          <StatCard
            label="AI Tasks Completed"
            value={stats ? String(stats.totalTasks) : '—'}
            loading={loading}
          />
          <StatCard
            label="Time saved using AI"
            value={stats ? stats.timeSaved : '—'}
            valueColor="#16a34a"
            glow
            loading={loading}
          />
          <StatCard
            label="Products created"
            value={stats ? String(stats.productsCreated) : '—'}
            loading={loading}
          />
        </div>

        {/* ── Chart ──────────────────────────────── */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.dark, marginBottom: 20 }}>
            Your activity over time
          </h2>
          <div style={{
            background:   '#ffffff',
            borderRadius: 16,
            padding:      '28px 20px 16px',
            border:       '1.5px solid rgba(200,195,225,0.4)',
            boxShadow:    '0 2px 12px rgba(100,80,180,0.05)',
          }}>
            {loading ? (
              <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: colors.muted, fontSize: 14 }}>Loading chart…</p>
              </div>
            ) : chart ? (
              <LineChart data={chart} />
            ) : (
              <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: colors.muted, fontSize: 14 }}>No chart data available.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Recent Activity ─────────────────────── */}
        <div style={{
          background:   '#ffffff',
          borderRadius: 16,
          padding:      '28px 28px',
          border:       '1.5px solid rgba(200,195,225,0.4)',
          boxShadow:    '0 2px 12px rgba(100,80,180,0.05)',
          marginBottom: 36,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.dark, marginBottom: 20 }}>
            Recent Activity
          </h2>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  height: 20, borderRadius: 6, background: '#f3f4f6',
                  width: `${60 + i * 15}%`, animation: 'pulse 1.4s ease-in-out infinite',
                }} />
              ))}
            </div>
          ) : recent && recent.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {recent.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14.5, color: '#374151' }}>
                    <span style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: colors.purple, flexShrink: 0,
                    }} />
                    {item.label}
                  </div>
                  <span style={{ fontSize: 12, color: colors.muted, flexShrink: 0 }}>
                    {timeAgo(item.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: 14, color: colors.muted, textAlign: 'center', padding: '16px 0' }}>
              No activity yet — generate a business plan or product description to get started.
            </p>
          )}
        </div>

        {/* ── CTA ────────────────────────────────── */}
        <div style={{
          background:   '#ffffff',
          borderRadius: 16,
          padding:      '48px 32px',
          border:       '1.5px solid rgba(200,195,225,0.4)',
          boxShadow:    '0 2px 12px rgba(100,80,180,0.05)',
          textAlign:    'center',
        }}>
          <h3 style={{ fontSize: 24, fontWeight: 600, color: colors.dark, marginBottom: 28, letterSpacing: '-0.01em' }}>
            Keep going, every step moves your business forward
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/dashboard')}
              style={{
                background: colors.authBtn, color: '#fff', border: 'none',
                borderRadius: 99, padding: '11px 28px', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#3d3870'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = colors.authBtn; e.currentTarget.style.transform = 'translateY(0)'; }}>
              Go to Dashboard
            </button>
            <button onClick={() => navigate('/business-plan')}
              style={{
                background: '#fff', color: colors.dark,
                border: '1.5px solid #d1d5db', borderRadius: 99,
                padding: '11px 28px', fontSize: 14, fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.purple; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              View Business Plan
            </button>
          </div>
        </div>

      </main>

      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}
