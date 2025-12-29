import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../../models/location/city.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private baseUrl = environment.apiUrl + 'City';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.baseUrl);
  }

  getById(id: number): Observable<City> {
    return this.httpClient.get<City>(`${this.baseUrl}/${id}`);
  }
}
