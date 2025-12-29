import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertisementType } from '../../models/pakClassified/advertisementType.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementTypeService {
  private baseUrl = environment.apiUrl + 'AdvertisementType';

  constructor(private httpCient: HttpClient) {}

  getAll(): Observable<AdvertisementType[]> {
    return this.httpCient.get<AdvertisementType[]>(this.baseUrl);
  }
}
