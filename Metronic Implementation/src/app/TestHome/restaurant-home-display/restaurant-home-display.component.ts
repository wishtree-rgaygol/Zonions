import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
// tslint:disable-next-line: max-line-length
// tslint:disable-next-line: max-line-length
import { CloseScrollStrategy,
  GlobalPositionStrategy,
  IgxDialogComponent,
  IgxOverlayOutletDirective,
  PositionSettings,
  slideInBottom,
  slideOutTop } from "igniteui-angular";
  import { useAnimation } from "@angular/animations";
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

/* 
displayedColumns: string[] = ['restname', 'restaddress', 'restphone', 'actions'];
  dataSource: MatTableDataSource<Restaurant>;
  searchKey: string;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  restaurants = new Array<Restaurant>();
  restaurant: Observable<Restaurant[]>;
  constructor(private restService: RestaurantService, private title: Title, private router: Router, private logger: NGXLogger) {

  }
  @ViewChild(IgxOverlayOutletDirective, { static: true })
  public outlet: IgxOverlayOutletDirective;

  @ViewChild("dialog1", { read: IgxDialogComponent, static: true })
  public dialog: IgxDialogComponent;

  private _animaitonSettings: PositionSettings = {
      openAnimation: useAnimation(slideInBottom, { params: { fromPosition: "translateY(100%)" } }),
      closeAnimation: useAnimation(slideOutTop, { params: { toPosition: "translateY(-100%)" } })
   };

  private _dialogOverlaySettings2;

  public openDialog() {
      this._dialogOverlaySettings2.outlet = this.outlet;
      this.dialog.open(this._dialogOverlaySettings2);
  }
  ngOnInit(): void {
    this.title.setTitle('Restaurants List');
     // tslint:disable-next-line: align
     this.restService.getAllRestaurant().subscribe(
      (data) => {
        this.restaurants = data;
        this.dataSource = new MatTableDataSource(this.restaurants);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // tslint:disable-next-line: no-shadowed-variable
        this.dataSource.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(element => {
            return element !== 'actions' && data[element].toLowerCase().indexOf(filter) !== -1;

          });
        };
      }, error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
      }
    );
    this._dialogOverlaySettings2 = {
      modal: true,
      outlet: this.outlet,
      scrollStrategy: new CloseScrollStrategy(),
      positionStrategy: new GlobalPositionStrategy(this._animaitonSettings)
  };
  }

	  refreshRestaurants() { 
		this.logger.info('In Restaurant List Method');           
		this.restaurant = this.restService.getAllRestaurant();
		
	  }
	
    onSearchClear() {
      this.searchKey = '';
      this.applyFilter();
    }
  
    applyFilter() {
      this.dataSource.filter = this.searchKey.trim().toLowerCase();
    }
    restaurantDetails() {
 
      this.openAlertDialog();
      this.router.navigate(['auth', 'login']);
    }
    Login() {
      this.router.navigate(['auth', 'login']);
    }
    openAlertDialog(){
      Swal.fire('Please Login First..!');
    }
*/