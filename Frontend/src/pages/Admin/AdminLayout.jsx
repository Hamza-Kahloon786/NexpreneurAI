import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from '@/constants/colors';
import logo from '@/components/Logo/logo.jpeg';

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
  const navigate    = useNavigate();
  const location    = useLocation();
  const adminUser   = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile]       = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Outfit", sans-serif', background: '#f4f3fb' }}>

      {/* Mobile backdrop */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 40, backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* ── Sidebar ──────────────────────────────── */}
      <aside style={{
        width:         240,
        flexShrink:    0,
        background:    colors.authBtn,
        display:       'flex',
        flexDirection: 'column',
        padding:       '28px 0',
        ...(isMobile ? {
          position:   'fixed',
          top:        0,
          left:       0,
          bottom:     0,
          zIndex:     50,
          transform:  sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
          boxShadow:  '4px 0 32px rgba(0,0,0,0.22)',
        } : {}),
      }}>

        {/* Brand */}
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img
                src={logo}
                alt="NexpreneurAI"
                style={{ width: 36, height: 36, borderRadius: 9, objectFit: 'cover', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
              />
              <div>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', margin: 0 }}>NexpreneurAI</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0 }}>Admin Panel</p>
              </div>
            </div>
            {/* Close button — mobile only */}
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8,
                  padding: 6, cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '18px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(({ label, path, icon }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => { navigate(path); setSidebarOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: active ? 600 : 400,
                  color:      active ? '#fff' : 'rgba(255,255,255,0.6)',
                  background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                  textAlign: 'left', transition: 'all 0.18s', width: '100%',
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
        <div style={{ padding: '14px 10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', marginBottom: 6 }}>
            <div style={{
              width: 32, height: 32, background: colors.purple, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>
              {adminUser.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {adminUser.name || 'Admin'}
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0 }}>Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontSize: 13.5, color: 'rgba(255,255,255,0.6)', background: 'transparent', transition: 'all 0.18s',
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
          borderBottom: '1px solid rgba(200,195,225,0.35)',
          display:      'flex',
          alignItems:   'center',
          padding:      isMobile ? '0 16px' : '0 32px',
          flexShrink:   0,
          gap:          12,
          boxShadow:    '0 1px 6px rgba(100,80,180,0.06)',
        }}>
          {/* Hamburger — mobile only */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 38, height: 38, borderRadius: 9,
                border: '1.5px solid rgba(200,195,225,0.55)',
                background: '#f9f8fd', cursor: 'pointer', flexShrink: 0, color: colors.dark,
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          )}
          <h2 style={{ fontSize: 17, fontWeight: 600, color: colors.dark, margin: 0 }}>
            {NAV.find((n) => n.path === location.pathname)?.label || 'Admin'}
          </h2>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: isMobile ? '20px 14px' : '32px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
