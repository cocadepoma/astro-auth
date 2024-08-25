import { firebase } from "@firebase/config";
import { defineAction, z } from "astro:actions";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

export const login = defineAction({
  accept: "json",
  input: z.object({
    email: z.string(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ email, password, remember_me }, context) => {
    if (remember_me) {
      context.cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
        path: '/',
      });
    } else {
      context.cookies.delete('email');
    }

    try {
      await signInWithEmailAndPassword(firebase.auth, email, password);

      return { 'ok': true };
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError.code === 'auth/invalid-credential') {
        throw new Error('Invalid email or password');
      }

      throw new Error('Error logging in user');
    }
  },
});