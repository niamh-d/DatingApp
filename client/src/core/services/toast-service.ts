import { Injectable } from '@angular/core';

enum ToastType {
  Success = 'alert-success',
  Error = 'alert-error',
  Info = 'alert-info',
  Warning = 'alert-warning',
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end';
      document.body.appendChild(container);
    }
  }

  private createToastElement(message: string, type: ToastType, duration: number = 5000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', type, 'shadow-lg');

    toast.innerHTML = `
    <span>${message}</span>
    <button type="button" class="ml-4 btn btn-sm btn-ghost">x</button>
    `;

    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    });

    toastContainer.append(toast);

    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  success(message: string, duration?: number) {
    this.createToastElement(message, ToastType.Success, duration);
  }

  error(message: string, duration?: number) {
    this.createToastElement(message, ToastType.Error, duration);
  }

  info(message: string, duration?: number) {
    this.createToastElement(message, ToastType.Info, duration);
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, ToastType.Warning, duration);
  }
}
