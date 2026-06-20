import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token  = params.get('token');
    const name   = params.get('name');
    const email  = params.get('email');
    const avatar = params.get('avatar');
    const error  = params.get('error');

    if (error || !token) {
      navigate('/sign-in?error=google_failed', { replace: true });
      return;
    }

    login(token, { name, email, avatar });
    navigate('/dashboard', { replace: true });
  }, []); // eslint-disable-line

  return (
    <div
      style={{
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        background:     'linear-gradient(155deg,#dce3f8,#cde6f1)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width:        44,
            height:       44,
            border:       '3px solid #e0e0e8',
            borderTop:    '3px solid #7c5ccc',
            borderRadius: '50%',
            animation:    'spin 0.8s linear infinite',
            margin:       '0 auto 14px',
          }}
        />
        <p style={{ fontSize: 14, color: '#6b7280', fontWeight: 500 }}>
          Signing you in…
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
