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
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/views/pages/restaurants/_services/restaurant.service';

@Component({
  selector: 'kt-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['create-restaurant.component.scss']
})
export class CreateRestaurantComponent implements OnInit {
/*   
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
openAlertDialog(){
  Swal.fire('Restaurant Created Successfully..!');
} */
message: string;
selectedFile: any;
restaurant: Restaurant = new Restaurant();
isSubmitted = true;
data: any;
file: any;
restaurantId: any;
restaurantData: any;
restid: number;
lastModified: string;
meridian = true;
// tslint:disable-next-line: variable-name
openTime = '';
// tslint:disable-next-line: variable-name
closeTime = '';
time = { hour: 13, minute: 30 };
restaurantForm = new FormGroup({
  restname: new FormControl('', [Validators.required,
                 Validators.pattern('^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$')]),
  restaddress: new FormControl('', [Validators.required]),
  restphone: new FormControl('', [Validators.required, Validators.pattern('[7-9][0-9]{9}')]),
  openTime: new FormControl('', [Validators.required]),
  closeTime: new FormControl('', [Validators.required]),
  /* active: new FormControl('', [Validators.required]) */
  TAKE_AWAY: new FormControl(['']),
  HOME_DELIVERY: new FormControl(['']),
  DINING: new FormControl(['']),
});
restaurantName_validation_message = {
  restname: [
    { type: 'required', message: 'Restaurant name is required' },
    {
      type: 'pattern',
      message: 'Restaurant Name must contain only numbers and letters',
    },
  ],
};
// tslint:disable-next-line: variable-name
address_validation_message = {
  restaddress: [{ type: 'required', message: 'Address is required' }],
};
// tslint:disable-next-line: variable-name
phone_no_validation_message = {
  restphone: [
    { type: 'required', message: 'phone number is required' },
    {
      type: 'pattern',
      message: 'phone should be start with 7/8/9 and should be 10 digit',
    },
  ],
};


// tslint:disable-next-line: variable-name
open_time_validation_message = {
  openTime : [
    {type : 'required' , message: 'Open time is required'}
  ]

};
// tslint:disable-next-line: variable-name
close_time_validation_message = {
  closeTime : [
    {type : 'required' , message: 'Close time is required'}
  ]

};
constructor(
  private restaurantService: RestaurantService,
  private router: Router,  private logger: NGXLogger, private title: Title) {
}
ngOnInit(): void {
  this.title.setTitle('Create Restaurant');
}
get form(): any {
  return this.restaurantForm.controls;
}


saveRestaurant(fvalue: any): void {
  this.logger.info('Inside Save Restaurant Method');
  this.data = fvalue;
  if (this.data.DINING === true) {
    console.log('dining');
  } else {
    console.log('****');
  }
  this.openTime =
  this.data.openTime.hour + ':' + this.data.openTime.minute;
  this.data.openTime = this.openTime;

  this.closeTime =
    this.data.closeTime.hour + ':' + this.data.closeTime.minute;
  this.data.closeTime = this.closeTime;

  this.isSubmitted = true;
  // tslint:disable-next-line: prefer-const
  let now = moment();
  this.lastModified = now.format('MMMM Do YYYY, h:mm:ss a');
  this.data.lastModified = this.lastModified;
  this.restaurantService.createRestaurant(this.restaurantForm.value).subscribe(
    (res) => {
      this.restaurantData = res;
      this.logger.info('Restaurant created');
      this.backEvent();
      /* this.refreshRestaurants(); */
      this.openAlertDialog();
    }, error => {
      if (error.status === 500) {
        this.router.navigate(['error/500']);
      }
    }
  );
}
openAlertDialog(){
  Swal.fire('Restaurant Created Successfully..!');
}
backEvent(): void {
  this.router.navigate(['restaurants', 'restaurant']);
}
}
