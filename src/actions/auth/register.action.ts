import { firebase } from "@firebase/config";
import { defineAction, z } from "astro:actions";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from "firebase/auth";

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, password, remember_me, email }, context) => {
    if (remember_me) {
      context.cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
        path: '/',
      });
    } else {
      context.cookies.delete('email');
    }

    try {
      const user = await createUserWithEmailAndPassword(firebase.auth, email, password);

      if (!firebase.auth.currentUser) {
        throw new Error('Error creating user');
      }

      updateProfile(firebase.auth.currentUser, {
        displayName: name,
      });

      await sendEmailVerification(firebase.auth.currentUser, {
        url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`,
      });

      return { 'ok': true };
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError.code === 'auth/email-already-in-use') {
        throw new Error('Email already in use');
      }

      throw new Error('Error registering user');
    }
  },
});