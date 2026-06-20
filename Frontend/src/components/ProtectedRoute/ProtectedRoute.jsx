import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
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
              width:        40,
              height:       40,
              border:       '3px solid #e0e0e8',
              borderTop:    '3px solid #7c5ccc',
              borderRadius: '50%',
              animation:    'spin 0.8s linear infinite',
              margin:       '0 auto 12px',
            }}
          />
          <p style={{ fontSize: 13, color: '#6b7280' }}>Loading…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return user ? children : <Navigate to="/sign-in" replace />;
}
