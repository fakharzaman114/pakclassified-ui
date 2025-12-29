import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Models
import { AdvertisementCategory } from '../../core/models/pakClassified/advertisementCategory.model';
import { AdvertisementSubCategory } from '../../core/models/pakClassified/advertisementSubCategory.model';
import { City } from '../../core/models/location/city.model';
import { CityArea } from '../../core/models/location/cityArea.model';
import { AdvertisementType } from '../../core/models/pakClassified/advertisementType.model';
import { AdvertisementStatus } from '../../core/models/pakClassified/advertisementStatus.model';
import { AdvertisementTag } from '../../core/models/pakClassified/advertisementTag.model';

// Services
import { AdvertisementService } from '../../core/services/pakClassified/advertisement.service';
import { AdvertisementCategoryService } from '../../core/services/pakClassified/advertisement-category.service';
import { AdvertisementSubcategoryService } from '../../core/services/pakClassified/advertisement-subcategory.service';
import { CityService } from '../../core/services/location/city.service';
import { AdvertisementTypeService } from '../../core/services/pakClassified/advertisement-type.service';
import { AdvertisementStatusService } from '../../core/services/pakClassified/advertisement-status.service';
import { AdvertisementTagService } from '../../core/services/pakClassified/advertisement-tag.service';
import { CityAreaService } from '../../core/services/location/city-area.service';
import { AuthService } from '../../core/services/authServices/auth.service';

@Component({
  selector: 'app-post-advertisement',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-advertisement.component.html',
  styleUrls: ['./post-advertisement.component.css'],
})
export class PostAdvertisementComponent implements OnInit {
  form!: FormGroup;

  categories: AdvertisementCategory[] = [];
  subCategories: AdvertisementSubCategory[] = [];
  cities: City[] = [];
  cityAreas: CityArea[] = [];
  types: AdvertisementType[] = [];
  statuses: AdvertisementStatus[] = [];
  existingTags: AdvertisementTag[] = [];

  imagePreviews: string[] = [];
  imageFiles: File[] = [];

  private auth = inject(AuthService);
  private router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private adService: AdvertisementService,
    private categoryService: AdvertisementCategoryService,
    private subCatService: AdvertisementSubcategoryService,
    private cityService: CityService,
    private cityAreaService: CityAreaService,
    private typeService: AdvertisementTypeService,
    private statusService: AdvertisementStatusService,
    private tagService: AdvertisementTagService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();

    if (!currentUser) {
      this.toastr.error('Please login first to post an advertisement.');
      this.router.navigate(['/signin']);
      return;
    }

    this.initializeForm(currentUser.id);
    this.loadDropdownData();
  }

  private initializeForm(userId: number): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      hits: [0],

      cityId: [null, Validators.required],
      cityAreaId: [null, Validators.required],
      categoryId: [null, Validators.required],
      subCategoryId: [null, Validators.required],
      typeId: [null, Validators.required],
      statusId: [null, Validators.required],

      postedById: [userId, Validators.required],

      startsOn: [new Date(), Validators.required],
      endsOn: [new Date(), Validators.required],

      tagIds: [[]],
      newTagNames: this.fb.array([]),
    });
  }

  // Existing Tags
  get selectedTagIds(): number[] {
    return this.form.get('tagIds')?.value || [];
  }

  onExistingTagSelected(event: any): void {
    const id = +event.target.value;
    if (!id) return;

    const currentIds = this.selectedTagIds;
    if (!currentIds.includes(id)) {
      currentIds.push(id);
      this.form.patchValue({ tagIds: currentIds });
    }
    event.target.value = '';
  }

  removeExistingTag(tagId: number): void {
    const currentIds = this.selectedTagIds;
    const index = currentIds.indexOf(tagId);
    if (index > -1) {
      currentIds.splice(index, 1);
      this.form.patchValue({ tagIds: currentIds });
    }
  }

  getTagNameById(id: number): string {
    const tag = this.existingTags.find((t) => t.id === id);
    return tag?.name ?? '';
  }

  // New Tags
  get newTagNames(): FormArray {
    return this.form.get('newTagNames') as FormArray;
  }

  addNewTag(tag: string): void {
    if (tag.trim().length > 0) {
      this.newTagNames.push(this.fb.control(tag));
    }
  }

  removeNewTag(index: number): void {
    this.newTagNames.removeAt(index);
  }

  private loadDropdownData(): void {
    this.categoryService.getAll().subscribe((res) => (this.categories = res));
    this.subCatService.getAll().subscribe((res) => (this.subCategories = res));
    this.cityService.getAll().subscribe((res) => (this.cities = res));
    this.cityAreaService.getAll().subscribe((res) => (this.cityAreas = res));
    this.typeService.getAll().subscribe((res) => (this.types = res));
    this.statusService.getAll().subscribe((res) => (this.statuses = res));
    this.tagService.getAll().subscribe((res) => (this.existingTags = res));
  }

  onCategoryChange(event: any): void {
    const categoryId = +event.target.value;
    if (!categoryId) {
      this.subCategories = [];
      this.form.patchValue({ subCategoryId: null });
      return;
    }
    this.subCatService.getByCategory(categoryId).subscribe({
      next: (res) => (this.subCategories = res),
      error: () => (this.subCategories = []),
    });
  }

  onCityChange(event: any): void {
    const cityId = +event.target.value;
    if (!cityId) {
      this.cityAreas = [];
      this.form.patchValue({ cityAreaId: null });
      return;
    }
    this.cityAreaService.getByCity(cityId).subscribe({
      next: (res) => (this.cityAreas = res),
      error: () => (this.cityAreas = []),
    });
  }

  onImagesSelected(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.imageFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.imageFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  submitAdvertisement(): void {
    if (this.form.invalid) {
      this.toastr.error('Please complete the required fields.');
      return;
    }

    // Prepare the payload
    const payload = {
      ...this.form.value,
      images: this.imageFiles,
    };

    this.adService.createAd(payload).subscribe({
      next: (res) => {
        console.log('Created Advertisement:', res); // Debug response
        this.toastr.success('Advertisement posted successfully!');

        // Reset form and clear selections only after success
        this.form.reset();
        this.imagePreviews = [];
        this.imageFiles = [];
        this.form.patchValue({ tagIds: [] });
        this.newTagNames.clear();
      },
      error: (err) => {
        console.error('Advertisement creation failed:', err); // Debug error
        this.toastr.error(
          err?.error?.message || 'Failed to post advertisement'
        );
      },
    });
  }

  navigateToAds(): void {
    this.router.navigateByUrl('/');
  }
}
