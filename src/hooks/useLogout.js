import { useEffect, useState } from 'react';
import { projectAuth } from '../config/firebase';
import { AUTH_LOGOUT } from '../context/constants';
import { useAuthContext } from './useAuthContext';

const initialError = {
  message: '',
};

export const useLogout = () => {
  const [canceled, setCanceled] = useState(false);

  const [error, setError] = useState(initialError);
  const [pending, setPending] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = async () => {
    setPending(true);

    try {
      // Log user out
      await projectAuth.signOut();

      // Dispatch logout action
      dispatch({ type: AUTH_LOGOUT });

      if (!canceled) {
        setPending(false);
        setError(initialError);
      }
    } catch (error) {
      if (!canceled) {
        setError(error);
      }
    } finally {
      if (!canceled) {
        setPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setCanceled(true);
    };
  }, []);

  return {
    error,
    pending,
    logout,
  };
};
