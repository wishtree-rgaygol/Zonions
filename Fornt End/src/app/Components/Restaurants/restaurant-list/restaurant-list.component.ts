import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/Models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

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

  deleteRestaurant(id: number): void {
    this.restaurantService.deleteRestaurant(id)
      .subscribe(
        data => {
          this.logger.info(data);
          this.reloadData();
        },
        error => this.logger.error(error));
  }

  restaurantDetails(id: number): void{
    this.router.navigate(['details', id]);
  }


  updateRestaurant(id: number): void
  {
    this.router.navigate(['update', id]);
  }

}
