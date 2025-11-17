import { api } from '@/src/config/api';
import LoginService from '@/src/services/login/login_service';
import type { AuthContextType, AuthState, LoginCredentials } from '@/src/types/auth';
import {
  clearAuthCredentials,
  getAuthCredentials,
  saveAuthCredentials,
} from '@/src/utils/storage';
import { router } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<AuthContextType>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
    userId: null,
  });

  const login = async (data: LoginCredentials) => {
    try {
      const response = await LoginService.login(data);
      
      setAuthState({
        token: response.token,
        authenticated: true,
        userId: response.id,
      });

      // Configure API header
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      
      // Save to secure storage
      await saveAuthCredentials(response.token, response.id);
      
      // Navigate to deliveries
      router.push('/deliveries');
      
      return response;
    } catch (e) {
      throw e;
    }
  };

  const logout = async () => {
    // Clear secure storage
    await clearAuthCredentials();
    
    // Clear API header
    api.defaults.headers.common['Authorization'] = '';
    
    // Reset auth state
    setAuthState({
      token: null,
      authenticated: false,
      userId: null,
    });
  };

  // Load token on mount
  useEffect(() => {
    const loadToken = async () => {
      const { token, userId } = await getAuthCredentials();

      if (token && userId) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          token,
          authenticated: true,
          userId,
        });
        router.replace('/deliveries');
      } else {
        await logout();
      }
    };
    
    loadToken();
  }, []);

  const value: AuthContextType = {
    authState,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
