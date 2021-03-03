import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subject } from 'rxjs';
import { Restaurant } from 'src/app/Models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy {
  restaurants: Observable<Restaurant[]>;
  supportLanguages = ['en', 'fr', 'hi', 'ta'];
  data:Array<any>;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor(private restaurantService: RestaurantService,private logger:NGXLogger , private router: Router,
              private translateService: TranslateService) {
               

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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3
    };
    this.reloadData();
  }

  reloadData(): void {
    this.restaurants = this.restaurantService.getRestaurantsList();

    this.restaurants.subscribe(data => {
     
      console.log(data);
      this.dtTrigger.next();
    });

  }
  ngOnDestroy(): void {
  
    this.dtTrigger.unsubscribe();
  }
  restaurantDetails(id: number): void {
    this.router.navigate(['details', id]);
  }
}
