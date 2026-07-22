import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import {
  adminGetUsersAPI,
  adminToggleStatusAPI,
  adminUpdatePasswordAPI,
  adminDeleteUserAPI,
} from '@/services/api';
import { colors } from '@/constants/colors';

/* ── Small reusable components ──────────────────── */
function Badge({ active }) {
  return (
    <span style={{
      display:      'inline-flex',
      alignItems:   'center',
      gap:          5,
      padding:      '3px 10px',
      borderRadius: 99,
      fontSize:     12,
      fontWeight:   600,
      background:   active ? '#dcfce7' : '#fee2e2',
      color:        active ? '#16a34a' : '#dc2626',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: active ? '#16a34a' : '#dc2626', display: 'inline-block' }} />
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position:       'fixed',
      inset:          0,
      background:     'rgba(0,0,0,0.45)',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      zIndex:         1000,
      padding:        24,
    }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background:   '#fff',
        borderRadius: 18,
        padding:      '32px 36px',
        width:        '100%',
        maxWidth:     440,
        boxShadow:    '0 24px 64px rgba(0,0,0,0.18)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: colors.dark, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.muted, fontSize: 20, lineHeight: 1, padding: 4 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Main page ──────────────────────────────────── */
export default function AdminUsers() {
  const navigate = useNavigate();
  const token    = localStorage.getItem('adminToken');

  const [users,    setUsers]    = useState([]);
  const [total,    setTotal]    = useState(0);
  const [page,     setPage]     = useState(1);
  const [pages,    setPages]    = useState(1);
  const [search,   setSearch]   = useState('');
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState('');
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Password modal state */
  const [pwdModal,   setPwdModal]   = useState(null); // user object
  const [newPwd,     setNewPwd]     = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError,   setPwdError]   = useState('');

  /* Delete confirm modal */
  const [delModal,   setDelModal]   = useState(null);
  const [delLoading, setDelLoading] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchUsers = useCallback(async (pg = page, q = search) => {
    if (!token) { navigate('/admin/login'); return; }
    setLoading(true);
    try {
      const data = await adminGetUsersAPI(token, { search: q, page: pg });
      if (data.message) { navigate('/admin/login'); return; }
      setUsers(data.users);
      setTotal(data.total);
      setPages(data.pages);
    } finally {
      setLoading(false);
    }
  }, [token, navigate, page, search]);

  useEffect(() => { fetchUsers(1, ''); }, []);

  /* Search with debounce */
  useEffect(() => {
    const id = setTimeout(() => { setPage(1); fetchUsers(1, search); }, 350);
    return () => clearTimeout(id);
  }, [search]);

  /* Toggle active/inactive */
  const handleToggle = async (user) => {
    const data = await adminToggleStatusAPI(token, user._id);
    if (data.message && data.isActive === undefined) { showToast(data.message); return; }
    setUsers((prev) => prev.map((u) => u._id === user._id ? { ...u, isActive: data.isActive } : u));
    showToast(`${user.name} has been ${data.isActive ? 'activated' : 'deactivated'}.`);
  };

  /* Update password */
  const handlePasswordSave = async () => {
    setPwdError('');
    if (newPwd.length < 6) { setPwdError('Password must be at least 6 characters.'); return; }
    setPwdLoading(true);
    try {
      const data = await adminUpdatePasswordAPI(token, pwdModal._id, newPwd);
      showToast(data.message || 'Password updated.');
      setPwdModal(null);
      setNewPwd('');
    } finally {
      setPwdLoading(false);
    }
  };

  /* Delete user */
  const handleDelete = async () => {
    setDelLoading(true);
    try {
      await adminDeleteUserAPI(token, delModal._id);
      setUsers((prev) => prev.filter((u) => u._id !== delModal._id));
      setTotal((t) => t - 1);
      showToast(`${delModal.name} deleted.`);
      setDelModal(null);
    } finally {
      setDelLoading(false);
    }
  };

  const inputStyle = {
    width:        '100%',
    padding:      '10px 14px',
    fontSize:     14,
    border:       '1.5px solid #e0e0e8',
    borderRadius: 10,
    outline:      'none',
    boxSizing:    'border-box',
    color:        colors.dark,
    transition:   'border-color 0.2s',
  };

  return (
    <AdminLayout>

      {/* Toast */}
      {toast && (
        <div style={{
          position:     'fixed',
          bottom:       isMobile ? 16 : 28,
          right:        isMobile ? 14 : 28,
          left:         isMobile ? 14 : 'auto',
          background:   colors.authBtn,
          color:        '#fff',
          padding:      '12px 20px',
          borderRadius: 10,
          fontSize:     14,
          fontWeight:   500,
          zIndex:       2000,
          boxShadow:    '0 8px 24px rgba(0,0,0,0.18)',
          textAlign:    isMobile ? 'center' : 'left',
        }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'flex-start', marginBottom: 24, gap: 14 }}>
        <div>
          <h1 style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, color: colors.dark, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            User Management
          </h1>
          <p style={{ fontSize: 14, color: colors.muted, margin: 0 }}>{total} registered user{total !== 1 ? 's' : ''}</p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, width: isMobile ? '100%' : 280 }}
          onFocus={(e) => { e.target.style.borderColor = colors.purple; }}
          onBlur={(e)  => { e.target.style.borderColor = '#e0e0e8'; }}
        />
      </div>

      {/* Table */}
      <div style={{
        background:   '#fff',
        borderRadius: 16,
        border:       '1.5px solid rgba(200,195,225,0.4)',
        boxShadow:    '0 2px 12px rgba(100,80,180,0.05)',
        overflow:     'hidden',
        marginBottom: 24,
      }}>
        <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: 660, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9f8fd', borderBottom: '1.5px solid rgba(200,195,225,0.4)' }}>
              {['Name', 'Email', 'Provider', 'Status', 'Joined', 'Actions'].map((h) => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '48px 20px', color: colors.muted, fontSize: 14 }}>
                  Loading…
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '48px 20px', color: colors.muted, fontSize: 14 }}>
                  No users found.
                </td>
              </tr>
            ) : users.map((user, i) => (
              <tr key={user._id} style={{ borderBottom: i < users.length - 1 ? '1px solid rgba(200,195,225,0.3)' : 'none' }}>
                {/* Name */}
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width:          34,
                      height:         34,
                      borderRadius:   '50%',
                      background:     colors.purple + '22',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      fontSize:       13,
                      fontWeight:     700,
                      color:          colors.purple,
                      flexShrink:     0,
                    }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: colors.dark }}>{user.name}</span>
                  </div>
                </td>

                {/* Email */}
                <td style={{ padding: '14px 20px', fontSize: 13.5, color: colors.text }}>{user.email}</td>

                {/* Provider */}
                <td style={{ padding: '14px 20px' }}>
                  <span style={{
                    fontSize:     12,
                    fontWeight:   600,
                    padding:      '3px 10px',
                    borderRadius: 99,
                    background:   user.provider === 'google' ? '#fef3c7' : '#ede9fe',
                    color:        user.provider === 'google' ? '#d97706' : colors.purple,
                  }}>
                    {user.provider === 'google' ? 'Google' : 'Email'}
                  </span>
                </td>

                {/* Status */}
                <td style={{ padding: '14px 20px' }}>
                  <Badge active={user.isActive} />
                </td>

                {/* Joined */}
                <td style={{ padding: '14px 20px', fontSize: 13, color: colors.muted, whiteSpace: 'nowrap' }}>
                  {new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>

                {/* Actions */}
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {/* Toggle active */}
                    <button
                      onClick={() => handleToggle(user)}
                      title={user.isActive ? 'Deactivate' : 'Activate'}
                      style={{
                        padding:      '6px 12px',
                        fontSize:     12,
                        fontWeight:   600,
                        borderRadius: 7,
                        border:       `1.5px solid ${user.isActive ? '#fecaca' : '#bbf7d0'}`,
                        background:   user.isActive ? '#fef2f2' : '#f0fdf4',
                        color:        user.isActive ? '#dc2626' : '#16a34a',
                        cursor:       'pointer',
                        whiteSpace:   'nowrap',
                        transition:   'all 0.18s',
                      }}
                    >
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </button>

                    {/* Update password */}
                    <button
                      onClick={() => { setPwdModal(user); setNewPwd(''); setPwdError(''); }}
                      title="Update password"
                      style={{
                        padding:      '6px 12px',
                        fontSize:     12,
                        fontWeight:   600,
                        borderRadius: 7,
                        border:       `1.5px solid #e0d9f7`,
                        background:   '#f5f3ff',
                        color:        colors.purple,
                        cursor:       'pointer',
                        whiteSpace:   'nowrap',
                        transition:   'all 0.18s',
                      }}
                    >
                      Password
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDelModal(user)}
                      title="Delete user"
                      style={{
                        width:          32,
                        height:         32,
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        borderRadius:   7,
                        border:         '1.5px solid #fecaca',
                        background:     '#fef2f2',
                        color:          '#dc2626',
                        cursor:         'pointer',
                        flexShrink:     0,
                        transition:     'all 0.18s',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {Array.from({ length: pages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => { setPage(pg); fetchUsers(pg, search); }}
              style={{
                width:        36,
                height:       36,
                borderRadius: 8,
                border:       `1.5px solid ${pg === page ? colors.authBtn : '#e0e0e8'}`,
                background:   pg === page ? colors.authBtn : '#fff',
                color:        pg === page ? '#fff' : colors.dark,
                fontSize:     14,
                fontWeight:   pg === page ? 700 : 400,
                cursor:       'pointer',
              }}
            >
              {pg}
            </button>
          ))}
        </div>
      )}

      {/* ── Password Modal ───────────────────────── */}
      {pwdModal && (
        <Modal title={`Update Password — ${pwdModal.name}`} onClose={() => setPwdModal(null)}>
          <p style={{ fontSize: 13.5, color: colors.muted, margin: '0 0 20px' }}>
            Set a new password for <strong>{pwdModal.email}</strong>
          </p>
          <input
            type="password"
            placeholder="New password (min 6 characters)"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            style={{ ...inputStyle, marginBottom: 12 }}
            onFocus={(e) => { e.target.style.borderColor = colors.purple; }}
            onBlur={(e)  => { e.target.style.borderColor = '#e0e0e8'; }}
          />
          {pwdError && <p style={{ fontSize: 13, color: '#dc2626', margin: '0 0 12px' }}>{pwdError}</p>}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button
              onClick={() => setPwdModal(null)}
              style={{ padding: '10px 20px', background: '#f4f3fb', color: colors.dark, border: '1.5px solid #e0e0e8', borderRadius: 10, fontSize: 14, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              onClick={handlePasswordSave}
              disabled={pwdLoading}
              style={{ padding: '10px 24px', background: colors.authBtn, color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: pwdLoading ? 'not-allowed' : 'pointer' }}
            >
              {pwdLoading ? 'Saving…' : 'Save Password'}
            </button>
          </div>
        </Modal>
      )}

      {/* ── Delete Confirm Modal ─────────────────── */}
      {delModal && (
        <Modal title="Delete User" onClose={() => setDelModal(null)}>
          <p style={{ fontSize: 14, color: colors.text, margin: '0 0 24px', lineHeight: 1.6 }}>
            Are you sure you want to permanently delete <strong>{delModal.name}</strong> ({delModal.email})?
            This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button
              onClick={() => setDelModal(null)}
              style={{ padding: '10px 20px', background: '#f4f3fb', color: colors.dark, border: '1.5px solid #e0e0e8', borderRadius: 10, fontSize: 14, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={delLoading}
              style={{ padding: '10px 24px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: delLoading ? 'not-allowed' : 'pointer' }}
            >
              {delLoading ? 'Deleting…' : 'Delete User'}
            </button>
          </div>
        </Modal>
      )}

    </AdminLayout>
  );
}
