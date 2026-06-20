import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(() => localStorage.getItem('nexpreneurai_token'));
  const [loading, setLoading] = useState(true);

  /* Verify stored token on mount */
  useEffect(() => {
    if (!token) { setLoading(false); return; }

    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          _clear();
        }
      })
      .catch(_clear)
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line

  const _clear = () => {
    localStorage.removeItem('nexpreneurai_token');
    setToken(null);
    setUser(null);
  };

  /* Called after login/register/google */
  const login = (newToken, userData) => {
    localStorage.setItem('nexpreneurai_token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => _clear();

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
