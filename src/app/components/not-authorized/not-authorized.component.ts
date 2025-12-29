import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-authorized',
  imports: [],
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.css',
})
export class NotAuthorizedComponent {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigateByUrl('/');
  }

  navigateToSignUp(): void {
    this.router.navigateByUrl('/signup');
  }
}
