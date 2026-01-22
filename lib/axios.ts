import axios from "axios";
import Constants from "expo-constants";

const baseURL =
  (Constants.expoConfig?.extra as any)?.COINGECKO_BASE_URL ||
  "https://api.coingecko.com/api/v3";

export const http = axios.create({
  baseURL,
  timeout: 15000,
});

http.interceptors.request.use((config) => {
  config.headers.set("Accept", "application/json");
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.error ||
      err.message ||
      "Network error. Please try again.";
    return Promise.reject(new Error(message));
  }
);

