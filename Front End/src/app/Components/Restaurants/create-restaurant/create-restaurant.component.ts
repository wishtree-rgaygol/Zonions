import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Restaurant } from 'src/app/Models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  submitted = false;
  file: any;
  rest: any;


  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  num: number;

  opentime = {hour: 10, minute: 10};
  closetime = {hour: 10, minute: 10};

  constructor(private restaurantService: RestaurantService,
              private router: Router, private httpClient: HttpClient,private logger:NGXLogger) { }


  ngOnInit(): void {
  }

  newRestaurant(): void {
    this.submitted = false;
    this.restaurant = new Restaurant();
  }

  save(): void {
    this.restaurantService
    .createRestaurant(this.restaurant).subscribe(data => {
      this.logger.info(data);
      this.rest = data;
      this.logger.info(this.restaurant.openTime);

      this.revert();
    },
    error => this.logger.error(error));
  }

  onSubmit(): void {
    this.restaurant.openTime = this.opentime.hour + ':' + this.opentime.minute;
    this.restaurant.closeTime = this.closetime.hour + ':' + this.closetime.minute;
    this.submitted = true;
    this.save();


  }

  revert(): void {
    this.router.navigate(['/home']);
  }

}
