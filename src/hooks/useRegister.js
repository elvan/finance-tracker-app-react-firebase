import { useState } from 'react';
import { projectAuth } from '../config/firebase';

export const userRegister = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const register = async ({ email, password, displayName }) => {
    setPending(true);
    setError(null);

    try {
      // Register user
      const credential = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(credential);

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
      setError(null);
    } catch (error) {
      console.log(error);
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
