import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{6,}$/),
    ]),
  });

  submitLoginForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginData(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          if (res.msg === 'done') {
            this.successMsg = res.msg;
            // save token

            localStorage.setItem('userToken', res.token);

            // naviaget to home (setTimout)

            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 600);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = err.error.msg;
        },
      });
    }
  }
}
