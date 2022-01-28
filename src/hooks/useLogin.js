import { useEffect, useState } from 'react';
import { projectAuth } from '../config/firebase';
import { AUTH_LOGIN } from '../context/constants';
import { useAuthContext } from './useAuthContext';

const initialError = {
  message: '',
};

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(initialError);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsPending(true);
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
    login,
  };
};
