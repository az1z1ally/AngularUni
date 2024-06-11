import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthLayoutComponent } from '../auth-layout.component';
import { Router, RouterModule } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthLayoutComponent, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatIconModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)
  passwordHide: boolean

  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email, Validators.minLength(8)]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
  })

  constructor() {
    this.passwordHide = true
  }

  onSubmit(): void {
    this.authService.login({user: this.loginForm.getRawValue()})
    .subscribe((user) => {
      localStorage.setItem('token', user.token)
      this.authService.currentUserSig.set(user) // Notify all places that we logged in
      this.router.navigateByUrl('/') // Navigate user from login
    })
  }
}
