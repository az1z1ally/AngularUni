import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token') ?? ''

  // const newHeaders = new HttpHeaders({
  //   "Content-Type": "application/json"
  // })

  // clone request & change header
  // const request = req.clone({headers: newHeaders})

  const request = req.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : ''
    }
  })
  
  return next(request);
};
