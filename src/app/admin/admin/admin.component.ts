import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../core/models/userEntities/user.model';
import { Advertisement } from '../../core/models/pakClassified/advertisement.model';
import { UserService } from '../../core/services/userEntities/user.service';
import { AdvertisementService } from '../../core/services/pakClassified/advertisement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  ads: Advertisement[] = [];

  constructor(
    private userService: UserService,
    private adService: AdvertisementService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadAds();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (res) => (this.users = res),
      error: () => Swal.fire('Error', 'Failed to load users', 'error'),
    });
  }

  loadAds(): void {
    this.adService.getAll().subscribe({
      next: (res) => (this.ads = res),
      error: () => Swal.fire('Error', 'Failed to load advertisements', 'error'),
    });
  }

  deleteAd(adId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this advertisement!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adService.deleteAd(adId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Advertisement has been deleted.', 'success');
            this.loadAds();
          },
          error: () =>
            Swal.fire('Error', 'Failed to delete advertisement.', 'error'),
        });
      }
    });
  }

  deleteUser(userId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete user!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.loadUsers();
          },
          error: () => Swal.fire('Error', 'Failed to delete user.', 'error'),
        });
      }
    });
  }

  // Get status badge class
  getStatusBadgeClass(status: string | undefined): string {
    if (!status) return 'bg-secondary';

    const statusName = status.toLowerCase();
    switch (statusName) {
      case 'active':
      case 'approved':
        return 'bg-success';
      case 'pending':
      case 'under review':
        return 'bg-warning';
      case 'rejected':
      case 'expired':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
}
