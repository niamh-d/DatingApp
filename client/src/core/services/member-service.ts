import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableMember, Member, MemberParams, Photo } from '../../types/member';
import { tap } from 'rxjs';
import { PaginatedResult } from '../../types/pagination';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private editMode = signal<boolean>(false);
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

  getMembers(memberParams: MemberParams) {
    let params = new HttpParams();

    params = params.append('pageNumber', memberParams.pageNumber);
    params = params.append('pageSize', memberParams.pageSize);
    params = params.append('minAge', memberParams.minAge);
    params = params.append('maxAge', memberParams.maxAge);
    params = params.append('orderBy', memberParams.orderBy);
    if (memberParams.gender) {
      params = params.append('gender', memberParams.gender);
    }

    return this.http.get<PaginatedResult<Member>>(`${this.baseUrl}members`, { params });
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

  uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Photo>(`${this.baseUrl}members/add-photo`, formData);
  }

  setMainPhoto(photo: Photo) {
    return this.http.put<void>(`${this.baseUrl}members/set-main-photo/${photo.id}`, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete<void>(`${this.baseUrl}members/delete-photo/${photoId}`);
  }
}
