import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/views/pages/restaurants/_services/restaurant.service';
import { Restaurant } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/views/pages/restaurants/_helpers/restaurant';
import { Title } from '@angular/platform-browser';
import TitleName from '../_helpers/TitleName';


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
