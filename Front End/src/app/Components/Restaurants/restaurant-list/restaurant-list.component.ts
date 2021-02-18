import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subject } from 'rxjs';
import { Restaurant } from 'src/app/Models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  restaurants: Observable<Restaurant[]>;
  config: any;
  collection = [];
  constructor(private restaurantService: RestaurantService, private router: Router,
              private logger: NGXLogger,private route: ActivatedRoute) {
                    //this.data=new Array<any>();
                  }
      
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 3
    };
    this.reloadData();
  }

  reloadData(): void
  {
    this.restaurants = this.restaurantService.getRestaurantsList();

    this.restaurants.subscribe (data => {
      this.logger.log(data);
      this.dtTrigger.next();
    },
     error => {
      if (error.status === 500){
        this.router.navigate(['/500']);
      }
    } );

  }
  ngOnDestroy(): void {
  
    this.dtTrigger.unsubscribe();
  }

  deleteRestaurant(id: number): void {
    alert("Do you really want to delete restaurant??")
    this.restaurantService.deleteRestaurant(id)
      .subscribe(
        data => {
          this.logger.log(data);
          this.reloadData();
        },
        error => {
          if (error.status === 500){
            this.router.navigate(['/500']);
          }
        });
  }

  restaurantDetails(id: number): void{
    this.router.navigate(['details', id]);
  }


  updateRestaurant(id: number): void
  {
    this.router.navigate(['update', id]);
  }

}
