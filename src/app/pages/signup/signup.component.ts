import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  errorMessages: string = '';

  loginForm: FormGroup = this.fb.group(
    {
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.passwordsMatchValidator }
  );

  passwordsMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  onSubmit() {
    console.log('submit', this.loginForm.getRawValue());
    if (this.loginForm.valid) {
      this.authService
        .resgister(
          this.loginForm.value.username,
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .subscribe({
          next: (data: string) => {
            console.log('register success', data);
            this.router.navigateByUrl('/login');
          },
          error: (err) => {
            console.error('register failed', err.error.message);
            this.errorMessages = err.error.message;
          },
        });
    }
  }
}
