import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable,Subject } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'kt-home',
  templateUrl: './restaurant-home.component.html',
})
export class HomeComponent implements OnInit {
  restaurants: Observable<Restaurant[]>;
  rest = new Restaurant();
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor(private restaurantService: RestaurantService,
    private router: Router,private title:Title,private logger: NGXLogger) { }

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
   restaurantDetails(restid: number) {
    this.logger.info('In Restaurant Get By Id Method');
    this.router.navigate(['restaurants','restDetails', restid]);
  } 
 
}
