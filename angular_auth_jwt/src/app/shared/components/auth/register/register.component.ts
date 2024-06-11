import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthLayoutComponent } from '../auth-layout.component';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthLayoutComponent, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatIconModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(NonNullableFormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)
  passwordHide: boolean

  registerForm = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    email: this.fb.control('', [Validators.required, Validators.email, Validators.minLength(8)]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)])
  })

  constructor() {
    this.passwordHide = true
  }

  onSubmit(): void {
    this.authService.register({user: this.registerForm.getRawValue()})
    .subscribe((user) => {
      localStorage.setItem('token', user.token)
      this.authService.currentUserSig.set(user) // Notify all places that we logged in
      this.router.navigateByUrl('/') // Navigate user from register
    })
  }
}
