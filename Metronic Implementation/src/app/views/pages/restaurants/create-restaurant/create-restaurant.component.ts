import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NGXLogger } from 'ngx-logger';
import Swal from 'sweetalert2';
import { AlertConfirmBoxComponent, DialogConfig } from '../DialogBoxes/alert-confirm-box/alert-confirm-box.component';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'kt-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['create-restaurant.component.scss']
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
isSubmitted = true;
data: any;
  file: any;
  comp: string;
  confirm: boolean;
  restaurantId: any;
  restaurantData: any;
  lastModified: string;
  // tslint:disable-next-line: variable-name
  openTime = '';
  // tslint:disable-next-line: variable-name
  closeTime = '';
  time = { hour: 13, minute: 30 };
constructor(private restaurantservice: RestaurantService, private dialog: MatDialog,
  // tslint:disable-next-line: align
  // tslint:disable-next-line: max-line-length
  private router: Router, private snackBar: MatSnackBar, private title: Title, private logger: NGXLogger, private modalService: NgbModal) { } 

  restaurantForm = new FormGroup({
    restname: new FormControl('', [Validators.required,
    Validators.pattern('^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$')]),
    restaddress: new FormControl('', [Validators.required]),
    restphone: new FormControl('', [Validators.required, Validators.pattern('[789][0-9]{10}')]),
    openTime: new FormControl('', [Validators.required]),
    closeTime: new FormControl('', [Validators.required]),
    active: new FormControl('', [Validators.required]),
  });
  // tslint:disable-next-line: variable-name
  restname_validation_message = {
    restname: [
      { type: 'required', message: 'Restaurant name is required' },
      {
        type: 'pattern',
        message: 'Restaurant Name must contain only numbers and letters',
      },
    ],
  };
  // tslint:disable-next-line: variable-name
  restaddress_validation_message = {
    restaddress: [{ type: 'required', message: 'Address is required' }],
  };
  // tslint:disable-next-line: variable-name
  restphone_validation_message = {
    restphone: [
      { type: 'required', message: 'phone number is required' },
      {
        type: 'pattern',
        message: 'phone should be start with 7/8/9 and should be 10 digit',
      },
    ],
  };


  // tslint:disable-next-line: variable-name
  openTime_validation_message = {
    openTime : [
      {type : 'required' , message: 'Open time is required'}
    ]

  };
  // tslint:disable-next-line: variable-name
  closeTime_validation_message = {
    closeTime : [
      {type : 'required' , message: 'Close time is required'}
    ]

  };
ngOnInit() {
  this.title.setTitle('Create Restaurant');
}
saveRestaurant(fvalue: any): void {
  this.logger.info('In Restaurant Register method');
  console.log(this.restaurantForm.value);
  this.data = fvalue;
  console.log('console data object=', this.data);
  console.log('close time on data object=', this.data.closeTime);
  this.closeTime = this.data.closeTime.hour + ':' + this.data.closeTime.minute;
  this.data.closeTime = this.closeTime;
  this.openTime = this.data.openTime.hour + ':' + this.data.openTime.minute;
  this.data.openTime = this.openTime;
  this.isSubmitted = true;
  // tslint:disable-next-line: prefer-const
  let now = moment();
  this.lastModified = now.format();
  this.data.lastModified = this.lastModified;
  // tslint:disable-next-line: deprecation
  this.restaurantservice
    .createRestaurant(this.restaurantForm.value).subscribe(data => {
      console.log(data);
      this.restaurant = new Restaurant();
      this.logger.info('Restaurant created');
      this.backEvent();
      /* this.refreshRestaurants(); */
      this.openAlertDialog();
    },
      error => console.log(error));
} 
backEvent(): void {
  this.router.navigate(['restaurants', 'restHome']);
}
close() {
  this.modalService.dismissAll();
}
/* newEmployee(): void {
  this.submitted = false;
  this.restaurant = new Restaurant();
}
 */
/* save() {  
  let now = moment();
  this.restaurant.lastModified = now.format();
  this.restaurantservice
    .createRestaurant(this.restaurant).subscribe(data => {
      console.log(data);
      this.restaurant = new Restaurant();
      this.logger.info('restaurant created');
      this.refreshRestaurants();
      this.openAlertDialog(); 
    },
      error => console.log(error));
} */

/* createRestaurant() {
  this.logger.info('In create restaurant methood logger');
  this.submitted = true;
  this.save();
} */

/* refreshRestaurants() {
   this.router.navigate(['restaurants', 'restHome']);
} */

openAlertDialog(){
  Swal.fire('Restaurant Created Successfully..!');
}
}
