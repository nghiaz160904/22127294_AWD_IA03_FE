import axios from 'axios';
import type {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosRequestHeaders,
  AxiosRequestConfig,
} from 'axios';
const rawBE = import.meta.env.VITE_BE_URL || 'http://localhost:8080';

// đảm bảo có '/api' ở cuối
const API_URL = rawBE.replace(/\/+$/, '') + '/api';

let accessToken: string | null = null;

// keep track of pending request controllers so we can cancel them on logout
const pendingControllers = new Set<AbortController>();

// Store refresh token in localStorage
export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  localStorage.setItem('refreshToken', refresh);
  // ensure axios defaults immediately use the latest access token
  if (access) {
    // ensure defaults.headers object exists
    axiosInstance.defaults.headers = axiosInstance.defaults.headers || {};
    // cast via unknown first to satisfy TypeScript's structural checks
    (
      axiosInstance.defaults.headers as unknown as AxiosRequestHeaders
    ).Authorization = `Bearer ${access}`;
  } else {
    if (axiosInstance.defaults.headers)
      delete (axiosInstance.defaults.headers as unknown as AxiosRequestHeaders).Authorization;
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
  if (axiosInstance.defaults.headers)
    delete (axiosInstance.defaults.headers as unknown as AxiosRequestHeaders).Authorization;

  // navigate to login immediately after logout/clearing tokens
  window.location.href = '/login';
};

export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

// extended config type with our private controller field
type ExtendedInternalConfig = InternalAxiosRequestConfig & { __abortController?: AbortController };

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    // ensure headers object exists and use a compatible cast
    config.headers = config.headers || {};
    (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${accessToken}`;
  }

  // attach an AbortController to every outgoing request so we can cancel on logout
  const controller = new AbortController();
  // store the signal on the config (axios supports signal)
  (config as ExtendedInternalConfig).signal = controller.signal;
  // track controller for later abort
  pendingControllers.add(controller);
  // keep a reference to the controller on the config for cleanup
  (config as ExtendedInternalConfig).__abortController = controller;

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    // remove controller for this completed request
    try {
      const controller = (res.config as ExtendedInternalConfig).__abortController as
        | AbortController
        | undefined;
      if (controller) pendingControllers.delete(controller);
    } catch {
      /* ignore */
    }
    return res;
  },
  async (err: AxiosError) => {
    // remove controller for this errored request
    try {
      const cfg = err.config as ExtendedInternalConfig | undefined;
      if (cfg) {
        const controller = cfg.__abortController as AbortController | undefined;
        if (controller) pendingControllers.delete(controller);
      }
    } catch {
      /* ignore */
    }

    // if the request was cancelled (e.g., due to logout), just reject
    const errFields = err as unknown as { name?: string; code?: string };
    if (
      axios.isCancel
        ? axios.isCancel(err)
        : errFields.name === 'CanceledError' || errFields.code === 'ERR_CANCELED'
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
          const cfg = err.config as ExtendedInternalConfig | undefined;
          if (cfg && cfg.headers) {
            (cfg.headers as AxiosRequestHeaders).Authorization = `Bearer ${newAccess}`;
          }
          // retry original request using a properly typed AxiosRequestConfig
          return axiosInstance.request(err.config as unknown as AxiosRequestConfig);
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
    axiosInstance.defaults.headers = axiosInstance.defaults.headers || {};
    (
      axiosInstance.defaults.headers as unknown as AxiosRequestHeaders
    ).Authorization = `Bearer ${token}`;
  } else {
    if (axiosInstance.defaults.headers)
      delete (axiosInstance.defaults.headers as unknown as AxiosRequestHeaders).Authorization;
  }
};
