import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Footer          from '@/components/Footer/Footer';
import { gradients, colors } from '@/constants/colors';

/* ══════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════ */
const RawMaterialsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <path d="M3 9h18M9 21V9"/>
  </svg>
);
const ToolsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6">
    <line x1="4" y1="20" x2="20" y2="4"/><line x1="4" y1="4" x2="20" y2="20"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const BrandingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);
const OperationsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);
const VibeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);
const PaletteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6">
    <circle cx="13.5" cy="6.5" r=".5" fill="#9ca3af"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="#9ca3af"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="#9ca3af"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="#9ca3af"/>
    <path d="M12 2C6.5 2 2 6.5 2 12a10 10 0 0 0 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);
const NamesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6">
    <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
  </svg>
);
const PackagingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const PhotoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.purple} strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);
const DocIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.purple} strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const TagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.purple} strokeWidth="1.8">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const MegaphoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.purple} strokeWidth="1.8">
    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
  </svg>
);

/* Platform SVG icons */
const InstagramIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fd5949"/>
        <stop offset="50%" stopColor="#d6249f"/>
        <stop offset="100%" stopColor="#285AEB"/>
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig)"/>
    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
    <circle cx="17.2" cy="6.8" r="1.2" fill="white"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="6" fill="#1877F2"/>
    <path d="M15.5 8H13V6.5c0-.6.4-1 1-1H15V3h-2c-2.2 0-3.5 1.5-3.5 3.5V8H8v2.5h1.5V21h3V10.5H14l.5-2.5z" fill="white"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="6" fill="#25D366"/>
    <path d="M12 4a8 8 0 0 0-6.9 12L4 20l4.1-1.1A8 8 0 1 0 12 4z" fill="white"/>
    <path d="M9 8.5c-.3 0-.8.4-1 .9-.2.5-.1 1.2.7 2.2.8 1 2.4 2.5 3.8 3 1.4.5 1.7.3 2-.1.2-.4.7-1 .8-1.2.1-.2 0-.4-.1-.5l-1.5-.7c-.2-.1-.4 0-.5.1l-.5.7c-.1.1-.3.1-.4 0-.6-.3-1.8-1-2.4-2.1-.1-.1-.1-.3 0-.4l.5-.5c.1-.1.2-.3.1-.4l-.7-1.5c-.1-.2-.3-.5-.8-.5z" fill="#25D366"/>
  </svg>
);
const EtsyIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="6" fill="#F45800"/>
    <text x="5" y="17" fontSize="13" fontWeight="bold" fill="white">E</text>
  </svg>
);
const TikTokIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="6" fill="#010101"/>
    <path d="M17 7.5a3 3 0 0 1-3-3H11v9.5a1.5 1.5 0 1 1-1.8-1.45V9.4A4.5 4.5 0 1 0 14 13.7V10a6 6 0 0 0 3.5 1.1V8c-.8 0-1.5-.2-2.2-.5H17z" fill="white"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="6" fill="#0A66C2"/>
    <path d="M7 9.5H5V19h2V9.5zm-1-4a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 6 5.5zm3.5 4H11V11s.5-1.5 2.5-1.5S16 11 16 13v6h-2v-5.5c0-1-.5-2-1.5-2S11 12 11 13v6H9.5V9.5z" fill="white"/>
  </svg>
);

const PLATFORM_MAP = {
  'Instagram':           { Icon: InstagramIcon, bg: 'rgba(180,60,200,0.07)' },
  'Facebook Marketplace':{ Icon: FacebookIcon,  bg: 'rgba(24,119,242,0.07)' },
  'WhatsApp':            { Icon: WhatsAppIcon,  bg: 'rgba(37,211,102,0.07)' },
  'Etsy':                { Icon: EtsyIcon,      bg: 'rgba(244,88,0,0.07)'   },
  'TikTok':              { Icon: TikTokIcon,    bg: 'rgba(1,1,1,0.05)'      },
  'LinkedIn':            { Icon: LinkedInIcon,  bg: 'rgba(10,102,194,0.07)' },
};

