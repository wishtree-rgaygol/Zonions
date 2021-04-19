import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
// tslint:disable-next-line: max-line-length
import { Restaurant } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/views/pages/restaurants/_helpers/restaurant';
// tslint:disable-next-line: max-line-length
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/views/pages/restaurants/_services/restaurant.service';
import {
  CloseScrollStrategy,
  GlobalPositionStrategy,
  IgxDialogComponent,
  IgxOverlayOutletDirective,
  PositionSettings,
  slideInBottom,
  slideOutTop
} from "igniteui-angular";
import { useAnimation } from "@angular/animations";
import TitleName from '../_helpers/TitleName';


@Component({
  selector: 'kt-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['restname', 'restaddress', 'restphone', 'actions'];
  dataSource: MatTableDataSource<Restaurant>;
  searchKey: string;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  restaurants = new Array<Restaurant>();
  restaurant: Observable<Restaurant[]>;
  titleName: any = TitleName;
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
    for (let i = 0; i < this.titleName.length; i++) {
			console.log(this.titleName[i].name);
			this.title.setTitle(this.titleName[i].name + '|All Restaurants');
		  }
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
    this.logger.info('In Restaurant List Method');             /* <---Method to Diplay all the Restaurants list again to admin */
    this.restaurant = this.restService.getAllRestaurant();

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  restaurantDetails(restid: number) {
    this.logger.info('In Restaurant Get By Id Method');
    this.router.navigate(['restaurants', 'restDetails', restid]);
  }
  Login() {
    this.router.navigate(['auth', 'login']);
  }


}
