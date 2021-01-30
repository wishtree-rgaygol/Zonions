import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private addRestUrl='http://localhost:8080/api/restaurants/addRest';
  private updateRestUrl='http://localhost:8080/api/restaurants/updateRest';
  private deleteRestUrl='http://localhost:8080/api/restaurants/deleteRest';
  private getAllRestUrl='http://localhost:8080/api/restaurants/getAllRest';
  private getByIdRestUrl='http://localhost:8080/api/restaurants/getRestByID';
  
  constructor(private http: HttpClient) { }

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
