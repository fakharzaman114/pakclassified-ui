import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { AuthService } from '../../../core/services/authServices/auth.service';
import { Signin } from '../../../core/models/auth-models/signin.model';
import { AuthResponse } from '../../../core/models/auth-models/auth-response';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.form.invalid) {
      Swal.fire('Error', 'Please fill all fields', 'error');
      return;
    }

    // Form is valid → extract safe string values
    const signin: Signin = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    };

    this.auth.signin(signin).subscribe({
      next: (res: AuthResponse) => {
        console.log(res);

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.payload));

        Swal.fire('Success', 'Login successful!', 'success');

        // ✅ Role-based routing using switch
        switch (res.payload.role.name) {
          case 'Admin':
            this.router.navigate(['/admin']);
            break;
          case 'Moderator':
          case 'Seller':
          case 'Buyer':
          case 'Guest':
            this.router.navigate(['/dashboard']);
            break;
          default:
            Swal.fire('Error', 'Unknown role! Contact admin.', 'error');
        }
      },
      error: (err) => {
        console.error('Signin error', err);
        Swal.fire('Error', 'Invalid email or password', 'error');
      },
    });
  }
}
