/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import { sessionService } from '../services/session';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => sessionService.getSession());

  const login = useCallback((accessToken, refreshToken, user) => {
    sessionService.saveSession(accessToken, refreshToken, user);
    setAuth({ accessToken, user });
  }, []);

  const logout = useCallback(() => {
    sessionService.clearSession();
    setAuth(null);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
