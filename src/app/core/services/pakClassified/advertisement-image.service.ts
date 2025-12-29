import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertisementImage } from '../../models/pakClassified/advertisementImage.model';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementImageService {
  private baseUrl = environment.apiUrl + 'AdvertisementImage';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<AdvertisementImage[]> {
    return this.httpClient.get<AdvertisementImage[]>(this.baseUrl);
  }
}
