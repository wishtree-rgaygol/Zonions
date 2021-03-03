import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = 'http://localhost:8080/zonions/restaurants';
  private uploadUrl='http://localhost:8080/zonions/restaurants/upload';
  constructor(private http: HttpClient) { }

  getRestaurant(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
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

  getRestaurantsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  UploadFileFromService(file: any, id: number): any { /* Method to Upload the Menu */
    let target: DataTransfer = <DataTransfer>(file.target);
    let fileList: FileList = target.files;
    let Selectedfile: File = fileList[0];
    const formdata: FormData = new FormData();
    formdata.append('file', Selectedfile, Selectedfile.name);
    const req = new HttpRequest('PUT', `${this.uploadUrl}/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.http.request(req);
  }
}
