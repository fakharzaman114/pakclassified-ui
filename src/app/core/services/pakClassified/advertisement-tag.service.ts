import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertisementTag } from '../../models/pakClassified/advertisementTag.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementTagService {
  private baseUrl = environment.apiUrl + 'AdvertisementTag';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<AdvertisementTag[]> {
    return this.httpClient.get<AdvertisementTag[]>(this.baseUrl);
  }
}
