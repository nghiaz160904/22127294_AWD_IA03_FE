import { useEffect } from 'react';
import { getRefreshToken, setTokens } from '../api/axiosInstance';
import { refresh } from '../api/services/authService';

export const useRefreshToken = () => {
  useEffect(() => {
    const token = getRefreshToken();
    if (token) {
      refresh(token)
        .then((res) => setTokens(res.accessToken, res.refreshToken))
        .catch(() => console.warn('Refresh token expired'));
    }
  }, []);
};
