import { useEffect, useState } from 'react';
import { projectAuth } from '../config/firebase';
import { AUTH_LOGIN } from '../context/constants';
import { useAuthContext } from './useAuthContext';

const initialError = {
  message: '',
};

export const useLogin = () => {
  const [canceled, setCanceled] = useState(false);

  const [error, setError] = useState(initialError);
  const [pending, setPending] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setPending(true);
    setError(initialError);

    try {
      const credential = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (!credential) {
        throw new Error('Could not sign user in');
      }

      dispatch({ type: AUTH_LOGIN, payload: credential.user });
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
    login,
  };
};
