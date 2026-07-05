import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { adminGetStatsAPI } from '@/services/api';
import { colors } from '@/constants/colors';

function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div style={{
      background:   '#fff',
      borderRadius: 16,
      padding:      '24px 28px',
      border:       '1.5px solid rgba(200,195,225,0.4)',
      boxShadow:    '0 2px 12px rgba(100,80,180,0.05)',
      display:      'flex',
      alignItems:   'center',
      gap:          20,
    }}>
      <div style={{
        width:          52,
        height:         52,
        borderRadius:   14,
        background:     accent + '18',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
        color:          accent,
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 13, color: colors.muted, margin: '0 0 4px', fontWeight: 500 }}>{label}</p>
        <p style={{ fontSize: 32, fontWeight: 700, color: colors.dark, margin: 0, lineHeight: 1 }}>{value ?? '—'}</p>
        {sub && <p style={{ fontSize: 12, color: colors.muted, margin: '4px 0 0' }}>{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate         = useNavigate();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin/login'); return; }

    adminGetStatsAPI(token)
      .then((data) => {
        if (data.message) { setError(data.message); }
        else { setStats(data); }
      })
      .catch(() => setError('Failed to load stats'));
  }, [navigate]);

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1000 }}>

        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: colors.dark, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            Dashboard
          </h1>
          <p style={{ fontSize: 14, color: colors.muted, margin: 0 }}>
            Overview of all registered users on the platform.
          </p>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 16px', marginBottom: 24, color: '#dc2626', fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
          <StatCard
            label="Total Users"
            value={stats?.total}
            sub="All registered accounts"
            accent={colors.purple}
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
          />
          <StatCard
            label="Active Users"
            value={stats?.active}
            sub="Accounts currently enabled"
            accent="#16a34a"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
          />
          <StatCard
            label="Inactive Users"
            value={stats?.inactive}
            sub="Accounts currently disabled"
            accent="#dc2626"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>}
          />
          <StatCard
            label="New This Week"
            value={stats?.newThisWeek}
            sub="Registered in the last 7 days"
            accent="#d97706"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
          />
          <StatCard
            label="New This Month"
            value={stats?.newThisMonth}
            sub="Registered this calendar month"
            accent="#0891b2"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
          />
          <StatCard
            label="Active Rate"
            value={stats ? `${Math.round((stats.active / (stats.total || 1)) * 100)}%` : null}
            sub="Percentage of active accounts"
            accent={colors.purpleMid}
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>}
          />
        </div>

        {/* Quick action */}
        <div style={{
          background:   '#fff',
          borderRadius: 16,
          padding:      '28px 32px',
          border:       '1.5px solid rgba(200,195,225,0.4)',
          boxShadow:    '0 2px 12px rgba(100,80,180,0.05)',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'space-between',
          gap:          24,
        }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 600, color: colors.dark, margin: '0 0 6px' }}>Manage Users</h3>
            <p style={{ fontSize: 13.5, color: colors.muted, margin: 0 }}>
              View all accounts, activate or deactivate users, update passwords, and delete accounts.
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/users')}
            style={{
              padding:      '11px 28px',
              background:   colors.authBtn,
              color:        '#fff',
              border:       'none',
              borderRadius: 99,
              fontSize:     14,
              fontWeight:   600,
              cursor:       'pointer',
              flexShrink:   0,
              transition:   'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#3d3870'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = colors.authBtn; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Go to Users
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
