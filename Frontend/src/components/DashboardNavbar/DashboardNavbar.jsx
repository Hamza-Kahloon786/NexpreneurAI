import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo/Logo';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';

const NAV_ITEMS = [
  { label: 'Dashboard',    route: '/dashboard' },
  { label: 'Business Plan', route: '/business-plan' },
  { label: 'My Progress',  route: '/my-progress' },
  { label: 'Learning Hub', route: '/dashboard' },
];

export default function DashboardNavbar() {
  const navigate         = useNavigate();
  const { user, logout } = useAuth();
  const [aiOpen,   setAiOpen]   = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/sign-in'); };
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

  const AI_TOOL_ITEMS = [
    { label: 'AI Photo Generator',     route: '/dashboard' },
    { label: 'AI Product Description', route: '/product-description' },
    { label: 'AI Price Suggestions',   route: '/dashboard' },
    { label: 'AI Marketing',           route: '/dashboard' },
  ];

  return (
    <nav style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,0.07)',
      position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="flex items-center justify-between mx-auto"
        style={{ maxWidth: 1200, padding: '0 32px', height: 64 }}>

        <button onClick={() => navigate('/dashboard')}
          style={{ background: 'none', border: 'none', padding: 0, transition: 'transform 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
          <Logo />
        </button>

        <div className="flex items-center" style={{ gap: 4 }}>
          {NAV_ITEMS.map(({ label, route }) => (
            <a key={label} href="#" className="nav-link"
              style={{ padding: '6px 12px', borderRadius: 8, fontSize: 13.5 }}
              onClick={(e) => { e.preventDefault(); navigate(route); }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(124,92,204,0.07)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
              {label}
            </a>
          ))}

          {/* AI Tools dropdown */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setAiOpen(!aiOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8,
                background: aiOpen ? 'rgba(124,92,204,0.07)' : 'transparent', border: 'none',
                fontSize: 13.5, fontWeight: 500, color: '#1c1a2e', transition: 'background 0.18s' }}>
              AI Tools
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: aiOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {aiOpen && (
              <div style={{ position: 'absolute', top: '110%', left: 0, minWidth: 210,
                background: '#fff', borderRadius: 12, padding: '8px 0',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #f0eef8', zIndex: 100 }}>
                {AI_TOOL_ITEMS.map(({ label, route }) => (
                  <button key={label} onClick={() => { navigate(route); setAiOpen(false); }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 18px',
                      background: 'none', border: 'none', fontSize: 13, color: '#374151', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f3ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center" style={{ gap: 14 }}>
          <button onClick={() => navigate('/')} title="Change language"
            style={{ background: 'none', border: 'none', color: '#888', display: 'flex', padding: 0, transition: 'color 0.18s, transform 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = colors.purple; e.currentTarget.style.transform = 'rotate(20deg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#888'; e.currentTarget.style.transform = 'rotate(0)'; }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </button>

          <div style={{ position: 'relative' }}>
            <button onClick={() => setUserOpen(!userOpen)}
              style={{ width: 38, height: 38, borderRadius: '50%', border: '2px solid #c4b5fd',
                overflow: 'hidden', background: colors.purple, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.18s' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.purpleMid)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#c4b5fd')}>
              {user?.avatar
                ? <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                : <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{initials}</span>}
            </button>
            {userOpen && (
              <div style={{ position: 'absolute', top: '115%', right: 0, minWidth: 180,
                background: '#fff', borderRadius: 12, padding: '8px 0',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #f0eef8', zIndex: 100 }}>
                <div style={{ padding: '10px 18px', borderBottom: '1px solid #f0eef8' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: colors.dark }}>{user?.name}</p>
                  <p style={{ fontSize: 11.5, color: colors.muted }}>{user?.email}</p>
                </div>
                <button onClick={handleLogout}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 18px',
                    background: 'none', border: 'none', fontSize: 13, color: '#ef4444', transition: 'background 0.15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#fff1f1')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
