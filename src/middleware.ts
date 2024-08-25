// This will not run because of the name of the file, this is only for demonstration purposes

import { firebase } from "@firebase/config";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected'];
const publicRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware((context, next) => {
  const isLoggedIn = !!firebase.auth.currentUser;
  const user = firebase.auth.currentUser;

  context.locals.isLoggedIn = isLoggedIn;

  if (user) {
    context.locals.user = {
      email: user.email!,
      displayName: user.displayName!,
      avatar: user.photoURL ?? '',
      emailVerified: user.emailVerified,
    }
  }

  if (!isLoggedIn && privateRoutes.includes(context.url.pathname)) {
    return context.redirect('/');
  }

  if (isLoggedIn && publicRoutes.includes(context.url.pathname)) {
    return context.redirect('/');
  }

  return next();
});