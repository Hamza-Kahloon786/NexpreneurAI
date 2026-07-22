import logoImg from './logo.jpeg';

export default function Logo({ size = 34 }) {
  return (
    <img
      src={logoImg}
      alt="NexpreneurAI"
      style={{
        width:        size,
        height:       size,
        borderRadius: size * 0.26,
        objectFit:    'cover',
        display:      'block',
        flexShrink:   0,
      }}
    />
  );
}
