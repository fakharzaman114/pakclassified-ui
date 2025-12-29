import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Advertisement,
  AdvertisementCreateModel,
  AdvertisementUpdateModel,
} from '../../models/pakClassified/advertisement.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {
  private baseUrl = environment.apiUrl + 'Advertisement';

  constructor(private httpClient: HttpClient) {}

  // Get all advertisements
  getAll(): Observable<Advertisement[]> {
    return this.httpClient.get<Advertisement[]>(this.baseUrl);
  }

  // Get advertisement by ID
  getById(id: number): Observable<Advertisement> {
    return this.httpClient.get<Advertisement>(`${this.baseUrl}/${id}`);
  }

  // Search advertisements
  searchAdvertisements(
    searchKeyword?: string,
    categoryId?: string,
    cityAreaId?: string
  ): Observable<Advertisement[]> {
    let params = new HttpParams();

    if (searchKeyword) {
      params = params.set('search', searchKeyword);
    }
    if (categoryId) {
      params = params.set('category', categoryId);
    }
    if (cityAreaId) {
      params = params.set('location', cityAreaId);
    }

    return this.httpClient.get<Advertisement[]>(`${this.baseUrl}/search`, {
      params,
    });
  }

  // Create new advertisement
  createAd(adData: AdvertisementCreateModel): Observable<Advertisement> {
    const formData = this.createFormData(adData);
    return this.httpClient.post<Advertisement>(this.baseUrl, formData);
  }

  // Update advertisement
  updateAd(
    id: number,
    adData: AdvertisementUpdateModel
  ): Observable<Advertisement> {
    const formData = this.createFormData(adData);
    return this.httpClient.put<Advertisement>(
      `${this.baseUrl}/${id}`,
      formData
    );
  }

  // Delete advertisement
  deleteAd(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Get ads by category
  getAdsByCategory(categoryId: number): Observable<Advertisement[]> {
    return this.httpClient.get<Advertisement[]>(
      `${this.baseUrl}/category/${categoryId}`
    );
  }

  // Get ads by user
  getAdsByUser(userId: number): Observable<Advertisement[]> {
    return this.httpClient.get<Advertisement[]>(
      `${this.baseUrl}/user/${userId}`
    );
  }

  // ✅ FIXED: Helper method to create FormData with safe null checks
  private createFormData(adData: any): FormData {
    const formData = new FormData();

    console.log('🔍 Creating FormData from:', adData);

    // Basic required fields with safe null checks
    if (adData.id !== undefined && adData.id !== null) {
      formData.append('Id', this.safeToString(adData.id));
    }

    // Required fields with validation
    formData.append('Name', this.safeToString(adData.name) || '');
    formData.append('Description', this.safeToString(adData.description) || '');
    formData.append('Price', this.safeToString(adData.price) || '0');
    formData.append('Hits', this.safeToString(adData.hits) || '0');

    // Date formatting with validation
    const startsOn = adData.startsOn ? new Date(adData.startsOn) : new Date();
    const endsOn = adData.endsOn ? new Date(adData.endsOn) : new Date();

    formData.append('StartsOn', startsOn.toISOString());
    formData.append('EndsOn', endsOn.toISOString());

    // IDs with validation - these are required fields
    this.appendRequiredId(formData, 'CityAreaId', adData.cityAreaId);
    this.appendRequiredId(formData, 'SubCategoryId', adData.subCategoryId);
    this.appendRequiredId(formData, 'PostedById', adData.postedById);
    this.appendRequiredId(formData, 'TypeId', adData.typeId);
    this.appendRequiredId(formData, 'StatusId', adData.statusId);

    // Tags - existing by ID
    if (
      adData.tagIds &&
      Array.isArray(adData.tagIds) &&
      adData.tagIds.length > 0
    ) {
      adData.tagIds.forEach((tagId: number) => {
        if (tagId !== null && tagId !== undefined) {
          formData.append('TagIds', this.safeToString(tagId));
        }
      });
    }

    // NEW TAGS - by name
    if (
      adData.newTagNames &&
      Array.isArray(adData.newTagNames) &&
      adData.newTagNames.length > 0
    ) {
      adData.newTagNames.forEach((tagName: string) => {
        if (tagName && tagName.trim()) {
          formData.append('NewTagNames', tagName.trim());
        }
      });
    }

    // Images for CREATE
    if (
      adData.images &&
      Array.isArray(adData.images) &&
      adData.images.length > 0
    ) {
      adData.images.forEach((file: File, index: number) => {
        if (file instanceof File) {
          formData.append('Images', file, file.name || `image-${index}`);
        }
      });
    }

    // New Images for UPDATE
    if (
      adData.newImages &&
      Array.isArray(adData.newImages) &&
      adData.newImages.length > 0
    ) {
      adData.newImages.forEach((file: File, index: number) => {
        if (file instanceof File) {
          formData.append('NewImages', file, file.name || `new-image-${index}`);
        }
      });
    }

    // Remove Image IDs for UPDATE
    if (
      adData.removeImageIds &&
      Array.isArray(adData.removeImageIds) &&
      adData.removeImageIds.length > 0
    ) {
      adData.removeImageIds.forEach((imgId: number) => {
        if (imgId !== null && imgId !== undefined) {
          formData.append('RemoveImageIds', this.safeToString(imgId));
        }
      });
    }

    // Debug: Log what's in formData
    this.logFormDataContents(formData);

    return formData;
  }

  // ✅ NEW: Safe toString method
  private safeToString(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    return String(value).toString();
  }

  // ✅ NEW: Append required ID fields with validation
  private appendRequiredId(
    formData: FormData,
    fieldName: string,
    value: any
  ): void {
    if (value === null || value === undefined) {
      console.error(`❌ Required field ${fieldName} is null or undefined!`);
      throw new Error(`Required field ${fieldName} is missing`);
    }
    formData.append(fieldName, this.safeToString(value));
  }

  // ✅ NEW: Debug method to log formData contents
  private logFormDataContents(formData: FormData): void {
    console.log('📦 FormData contents:');
    for (const pair of formData.entries()) {
      console.log(`  ${pair[0]}:`, pair[1]);
    }
  }
}
