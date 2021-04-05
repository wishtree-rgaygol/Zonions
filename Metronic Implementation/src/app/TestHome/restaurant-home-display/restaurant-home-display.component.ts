import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Restaurant } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/TestHome/models/restaurant';
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/TestHome/services/restaurant.service';

@Component({
  selector: 'kt-restaurant-home-display',
  templateUrl: './restaurant-home-display.component.html',
  styleUrls: ['./restaurant-home-display.component.scss']
})
export class RestaurantHomeDisplayComponent implements OnInit {
  restaurants = new Array<Restaurant>();
  public errorMessage = '';

  constructor(private restaurantService: RestaurantService, private router: Router,
              private title: Title, private logger: NGXLogger) {}

  listData: MatTableDataSource<Restaurant>;
  displayedColumns: string[] = ['restname', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit(): void {
    this.title.setTitle('Home Page');

    this.restaurantService.getAllRestaurant().subscribe((data) => {
      console.log(data);
      console.log(data.length);
      this.restaurants = data;
      this.listData = new MatTableDataSource(this.restaurants);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
              // tslint:disable-next-line: no-shadowed-variable
      this.listData.filterPredicate = (data, filter) => {
                return this.displayedColumns.some(element => {
                  return element !== 'actions' && data[element].toLowerCase().indexOf(filter) !== -1;

                });
              };
    },   error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  restaurantDetails(restid: number) {
    this.logger.info('In Restaurant Get By Id Method');
    this.router.navigate(['restaurant', 'restaurantDetail', restid]);
  }
 
}

