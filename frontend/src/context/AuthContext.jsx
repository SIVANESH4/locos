import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = () => {
      if (authService.isAuthenticated()) {
        const storedUser = authService.getStoredUser();
        setUser(storedUser);
      } else {
        authService.logout();
        setUser(null);
      }
      setLoading(false);
    };

    initAuth();

    // Listen for global logout events (e.g., failed refresh token)
    const handleGlobalLogout = () => {
      setUser(null);
    };

    window.addEventListener('auth:logout', handleGlobalLogout);
    return () => window.removeEventListener('auth:logout', handleGlobalLogout);
  }, []);

  const login = async (credentials) => {
    const { user: loggedInUser } = await authService.login(credentials);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (userData) => {
    return await authService.register(userData);
  };

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isCustomer: user?.role === 'CUSTOMER',
    isTechnician: user?.role === 'TECHNICIAN',
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
