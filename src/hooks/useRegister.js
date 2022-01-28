import { useEffect, useState } from 'react';
import { projectAuth } from '../config/firebase';
import { AUTH_LOGIN } from '../context/constants';
import { useAuthContext } from './useAuthContext';

const initialError = {
  message: '',
};

export const useRegister = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(initialError);

  const { dispatch } = useAuthContext();

  const register = async ({ email, password, displayName }) => {
    setIsPending(true);
    setError(initialError);

    try {
      const credential = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!credential) {
        throw new Error('Could not create user');
      }

      await credential.user?.updateProfile({
        displayName,
      });

      dispatch({
        type: AUTH_LOGIN,
        payload: credential.user,
      });
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
    register,
  };
};
