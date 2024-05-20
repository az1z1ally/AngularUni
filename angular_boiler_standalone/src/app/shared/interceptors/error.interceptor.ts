import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req)

  // return next(req)
  //   .do((event: HttpEvent<any>) => {
  //     if(event instanceof HttpResponse) {
  //       // Do some stuff with the response if you want
  //     }
  //   }, (err: any) => {
  //     if(err instanceof HttpErrorResponse) {
  //       if(err.status === 401) {
  //         // Redirect to the login route
  //         // or show a modal
  //       }
  //     }
  //   }
  // )
}