const WHAT_YOU_NEED_ICONS = [RawMaterialsIcon, ToolsIcon, BrandingIcon, OperationsIcon];
const BRANDING_ICONS      = [VibeIcon, PaletteIcon, NamesIcon, PackagingIcon];

const AI_TOOLS = [
  { name: 'AI Photo Generator',         desc: 'Generate professional product images',  btn: 'Generate photos',       Icon: PhotoIcon,      route: '/dashboard' },
  { name: 'Product Description Generator', desc: 'Create engaging product listings',    btn: 'Generate descriptions', Icon: DocIcon,         route: '/business-plan' },
  { name: 'AI Pricing Tool',             desc: 'Optimize pricing for profit',           btn: 'Analyze pricing',       Icon: TagIcon,         route: '/dashboard' },
  { name: 'Marketing Post Generator',   desc: 'Create social media captions',          btn: 'Create posts',          Icon: MegaphoneIcon,   route: '/dashboard' },
];

/* ══════════════════════════════════════════════════
   SECTION WRAPPER — title + × toggle
══════════════════════════════════════════════════ */
function SectionCard({ title, subtitle, isOpen, onToggle, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden',
      border: '1px solid rgba(200,195,225,0.35)', boxShadow: '0 2px 12px rgba(100,80,180,0.05)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        padding: '24px 28px', borderBottom: isOpen ? '1px solid #f4f2fc' : 'none' }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.dark, marginBottom: 0 }}>{title}</h2>
          {subtitle && isOpen && (
            <p style={{ fontSize: 12.5, color: colors.purple, marginTop: 5 }}>{subtitle}</p>
          )}
        </div>
        <button onClick={onToggle}
          style={{ background: 'none', border: 'none', fontSize: 20, color: '#aaa', cursor: 'pointer',
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 8, transition: 'background 0.15s, color 0.15s', marginTop: 2, flexShrink: 0 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f4f2fc'; e.currentTarget.style.color = colors.purple; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#aaa'; }}
        >
          {isOpen ? '×' : '+'}
        </button>
      </div>
      {/* Content */}
      {isOpen && <div style={{ padding: '24px 28px 28px' }}>{children}</div>}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SECTION 1 — What You Need
══════════════════════════════════════════════════ */
function WhatYouNeed({ data }) {
  const cats = data?.categories || [];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
      {cats.map((cat, i) => {
        const Icon = WHAT_YOU_NEED_ICONS[i] || OperationsIcon;
        return (
          <div key={i} style={{ background: '#fafafa', borderRadius: 14, padding: '18px 16px',
            border: '1.5px solid #ede9f8', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,92,204,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', border: '1.5px solid #ede9f8',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Icon />
            </div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: colors.dark, marginBottom: 10 }}>{cat.category}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {(cat.items || []).map((item, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 12.5, color: '#555' }}>
                  <span style={{ color: '#c4b5fd', fontSize: 10, marginTop: 4, flexShrink: 0 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SECTION 2 — Step-by-step guide
══════════════════════════════════════════════════ */
function StartupGuide({ data }) {
  const steps = data?.steps || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: colors.authBtn, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 2, height: 28, backgroundImage: 'repeating-linear-gradient(to bottom, #c4b5fd 0px, #c4b5fd 4px, transparent 4px, transparent 8px)', marginTop: 2 }}/>
            )}
          </div>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, paddingTop: 5, marginBottom: i < steps.length - 1 ? 10 : 0 }}>
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SECTION 3 — Branding Suggestions
══════════════════════════════════════════════════ */
function BrandingSuggestions({ data }) {
  if (!data) return null;
  const cards = [
    { title: 'Brand Vibe',       type: 'vibe',      Icon: BRANDING_ICONS[0] },
    { title: 'Color Palette',    type: 'colors',    Icon: BRANDING_ICONS[1] },
    { title: 'Brand name ideas', type: 'names',     Icon: BRANDING_ICONS[2] },
    { title: 'Packaging Idea',   type: 'packaging', Icon: BRANDING_ICONS[3] },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
      {cards.map(({ title, type, Icon }) => (
        <div key={type} style={{ background: '#fafafa', borderRadius: 14, padding: '18px 16px',
          border: '1.5px solid #ede9f8', transition: 'transform 0.2s', }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', border: '1.5px solid #ede9f8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <Icon />
          </div>
          <h4 style={{ fontSize: 13.5, fontWeight: 700, color: colors.dark, marginBottom: 10 }}>{title}</h4>

          {type === 'vibe' && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {(data.brand_vibe || []).map((v, i) => (
                <li key={i} style={{ fontSize: 12.5, color: '#555', display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ color: '#c4b5fd' }}>•</span>{v}
                </li>
              ))}
            </ul>
          )}

          {type === 'colors' && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(data.colors || []).map((c, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: c.hex,
                    border: '2px solid rgba(255,255,255,0.8)', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', marginBottom: 4 }}/>
                  <p style={{ fontSize: 10, color: '#777', lineHeight: 1.2, maxWidth: 36 }}>{c.name}</p>
                </div>
              ))}
            </div>
          )}

          {type === 'names' && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {(data.brand_names || []).map((n, i) => (
                <li key={i} style={{ fontSize: 12.5, color: '#555', display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ color: '#c4b5fd' }}>•</span>{n}
                </li>
              ))}
            </ul>
          )}

          {type === 'packaging' && (
            <p style={{ fontSize: 12.5, color: '#555', lineHeight: 1.6 }}>{data.packaging_idea}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SECTION 4 — Where to Sell
══════════════════════════════════════════════════ */
function WhereToSell({ data }) {
  const platforms = data?.platforms || [];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(platforms.length, 3)}, 1fr)`, gap: 16 }}>
      {platforms.map(({ platform, description }, i) => {
        const cfg   = PLATFORM_MAP[platform] || { Icon: InstagramIcon, bg: 'rgba(124,92,204,0.07)' };
        const PIcon = cfg.Icon;
        return (
          <div key={i} style={{ background: cfg.bg, borderRadius: 16, padding: '24px 20px', textAlign: 'center',
            border: '1.5px solid rgba(200,195,225,0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><PIcon /></div>
            <h4 style={{ fontSize: 14.5, fontWeight: 700, color: colors.dark, marginBottom: 6 }}>{platform}</h4>
            <p style={{ fontSize: 12.5, color: colors.muted, lineHeight: 1.55 }}>{description}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SECTION 5 — AI Tools (hardcoded)
══════════════════════════════════════════════════ */
function AIToolsSection({ navigate }) {
  const DotPattern = () => (
    <div style={{ position: 'absolute', top: 10, right: 10, width: 64, height: 64, opacity: 0.12, pointerEvents: 'none' }}>
      {[...Array(9)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: colors.purple,
          top: Math.floor(i / 3) * 22, left: (i % 3) * 22 }}/>
      ))}
    </div>
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {AI_TOOLS.map(({ name, desc, btn, Icon, route }) => (
        <div key={name} style={{ position: 'relative', background: '#fafafa', borderRadius: 14, padding: '20px 20px 16px',
          border: '1.5px solid #ede9f8', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,92,204,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
          <DotPattern />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', border: '1.5px solid #ede9f8',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon />
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: colors.dark }}>{name}</h4>
              <p style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{desc}</p>
            </div>
          </div>
          <button onClick={() => navigate(route)}
            style={{ background: colors.authBtn, color: 'white', border: 'none', borderRadius: 8,
              padding: '8px 16px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', marginTop: 8,
              transition: 'background 0.18s, transform 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#3d3870'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = colors.authBtn; e.currentTarget.style.transform = 'scale(1)'; }}>
            {btn}
          </button>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SECTION 6 — First 10 Actions
══════════════════════════════════════════════════ */
function First10Actions({ data }) {
  const actions = data?.actions || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {actions.map((action, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: colors.authBtn, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
              {i + 1}
            </div>
            {i < actions.length - 1 && (
              <div style={{ width: 2, height: 28, backgroundImage: 'repeating-linear-gradient(to bottom, #c4b5fd 0px, #c4b5fd 4px, transparent 4px, transparent 8px)', marginTop: 2 }}/>
            )}
          </div>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, paddingTop: 5, marginBottom: i < actions.length - 1 ? 10 : 0 }}>
            {action}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
export default function BusinessPlanResult() {
  const navigate  = useNavigate();
  const { state } = useLocation();

  const [open, setOpen] = useState({
    what_you_need:   true,
    startup_guide:   true,
    branding:        true,
    where_to_sell:   true,
    ai_tools:        true,
    first_10_actions:true,
  });

  if (!state?.plan) {
    navigate('/business-plan');
    return null;
  }

  const { idea, plan } = state;
  const toggle = (key) => setOpen(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ minHeight: '100vh', background: gradients.hero, display: 'flex', flexDirection: 'column' }}>
      <DashboardNavbar />

      <main style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '48px 40px 64px' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.purple, marginBottom: 14 }}>
            Start My Business Plan
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: colors.dark, letterSpacing: '-0.02em', marginBottom: 24 }}>
            Generate Full Business Plan
          </h1>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(200,195,225,0.5)', borderRadius: 12, padding: '12px 20px',
            backdropFilter: 'blur(8px)', maxWidth: '90%' }}>
            <p style={{ margin: 0, fontSize: 12 }}>
              <span style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', fontSize: 11 }}>Based on your idea:{' '}</span>
              <span style={{ fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: colors.dark }}>{idea}</span>
            </p>
            <button onClick={() => navigate('/business-plan')}
              style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 12.5, color: colors.purple, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0, transition: 'opacity 0.18s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit Idea
            </button>
          </div>
        </div>

        {/* ── Sections ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          <SectionCard title="What You Need" subtitle={plan.what_you_need?.subtitle}
            isOpen={open.what_you_need} onToggle={() => toggle('what_you_need')}>
            <WhatYouNeed data={plan.what_you_need}/>
          </SectionCard>

          <SectionCard title="Step-by-step startup guide" subtitle={plan.startup_guide?.subtitle}
            isOpen={open.startup_guide} onToggle={() => toggle('startup_guide')}>
            <StartupGuide data={plan.startup_guide}/>
          </SectionCard>

          <SectionCard title="Branding Suggestions" subtitle={plan.branding?.subtitle}
            isOpen={open.branding} onToggle={() => toggle('branding')}>
            <BrandingSuggestions data={plan.branding}/>
          </SectionCard>

          <SectionCard title="Where to sell" subtitle={plan.where_to_sell?.subtitle}
            isOpen={open.where_to_sell} onToggle={() => toggle('where_to_sell')}>
            <WhereToSell data={plan.where_to_sell}/>
          </SectionCard>

          <SectionCard title="AI tools to use inside our platform"
            subtitle="Tools available right now to build your business faster"
            isOpen={open.ai_tools} onToggle={() => toggle('ai_tools')}>
            <AIToolsSection navigate={navigate}/>
          </SectionCard>

          <SectionCard title="Your first 10 actions" subtitle={plan.first_10_actions?.subtitle}
            isOpen={open.first_10_actions} onToggle={() => toggle('first_10_actions')}>
            <First10Actions data={plan.first_10_actions}/>
          </SectionCard>

          {/* CTA */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '44px 32px', textAlign: 'center',
            border: '1px solid rgba(200,195,225,0.35)', boxShadow: '0 2px 12px rgba(100,80,180,0.05)' }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: colors.dark, marginBottom: 10 }}>
              Choose how you want to move forward
            </h3>
            <p style={{ fontSize: 13.5, color: colors.muted, lineHeight: 1.7, maxWidth: 400, margin: '0 auto 24px' }}>
              Use AI tools to get tasks done instantly, or explore guides to learn more about selling and growing.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <button onClick={() => navigate('/dashboard')}
                style={{ background: colors.authBtn, color: 'white', border: 'none', borderRadius: 99,
                  padding: '11px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#3d3870'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = colors.authBtn; e.currentTarget.style.transform = 'translateY(0)'; }}>
                Use AI Tools
              </button>
              <button onClick={() => navigate('/home')}
                style={{ background: '#fff', color: colors.dark, border: '1.5px solid #d1d5db',
                  borderRadius: 99, padding: '11px 28px', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.purple; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                Visit Learning Hub
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}