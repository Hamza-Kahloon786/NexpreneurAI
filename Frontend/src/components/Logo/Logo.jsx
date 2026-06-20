/**
 * Logo — nested square icon.
 * @param {boolean} light  - white variant (for dark backgrounds)
 * @param {number}  size   - pixel size (default 34)
 */
export default function Logo({ light = false, size = 34 }) {
  const outer = light ? '#ffffff' : '#1c1a2e';
  const inner = light ? '#1c1a2e' : '#ffffff';
  const dot   = light ? '#ffffff' : '#1c1a2e';

  return (
    <div
      style={{
        width:          size,
        height:         size,
        background:     outer,
        borderRadius:   size * 0.26,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
      }}
    >
      <div
        style={{
          width:          size * 0.5,
          height:         size * 0.5,
          background:     inner,
          borderRadius:   size * 0.12,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width:        size * 0.21,
            height:       size * 0.21,
            background:   dot,
            borderRadius: size * 0.06,
          }}
        />
      </div>
    </div>
  );
}
