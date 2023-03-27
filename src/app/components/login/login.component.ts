import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { EMAIL_PATTERN } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup
  guestForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
    this.guestForm = this.formBuilder.group({
      email: ['guest@guest.com'],
      password: ['guest']
    })
  }

  onLogin() {
    this.authService.authenticate(this.loginForm.value).subscribe(() => {
      this.router.navigate(['/portfolio'])
    })
  }

  onGuestLogin() {
    this.authService.authenticate(this.guestForm.value).subscribe(() => {
      this.router.navigate(['/portfolio'])
    })
  }

  get Email() {
    return this.loginForm.get('email');
  }

  get Password() {
    return this.loginForm.get('password');
  }
}
