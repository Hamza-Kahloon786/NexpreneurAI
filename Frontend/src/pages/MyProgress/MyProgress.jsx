import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Footer          from '@/components/Footer/Footer';
import { gradients, colors } from '@/constants/colors';

/* ── Chart data ─────────────────────────────────── */
const CHART_DATA = [
  { label: ['Jan', 'Week 1'], value: 2  },
  { label: ['Jan', 'Week 2'], value: 4  },
  { label: ['Jan', 'Week 3'], value: 4  },
  { label: ['Jan', 'Week 4'], value: 8  },
  { label: ['Feb', 'Week 1'], value: 8  },
  { label: ['Feb', 'Week 2'], value: 16 },
  { label: ['Feb', 'Week 3'], value: 11 },
  { label: ['Feb', 'Week 4'], value: 15 },
  { label: ['Mar', 'Week 1'], value: 13 },
  { label: ['Mar', 'Week 2'], value: 21 },
];

const Y_TICKS   = [5, 10, 15, 20, 25];
const MAX_Y     = 26;
const PAD_LEFT  = 56;
const PAD_RIGHT = 24;
const PAD_TOP   = 20;
const PAD_BOT   = 52;

/* ── SVG Line Chart ─────────────────────────────── */
function LineChart() {
  const W = 860, H = 300;
  const plotW = W - PAD_LEFT - PAD_RIGHT;
  const plotH = H - PAD_TOP  - PAD_BOT;

  const xOf = (i) => PAD_LEFT + (i / (CHART_DATA.length - 1)) * plotW;
  const yOf = (v) => PAD_TOP  + (1 - v / MAX_Y) * plotH;

  const points = CHART_DATA.map((d, i) => ({ x: xOf(i), y: yOf(d.value) }));

  /* smooth line using cubic bezier */
  const linePath = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y} ${cpX} ${pt.y} ${pt.x} ${pt.y}`;
  }, '');

  /* filled area */
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PAD_TOP + plotH} L ${points[0].x} ${PAD_TOP + plotH} Z`;

  const gridY = PAD_TOP + plotH; // bottom of plot

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {/* horizontal grid lines */}
      {Y_TICKS.map((tick) => {
        const y = yOf(tick);
        return (
          <g key={tick}>
            <line x1={PAD_LEFT} y1={y} x2={W - PAD_RIGHT} y2={y}
              stroke="#e5e7eb" strokeWidth="1" strokeDasharray="0" />
            <text x={PAD_LEFT - 8} y={y + 4} textAnchor="end"
              fontSize="11" fill="#9ca3af">{tick}</text>
          </g>
        );
      })}
      {/* top label 25+ */}
      <text x={PAD_LEFT - 8} y={PAD_TOP + 4} textAnchor="end" fontSize="11" fill="#9ca3af">25+</text>

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
      <path d={linePath} fill="none" stroke={colors.authBtn} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* data points */}
      {points.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="3.5"
          fill="#fff" stroke={colors.authBtn} strokeWidth="2" />
      ))}

      {/* X-axis labels */}
      {CHART_DATA.map((d, i) => {
        const x = xOf(i);
        return (
          <g key={i}>
            <text x={x} y={gridY + 16} textAnchor="middle" fontSize="10.5" fill="#9ca3af">{d.label[0]}</text>
            <text x={x} y={gridY + 28} textAnchor="middle" fontSize="10.5" fill="#9ca3af">{d.label[1]}</text>
          </g>
        );
      })}

      {/* X-axis title */}
      <text x={PAD_LEFT + plotW / 2} y={H - 2} textAnchor="middle" fontSize="11.5" fill="#6b7280" fontWeight="500">
        Months / Weeks
      </text>

      {/* gradient definition */}
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={colors.authBtn} stopOpacity="0.18" />
          <stop offset="100%" stopColor={colors.authBtn} stopOpacity="0.02" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Stat Card ──────────────────────────────────── */
function StatCard({ label, value, valueColor, glow }) {
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
      <p style={{ fontSize: 36, fontWeight: 700, color: valueColor || colors.dark, lineHeight: 1 }}>{value}</p>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────── */
export default function MyProgress() {
  const navigate = useNavigate();

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

        {/* ── Stat Cards ─────────────────────────── */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 44 }}>
          <StatCard label="AI Tasks Completed" value="24" />
          <StatCard label="Time saved using AI" value="9.5 hrs" valueColor="#16a34a" glow />
          <StatCard label="Products created"    value="3" />
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
            <LineChart />
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
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Generated product photos',
              'Created Instagram post',
              'Updated pricing strategy',
            ].map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14.5, color: '#374151' }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: colors.purple, flexShrink: 0,
                }} />
                {item}
              </li>
            ))}
          </ul>
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
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
    </div>
  );
}
