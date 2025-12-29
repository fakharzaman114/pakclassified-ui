import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertisementCategory } from '../../models/pakClassified/advertisementCategory.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementCategoryService {
  private baseUrl = environment.apiUrl + 'AdvertisementCategory';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<AdvertisementCategory[]> {
    return this.httpClient.get<AdvertisementCategory[]>(this.baseUrl);
  }
}
