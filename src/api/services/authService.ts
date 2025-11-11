import { axiosInstance, setAccessToken, setTokens, clearTokens } from '../axiosInstance';
import type { AuthenticationResponse, LoginRequest, RegisterRequest } from '../../types/authType';

export const login = async (data: LoginRequest): Promise<AuthenticationResponse> => {
  const res = await axiosInstance.post('/auth/login', data);
  const auth = res.data as AuthenticationResponse;
  setTokens(auth.accessToken, auth.refreshToken);
  setAccessToken(auth.accessToken);
  return auth;
};

export const register = async (data: RegisterRequest): Promise<AuthenticationResponse> => {
  const res = await axiosInstance.post('/auth/register', data);
  const auth = res.data as AuthenticationResponse;
  setTokens(auth.accessToken, auth.refreshToken);
  setAccessToken(auth.accessToken);
  return auth;
};

export const logout = async (email: string) => {
  await axiosInstance.post('/auth/logout', { email });
  clearTokens();
};

export const refresh = async (refreshToken: string): Promise<AuthenticationResponse> => {
  const res = await axiosInstance.post('/auth/refresh', { refreshToken });
  return res.data;
};
