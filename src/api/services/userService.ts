import { axiosInstance } from '../axiosInstance';
import type { User } from '../../types/userType';

export const fetchProfile = async (): Promise<User> => {
  const res = await axiosInstance.get('/user/profile');
  return res.data;
};
