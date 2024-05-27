import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthLayoutComponent } from '../auth-layout.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthLayoutComponent, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatIconModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  passwordHide: boolean

  registerForm = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    email: this.fb.control('', [Validators.required, Validators.email, Validators.minLength(8)]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)])
  })

  constructor(private fb: NonNullableFormBuilder) {
    this.passwordHide = true
  }

  onSubmit(): void {
    
  }
  
}
