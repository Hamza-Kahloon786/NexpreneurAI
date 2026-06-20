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
