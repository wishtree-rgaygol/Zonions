import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NGXLogger } from 'ngx-logger';
import Swal from 'sweetalert2';
import { AlertConfirmBoxComponent, DialogConfig } from '../DialogBoxes/alert-confirm-box/alert-confirm-box.component';
import { Restaurant } from '../_helpers/restaurant';
import TitleName from '../_helpers/TitleName';
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/views/pages/restaurants/_services/restaurant.service';

@Component({
  selector: 'kt-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['create-restaurant.component.scss']
})
export class CreateRestaurantComponent implements OnInit {
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
  Imagedata: any;
  meridian = true;
  titleName: any = TitleName;
  // tslint:disable-next-line: variable-name
  openTime = '';
  // tslint:disable-next-line: variable-name
  closeTime = '';
  menuForm: FormGroup;
  time = { hour: 13, minute: 30 };
  restaurantForm = new FormGroup({
    restname: new FormControl('', [Validators.required,
    Validators.pattern('^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$')]),
    restaddress: new FormControl('', [Validators.required]),
    restphone: new FormControl('', [Validators.required, Validators.pattern('[7-9][0-9]{9}')]),
    openTime: new FormControl('', [Validators.required]),
    closeTime: new FormControl('', [Validators.required]),
    dining: new FormControl(''),
    takeaway: new FormControl(''),
    homedelivery: new FormControl('')
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
    openTime: [
      { type: 'required', message: 'Open time is required' }
    ]

  };
  // tslint:disable-next-line: variable-name
  close_time_validation_message = {
    closeTime: [
      { type: 'required', message: 'Close time is required' }
    ]

  };
  constructor(
    private restaurantService: RestaurantService,
    private router: Router, private logger: NGXLogger, private title: Title, private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    for (let i = 0; i < this.titleName.length; i++) {
			console.log(this.titleName[i].name);
			this.title.setTitle(this.titleName[i].name + '|Create Restaurant');
		  }
    this.menuForm = this.formBuilder.group({
      menu: new FormControl('')
    });
  }
  get form(): any {
    return this.restaurantForm.controls;
  }

  get menuform(): any {
    return this.menuForm.controls;
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
        this.logger.info('Restaurant created for id-', this.restaurantData.restid);
        this.logger.info('Restaurant created');
        this.openAlertDialog();
      }, error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
      }
    );
  }
  openAlertDialog() {
    Swal.fire('Restaurant Created Successfully..!');
  }
  backEvent(): void {
    this.router.navigate(['restaurants', 'restaurant']);
  }

  updateImage(fValue: any) {
    console.log('In onUpload ' + this.selectedFile + 'selected rest id :' + this.restaurantData.restid);
    this.Imagedata = fValue;
    // tslint:disable-next-line: max-line-length
    this.restaurantService.UploadFileFromService(this.selectedFile, this.restaurantData.restid, this.Imagedata.menu).subscribe((resp: any) => {
      /* this.refreshRestaurants(); */

      if (resp.status === 200) {
        this.message = 'Image uploaded successfully';
      } else {
        this.message = 'Image not uploaded successfully';
      }
    }
    );
  }
  public onChange(selectedFile: any) {
    this.selectedFile = selectedFile;
  }

  openImageAlertDialog() {
    Swal.fire('Menus Added Successfully..!');
    this.backEvent();
  }
  close()
  {
     this.openImageAlertDialog();
  }
}
