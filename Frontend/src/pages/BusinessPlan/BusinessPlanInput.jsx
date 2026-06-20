import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import { gradients, colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

export default function BusinessPlanInput() {
  const navigate        = useNavigate();
  const { token }       = useAuth();
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setError('');
    setLoading(true);

    try {
      const res  = await fetch('/api/business-plan/generate', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({ idea: idea.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong.');
        setLoading(false);
        return;
      }

      // Pass the result to the result page via router state
      navigate('/business-plan/result', { state: { idea: data.idea, plan: data.plan } });

    } catch {
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: gradients.hero, display: 'flex', flexDirection: 'column' }}>
      <DashboardNavbar />

      {/* Main content */}
      <div
        className="flex flex-col items-center justify-center flex-1 anim-fade-in"
        style={{ padding: '60px 24px' }}
      >
        {/* Label */}
        <p
          style={{
            fontSize:      11,
            fontWeight:    600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         colors.purple,
            marginBottom:  20,
          }}
        >
          Start My Business Plan
        </p>

        {/* Heading */}
        <h1
          style={{
            fontSize:      36,
            fontWeight:    700,
            color:         colors.dark,
            textAlign:     'center',
            marginBottom:  48,
            letterSpacing: '-0.02em',
          }}
        >
          Tell us your idea or skill
        </h1>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          style={{ width: '100%', maxWidth: 520 }}
        >
          <div
            style={{
              display:      'flex',
              alignItems:   'center',
              background:   '#ffffff',
              borderRadius: 16,
              padding:      '6px 6px 6px 22px',
              boxShadow:    '0 4px 32px rgba(100,80,200,0.1)',
              border:       '1.5px solid rgba(200,195,225,0.5)',
              transition:   'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocusCapture={(e) => {
              e.currentTarget.style.borderColor = colors.purple;
              e.currentTarget.style.boxShadow   = '0 4px 32px rgba(124,92,204,0.2)';
            }}
            onBlurCapture={(e) => {
              e.currentTarget.style.borderColor = 'rgba(200,195,225,0.5)';
              e.currentTarget.style.boxShadow   = '0 4px 32px rgba(100,80,200,0.1)';
            }}
          >
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="E.g. Handmade scented candles"
              disabled={loading}
              style={{
                flex:        1,
                border:      'none',
                outline:     'none',
                background:  'transparent',
                fontSize:    15,
                color:       colors.dark,
                padding:     '10px 0',
              }}
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={loading || !idea.trim()}
              style={{
                width:        44,
                height:       44,
                borderRadius: 11,
                background:   loading || !idea.trim() ? '#c4b5e0' : colors.authBtn,
                border:       'none',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                flexShrink:   0,
                transition:   'background 0.2s, transform 0.18s',
                cursor:       loading || !idea.trim() ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => { if (!loading && idea.trim()) e.currentTarget.style.transform = 'scale(1.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {loading ? (
                /* Spinner */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
                  style={{ animation: 'spin 0.8s linear infinite' }}>
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                </svg>
              ) : (
                /* Arrow */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p style={{ marginTop: 12, fontSize: 13, color: '#ef4444', textAlign: 'center' }}>
              {error}
            </p>
          )}

          {/* Loading message */}
          {loading && (
            <p style={{ marginTop: 14, fontSize: 13, color: colors.muted, textAlign: 'center' }}>
              ✨ Generating your business plan… this may take a few seconds.
            </p>
          )}
        </form>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid rgba(200,195,225,0.25)' }}>
        <p style={{ fontSize: 10.5, letterSpacing: '0.13em', color: '#aaa', textTransform: 'uppercase' }}>
          © 2026 NexpreneurAI. All Rights Reserved
        </p>
      </footer>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
