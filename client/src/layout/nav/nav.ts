import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../theme';
import { BusyService } from '../../core/services/busy-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  private router = inject(Router);
  protected busyService = inject(BusyService);
  protected accountService = inject(AccountService);
  private toast = inject(ToastService);
  protected creds: any = {};
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;

  ngOnInit(): void {
    this.setDocumentTheme(this.selectedTheme());
  }

  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    this.setDocumentTheme(theme);
    const elem = document.activeElement as HTMLDivElement;
    if (elem) elem.blur();
  }

  setDocumentTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  login() {
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in successfully');
        this.creds = {};
      },
      error: (err) => {
        this.toast.error(err.error);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
