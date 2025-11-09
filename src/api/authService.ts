import axiosInstance from './axios.config';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/authType';
import type { User } from '../types/userType';

export const authAPI = {
  // Login - Backend sẽ set cookie httpOnly trong response header
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/user/login', data);
    // Response chỉ trả về user data, cookie đã được set tự động
    return response.data;
  },

  // Register - Backend sẽ set cookie httpOnly trong response header
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/user/register', data);
    // Response chỉ trả về user data, cookie đã được set tự động
    return response.data;
  },

  // Logout - Backend sẽ xóa cookie httpOnly
  logout: async (): Promise<void> => {
    await axiosInstance.post('/user/logout');
  },

  // Get current user - Backend verify cookie và trả về user data
  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get('/user/me');
    return response.data;
  },

  // Refresh token (nếu backend support)
  refreshToken: async (): Promise<void> => {
    await axiosInstance.post('/auth/refresh');
  },
};
