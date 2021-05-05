import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/views/pages/restaurants/_services/restaurant.service';
import { Restaurant } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/views/pages/restaurants/_helpers/restaurant';
import { Title } from '@angular/platform-browser';
import TitleName from '../_helpers/TitleName';
// tslint:disable-next-line: max-line-length
import { RestaurantDataSource } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/views/pages/restaurants/_helpers/restaurantDataSource';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'kt-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  displayedColumns: string[] = ['restname', 'openTime', 'closeTime', 'lastModified', 'actions'];
  dataSource: MatTableDataSource<Restaurant>;
  searchKey: string;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  restaurants = new Array<Restaurant>();
  restaurant: Observable<Restaurant[]>;
  titleName: any = TitleName;
  constructor(private restService: RestaurantService, private title: Title, private router: Router, private logger: NGXLogger) {

  }
  ngOnInit(): void {
    for (let i = 0; i < this.titleName.length; i++) {
			console.log(this.titleName[i].name);
			this.title.setTitle(this.titleName[i].name + '|Restaurants List');
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
  } 
  /* constructor(
    private restService: RestaurantService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logger: NGXLogger,
    private title: Title
    ) {

  }
  titleName: any = TitleName;
  rest: Observable<Restaurant[]>;
  dataSource: RestaurantDataSource;
  restaurants: any;
  restaurantList = new Array<Restaurant>();
  restList: Restaurant[];
  loadData: any;
  restaurant: Restaurant = new Restaurant();
  displayedColumns: string[] = ['restname', 'openTime', 'closeTime', 'lastModified', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  id = 0;
  restaurantObject = new Array<Restaurant>();
  searchKey: string;
  comp: string;

  currentTutorial = null;
  currentIndex = 1;
  restaurantName = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [3, 6, 9];
   listData: MatTableDataSource<RestaurantDataSource>;
  // listData1: MatTableDataSource<Restaurant>;
ngOnInit(): void {
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.titleName.length; i++) {
    console.log(this.titleName[i].name);
    this.title.setTitle(this.titleName[i].name + '|Restaurants List');
    }
  this.dataSource = new RestaurantDataSource(this.restService);
  this.dataSource.loadTodos();
  console.log(this.dataSource.restoList);
  this.loadData = this.dataSource;
  this.listData = new MatTableDataSource(this.restaurants);
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
      }
    ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      // tslint:disable-next-line: deprecation
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.loadTodos())
      )
      // tslint:disable-next-line: deprecation
      .subscribe(data => console.log(data));
  }

    loadTodos() {
    this.dataSource.loadTodos(this.paginator.pageIndex, this.paginator.pageSize);
  } */
  
  removeRestaurant(restid: number){
		Swal.fire({
		  title: 'Are you sure you want to delete restaurant?',
		  text: 'This process is irreversible.',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Yes, go ahead.',
		  cancelButtonText: 'No, let me think'
		}).then((result) => {
		  if (result.value) {
			this.restService.deleteRestaurant(restid)
			.subscribe(
			  data => {
				this.refreshRestaurants();
				this.openAlertDialog();
			  },
			  error => console.log(error));
		  } else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire(
			  'Cancelled',
			  'Restaurant still in our database.)',
			  'error'
			)
		  }
		})
	  }
	 
	  openAlertDialog(){
		Swal.fire('Restaurant Deleted Successfully..!');
  window.location.reload();
	  }
	  refreshRestaurants() { 
		this.logger.info('In Restaurant List Method');             /* <---Method to Diplay all the Restaurants list again to admin */
		this.restaurant = this.restService.getAllRestaurant();
		
	  }
	  updateRestaurant(restid: number) {                     /* <---Method call from Display List Form to Update Restaurant */
		this.router.navigate(['restaurants', 'restUpdate', restid]);
	  }
    onSearchClear() {
      this.searchKey = '';
      this.applyFilter();
    }
  
    applyFilter() {
     this.dataSource.filter = this.searchKey.trim().toLowerCase();
    }
}
