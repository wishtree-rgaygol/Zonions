import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Menu } from '../_helpers/menu';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'kt-restaurant-details',
  templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit {
  openNow = false;
  data: any;
  currentTime = new Date();
  timeCounter = true;
  restid: number;
  restaurants: Observable<Restaurant[]>;
  restaurant: Restaurant;
  rest: any;
  Dining: boolean;
  TakeAWay: boolean;
  HomeDelivery: boolean;
  fileURL = 'http://localhost:8080/api/zonions/file';     /* <---URL comes from rest api to display the uploaded menu */
  imagePath = './assets/media/logos/ZonionsLogo.jpg';
  imageForm: FormGroup;
  restaurantDetail = new Array<Restaurant>();
  restaurantList: any;
  form: FormGroup;
  value: Observable<number>;
  menuType: Menu[];
  menuArray = [''];
  constructor(private route: ActivatedRoute, private router: Router,
    // tslint:disable-next-line: max-line-length
              private restaurantService: RestaurantService, private httpClient: HttpClient, private formBuilder: FormBuilder, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Restaurant Details');
    this.imageForm = this.formBuilder.group(
      {
        menu: new FormControl(),
      }
    );
    this.restaurant = new Restaurant();
    this.restid = this.route.snapshot.params['restid'];
    this.restaurantService.getRestaurantById(this.restid)
      .subscribe(data => {
        this.restaurant = data;
        this.rest = data;
        console.log(this.restaurant.dining);
        console.log(this.restaurant.takeaway);
        console.log(this.restaurant.homedelivery);
        let hour: any = (this.restaurant.closeTime.split(':'))[0];
        let min: any = (this.restaurant.closeTime.split(':'))[1];
        // tslint:disable-next-line: no-unused-expression
        if (hour >= this.currentTime.getHours()) {
          if (min <= this.currentTime.getMinutes()) {
            this.timeCounter = false;
          }
        }
        console.log('current time hours' + this.currentTime.getHours());
        console.log('current time minutes' + this.currentTime.getMinutes());
        console.log('close time hours', hour);
        console.log('close time minutes', min);
        if (this.restaurant.dining === true) {
          console.log('Dining');
          this.Dining = true;
        }
        if (this.restaurant.takeaway === true) {
          console.log('Dining');
          this.TakeAWay = true;
        }
        if (this.restaurant.homedelivery === true) {
          console.log('Dining');
          this.HomeDelivery = true;
        }
      }, error => console.log(error)
      );
    this.restaurantService.getAllMenus().subscribe((resp =>
        {
          this.menuType = resp;
          console.log(this.menuType);

          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.menuType.length; i++) {
            if (this.menuType[i].restid ===  this.rest.restid) {
              console.log(this.menuType[i].type);
              this.menuArray.push(this.menuType[i].type);
            }
  
          }
          this.menuArray.splice(0, 1);
        }));
  }

  list() {                             /* <---Method call from details Form for come back to Homepage */
    this.router.navigate(['restaurants', 'restHome']);
  }

  saveImage(fvalue: any): void {
    this.data = fvalue;
    console.log(JSON.stringify(this.data.menu));
    this.fileURL = 'http://localhost:8080/api/zonions/file';
    this.imagePath = `${this.fileURL}/${this.restaurant.restid}/${this.data.menu}`;
    console.log(this.imagePath);
  }
}
