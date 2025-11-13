import { api } from "@/config/api";
import { LoginRequest } from "@/services/login/dtos/login_request";
import LoginService from "@/services/login/login_service";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (data: LoginRequest) => Promise<any>;
  onLogout?: () => Promise<void>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: false,
  });

  const login = async (data: LoginRequest) => {
    try {
      var response = await LoginService.login(data);
      setAuthState({
        token: response.token,
        authenticated: true,
      });
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
      SecureStore.setItemAsync("token", response.token);
      SecureStore.setItemAsync("user_id", response.id);
      router.push("/deliveries");
      return response;
    } catch (e) {
      return { error: true, msg: (e as any).response.msg };
    }
  };
  const logout = async () => {
    SecureStore.deleteItemAsync("token");
    SecureStore.deleteItemAsync("user_id");
    api.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: false,
    });
  };
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
        router.replace("/deliveries");
      } else {
        router.replace("/");
      }
    };
    loadToken();
  }, []);

  const value = {
    authState,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
