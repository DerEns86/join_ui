import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  spinnerService: NgxSpinnerService = inject(NgxSpinnerService);

  requestCount: number = 0;

  showSpinner(): void {
    this.requestCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-spin-clockwise-fade',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      size: 'default',
    });
  }

  hideSpinner(): void {
    this.requestCount--;

    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.spinnerService.hide();
    }
  }

  constructor() {}
}
