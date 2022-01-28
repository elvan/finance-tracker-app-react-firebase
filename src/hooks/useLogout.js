import { useEffect, useState } from 'react';
import { projectAuth } from '../config/firebase';
import { AUTH_LOGOUT } from '../context/constants';
import { useAuthContext } from './useAuthContext';

const initialError = {
  message: '',
};

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(initialError);

  const { dispatch } = useAuthContext();

  const logout = async () => {
    setIsPending(true);
    setError(initialError);

    try {
      await projectAuth.signOut();

      dispatch({ type: AUTH_LOGOUT });
    } catch (error) {
      if (!isCancelled) {
        setError(error);
      }
    } finally {
      if (!isCancelled) {
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return {
    isPending,
    error,
    logout,
  };
};
