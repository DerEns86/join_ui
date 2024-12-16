import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../app/services/auth.service';
import { UserLoginInterface } from '../../app/models/UserLogin.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router: Router = inject(Router);

  errorMessages: string = '';

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          next: (data: UserLoginInterface) => {
            window.localStorage.setItem('token', data['jwtToken']);
            window.localStorage.setItem('user', JSON.stringify(data));

            this.authService.currentUserSignal.set(data);
            console.log(this.authService.currentUserSignal());
            this.router.navigateByUrl('');
          },
          error: (err) => {
            console.error('Login failes', err.error.message);
            this.errorMessages = err.error.message;
            window.localStorage.removeItem('token');
            window.localStorage.setItem('user', JSON.stringify(null));
            this.authService.currentUserSignal.set(null);
            console.warn(this.authService.currentUserSignal());
          },
        });
    }
    this.loginForm.reset();
  }
}
