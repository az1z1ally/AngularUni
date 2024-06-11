import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../shared/services/notifications.service';
import { NetworkErrorsConstant } from '../../shared/constants/networkErrors.constant';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  title = 'angular_auth_jwt';
  authService = inject(AuthService)
  notificationService = inject(NotificationService)

  ngOnInit(): void {
    this.authService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.authService.currentUserSig.set(user)
      },

      error: (err: HttpErrorResponse) => {
        this.authService.currentUserSig.set(null)
        this.notificationService.showError(`${NetworkErrorsConstant.errors.WRONG}`)
      }
    })
  }

  login(): void {
  }

  logout(): void {
    localStorage.removeItem('token')
    this.authService.currentUserSig.set(null) // Notifying the whole application that we're logged out
    window.location.reload()
  }
}
