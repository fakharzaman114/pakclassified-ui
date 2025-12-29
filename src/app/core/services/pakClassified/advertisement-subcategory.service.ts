import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertisementSubCategory } from '../../models/pakClassified/advertisementSubCategory.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementSubcategoryService {
  private baseUrl = environment.apiUrl + 'AdvertisementSubCategory';
  constructor(private httpCient: HttpClient) {}

  getAll(): Observable<AdvertisementSubCategory[]> {
    return this.httpCient.get<AdvertisementSubCategory[]>(this.baseUrl);
  }

  getByCategory(categoryId: number): Observable<AdvertisementSubCategory[]> {
    return this.httpCient.get<AdvertisementSubCategory[]>(
      `${this.baseUrl}/category/${categoryId}`
    );
  }
}
