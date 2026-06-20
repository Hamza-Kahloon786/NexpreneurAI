/**
 * Design tokens — mirrors CSS variables in index.css.
 * Use in inline styles where Tailwind classes can't reach.
 */
export const colors = {
  dark:       '#1c1a2e',
  purple:     '#7c5ccc',
  purpleDeep: '#3b1f72',
  purpleMid:  '#4c2d8c',
  purpleGlow: '#6a4eaa',
  text:       '#374151',
  muted:      '#6b7280',
  border:     '#e0e0e8',
  authBtn:    '#2d2a4e',
};

export const gradients = {
  hero:    'linear-gradient(155deg,#dce3f8 0%,#e0e6f8 22%,#eaedf9 44%,#e7eff8 64%,#d8eaf4 82%,#cde6f1 100%)',
  lang:    'linear-gradient(145deg,#dae1f5 0%,#e0e6f8 20%,#eaecf9 40%,#e8eff8 60%,#d5e9f3 80%,#cce5f0 100%)',
  auth:    'linear-gradient(160deg,#6b3fbe 0%,#512ea0 40%,#3a1e7a 100%)',
  founder: 'linear-gradient(135deg,#3b1f72 0%,#4c2d8c 45%,#6a4eaa 100%)',
  footer:  'linear-gradient(145deg,#290f5c 0%,#38208a 35%,#4c2d8c 65%,#3a2082 100%)',
  bar:     'linear-gradient(90deg,transparent 5%,#c4b5fd 35%,#93c5fd 65%,transparent 95%)',
};
