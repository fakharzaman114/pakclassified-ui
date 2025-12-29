import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../../core/models/pakClassified/advertisement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertisementService } from '../../core/services/pakClassified/advertisement.service';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../../core/pipes/pkr-currency.pipe';
import { AdvertisementCategoryService } from '../../core/services/pakClassified/advertisement-category.service';

@Component({
  selector: 'app-category-ads',
  imports: [CommonModule, PkrCurrencyPipe],
  templateUrl: './category-ads.component.html',
  styleUrl: './category-ads.component.css',
})
export class CategoryAdsComponent implements OnInit {
  ads: Advertisement[] = [];

  paginatedAds: Advertisement[] = [];

  page: number = 1;
  pageSize: number = 3; // same as Latest Posts
  totalPages: number = 0;

  categoryId!: number;
  categoryName: string = 'Category';
  isLoading: boolean = true; // loading state

  constructor(
    private route: ActivatedRoute,
    private adService: AdvertisementService,
    private categoryService: AdvertisementCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.categoryId = Number(id);
    console.log('Loaded Category ID: ', this.categoryId);

    // Load category name first, then ads
    this.loadCategoryName();
  }

  // Method to load category name
  loadCategoryName(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        const category = categories.find((cat) => cat.id === this.categoryId);
        if (category) {
          this.categoryName = category.name ?? 'Category';
        }
        // loading ads after we have category name
        this.loadAds();
      },
      error: (err) => {
        console.log('Error fetching categories:', err);
        this.categoryName = 'Category';
        this.loadAds();
      },
    });
  }

  // Method to load ads
  loadAds(): void {
    this.adService.getAll().subscribe({
      next: (res) => {
        this.ads = res.filter(
          (ad) => ad.subCategory?.category?.id === this.categoryId
        );

        // Pagination setup
        this.totalPages = Math.ceil(this.ads.length / this.pageSize);
        this.page = 1;
        this.updatePageData();

        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error fetching ads:', err);
        this.isLoading = false;
      },
    });
  }

  getDescriptionText(description: string | undefined): string {
    if (!description) return 'No description available';

    if (description.length > 100) {
      return description.slice(0, 100) + '...';
    }

    return description;
  }

  // Navigate to advertisement details page
  viewAdDetails(adId: number): void {
    this.router.navigate(['/advertisement', adId]);
  }

  updatePageData() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAds = this.ads.slice(start, end);
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

  getPageNumbers(): number[] {
    let start = Math.max(1, this.page - 2);
    let end = Math.min(this.totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }
}
