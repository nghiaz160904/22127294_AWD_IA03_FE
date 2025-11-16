import axios from 'axios';
import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError } from 'axios';
const API_URL = 'http://localhost:8080/api';

let accessToken: string | null = null;

// keep track of pending request controllers so we can cancel them on logout
const pendingControllers = new Set<AbortController>();

// Store refresh token in localStorage
export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  localStorage.setItem('refreshToken', refresh);
  // ensure axios defaults immediately use the latest access token
  if (access) {
    axiosInstance.defaults.headers.common = axiosInstance.defaults.headers.common || {};
    (axiosInstance.defaults.headers.common as any).Authorization = `Bearer ${access}`;
  } else {
    if (axiosInstance.defaults.headers?.common)
      delete (axiosInstance.defaults.headers.common as any).Authorization;
  }
};

export const clearTokens = () => {
  accessToken = null;
  // abort all pending requests so they don't trigger after logout
  pendingControllers.forEach((c) => {
    try {
      c.abort();
    } catch {
      /* ignore */
    }
  });
  pendingControllers.clear();

  localStorage.removeItem('refreshToken');

  // remove default header
  if (axiosInstance.defaults.headers?.common)
    delete (axiosInstance.defaults.headers.common as any).Authorization;

  // navigate to login immediately after logout/clearing tokens
  window.location.href = '/login';
};

export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    // ensure headers object exists and use a compatible cast
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${accessToken}`;
  }

  // attach an AbortController to every outgoing request so we can cancel on logout
  const controller = new AbortController();
  // store the signal on the config (axios supports signal)
  (config as any).signal = controller.signal;
  // track controller for later abort
  pendingControllers.add(controller);
  // keep a reference to the controller on the config for cleanup
  (config as any).__abortController = controller;

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    // remove controller for this completed request
    try {
      const controller = (res.config as any).__abortController as AbortController | undefined;
      if (controller) pendingControllers.delete(controller);
    } catch {
      /* ignore */
    }
    return res;
  },
  async (err: AxiosError) => {
    // remove controller for this errored request
    try {
      const cfg = err.config as InternalAxiosRequestConfig | undefined;
      if (cfg) {
        const controller = (cfg as any).__abortController as AbortController | undefined;
        if (controller) pendingControllers.delete(controller);
      }
    } catch {
      /* ignore */
    }

    // if the request was cancelled (e.g., due to logout), just reject
    if (
      axios.isCancel
        ? axios.isCancel(err)
        : (err as any).name === 'CanceledError' || (err as any).code === 'ERR_CANCELED'
    ) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401) {
      const refresh = getRefreshToken();
      if (refresh) {
        try {
          const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken: refresh });
          const newAccess = res.data.accessToken;
          const newRefresh = res.data.refreshToken;
          setTokens(newAccess, newRefresh);
          const cfg = err.config as InternalAxiosRequestConfig | undefined;
          if (cfg && cfg.headers) {
            (cfg.headers as any).Authorization = `Bearer ${newAccess}`;
          }
          return axiosInstance(err.config as any);
        } catch {
          clearTokens();
          // clearTokens already navigates
        }
      } else {
        clearTokens();
        // clearTokens already navigates
      }
    }
    return Promise.reject(err);
  }
);

export const setAccessToken = (token: string) => {
  accessToken = token;
  if (token) {
    axiosInstance.defaults.headers.common = axiosInstance.defaults.headers.common || {};
    (axiosInstance.defaults.headers.common as any).Authorization = `Bearer ${token}`;
  } else {
    if (axiosInstance.defaults.headers?.common)
      delete (axiosInstance.defaults.headers.common as any).Authorization;
  }
};
