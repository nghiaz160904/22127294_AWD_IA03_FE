import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register, logout } from '../api/services/authService';
import type { LoginRequest, RegisterRequest } from '../types/authType';

export const useAuth = () => {
  const qc = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async (email: string) => {
      logout(email);
      qc.clear();
    },
  });

  return { loginMutation, registerMutation, logoutMutation };
};
