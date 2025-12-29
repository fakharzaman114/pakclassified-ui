import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/signin']);
      return false;
    }

    // Decode JWT payload

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole =
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    // Allowed roles for this route
    const allowedRoles: string[] = route.data['roles'] || [];

    if (!allowedRoles.includes(userRole)) {
      this.router.navigate(['/not-authorized']);
      return false;
    }

    return true;
  }
}
