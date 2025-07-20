import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  // logic req

  return next(req).pipe(
    catchError((err) => {
      // logic err
      console.log('errors in interceptors', err);

      toastrService.error(err.error.msg, 'GoodNotes');

      return throwError(() => err);
    })
  ); // logic res
};
