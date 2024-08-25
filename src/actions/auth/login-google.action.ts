import { firebase } from "@firebase/config";
import { defineAction, z } from "astro:actions";
import { signInWithCredential } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export const loginWithGoogle = defineAction({
  accept: "json",
  input: z.any(),
  handler: async (credentials) => {
    const credential = GoogleAuthProvider.credentialFromResult(credentials);

    if (!credential) {
      throw new Error('Invalid google credential');
    }

    await signInWithCredential(firebase.auth, credential);

    return { 'ok': true };
  },
});