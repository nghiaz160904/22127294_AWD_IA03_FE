import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

let accessToken: string | null = null;

// Store refresh token in localStorage
export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  localStorage.setItem('refreshToken', refresh);
};

export const clearTokens = () => {
  accessToken = null;
  localStorage.removeItem('refreshToken');
};

export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refresh = getRefreshToken();
      if (refresh) {
        try {
          const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken: refresh });
          const newAccess = res.data.accessToken;
          const newRefresh = res.data.refreshToken;
          setTokens(newAccess, newRefresh);
          err.config.headers.Authorization = `Bearer ${newAccess}`;
          return axiosInstance(err.config);
        } catch {
          clearTokens();
          window.location.href = '/login';
        }
      } else {
        clearTokens();
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export const setAccessToken = (token: string) => {
  accessToken = token;
};
