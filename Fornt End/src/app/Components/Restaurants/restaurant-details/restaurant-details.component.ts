import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Restaurant } from 'src/app/Models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  id: number;
  restaurant: Restaurant;
  url: string;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  isActive: boolean;

  imageurl = 'http://localhost:8080/zonions/imgrestaurant';

  constructor(private route: ActivatedRoute, private router: Router,
    private restaurantService: RestaurantService, private httpClient: HttpClient, private logger: NGXLogger) { }

  ngOnInit(): void {
    this.restaurant = new Restaurant();

    this.id = this.route.snapshot.params.id;

    this.restaurantService.getRestaurant(this.id)
      .subscribe(data => {
        this.logger.info(data);
        this.restaurant = data;



        if (this.restaurant.active === true) {
          this.isActive = true;
        }
      }, error => this.logger.error(error));

  }



  revert(): void {
    this.router.navigate(['/home']);
  }

  getImage(): void {

    this.httpClient.get('http://localhost:8080/zonions/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}
