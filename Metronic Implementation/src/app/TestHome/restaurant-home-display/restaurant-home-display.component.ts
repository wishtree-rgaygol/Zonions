import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
// tslint:disable-next-line: max-line-length
import { Restaurant } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/views/pages/restaurants/_helpers/restaurant';
// tslint:disable-next-line: max-line-length
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/views/pages/restaurants/_services/restaurant.service';

@Component({
  selector: 'kt-restaurant-home-display',
  templateUrl: './restaurant-home-display.component.html',
  styleUrls: ['./restaurant-home-display.component.scss']
})
export class RestaurantHomeDisplayComponent implements OnInit {

  restaurants: Observable<Restaurant[]>;
  rest = new Restaurant();
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor(private restaurantService: RestaurantService,
    private router: Router,private title:Title) { }

  ngOnInit() {
this.title.setTitle('Active Restaurants');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3
    };
    this.getRestaurantList();
  }

  getRestaurantList() { /* Method getting all the active restaurants */
    this.restaurants = this.restaurantService.getAllRestaurant();
    this.dtTrigger.next();
  }
   restaurantDetails() {
 
    this.openAlertDialog();
    this.router.navigate(['auth', 'login']);
  }
  openAlertDialog(){
    Swal.fire('Please Login First..!');
  }
}
