import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

// Carrega variáveis de ambiente
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://192.168.15.11:8080";
const API_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || "15000");

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: API_TIMEOUT,
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url ?? "";
    const isAuthError =
      error.response?.status === 401 || error.response?.status === 403;
    const isLoginEndpoint =
      requestUrl === "/" || requestUrl.includes("/login");

    if (isAuthError && !isLoginEndpoint) {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user_id");
      api.defaults.headers.common["Authorization"] = "";
      router.replace("/");
    }
    return Promise.reject(error);
  }
);
