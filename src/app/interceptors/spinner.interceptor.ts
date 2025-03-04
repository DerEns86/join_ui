import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerSerive = inject(SpinnerService);
  spinnerSerive.showSpinner();
  return next(req).pipe(
    delay(1000),
    finalize(() => {
      spinnerSerive.hideSpinner();
    })
  );
};
