import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from '@/constants/colors';

const NAV = [
  {
    label: 'Dashboard',
    path:  '/admin/dashboard',
    icon:  (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    label: 'Users',
    path:  '/admin/users',
    icon:  (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function AdminLayout({ children }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Outfit", sans-serif', background: '#f4f3fb' }}>

      {/* ── Sidebar ──────────────────────────────── */}
      <aside style={{
        width:         240,
        flexShrink:    0,
        background:    colors.authBtn,
        display:       'flex',
        flexDirection: 'column',
        padding:       '28px 0',
      }}>
        {/* Brand */}
        <div style={{ padding: '0 24px 28px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width:          36,
              height:         36,
              background:     'rgba(255,255,255,0.15)',
              borderRadius:   10,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>NexpreneurAI</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map(({ label, path, icon }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          12,
                  padding:      '11px 16px',
                  borderRadius: 10,
                  border:       'none',
                  cursor:       'pointer',
                  fontSize:     14,
                  fontWeight:   active ? 600 : 400,
                  color:        active ? '#fff' : 'rgba(255,255,255,0.6)',
                  background:   active ? 'rgba(255,255,255,0.15)' : 'transparent',
                  textAlign:    'left',
                  transition:   'all 0.18s',
                  width:        '100%',
                }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; } }}
              >
                {icon}
                {label}
              </button>
            );
          })}
        </nav>

        {/* Admin user + logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 8 }}>
            <div style={{
              width:          32,
              height:         32,
              background:     colors.purple,
              borderRadius:   '50%',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontSize:       13,
              fontWeight:     700,
              color:          '#fff',
              flexShrink:     0,
            }}>
              {adminUser.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {adminUser.name || 'Admin'}
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width:        '100%',
              display:      'flex',
              alignItems:   'center',
              gap:          10,
              padding:      '10px 16px',
              borderRadius: 10,
              border:       'none',
              cursor:       'pointer',
              fontSize:     13.5,
              color:        'rgba(255,255,255,0.6)',
              background:   'transparent',
              transition:   'all 0.18s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          height:       64,
          background:   '#fff',
          borderBottom: '1px solid rgba(200,195,225,0.4)',
          display:      'flex',
          alignItems:   'center',
          padding:      '0 32px',
          flexShrink:   0,
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, color: colors.dark, margin: 0 }}>
            {NAV.find((n) => n.path === location.pathname)?.label || 'Admin'}
          </h2>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
