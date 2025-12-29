import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/authServices/auth.service';

@Component({
  selector: 'app-navbar-top',
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './navbar-top.component.html',
  styleUrl: './navbar-top.component.css',
})
export class NavbarTopComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getUserName(): string {
    const user = localStorage.getItem('user');
    if (!user) return 'User';

    try {
      return JSON.parse(user).name ?? 'User';
    } catch {
      return 'User';
    }
  }

  getUserRole(): string {
    const user = localStorage.getItem('user');
    if (!user) return '';
    try {
      return JSON.parse(user).role?.name ?? '';
    } catch {
      return '';
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
  }

  goToDashboard(): void {
    const role = this.getUserRole();
    if (role === 'Admin') {
      this.router.navigate(['/admin']); // Admin dashboard
    } else {
      this.router.navigate(['/dashboard']); // Other roles
    }
  }
}
