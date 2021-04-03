import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Restaurant } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/TestHome/models/restaurant';
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/TestHome/services/restaurant.service';

@Component({
  selector: 'kt-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  openNow = false;
  currentTime = new Date();
  timeCounter = true;
  restid: number;
  restaurants: Observable<Restaurant[]>;
  restaurant: Restaurant;
  rest: any;
  url = '';
  finalurl = '';
  fileURL = "http://localhost:8080/api/zonions/get";     /* <---URL comes from rest api to display the uploaded menu */
  imagePath: any;
  restaurantDetail = new Array<Restaurant>();
  restaurantList: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private restaurantService: RestaurantService, private httpClient: HttpClient, private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Restaurant Details');
    this.restaurant = new Restaurant();
    this.restid = this.route.snapshot.params['restid'];
    this.restaurantService.getRestaurantById(this.restid)
      .subscribe(data => {
        this.rest = data;
        console.log(data);
        let hour:any = (this.rest.closeTime.split(':'))[0];
        let min:any = (this.rest.closeTime.split(':'))[1];
        // tslint:disable-next-line: no-unused-expression
        if (hour >= this.currentTime.getHours())
        {
          if(min <= this.currentTime.getMinutes())
          {
            this.timeCounter = false;
          }
        }
        console.log(hour);
        console.log(min);
        this.imagePath = `${this.fileURL}/${this.rest.restid}/${this.rest.name}`;
      }, error => console.log(error)
      );
  } 

  list() {                             /* <---Method call from details Form for come back to Homepage */
    this.router.navigate(['restaurants', 'restHome']);
  }
  bookTable() {
 
    this.openAlertDialog();
    this.router.navigate(['auth', 'login']);
  }
  Login() {
    this.router.navigate(['auth', 'login']);
  }
  openAlertDialog(){
    Swal.fire('Please Login First..!');
  }
  home() {

		this.router.navigate(['restaurant','home']);
	  }
}
