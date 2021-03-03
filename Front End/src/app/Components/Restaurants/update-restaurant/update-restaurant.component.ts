import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Restaurant } from 'src/app/Models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { TranslateService } from '@ngx-translate/core';

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
  
   imagePath:any;
   displayURL='http://localhost:8080/zonions/restaurants/get';
   supportLanguages = ['en', 'fr', 'ta', 'hi'];

  constructor(private route: ActivatedRoute, private router: Router,
              private restaurantService: RestaurantService, private httpClient: HttpClient,private logger:NGXLogger, private translateService: TranslateService) { 
                this.translateService.addLangs(this.supportLanguages);
                this.translateService.setDefaultLang('en');
            
                const browserlang = this.translateService.getBrowserLang();
            
                console.log('Browser Language => ', browserlang);
            
                if (this.supportLanguages.includes(browserlang)) {
                  this.translateService.use(browserlang);
                }
              }
            
              useLang(lang: string) {
                console.log('selected language ==> ', lang);
                this.translateService.use(lang);
              }

  ngOnInit(): void {

    this.restaurant = new Restaurant();

    this.id = this.route.snapshot.params.id;

    this.restaurantService.getRestaurant(this.id)
      .subscribe(data => {
        this.logger.info(data);
        this.restaurant = data;
        this.imagePath = `${this.displayURL}/${this.restaurant.id}/${this.restaurant.name}`;
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

public ChooseFile(selectedFile: any) {
  this.selectedFile = selectedFile;
}
  onUpload(): void {
    console.log("In onUpload " + this.selectedFile + "selected rest id :" + this.id);
    this.restaurantService.UploadFileFromService(this.selectedFile, this.id).subscribe((resp: any) => {
      if (resp.status === 200) {
        this.message = 'Image uploaded successfully';
      } else {
        this.message = 'Image not uploaded successfully';
      }
    }
    );
  }
}
