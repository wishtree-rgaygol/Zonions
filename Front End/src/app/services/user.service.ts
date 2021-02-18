import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/zonions/restaurants';


  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'home', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  createRestaurant(restaurant: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`, restaurant);

  }

  updateRestaurant(id: number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getRestaurant(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getRestaurantsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
