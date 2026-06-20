import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import { useAuth }     from '@/context/AuthContext';
import { gradients, colors } from '@/constants/colors';

const PhotoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);
const DocIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const TagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const MegaphoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
  </svg>
);

const AI_TOOLS = [
  { label: 'AI Photo Generator',     Icon: PhotoIcon,    route: '/dashboard' },
  { label: 'AI Product Description', Icon: DocIcon,      route: '/product-description' },
  { label: 'AI Price Suggestions',   Icon: TagIcon,      route: '/dashboard' },
  { label: 'AI Marketing',           Icon: MegaphoneIcon,route: '/dashboard' },
];

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background:   '#ffffff',
        borderRadius: 20,
        padding:      '28px',
        border:       '1px solid rgba(200,195,225,0.4)',
        boxShadow:    '0 2px 16px rgba(100,80,180,0.06)',
        transition:   'transform 0.25s ease, box-shadow 0.25s ease',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(100,80,180,0.12)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(100,80,180,0.06)'; }}
    >
      {children}
    </div>
  );
}

function ActionBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: 20, width: '100%', background: colors.authBtn, color: '#fff',
        border: 'none', borderRadius: 10, padding: '13px', fontSize: 14.5,
        fontWeight: 600, transition: 'background 0.2s, transform 0.18s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#3d3870'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = colors.authBtn; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {children}
    </button>
  );
}

export default function Dashboard() {
  const navigate    = useNavigate();
  const { user }    = useAuth();
  const firstName   = user?.name?.split(' ')[0] || 'there';

  return (
    <div style={{ minHeight: '100vh', background: gradients.hero }}>
      <DashboardNavbar />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px 60px' }}>
        <h1 className="anim-fade-in-down"
          style={{ fontSize: 28, fontWeight: 700, color: colors.dark, marginBottom: 32, letterSpacing: '-0.015em' }}>
          Welcome to your dashboard, {firstName}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Business Plan */}
          <Card className="anim-fade-in-up delay-100">
            <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.dark, marginBottom: 6 }}>Business Plan</h2>
            <p style={{ fontSize: 13, color: colors.muted, lineHeight: 1.6 }}>
              Build a personalised AI-powered business plan tailored to your goals, skills, and market.
            </p>
            <ActionBtn onClick={() => navigate('/business-plan')}>
              Start My Business Plan
            </ActionBtn>
          </Card>

          {/* AI Tasks */}
          <Card className="anim-fade-in-up delay-150" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Dot pattern */}
            <div aria-hidden="true" style={{ position: 'absolute', top: 16, right: 16, width: 90, height: 90, opacity: 0.15, pointerEvents: 'none' }}>
              {[...Array(16)].map((_, i) => (
                <div key={i} style={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%', background: colors.purple,
                  top: Math.floor(i / 4) * 22, left: (i % 4) * 22 }}/>
              ))}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.dark, marginBottom: 18 }}>Do Your Tasks With AI</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {AI_TOOLS.map(({ label, Icon, route }) => (
                <button key={label}
                  onClick={() => navigate(route)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 14px', background: '#fafafa',
                    border: '1.5px solid #e8e5f4', borderRadius: 12,
                    fontSize: 12.5, fontWeight: 500, color: colors.dark, textAlign: 'left',
                    transition: 'all 0.18s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f0ecff'; e.currentTarget.style.borderColor = '#c4b5fd'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fafafa'; e.currentTarget.style.borderColor = '#e8e5f4'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <span style={{ color: colors.purple, display: 'flex', flexShrink: 0 }}><Icon /></span>
                  {label}
                </button>
              ))}
            </div>
          </Card>

          {/* My Progress */}
          <Card className="anim-fade-in-up delay-200">
            <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.dark, marginBottom: 18 }}>My Progress</h2>
            <div className="flex" style={{ gap: 12 }}>
              {[{ value: '07', label: 'Tasks completed\nwith AI' }, { value: '3h', label: 'Time saved\nusing AI Tools' }].map(({ value, label }) => (
                <div key={value} style={{ flex: 1, background: '#f8f7ff', border: '1.5px solid #e8e5f4', borderRadius: 12,
                  padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 26, fontWeight: 800, color: colors.dark }}>{value}</span>
                  <span style={{ fontSize: 11.5, color: colors.muted, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{label}</span>
                </div>
              ))}
            </div>
            <ActionBtn onClick={() => {}}>See Complete Stats</ActionBtn>
          </Card>

          {/* Learning Hub */}
          <Card className="anim-fade-in-up delay-250">
            <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.dark, marginBottom: 8 }}>Learning Hub</h2>
            <p style={{ fontSize: 13, color: colors.muted, lineHeight: 1.65 }}>
              Everything you need to learn, grow, and sell with confidence.
            </p>
            <ActionBtn onClick={() => {}}>Go To Learning Hub</ActionBtn>
          </Card>

        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid rgba(200,195,225,0.3)' }}>
        <p style={{ fontSize: 10.5, letterSpacing: '0.13em', color: '#aaa', textTransform: 'uppercase' }}>
          © 2026 NexpreneurAI. All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
