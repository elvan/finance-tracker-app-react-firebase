import { useEffect, useState } from 'react';
import { projectAuth } from '../config/firebase';
import { AUTH_LOGIN } from '../context/constants';
import { useAuthContext } from './useAuthContext';

const initialError = {
  message: '',
};

export const useRegister = () => {
  const [canceled, setCanceled] = useState(false);

  const [error, setError] = useState(initialError);
  const [pending, setPending] = useState(false);

  const { dispatch } = useAuthContext();

  const register = async ({ email, password, displayName }) => {
    setPending(true);
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
    register,
  };
};
