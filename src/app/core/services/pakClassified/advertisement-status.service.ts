import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertisementStatus } from '../../models/pakClassified/advertisementStatus.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementStatusService {
  private baseUrl = environment.apiUrl + 'AdvertisementStatus';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<AdvertisementStatus[]> {
    return this.httpClient.get<AdvertisementStatus[]>(this.baseUrl);
  }
}
