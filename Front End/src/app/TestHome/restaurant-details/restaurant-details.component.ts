import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Menu } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/TestHome/models/menu';
import Swal from 'sweetalert2';
import { Restaurant } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/TestHome/models/restaurant';
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/TestHome/services/restaurant.service';

@Component({
  selector: 'kt-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  openNow = false;
  data: any;
  currentTime = new Date();
  timeCounter = true;
  restoid: number;
  restaurants: Observable<Restaurant[]>;
  restaurant: Restaurant;
  rest: any;
  Dining: boolean;
  TakeAWay: boolean;
  HomeDelivery: boolean;
  fileURL = 'http://localhost:8080/api/zonions/file'; 
  
  imagePath= './assets/media/logos/ZonionsLogo.jpg';
  imageForm: FormGroup;
  restaurantDetail = new Array<Restaurant>();
  restaurantList: any;
  form: FormGroup;
  value: Observable<number>;
  menuType: Menu[];
  menuArray = [''];
  constructor(private route: ActivatedRoute, private router: Router,
              private restaurantService: RestaurantService, private formBuilder: FormBuilder, private httpClient: HttpClient, private title: Title) {

    }

  ngOnInit() {
    this.title.setTitle('Restaurant Details');
    this.imageForm = this.formBuilder.group(
      {
        menu: new FormControl(),
      }
    );
    this.form = this.formBuilder.group({
      rating: [3]
    });
    this.value = this.form.controls.rating.valueChanges;
    this.restaurant = new Restaurant();
    this.restoid = this.route.snapshot.params['restid'];
    this.restaurantService.getRestaurantById(this.restoid)
      .subscribe(data => {
        this.rest = data;
        let hour: any = (this.rest.closeTime.split(':'))[0];
        let min: any = (this.rest.closeTime.split(':'))[1];
        // tslint:disable-next-line: no-unused-expression
        if (hour >= this.currentTime.getHours()) {
          if (min <= this.currentTime.getMinutes()) {
            this.timeCounter = false;
          }
        }
        
        if (this.rest.dining === true) {
          this.Dining = true;
        }
        if (this.rest.takeaway === true) {
          this.TakeAWay = true;
        }
        if (this.rest.homedelivery === true) {
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
  submit() {
    console.log(this.form.value);
    this.openFeedbackAlertDialog();
    
  }
  list() {
    this.router.navigate(['restaurants', 'restHome']);
  }
  bookTable() {

    this.openAlertDialog();
    this.router.navigate(['auth', 'login']);
  }
  Login() {
    this.router.navigate(['auth', 'login']);
  }
  openAlertDialog() {
    Swal.fire('Please Login First..!');
  }
  openFeedbackAlertDialog() {
    Swal.fire('Thanks for feedback..!');
  }
  home() {

    this.router.navigate(['restaurant', 'home']);
  }
  saveImage(fvalue: any): void {
    this.data = fvalue;
    console.log(JSON.stringify(this.data.menu));
    this.fileURL= 'http://localhost:8080/api/zonions/file';
    this.imagePath = `${this.fileURL}/${this.rest.restid}/${this.data.menu}`;
    console.log(this.imagePath);
  }
}
