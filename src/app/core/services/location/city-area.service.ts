import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityArea } from '../../models/location/cityArea.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityAreaService {
  private baseUrl = environment.apiUrl + 'CityArea';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<CityArea[]> {
    return this.httpClient.get<CityArea[]>(this.baseUrl);
  }

  getByCityId(cityId: number): Observable<CityArea[]> {
    return this.httpClient.get<CityArea[]>(`${this.baseUrl}/city/${cityId}`);
  }

  getById(id: number): Observable<CityArea> {
    return this.httpClient.get<CityArea>(`${this.baseUrl}/${id}`);
  }

  getByCity(cityId: number): Observable<CityArea[]> {
    return this.httpClient.get<CityArea[]>(`${this.baseUrl}/city/${cityId}`);
  }
}
