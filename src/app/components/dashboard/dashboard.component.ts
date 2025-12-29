import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Models and Services
import { User } from '../../core/models/userEntities/user.model';
import { Advertisement } from '../../core/models/pakClassified/advertisement.model';
import { AdvertisementService } from '../../core/services/pakClassified/advertisement.service';
import { AuthService } from '../../core/services/authServices/auth.service';
import { PkrCurrencyPipe } from '../../core/pipes/pkr-currency.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, PkrCurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  currentUser!: User;
  userAds: Advertisement[] = [];
  totalAds: number = 0;
  activeAds: number = 0;
  pendingAds: number = 0;
  isLoading: boolean = true;

  paginatedAds: Advertisement[] = [];

  page: number = 1;
  pageSize: number = 2;
  totalPages: number = 0;

  constructor(
    private authService: AuthService,
    private advertisementService: AdvertisementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loadCurrentUser();
    if (this.currentUser) {
      this.loadUserAdvertisements();
    }
  }

  loadCurrentUser(): void {
    const userData = localStorage.getItem('user');

    if (!userData) {
      this.router.navigate(['/signin']);
      return;
    }

    try {
      this.currentUser = JSON.parse(userData);
    } catch {
      this.router.navigate(['/signin']);
    }
  }

  loadUserAdvertisements(): void {
    this.isLoading = true;

    this.advertisementService.getAll().subscribe({
      next: (ads: Advertisement[]) => {
        if (!ads || ads.length === 0) {
          this.userAds = [];
          this.calculateAdStats();
          this.isLoading = false;
          return;
        }

        this.userAds = ads.filter(
          (ad) => ad.postedBy && +ad.postedBy.id === +this.currentUser.id
        );

        // Pagination
        this.totalPages = Math.ceil(this.userAds.length / this.pageSize);
        this.page = 1;
        this.updatePageData();

        this.calculateAdStats();
        this.isLoading = false;
      },
      error: () => {
        this.userAds = [];
        this.isLoading = false;
      },
    });
  }

  calculateAdStats(): void {
    this.totalAds = this.userAds.length;

    this.activeAds = this.userAds.filter(
      (ad) =>
        ad.status &&
        ad.status.name &&
        ['active', 'approved'].includes(ad.status.name.toLowerCase())
    ).length;

    this.pendingAds = this.userAds.filter(
      (ad) =>
        ad.status &&
        ad.status.name &&
        ['pending', 'under review'].includes(ad.status.name.toLowerCase())
    ).length;
  }

  getRecentAds(): Advertisement[] {
    return this.userAds
      .sort(
        (a, b) =>
          new Date(b.startsOn).getTime() - new Date(a.startsOn).getTime()
      )
      .slice(0, 3);
  }

  getDescriptionText(description: string | undefined): string {
    if (!description) return 'No description available';
    return description.length > 100
      ? description.slice(0, 100) + '...'
      : description;
  }

  hasImages(ad: Advertisement): boolean {
    return !!(ad.images && ad.images.length > 0);
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return 'Not provided';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  }

  getUserContact(): string {
    return this.currentUser?.contactNumber || 'Not provided';
  }

  getUserRole(): string {
    return this.currentUser?.role?.name || 'User';
  }

  navigateToCreateAd(): void {
    this.router.navigate(['/post-ad']);
  }

  getStatusClass(ad: Advertisement): string {
    if (!ad.status || !ad.status.name) return 'badge bg-secondary';

    const statusName = ad.status.name.toLowerCase();
    switch (statusName) {
      case 'active':
      case 'approved':
        return 'badge bg-success';
      case 'pending':
      case 'under review':
        return 'badge bg-warning';
      case 'rejected':
      case 'expired':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  updatePageData(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAds = this.userAds.slice(start, end);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePageData();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updatePageData();
    }
  }

  goToPage(num: number): void {
    this.page = num;
    this.updatePageData();
  }

  getPageNumbers(): number[] {
    let start = Math.max(1, this.page - 2);
    let end = Math.min(this.totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
