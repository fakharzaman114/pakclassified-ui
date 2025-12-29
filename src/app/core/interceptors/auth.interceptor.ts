import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  console.log('Auth Interceptor running...');

  if (token) {
    const modified = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(modified);
  }

  return next(req);
};
