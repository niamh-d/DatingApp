import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member, Photo } from '../../types/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private editMode = signal<boolean>(false);

  toggleEditMode() {
    this.editMode.set(!this.editMode());
  }

  getEditMode() {
    return this.editMode();
  }

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}members`);
  }

  getMember(id: string) {
    return this.http.get<Member>(`${this.baseUrl}members/${id}`);
  }

  getMemberPhotos(id: string) {
    return this.http.get<Photo[]>(`${this.baseUrl}members/${id}/photos`);
  }
}
