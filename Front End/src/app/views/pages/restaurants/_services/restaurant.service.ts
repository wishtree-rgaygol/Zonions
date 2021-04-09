import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private uploadUrl = 'http://localhost:8080/api/zonions/upload';
  private bookTableUrl='http://localhost:8080/zonions/bookTable';
  private basedUrl = 'http://localhost:8080/api/zonions/restaurants';
  private getMenu = 'http://localhost:8080/api/zonions/file';
  constructor(private http: HttpClient) { }

  getRestaurantById(restid: number): Observable<any> {
    return this.http.get(`${this.basedUrl}/${restid}`);
  }

  createRestaurant(restaurant: Object): Observable<Object> {
    return this.http.post(`${this.basedUrl}`, restaurant);
  }

  updateRestaurant(restid: number, value: any): Observable<Object> {
    console.log("Update Service: " + restid);
    console.log("Update URL" + this.basedUrl + '/' + restid);
    return this.http.put(this.basedUrl + '/' + restid, value);
  }

  deleteRestaurant(restid: number): Observable<any> {
    console.log("Delete Service: " + restid);
    console.log("Delete URL" + this.basedUrl + '/' + restid);
    return this.http.delete(this.basedUrl + '/' + restid, { responseType: 'text' });

  }

  getAllRestaurant(): Observable<any> {
    return this.http.get(`${this.basedUrl}`);
  }
  UploadFileFromService(file: any, restid: number,imageType: String): any { /* Method to Upload the Menu */
    let target: DataTransfer = <DataTransfer>(file.target);
    let fileList: FileList = target.files;
    let Selectedfile: File = fileList[0];
    const formdata: FormData = new FormData();
    formdata.append('file', Selectedfile, Selectedfile.name);
    const req = new HttpRequest('PUT', `${this.uploadUrl}/${restid}/${imageType}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.http.request(req);
  }
  bookTable(bookTable: any): Observable<any> {
    return this.http.post(this.bookTableUrl, bookTable);
  }
  
  /* uploadMenu(file: any, id: number, menuType: string): any {
    const target: DataTransfer =  (file.target) as DataTransfer;
    const fileList: FileList = target.files;
    const filel: File = fileList[0];
    const formdata: FormData = new FormData();
    formdata.append('file', filel, filel.name);
    console.log('formdata in service', formdata);
   // formdata.append('file', file);
    const req = new HttpRequest('PUT', ${this.urlimage}/${id}/${menuType}, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    console.log('request object in service', req);
    return this.http.request(req);
  } */
  getMenuById(restid: number) {
    return this.http.get(`${this.getMenu}/${restid}`);
  }

  getAllMenus(): Observable<any> {
    return this.http.get(`${this.getMenu}`);
  }
}
