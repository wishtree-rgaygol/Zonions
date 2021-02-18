import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Restaurant } from 'src/app/Models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
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
  base64Data: any;
  retrieveResonse: any;
  message: string;
 
  num: number;

  opentime = { hour: 10, minute: 10 };
  closetime = { hour: 10, minute: 10 };
  supportLanguages = ['en', 'fr', 'hi', 'ta'];

  constructor(private restaurantService: RestaurantService,
              private router: Router, private httpClient: HttpClient,
              private logger: NGXLogger, private translateService: TranslateService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');

    const browserlang = this.translateService.getBrowserLang();

    console.log('Browser Language => ', browserlang);

    if (this.supportLanguages.includes(browserlang)) {
      this.translateService.use(browserlang);
    }
  }


  ngOnInit(): void {
  }

  useLang(lang: string): void {
    console.log('selected language ==> ', lang);
    this.translateService.use(lang);
  }
  newRestaurant(): void {
    this.submitted = false;
    this.restaurant = new Restaurant();
  }

  save(): void {
    let now=moment();
    this.restaurant.lastModifiedTime=now.format();
    this.restaurantService
      .createRestaurant(this.restaurant).subscribe(data => {
        this.logger.log(data);
        this.rest = data;
        this.logger.log(this.restaurant.openTime);

        this.revert();
      },
        error => {
          if (error.status === 500){
            this.router.navigate(['/500']);
          }
        });
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
