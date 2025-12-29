import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Advertisement } from '../../core/models/pakClassified/advertisement.model';
import { AdvertisementService } from '../../core/services/pakClassified/advertisement.service';
import { PkrCurrencyPipe } from '../../core/pipes/pkr-currency.pipe';

@Component({
  selector: 'app-ads-details',
  imports: [CommonModule, PkrCurrencyPipe],
  templateUrl: './ads-details.component.html',
  styleUrl: './ads-details.component.css',
})
export class AdsDetailsComponent implements OnInit {
  ad: Advertisement | null = null;
  loading: boolean = true;
  error: string | null = null;
  mainImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adService: AdvertisementService
  ) {}

  ngOnInit(): void {
    this.loadAdDetails();
  }

  loadAdDetails(): void {
    const adId = Number(this.route.snapshot.paramMap.get('id'));

    if (!adId) {
      this.error = 'Invalid advertisement ID';
      this.loading = false;
      return;
    }

    this.adService.getById(adId).subscribe({
      next: (advertisement) => {
        this.ad = advertisement;
        this.setMainImage();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading ad details:', err);
        this.error = 'Failed to load advertisement details';
        this.loading = false;
      },
    });
  }

  setMainImage(imageUrl?: string): void {
    if (imageUrl) {
      this.mainImage = imageUrl;
    } else if (
      this.ad?.images &&
      this.ad.images.length > 0 &&
      this.ad.images[0].url
    ) {
      // Prop er null check for the url property
      this.mainImage = this.ad.images[0].url;
    } else {
      this.mainImage = '/no-image.jpg';
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
