import { Component } from '@angular/core';
import { AdvertisementCategory } from '../../core/models/pakClassified/advertisementCategory.model';
import { CityArea } from '../../core/models/location/cityArea.model';
import { AdvertisementCategoryService } from '../../core/services/pakClassified/advertisement-category.service';
import { CommonModule } from '@angular/common';
import { City } from '../../core/models/location/city.model';
import { CityService } from '../../core/services/location/city.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CityAreaService } from '../../core/services/location/city-area.service';

@Component({
  selector: 'app-search-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-section.component.html',
  styleUrl: './search-section.component.css',
})
export class SearchSectionComponent {
  categories: AdvertisementCategory[] = [];
  cityAreas: CityArea[] = [];
  cities: City[] = [];

  // Search form model
  searchKeyword: string = '';
  selectedCategoryId: number = 0;
  selectedCityAreaId: number = 0;

  constructor(
    private categoryService: AdvertisementCategoryService,
    private cityAreaService: CityAreaService,
    private cityService: CityService,
    private router: Router
  ) {
    this.loadDropDown();
  }

  loadDropDown() {
    // Fetching Categories
    this.categoryService.getAll().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.error('Error Fetching Categories', err),
    });

    // Fetching CityAreas
    this.cityAreaService.getAll().subscribe({
      next: (res) => (this.cityAreas = res),
      error: (err) => console.error('Error Fetching City Areas', err),
    });

    // Fetching Cities
    this.cityService.getAll().subscribe({
      next: (res) => (this.cities = res),
      error: (err) => console.error('Error Fetching Cities', err),
    });
  }

  // Perform search
  onSearch() {
    // Build query parameters
    const queryParams: any = {};

    if (this.searchKeyword.trim()) {
      queryParams.keyword = this.searchKeyword.trim();
    }

    if (this.selectedCategoryId > 0) {
      queryParams.categoryId = this.selectedCategoryId;
    }

    if (this.selectedCityAreaId > 0) {
      queryParams.cityAreaId = this.selectedCityAreaId;
    }

    // Navigate to search results page with query parameters
    this.router.navigate(['/search-results'], { queryParams: queryParams });
  }

  // Reset search form
  resetSearch() {
    this.searchKeyword = '';
    this.selectedCategoryId = 0;
    this.selectedCityAreaId = 0;
  }
}
