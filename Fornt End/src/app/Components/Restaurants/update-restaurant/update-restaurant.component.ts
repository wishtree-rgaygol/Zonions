import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Restaurant } from 'src/app/Models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  id: number;
  restaurant: Restaurant;
  submitted = false;

  opentime = {hour: 10, minute: 10};

  closetime = {hour: 10, minute: 10};


  constructor(private route: ActivatedRoute, private router: Router,
              private restaurantService: RestaurantService, private httpClient: HttpClient,private logger:NGXLogger) { }

  ngOnInit(): void {

    this.restaurant = new Restaurant();

    this.id = this.route.snapshot.params.id;

    this.restaurantService.getRestaurant(this.id)
      .subscribe(data => {
        this.logger.info(data);
        this.restaurant = data;
      }, error => this.logger.error(error));
  }

  updateRestaurant(): void {
    this.restaurantService.updateRestaurant(this.id, this.restaurant)
      .subscribe(data => {
        this.logger.info(data);
        this.restaurant = new Restaurant();
      }, error => this.logger.error(error));
  }

  onSubmit(): void {
    this.restaurant.openTime = this.opentime.hour + ':' + this.opentime.minute;
    this.restaurant.closeTime = this.closetime.hour + ':' + this.closetime.minute;
    this.submitted = true;
    this.updateRestaurant();
  }

  revert(): void {
    this.router.navigate(['/home']);
  }

  public onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    this.logger.info(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.httpClient.post('http://localhost:8080/zonions/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Menu uploaded successfully';
        } else {
          this.message = 'Menu not uploaded successfully';
        }
      }

      );

    }

}
