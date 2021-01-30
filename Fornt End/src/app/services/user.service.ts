import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  private addRestUrl='http://localhost:8080/api/restaurants/addRest';
  private updateRestUrl='http://localhost:8080/api/restaurants/updateRest';
  private deleteRestUrl='http://localhost:8080/api/restaurants/deleteRest';
  private getAllRestUrl='http://localhost:8080/api/restaurants/getAllRest';
  private getByIdRestUrl='http://localhost:8080/api/restaurants/getRestByID';
  
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'home', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getRestaurant(id: number): Observable<any> {
    return this.http.get(`${this.getByIdRestUrl}/${id}`);
  }
  createRestaurant(restaurant: object): Observable<object> {
    return this.http.post(`${this.addRestUrl}`, restaurant);

  }

  updateRestaurant(id: number, value: any): Observable<object> {
    return this.http.put(`${this.updateRestUrl}/${id}`, value);
  }

  deleteRestaurant(id: number): Observable<any> {

    return this.http.delete(`${this.deleteRestUrl}/${id}`, { responseType: 'text' });
  }

  getRestaurantsList(): Observable<any> {
    return this.http.get(`${this.getAllRestUrl}`);
  }
}
