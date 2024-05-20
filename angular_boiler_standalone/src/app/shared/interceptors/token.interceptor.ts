import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const newHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  // clone request & change header
  const clone = req.clone({headers: newHeaders})
  return next(clone);
};
