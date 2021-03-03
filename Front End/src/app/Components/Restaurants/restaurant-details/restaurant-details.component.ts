import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Restaurant } from 'src/app/Models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { TranslateService } from '@ngx-translate/core';

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
  fileURL = 'http://localhost:8080/zonions/restaurants/get';     /* <---URL comes from rest api to display the uploaded menu */
  imagePath: any;
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  constructor(private route: ActivatedRoute, private router: Router,
              private restaurantService: RestaurantService, private httpClient: HttpClient,
              private logger: NGXLogger, private translateService: TranslateService) {
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
        this.logger.log(data);
        this.restaurant = data;
        this.imagePath = `${this.fileURL}/${this.restaurant.id}/${this.restaurant.name}`;
        if (this.restaurant.active === true) {
          this.isActive = true;
        }
      }, error => {
        if (error.status === 500) {
          this.router.navigate(['/500']);
        }
      });

  }
  revert(): void {
    this.router.navigate(['/home']);
  }
}
