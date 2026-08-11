const BASE = '/api';

const headers = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

/* ── Auth ─────────────────────────────────────── */
export const registerAPI = (data) =>
  fetch(`${BASE}/auth/register`, {
    method:  'POST',
    headers: headers(),
    body:    JSON.stringify(data),
  }).then((r) => r.json());

export const loginAPI = (data) =>
  fetch(`${BASE}/auth/login`, {
    method:  'POST',
    headers: headers(),
    body:    JSON.stringify(data),
  }).then((r) => r.json());

export const getMeAPI = (token) =>
  fetch(`${BASE}/auth/me`, {
    headers: headers(token),
  }).then((r) => r.json());

/* Google OAuth — redirect to backend (not a fetch call) */
export const googleOAuthURL = `${BASE}/auth/google`;

/* ── Admin ────────────────────────────────────── */
export const adminLoginAPI = (data) =>
  fetch(`${BASE}/auth/login`, {
    method:  'POST',
    headers: headers(),
    body:    JSON.stringify(data),
  }).then((r) => r.json());

export const adminGetStatsAPI = (token) =>
  fetch(`${BASE}/admin/stats`, { headers: headers(token) }).then((r) => r.json());

export const adminGetUsersAPI = (token, { search = '', page = 1 } = {}) =>
  fetch(`${BASE}/admin/users?search=${encodeURIComponent(search)}&page=${page}`, {
    headers: headers(token),
  }).then((r) => r.json());

export const adminToggleStatusAPI = (token, id) =>
  fetch(`${BASE}/admin/users/${id}/status`, {
    method:  'PATCH',
    headers: headers(token),
  }).then((r) => r.json());

export const adminUpdatePasswordAPI = (token, id, password) =>
  fetch(`${BASE}/admin/users/${id}/password`, {
    method:  'PATCH',
    headers: headers(token),
    body:    JSON.stringify({ password }),
  }).then((r) => r.json());

export const adminDeleteUserAPI = (token, id) =>
  fetch(`${BASE}/admin/users/${id}`, {
    method:  'DELETE',
    headers: headers(token),
  }).then((r) => r.json());

/* ── Progress ─────────────────────────────────── */
export const getProgressStatsAPI = (token) =>
  fetch(`${BASE}/progress/stats`, { headers: headers(token) }).then((r) => r.json());

export const getProgressRecentAPI = (token) =>
  fetch(`${BASE}/progress/recent`, { headers: headers(token) }).then((r) => r.json());

export const getProgressChartAPI = (token) =>
  fetch(`${BASE}/progress/chart`, { headers: headers(token) }).then((r) => r.json());
