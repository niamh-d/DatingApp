import { Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';
import { TimeAgoPipe } from '../../../core/pipes/time-ago-pipe';

const emptyEditableMember: EditableMember = {
  displayName: '',
  description: '',
  city: '',
  country: '',
};

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule, TimeAgoPipe],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }

  private accountService = inject(AccountService);
  private toast = inject(ToastService);
  protected memberService = inject(MemberService);
  protected editableMember: EditableMember = emptyEditableMember;

  constructor() {}

  ngOnInit(): void {
    const member = this.memberService.member();
    this.editableMember = {
      displayName: member?.displayName || '',
      description: member?.description || '',
      city: member?.city || '',
      country: member?.country || '',
    };
  }

  ngOnDestroy(): void {
    if (this.memberService.getEditMode()) {
      this.memberService.setEditMode(false);
    }
  }

  updateProfile() {
    const member = this.memberService.member();
    if (!member) return;
    const updatedMember = { ...member, ...this.editableMember };
    this.memberService.updateMember(this.editableMember).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if (currentUser && updatedMember.displayName !== currentUser?.displayName) {
          currentUser.displayName = updatedMember.displayName;
          this.accountService.setCurrentUser(currentUser);
        }
        this.toast.success('Profile updated successfully!');
        this.memberService.setEditMode(false);
        this.memberService.member.set(updatedMember as Member);
        this.editForm?.reset(updatedMember);
      },
    });
  }
}
