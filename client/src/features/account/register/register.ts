import { Component, inject, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { type RegisterCreds } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';
import { TextInput } from '../../../shared/text-input/text-input';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  protected registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      displayName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.matchPwValues('password'),
        Validators.minLength(8),
      ]),
    });
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  matchPwValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;
      return control.value === parent.get(matchTo)?.value ? null : { passWordMismatch: true };
    };
  }

  register() {
    console.log(this.registerForm.value);
    // this.accountService.register(this.creds).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.cancel();
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
