import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo          from '@/components/Logo/Logo';
import AuthLeftPanel from '@/components/AuthLeftPanel/AuthLeftPanel';
import GoogleIcon    from '@/components/GoogleIcon/GoogleIcon';
import { colors }   from '@/constants/colors';
import { registerAPI, googleOAuthURL } from '@/services/api';
import { useAuth }  from '@/context/AuthContext';

export default function SignUp() {
  const navigate          = useNavigate();
  const { login }         = useAuth();
  const [form, setForm]         = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await registerAPI(form);
      if (data.token) {
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <AuthLeftPanel />

      <div
        className="anim-slide-right flex flex-col justify-center"
        style={{ flex: 1, height: '100vh', background: '#ffffff', overflowY: 'auto',
          padding: 'clamp(32px, 6vh, 64px) clamp(32px, 5vw, 72px)' }}
      >
        {/* Back to home */}
        <button
          onClick={() => navigate('/home')}
          className="flex items-center anim-fade-in"
          style={{ background: 'none', border: 'none', color: colors.muted, fontSize: 13,
            gap: 6, marginBottom: 24, padding: 0, alignSelf: 'flex-start',
            transition: 'color 0.18s', }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.purple)}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.muted)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Home
        </button>

        {/* Logo + label */}
        <div className="anim-fade-in-down flex items-center" style={{ gap: 12, marginBottom: 28 }}>
          <Logo />
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.muted, marginBottom: 1 }}>
              Get started free
            </p>
            <p style={{ fontSize: 18, fontWeight: 700, color: colors.dark, letterSpacing: '-0.01em' }}>Sign Up</p>
          </div>
        </div>

        <h1 className="anim-fade-in-down delay-100"
          style={{ fontSize: 28, fontWeight: 700, color: colors.dark, marginTop: 0, marginBottom: 28, letterSpacing: '-0.015em' }}>
          Create an Account
        </h1>

        {error && (
          <div style={{ background: '#fff1f1', border: '1px solid #fecaca', borderRadius: 10,
            padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#ef4444' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 18 }}>
          <div className="anim-fade-in-up delay-150">
            <label style={{ fontSize: 12.5, fontWeight: 600, color: colors.dark, display: 'block', marginBottom: 2 }}>Full name</label>
            <input type="text" placeholder="User name" value={form.name}
              onChange={handleChange('name')} className="input-field" required />
          </div>

          <div className="anim-fade-in-up delay-200">
            <label style={{ fontSize: 12.5, fontWeight: 600, color: colors.dark, display: 'block', marginBottom: 2 }}>Email</label>
            <input type="email" placeholder="Email" value={form.email}
              onChange={handleChange('email')} className="input-field" required />
          </div>

          <div className="anim-fade-in-up delay-250">
            <label style={{ fontSize: 12.5, fontWeight: 600, color: colors.dark, display: 'block', marginBottom: 2 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} placeholder="Your password"
                value={form.password} onChange={handleChange('password')}
                className="input-field" style={{ paddingRight: 44 }} required minLength={6} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#bbb', padding: 0, transition: 'color 0.18s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.purple)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#bbb')}>
                {showPass
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
              </button>
            </div>
          </div>

          <div className="anim-fade-in-up delay-300">
            <button type="submit" className="btn-auth" style={{ marginTop: 6 }} disabled={loading}>
              {loading ? 'Creating account…' : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className="anim-fade-in delay-350"
          style={{ textAlign: 'center', fontSize: 12.5, color: colors.muted, marginTop: 16 }}>
          Already have an account?{' '}
          <a onClick={() => navigate('/sign-in')} className="auth-link">Login</a>
        </p>

        <div className="flex items-center anim-fade-in delay-400"
          style={{ gap: 12, margin: '18px 0 16px' }}>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          <span style={{ fontSize: 12, color: '#aaa', whiteSpace: 'nowrap' }}>or Register with</span>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
        </div>

        <div className="anim-fade-in delay-500">
          <button className="btn-google" onClick={() => window.location.href = googleOAuthURL}>
            <GoogleIcon /> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
