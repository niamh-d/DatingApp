import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableMember, Member, Photo } from '../../types/member';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private editMode = signal<boolean>(true);
  member = signal<Member | null>(null);

  toggleEditMode() {
    this.editMode.set(!this.editMode());
  }

  setEditMode(editMode: boolean) {
    this.editMode.set(editMode);
  }

  getEditMode() {
    return this.editMode();
  }

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}members`);
  }

  getMember(id: string) {
    return this.http.get<Member>(`${this.baseUrl}members/${id}`).pipe(
      tap((member) => {
        this.member.set(member);
      })
    );
  }

  getMemberPhotos(id: string) {
    return this.http.get<Photo[]>(`${this.baseUrl}members/${id}/photos`);
  }

  updateMember(member: EditableMember) {
    return this.http.put<void>(`${this.baseUrl}members`, member);
  }
}
