import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Nav } from '../layout/nav/nav';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected router = inject(Router);
  private http = inject(HttpClient);
  protected members = signal<any>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }

  setCurrentUser() {}

  async getMembers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
