import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
})
export class TestErrors {
  private http = inject(HttpClient);
  basUrl = 'https://localhost:5001/api/';

  get404Error() {
    return this.http.get(this.basUrl + 'buggy/not-found').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get400Error() {
    return this.http.get(this.basUrl + 'buggy/bad-request').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get500Error() {
    return this.http.get(this.basUrl + 'buggy/server-error').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get401Error() {
    return this.http.get(this.basUrl + 'buggy/auth').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get400ValidationError() {
    return this.http.post(this.basUrl + 'account/register', {}).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
