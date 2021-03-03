import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'kt-restaurant-details',
  templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit {

  restid: number;
  restaurants: Observable<Restaurant[]>;
  restaurant: Restaurant;
  fileURL = "http://localhost:8080/zonions/get";     /* <---URL comes from rest api to display the uploaded menu */
  imagePath: any;

  constructor(private route: ActivatedRoute, private router: Router,
    private restaurantService: RestaurantService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.restaurant = new Restaurant();
    this.restid = this.route.snapshot.params['restid'];
    this.restaurantService.getRestaurantById(this.restid)
      .subscribe(data => {
        this.restaurant = data;
        this.imagePath = `${this.fileURL}/${this.restaurant.restid}/${this.restaurant.name}`;
      }, error => console.log(error)
      );
  }

  list() {                             /* <---Method call from details Form for come back to Homepage */
    this.router.navigate(['restaurants', 'restHome']);
  }
}
