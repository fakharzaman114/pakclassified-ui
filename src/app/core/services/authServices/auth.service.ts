import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signin } from '../../models/auth-models/signin.model';
import { Signup } from '../../models/auth-models/signup.model';
import { AuthResponse } from '../../models/auth-models/auth-response';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'Auth';

  signin(model: Signin) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/Signin`, model);
  }

  signup(model: Signup) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/Signup`, model);
  }

  // Check if user is logged in with validation
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      this.logout(); // Clean up inconsistent state
      return false;
    }

    try {
      // Validate token expiration (basic check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = Date.now() >= payload.exp * 1000;

      if (isExpired) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      this.logout();
      return false;
    }
  }

  // Get current user with validation
  getCurrentUser(): any | null {
    try {
      const user = localStorage.getItem('user');
      if (!user) return null;

      const userObj = JSON.parse(user);
      return userObj && userObj.id ? userObj : null;
    } catch {
      return null;
    }
  }

  // Logout with complete cleanup
  logout(): void {
    // Remove all authentication-related data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_data'); // Clean up any stale data

    // Optional: Clear other related data
    sessionStorage.clear();
  }

  // Store authentication data consistently
  storeAuthData(token: string, user: any): void {
    // Clean up first
    this.logout();

    // Store new data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
