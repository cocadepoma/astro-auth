import { defineAction, z } from "astro:actions";

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

    return { ok: true, message: 'User registered' };
  },
});