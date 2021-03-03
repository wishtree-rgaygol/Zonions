import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';


@Component({
  selector: 'kt-create-restaurant',
  templateUrl: './create-restaurant.component.html',
})
export class CreateRestaurantComponent implements OnInit {
   /* restaurant: Restaurant = new Restaurant();
  submitted = false;
  file: any;
  rest: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
 
  num: number;

  opentime = { hour: 10, minute: 10 };
  closetime = { hour: 10, minute: 10 };

  constructor(private restaurantService: RestaurantService,
              private router: Router, private httpClient: HttpClient,
              ) {  }


  ngOnInit(): void {
  }
  newRestaurant(): void {
    this.submitted = false;
    this.restaurant = new Restaurant();
  }

  save(): void {
    let now=moment();
    this.restaurant.lastModified=now.format();
    this.restaurantService
      .createRestaurant(this.restaurant).subscribe(data => {
 */        //this.logger.log(data);
     //   this.rest = data;
       // this.logger.log(this.restaurant.openTime);

       // this.revert();
      /* },
        error => {
          if (error.status === 500){
            this.router.navigate(['/500']);
          }
        });
  }

  onSubmit(): void { */
/*     this.restaurant.openTime = this.opentime.hour + ':' + this.opentime.minute;
    this.restaurant.closeTime = this.closetime.hour + ':' + this.closetime.minute; */
 /*    this.submitted = true;
    this.save();


  }

  revert(): void {
    this.router.navigate(['/home']);
  }
 */
restaurant: Restaurant = new Restaurant();
rest = Restaurant;
submitted = false;
constructor(private restaurantservice: RestaurantService,
  private router: Router) { }

ngOnInit() {
}

newEmployee(): void {
  this.submitted = false;
  this.restaurant = new Restaurant();
}

save() {  
  let now=moment();
  this.restaurant.lastModified=now.format();                 /* <---Actual method for registration(Which call service method) to save Restaurant */
  this.restaurantservice
    .createRestaurant(this.restaurant).subscribe(data => {
      console.log(data)
      this.restaurant = new Restaurant();
      this.refreshRestaurants();
    },
      error => console.log(error));
}

createRestaurant() {        /* <---Method call from Registration Form */
  this.submitted = true;
  this.save();
}

refreshRestaurants() {       /* <---Method to display the all restaurants again after addition of new restaurant */
   this.router.navigate(['restaurants', 'restHome']);
}


}
