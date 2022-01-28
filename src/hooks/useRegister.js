import { useState } from 'react';
import { projectAuth } from '../config/firebase';

export const useRegister = () => {
  const initialError = {
    message: '',
  };

  const [error, setError] = useState(initialError);
  const [pending, setPending] = useState(false);

  const register = async ({ email, password, displayName }) => {
    setPending(true);
    setError({ message: '' });

    try {
      // Register user
      const credential = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!credential) {
        throw new Error('Could not create user');
      }

      // Add displayName to user
      await credential.user?.updateProfile({
        displayName,
      });

      // Send verification email
      // await credential.user.sendEmailVerification();

      // Reset state
      setPending(false);
      setError({ message: '' });
    } catch (error) {
      setError(error);
    } finally {
      setPending(false);
    }
  };

  return {
    error,
    pending,
    register,
  };
};
