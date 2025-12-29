import { Component, OnInit } from '@angular/core';
import { AdvertisementCategory } from '../../core/models/pakClassified/advertisementCategory.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-section',
  imports: [CommonModule],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.css',
})
export class CategoriesSectionComponent implements OnInit {
  categories: AdvertisementCategory[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Real backend categories with static images
    this.categories = [
      {
        id: 1,
        name: 'Mobiles',
        description: 'Smartphones, tablets, mobile accessories',
        image: 'category/mobile-3.jpg',
      },
      {
        id: 2,
        name: 'Vehicles',
        description: 'Cars, bikes, trucks, tractors, auto parts',
        image: 'category/vehicle-1.png',
      },
      {
        id: 3,
        name: 'Properties',
        description: 'Houses, plots, apartments, commercial property',
        image: 'category/house-1.jpg',
      },
      {
        id: 5,
        name: 'Electronics & Home Appliances',
        description: 'TVs, refrigerators, computers',
        image: 'category/electronic-1.jpg',
      },
      {
        id: 6,
        name: 'Home & Furniture',
        description: 'Furniture, home décor, kitchen items',
        image: 'category/home-furniture-1.jpg',
      },
      {
        id: 7,
        name: 'Fashion & Beauty',
        description: 'Clothes, shoes, jewelry, cosmetics',
        image: 'category/fashion-1.jpg',
      },
      {
        id: 8,
        name: 'Books Sports & Hobbies',
        description: 'Books, gym equipment, musical instruments',
        image: 'category/books_hobbies-2.png',
      },
      {
        id: 9,
        name: 'Kids & Babies',
        description: 'Toys, baby clothes, prams, children’s items',
        image: 'category/kids-stuff-2.png',
      },
      {
        id: 10,
        name: 'Animals',
        description: 'Pets, livestock, birds, pet accessories',
        image: 'category/live-stock-2.png',
      },
      {
        id: 11,
        name: 'Events & Entertainment',
        description: 'Event planning, catering, sound systems',
        image: 'category/events-2.png',
      },
      {
        id: 13,
        name: 'Education & Learning',
        description: 'Courses, coaching, educational materials',
        image: 'category/education-3.png',
      },
      {
        id: 14,
        name: 'Services',
        description: 'Repair, construction, tuition, event services',
        image: 'category/services-3.png',
      },
    ];
  }

  openCategory(category: AdvertisementCategory) {
    this.router.navigate(['/category', category.id]);
  }
}
