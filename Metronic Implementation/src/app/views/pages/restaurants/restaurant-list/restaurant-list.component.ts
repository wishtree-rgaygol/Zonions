import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';


@Component({
  selector: 'kt-restaurant-list',
  templateUrl: './restaurant-list.component.html',
})
export class RestaurantListComponent implements OnInit {
restaurants: Observable<Restaurant[]>;
  rest = new Restaurant();

  constructor(private restaurantService: RestaurantService,
    private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.refreshRestaurants();
  }

  refreshRestaurants() {                                   /* <---Method to Diplay all the Restaurants list again to admin */
    this.restaurants = this.restaurantService.getAllRestaurant();
  }

  deleteRestaurant(restid: number) {                      /* <---Method call from Display List Form to Delete Restaurant */
    this.restaurantService.deleteRestaurant(restid)
      .subscribe(
        data => {
          this.refreshRestaurants();
        },
        error => console.log(error));
  }

  updateRestaurant(restid: number) {                     /* <---Method call from Display List Form to Update Restaurant */
    this.router.navigate(['restaurants', 'restUpdate', restid]);
  }

/*   createRestaurant(restaurant: Restaurant) {          
    this.router.navigate(['addRestaurant', restaurant]);
  }
 */
  list() {                                               /* <---Method for come back to the Homepage */
    this.router.navigate(['restaurants', 'restHome']);
  }

}
