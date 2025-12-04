import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: any = {};

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (res) => {
        console.log(res);
        this.creds = {};
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  logout() {
    this.accountService.logout();
  }
}
