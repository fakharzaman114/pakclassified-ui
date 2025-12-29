import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/authServices/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  isSubmitting = false;
  categoryId!: number;

  constructor(private authService: AuthService, private router: Router) {}

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Logout method
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have successfully logged out.',
      timer: 1500,
      showConfirmButton: false,
    });
  }

  // Open Post Advertisement
  openPostAdModal(): void {
    if (!this.isLoggedIn()) {
      Swal.fire({
        title: 'Login Required',
        html: `
        <p>You need to login first to post an advertisement.</p>
      `,
        icon: 'warning',
        iconColor: '#f4c542',

        showCancelButton: true,
        confirmButtonText: 'Login Now',
        cancelButtonText: 'Cancel',

        customClass: {
          popup: 'login-swal-popup',
          confirmButton: 'login-confirm-btn',
          cancelButton: 'login-cancel-btn',
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/signin']);
        }
      });
    } else {
      // Navigate to post advertisement page
      this.router.navigate(['/post-advertisement']);
    }
  }
}
