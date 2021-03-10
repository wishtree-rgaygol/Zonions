import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NGXLogger } from 'ngx-logger';
import Swal from 'sweetalert2';
import { AlertConfirmBoxComponent, DialogConfig } from '../DialogBoxes/alert-confirm-box/alert-confirm-box.component';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';


@Component({
  selector: 'kt-create-restaurant',
  templateUrl: './create-restaurant.component.html',
})
export class CreateRestaurantComponent implements OnInit {
   /* restaurant: Restaurant = new Restaurant();
  submitted = false;
  file: any;
  rest: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
 
  num: number;

  opentime = { hour: 10, minute: 10 };
  closetime = { hour: 10, minute: 10 };

  constructor(private restaurantService: RestaurantService,
              private router: Router, private httpClient: HttpClient,
              ) {  }


  ngOnInit(): void {
  }
  newRestaurant(): void {
    this.submitted = false;
    this.restaurant = new Restaurant();
  }

  save(): void {
    let now=moment();
    this.restaurant.lastModified=now.format();
    this.restaurantService
      .createRestaurant(this.restaurant).subscribe(data => {
 */        //this.logger.log(data);
     //   this.rest = data;
       // this.logger.log(this.restaurant.openTime);

       // this.revert();
      /* },
        error => {
          if (error.status === 500){
            this.router.navigate(['/500']);
          }
        });
  }

  onSubmit(): void { */
/*     this.restaurant.openTime = this.opentime.hour + ':' + this.opentime.minute;
    this.restaurant.closeTime = this.closetime.hour + ':' + this.closetime.minute; */
 /*    this.submitted = true;
    this.save();


  }

  revert(): void {
    this.router.navigate(['/home']);
  }
 */
titleAlert: string = 'This field is required';
restaurant: Restaurant = new Restaurant();
rest = Restaurant;
submitted = false;
constructor(private restaurantservice: RestaurantService,private dialog: MatDialog,
  private router: Router,private snackBar: MatSnackBar,private title:Title,private logger: NGXLogger) { }

ngOnInit() {
  this.title.setTitle('Create Restaurant');
}

newEmployee(): void {
  this.submitted = false;
  this.restaurant = new Restaurant();
}

save() {  
  let now=moment();
  this.restaurant.lastModified=now.format();
  this.restaurantservice
    .createRestaurant(this.restaurant).subscribe(data => {
      console.log(data);
      this.restaurant = new Restaurant();
      this.refreshRestaurants();
      this.openAlertDialog(); 
    },
      error => console.log(error));
}

createRestaurant() {
  this.logger.info('In create restaurant methood logger');
  this.submitted = true;
  this.save();
}

refreshRestaurants() {
   this.router.navigate(['restaurants', 'restHome']);
}

/* openAlertDialog() {
  const dialogRef = this.dialog.open(AlertConfirmBoxComponent,{
    data:{
      message: 'Data Saved Successfully',
      buttonText: {
        cancel: 'OK'
      }
    },
  });
} */
/* openAlertDialog(): void {
  const dialog: DialogConfig = {
    title: 'Restaurant Saved Successfully',
    close: 'OK'
  };
  this.dialog.open(AlertConfirmBoxComponent, { width: '287px', data: dialog });
} */
openAlertDialog(){
  Swal.fire('Restaurant Created Successfully..!');
}
}
