import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
// tslint:disable-next-line: max-line-length
import { AddFeedbackComponent } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/TestHome/add-feedback/add-feedback.component';
// tslint:disable-next-line: max-line-length
import { Restaurant } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/TestHome/models/restaurant';
// tslint:disable-next-line: max-line-length
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/TestHome/services/restaurant.service';
import TitleName from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/TestHome/models/TitleName';
import { Menu } from '../models/menu';
import { RestaurantDetailsComponent } from '../restaurant-details/restaurant-details.component';
@Component({
  selector: 'kt-restaurant-home-display',
  templateUrl: './restaurant-home-display.component.html',
  styleUrls: ['./restaurant-home-display.component.scss']
})
export class RestaurantHomeDisplayComponent implements OnInit {
  displayedColumns: string[] = ['restname', 'restaddress', 'lastModified', 'star', 'details' ];
  
  dataSource: MatTableDataSource<Restaurant>;
  restaurants = new Array<Restaurant>();
  rest: Restaurant[];
  restaurant: any;
  api = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
  userInfo: any;
  resto: Restaurant[];
  restaurantData = new Array<Restaurant>();
  index: number;
  input = '';
  menuArray: any;
  restaurantId: number;
  searchValue: any;
  menuForm: FormGroup;
  restaurantTypeAll: any;
  data: any;
  menu: Menu[];
  url1: string;
	menuUrl: string;
	urlArray = [''];
  restaurantArray = new Array<Restaurant>();
   titleName: any = TitleName;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  
  constructor(private restaurantService: RestaurantService, private router: Router,
              private formBuilder: FormBuilder,
    // tslint:disable-next-line: align
    private title: Title, private logger: NGXLogger, public dialog: MatDialog, private http: HttpClient) {}


  ngOnInit() {
    
    for (let i = 0; i < this.titleName.length; i++) {
      console.log(this.titleName[i].name);
      this.title.setTitle(this.titleName[i].name + '|Home');
    }
    this.menuForm = this.formBuilder.group({
      menu: new FormControl(''),
    });
    this.restaurantService.getAllRestaurant().subscribe((data) => {
      console.log(data);
      console.log(data.length);
      this.restaurants = data;
      this.rest = data;
      this.restaurant = data;
      console.log('array values---', this.rest);
      this.dataSource = new MatTableDataSource(this.restaurants);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },   error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
    });
  }
  get menuform(): any {
    return this.menuForm.controls;
  }
applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

openDialog(): void {
  const dialogRef = this.dialog.open(AddFeedbackComponent, {
    width: '640px', disableClose: true
  });

}
restaurantDetails(restid: number) {
  this.logger.info('In Restaurant Get By Id Method');
  this.router.navigate(['restaurant', 'restaurantDetail', restid]);
}
}

