import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../../core/models/pakClassified/advertisement.model';
import { AdvertisementService } from '../../core/services/pakClassified/advertisement.service';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../../core/pipes/pkr-currency.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-posts',
  imports: [CommonModule, PkrCurrencyPipe],
  templateUrl: './latest-posts.component.html',
  styleUrl: './latest-posts.component.css',
})
export class LatestPostsComponent implements OnInit {
  latestAdvertisements: Advertisement[] = [];
  paginatedAds: Advertisement[] = [];

  isLoading: boolean = true;

  page: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;

  constructor(
    private advertisementService: AdvertisementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLatestAds();
  }

  loadLatestAds(): void {
    this.advertisementService.getAll().subscribe({
      next: (ads: Advertisement[]) => {
        this.latestAdvertisements = ads.reverse();

        this.totalPages = Math.ceil(
          this.latestAdvertisements.length / this.pageSize
        );

        this.updatePageData();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading ads:', err);
        this.isLoading = false;
      },
    });
  }

  updatePageData() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAds = this.latestAdvertisements.slice(start, end);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePageData();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePageData();
    }
  }

  goToPage(num: number) {
    this.page = num;
    this.updatePageData();
  }

  // Return the 5-page window
  getPageNumbers(): number[] {
    let start = Math.max(1, this.page - 2);
    let end = Math.min(this.totalPages, start + 4);

    // Adjust window if at end
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  // Helpers...
  getDescriptionText(desc: string | undefined) {
    if (!desc) return 'No description available';
    return desc.length > 100 ? desc.slice(0, 100) + '...' : desc;
  }

  hasImages(ad: Advertisement) {
    return ad.images && ad.images.length > 0;
  }

  hasTags(ad: Advertisement) {
    return ad.tags && ad.tags.length > 0;
  }

  viewAdDetails(id: number) {
    this.router.navigate(['/advertisement', id]);
  }
}
