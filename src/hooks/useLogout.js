import { useState } from 'react';
import { projectAuth } from '../config/firebase';
import { AUTH_LOGOUT } from '../context/constants';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [error, setError] = useState({ message: '' });
  const [pending, setPending] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = async () => {
    setPending(true);

    try {
      // Log user out
      await projectAuth.signOut();

      // Dispatch logout action
      dispatch({ type: AUTH_LOGOUT });
    } catch (error) {
      setError(error);
    } finally {
      setPending(false);
    }
  };

  return {
    error,
    pending,
    logout,
  };
};
