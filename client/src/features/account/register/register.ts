import { Component, inject, output, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';
import { TextInput } from '../../../shared/text-input/text-input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  cancelRegister = output<boolean>();
  protected credentialsForm: FormGroup;
  protected profileForm: FormGroup;
  protected currStep = signal(1);
  protected validationErrors = signal<string[]>([]);

  constructor() {
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [
        '',
        [Validators.required, this.matchPwValues('password'), Validators.minLength(8)],
      ],
    });
    this.credentialsForm.controls['password'].valueChanges.subscribe(() => {
      this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
    });

    this.profileForm = this.fb.group({
      gender: ['male', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  matchPwValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;
      return control.value === parent.get(matchTo)?.value ? null : { passWordMismatch: true };
    };
  }

  nextStep() {
    if (this.credentialsForm.valid) {
      this.currStep.update((prevStep) => prevStep + 1);
    }
  }

  prevStep() {
    this.currStep.update((prevStep) => prevStep - 1);
  }

  getMaxDate() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }

  register() {
    if (this.credentialsForm.valid && this.profileForm.valid) {
      const formData = { ...this.credentialsForm.value, ...this.profileForm.value };

      this.accountService.register(formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');
        },
        error: (err) => {
          console.log(err);
          this.validationErrors.set(err);
        },
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
