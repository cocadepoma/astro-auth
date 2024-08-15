import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected']

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {

  if (privateRoutes.includes(context.url.pathname)) {
    return checkLocalAuth(context.request.headers.get('Authorization') ?? '', next);
  }

  return next();
});


const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {
  if (authHeaders) {
    const authValue = authHeaders.split(' ')[1] ?? 'user:pass';
    const [user, password] = atob(authValue).split(':');

    if (user === 'admin' && password === 'admin') {
      return next();
    }
  }

  return new Response('Required Authorization', {
    status: 401, headers: {
      'Content-Type': 'application/json',
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}