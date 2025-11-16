import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "http://192.168.15.11:8080";

const router = useRouter();
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
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
    if (error.response?.status === 401 || error.response?.status === 403) {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user_id");
      api.defaults.headers.common["Authorization"] = "";
      router.replace("/");
    }
    return Promise.reject(error);
  }
);
