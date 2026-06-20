/**
 * BracketTitle — wraps children with corner bracket decorations.
 * Used for section headings: How It Works, Gallery, FAQ, etc.
 */
export default function BracketTitle({ children, className = '' }) {
  const corner = {
    position: 'absolute',
    width:    18,
    height:   18,
  };

  return (
    <div
      className={className}
      style={{ position: 'relative', display: 'inline-block', padding: '8px 32px' }}
    >
      <span style={{ ...corner, top: 0, left: 0,  borderTop:    '2px solid #9ca3af', borderLeft:  '2px solid #9ca3af' }} />
      <span style={{ ...corner, top: 0, right: 0, borderTop:    '2px solid #9ca3af', borderRight: '2px solid #9ca3af' }} />
      <span style={{ ...corner, bottom: 0, left: 0,  borderBottom: '2px solid #9ca3af', borderLeft:  '2px solid #9ca3af' }} />
      <span style={{ ...corner, bottom: 0, right: 0, borderBottom: '2px solid #9ca3af', borderRight: '2px solid #9ca3af' }} />
      {children}
    </div>
  );
}
