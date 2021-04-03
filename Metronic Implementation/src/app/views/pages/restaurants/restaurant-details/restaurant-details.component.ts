import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'kt-restaurant-details',
  templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit {
  openNow = false;
  currentTime = new Date();
  timeCounter = true;
  restid: number;
  restaurants: Observable<Restaurant[]>;
  restaurant: Restaurant;
  fileURL = "http://localhost:8080/api/zonions/get";     /* <---URL comes from rest api to display the uploaded menu */
  imagePath: any;

  constructor(private route: ActivatedRoute, private router: Router,
              private restaurantService: RestaurantService, private httpClient: HttpClient, private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Restaurant Details');
    this.restaurant = new Restaurant();
    this.restid = this.route.snapshot.params['restid'];
    this.restaurantService.getRestaurantById(this.restid)
      .subscribe(data => {
        this.restaurant = data;
        let hour:any = (this.restaurant.closeTime.split(':'))[0];
        let min:any = (this.restaurant.closeTime.split(':'))[1];
        // tslint:disable-next-line: no-unused-expression
        if (hour >= this.currentTime.getHours())
        { 
          if(min <= this.currentTime.getMinutes())
          {
            this.timeCounter = false;
          }
        }
        console.log(this.currentTime.getHours());
        console.log(hour);
        console.log(min);
        this.imagePath = `${this.fileURL}/${this.restaurant.restid}/${this.restaurant.name}`;
      }, error => console.log(error)
      );
  }

  list() {                             /* <---Method call from details Form for come back to Homepage */
    this.router.navigate(['restaurants', 'restHome']);
  }
}
