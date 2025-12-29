import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Advertisement } from '../../core/models/pakClassified/advertisement.model';
import { AdvertisementService } from '../../core/services/pakClassified/advertisement.service';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../../core/pipes/pkr-currency.pipe';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, PkrCurrencyPipe, RouterLink],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  advertisements: Advertisement[] = [];
  filteredAdvertisements: Advertisement[] = [];
  isLoading: boolean = true;

  // Search criteria
  searchKeyword: string = '';
  categoryId: number = 0;
  cityAreaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private advertisementService: AdvertisementService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchKeyword = params['keyword'] || '';
      this.categoryId = +params['categoryId'] || 0;
      this.cityAreaId = +params['cityAreaId'] || 0;

      this.loadAdvertisements();
    });
  }

  loadAdvertisements() {
    this.advertisementService.getAll().subscribe({
      next: (ads: Advertisement[]) => {
        this.advertisements = ads;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading advertisements:', err);
        this.isLoading = false;
      },
    });
  }

  applyFilters() {
    this.filteredAdvertisements = this.advertisements.filter((ad) => {
      // Keyword filter (search in name and description)
      let matchesKeyword = true;
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase();
        const nameMatch = ad.name.toLowerCase().includes(keyword);
        const descriptionMatch = ad.description
          ? ad.description.toLowerCase().includes(keyword)
          : false;
        matchesKeyword = nameMatch || descriptionMatch;
      }

      // Category filter
      let matchesCategory = true;
      if (this.categoryId > 0) {
        matchesCategory = ad.subCategory?.category?.id === this.categoryId;
      }

      // City Area filter
      let matchesCityArea = true;
      if (this.cityAreaId > 0) {
        matchesCityArea = ad.cityAreaId === this.cityAreaId;
      }

      return matchesKeyword && matchesCategory && matchesCityArea;
    });
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

  viewAdDetails(adId: number): void {
    this.router.navigate(['/advertisement', adId]);
  }
}
