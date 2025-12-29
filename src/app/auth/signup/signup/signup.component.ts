import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Role } from '../../../core/models/userEntities/role.model';
import { AuthService } from '../../../core/services/authServices/auth.service';
import { RoleService } from '../../../core/services/userEntities/role.service';
import { CommonModule } from '@angular/common';
import { Signup } from '../../../core/models/auth-models/signup.model';
import { AuthResponse } from '../../../core/models/auth-models/auth-response';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  roles: Role[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.signupForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  createForm(): FormGroup {
    return this.fb.group(
      {
        roleId: ['', Validators.required],
        name: ['', [Validators.required, Validators.minLength(2)]],
        contactNumber: [''],
        dateOfBirth: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        imageURL: [''],
        securityQuestion: [''],
        securityAnswer: [''],
        agreeToTerms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        // FILTER ONLY Buyer, Seller, Guest
        this.roles = roles.filter((r) =>
          ['Buyer', 'Seller', 'Guest'].includes(r.name)
        );
        if (this.roles.length > 0) {
          this.signupForm.patchValue({ roleId: this.roles[0].id });
        }
      },
      error: (err) => console.error('Error loading roles:', err),
    });
  }

  onSubmit(): void {
    if (!this.signupForm.valid) {
      Object.keys(this.signupForm.controls).forEach((field) => {
        const control = this.signupForm.get(field);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });

      Swal.fire({
        icon: 'warning',
        title: 'Form Incomplete',
        text: 'Please fill all required fields correctly before submitting.',
      });
      return;
    }

    this.isLoading = true;
    const signupData: Signup = this.signupForm.value;

    this.authService.signup(signupData).subscribe({
      next: (res: AuthResponse) => {
        this.isLoading = false;

        // Store token and user data (auto-login)
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.payload));

        // Clean up any stale data
        this.cleanupStaleUserData();

        Swal.fire({
          icon: 'success',
          title: 'Account Created & Logged In!',
          text: 'Your account has been created successfully and you are now logged in.',
          confirmButtonText: 'Continue to Dashboard',
        }).then(() => {
          // Route to dashboard based on role (same as signin)
          this.routeBasedOnRole(res.payload.role.name);
        });
      },
      error: (err) => {
        this.isLoading = false;
        const errorMsg =
          err.status === 409
            ? 'Email already exists.'
            : err.error?.message || 'Signup failed. Please try again.';
        Swal.fire({ icon: 'error', title: 'Signup Failed', text: errorMsg });
      },
    });
  }

  // Route based on role (same as signin component)
  private routeBasedOnRole(roleName: string): void {
    switch (roleName) {
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
        this.router.navigate(['/dashboard']); // Fallback
    }
  }

  // Clean up stale user data
  private cleanupStaleUserData(): void {
    // Remove any conflicting user_data keys
    if (localStorage.getItem('user_data')) {
      localStorage.removeItem('user_data');
    }
  }
}
