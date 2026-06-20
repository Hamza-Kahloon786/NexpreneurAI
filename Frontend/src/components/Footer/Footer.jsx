import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo/Logo';
import { gradients } from '@/constants/colors';
import { FOOTER_LINKS } from '@/constants/homeData';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ background: gradients.footer }}>
      <div className="mx-auto" style={{ maxWidth: 1200, padding: '56px 56px 32px' }}>

        {/* ── Logo — sits above the main row ───── */}
        <div style={{ marginBottom: 32 }}>
          <Logo light />
        </div>

        {/* ── Main row: heading+text+btn | columns  */}
        <div style={{
          display:         'flex',
          justifyContent:  'space-between',
          alignItems:      'flex-start',
          gap:             60,
          marginBottom:    52,
        }}>

          {/* Left — heading + subtitle + button */}
          <div style={{ flex: '0 0 auto', maxWidth: 480 }}>
            <h3 style={{
              fontSize:      32,
              fontWeight:    400,
              color:         '#ffffff',
              lineHeight:    1.3,
              margin:        '0 0 14px',
              letterSpacing: '-0.01em',
              whiteSpace:    'nowrap',
            }}>
              Ready to build something real?
            </h3>

            <p style={{
              fontSize:     13.5,
              color:        'rgba(255,255,255,0.65)',
              lineHeight:   1.75,
              marginBottom: 28,
              maxWidth:     380,
            }}>
              Turn your ideas into products, services, and systems—powered
              by AI, guided by purpose.
            </p>

            <button
              onClick={() => navigate('/home')}
              style={{
                padding:      '10px 24px',
                fontSize:     13.5,
                fontWeight:   500,
                color:        '#ffffff',
                background:   'rgba(255,255,255,0.12)',
                border:       'none',
                borderRadius: 99,
                cursor:       'pointer',
                transition:   'background 0.2s, transform 0.18s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Support
            </button>
          </div>

          {/* Right — 3 link columns */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '0 72px',
            flexShrink:          0,
          }}>
            {FOOTER_LINKS.map((col, ci) => (
              <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {col.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize:   15,
                      fontWeight: 400,
                      color:      'rgba(255,255,255,0.88)',
                      transition: 'color 0.18s, transform 0.18s',
                      display:    'inline-block',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.88)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 24 }}>
          <p style={{
            textAlign:     'center',
            fontSize:      11,
            letterSpacing: '0.14em',
            color:         'rgba(255,255,255,0.45)',
            textTransform: 'uppercase',
          }}>
            © 2026 NexpreneurAI. All Rights Reserved
          </p>
        </div>

      </div>
    </footer>
  );
}
