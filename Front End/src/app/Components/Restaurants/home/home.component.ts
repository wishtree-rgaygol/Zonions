import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/Models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants: Observable<Restaurant[]>;
  constructor(private restaurantService: RestaurantService, private router: Router,private logger:NGXLogger) { }

  ngOnInit(): void {

    this.reloadData();
  }

  reloadData(): void
  {
    this.restaurants = this.restaurantService.getRestaurantsList();

    this.restaurants.subscribe (data => {
      this.logger.info(data);

    });

  }

  restaurantDetails(id: number): void{
    this.router.navigate(['details', id]);
  }
}
