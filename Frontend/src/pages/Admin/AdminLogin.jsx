import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLoginAPI } from '@/services/api';
import { gradients, colors } from '@/constants/colors';
import logo from '@/components/Logo/logo.jpeg';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await adminLoginAPI(form);
      if (res.token && res.user?.isAdmin) {
        localStorage.setItem('adminToken', res.token);
        localStorage.setItem('adminUser', JSON.stringify(res.user));
        navigate('/admin/dashboard');
      } else if (res.token && !res.user?.isAdmin) {
        setError('Access denied — this account does not have admin privileges.');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight:      '100vh',
      background:     gradients.auth,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      fontFamily:     '"Outfit", sans-serif',
      padding:        24,
    }}>
      <div style={{
        background:   '#ffffff',
        borderRadius: 24,
        padding:      '48px 44px',
        width:        '100%',
        maxWidth:     420,
        boxShadow:    '0 24px 64px rgba(0,0,0,0.18)',
      }}>
        {/* Logo / title */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <img
            src={logo}
            alt="NexpreneurAI"
            style={{ width: 72, height: 72, borderRadius: 18, objectFit: 'cover', margin: '0 auto 16px', display: 'block', boxShadow: '0 4px 16px rgba(100,80,180,0.18)' }}
          />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: colors.dark, margin: '0 0 6px' }}>Admin Panel</h1>
          <p style={{ fontSize: 13.5, color: colors.muted, margin: 0 }}>Sign in with your admin credentials</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: colors.dark, display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="admin@example.com"
              style={{
                width:        '100%',
                padding:      '11px 14px',
                fontSize:     14,
                border:       '1.5px solid #e0e0e8',
                borderRadius: 10,
                outline:      'none',
                boxSizing:    'border-box',
                color:        colors.dark,
                transition:   'border-color 0.2s',
              }}
              onFocus={(e)  => { e.target.style.borderColor = colors.purple; }}
              onBlur={(e)   => { e.target.style.borderColor = '#e0e0e8'; }}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: colors.dark, display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              placeholder="••••••••"
              style={{
                width:        '100%',
                padding:      '11px 14px',
                fontSize:     14,
                border:       '1.5px solid #e0e0e8',
                borderRadius: 10,
                outline:      'none',
                boxSizing:    'border-box',
                color:        colors.dark,
                transition:   'border-color 0.2s',
              }}
              onFocus={(e)  => { e.target.style.borderColor = colors.purple; }}
              onBlur={(e)   => { e.target.style.borderColor = '#e0e0e8'; }}
            />
          </div>

          {error && (
            <p style={{ fontSize: 13, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', margin: 0 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop:    8,
              padding:      '13px',
              background:   loading ? '#9ca3af' : colors.authBtn,
              color:        '#fff',
              border:       'none',
              borderRadius: 10,
              fontSize:     15,
              fontWeight:   600,
              cursor:       loading ? 'not-allowed' : 'pointer',
              transition:   'all 0.2s',
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#3d3870'; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = colors.authBtn; }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
