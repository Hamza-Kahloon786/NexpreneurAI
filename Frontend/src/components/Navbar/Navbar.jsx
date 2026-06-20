import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo/Logo';
import { colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

const NAV_LINKS = [
  { label: 'Home',             action: (navigate) => navigate('/home')  },
  { label: 'About',            action: (navigate) => navigate('/about') },
  { label: 'Help And Support', action: (navigate) => navigate('/help-support') },
];

export default function Navbar() {
  const navigate    = useNavigate();
  const { user }    = useAuth();

  return (
    <nav
      className="sticky top-0 z-50"
      style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
    >
      <div className="flex items-center justify-between mx-auto"
        style={{ maxWidth: 1200, padding: '0 40px', height: 68 }}>

        <button onClick={() => navigate('/home')}
          style={{ background: 'none', border: 'none', padding: 0, transition: 'transform 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
          <Logo />
        </button>

        <div className="hidden md:flex items-center" style={{ gap: 32 }}>
          {NAV_LINKS.map(({ label, action }) => (
            <a key={label} href="#" className="nav-link"
              onClick={(e) => { e.preventDefault(); action(navigate); }}>
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center" style={{ gap: 16 }}>
          {/* Language / Globe */}
          <button
            onClick={() => navigate('/')}
            title="Change language"
            style={{ background: 'none', border: 'none', color: '#888', display: 'flex', padding: 0,
              transition: 'color 0.18s, transform 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = colors.purple; e.currentTarget.style.transform = 'rotate(20deg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#888'; e.currentTarget.style.transform = 'rotate(0)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </button>

          <div style={{ width: 1, height: 16, background: '#ddd' }} />

          {user ? (
            <button onClick={() => navigate('/dashboard')} className="btn-primary"
              style={{ padding: '9px 20px', fontSize: 13.5 }}>
              Dashboard
            </button>
          ) : (
            <>
              <a onClick={() => navigate('/sign-in')} className="nav-link" style={{ fontSize: 13.5 }}>
                Sign In
              </a>
              <button onClick={() => navigate('/sign-up')} className="btn-primary"
                style={{ padding: '9px 20px', fontSize: 13.5 }}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
