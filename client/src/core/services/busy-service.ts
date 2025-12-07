import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCount = signal<number>(0);

  busy() {
    this.busyRequestCount.update((curr) => curr + 1);
  }

  idle() {
    this.busyRequestCount.update((curr) => Math.max(0, curr - 1));
  }
}
