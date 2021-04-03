import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';
import * as moment from 'moment';
import { AlertConfirmBoxComponent, DialogConfig } from '../DialogBoxes/alert-confirm-box/alert-confirm-box.component';
import { MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
@Component({
  selector: 'kt-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['update-restaurant.component.scss']
})
export class UpdateRestaurantComponent implements OnInit {
  /* restid: number;
  restaurant: Restaurant;
  displayURL = 'http://localhost:8080/zonions/get';
  imagePath: any;
  message: string;
  selectedFile: any;
  hour: number;
  minute: number;

  time = { hour: 13, minute: 30 };
  constructor(private route: ActivatedRoute, private router: Router, private logger: NGXLogger,
    // tslint:disable-next-line: align
    private restaurantService: RestaurantService, private httpClient: HttpClient, private dialog: MatDialog, private title: Title) { }

  UploadMenu() {
    console.log('In onUpload ' + this.selectedFile + 'selected rest id :' + this.restid);
    this.restaurantService.UploadFileFromService(this.selectedFile, this.restid).subscribe((resp: any) => {
      if (resp.status === 200) {
        this.message = 'Image uploaded successfully';
      } else {
        this.message = 'Image not uploaded successfully';
      }
    }
    );
  }
  public ChooseFile(selectedFile: any) {
    this.selectedFile = selectedFile;
  }
  ngOnInit() {
    this.title.setTitle('Update Restaurant');
    this.restaurant = new Restaurant();
    // tslint:disable-next-line: no-string-literal
    this.restid = this.route.snapshot.params['restid'];
    this.restaurantService.getRestaurantById(this.restid)
      // tslint:disable-next-line: deprecation
      .subscribe(data => {
        this.restaurant = data;
        this.imagePath = `${this.displayURL}/${this.restaurant.restid}/${this.restaurant.name}`;
      }, error => console.log(error));
  }

   updateRestaurant() {
    this.logger.info('In Restaurant Update Method');
    // tslint:disable-next-line: prefer-const
    let now = moment();
    this.restaurant.lastModified = now.format();
    this.restaurantService.updateRestaurant(this.restid, this.restaurant)
      // tslint:disable-next-line: deprecation
      .subscribe(data => {
        this.restaurant = new Restaurant();
        this.restaurantList();
        this.openAlertDialog();
        this.logger.info('Restaurant Updated');
      }, error => console.log(error));
  }
  restaurantList() {
    this.router.navigate(['restaurants', 'restaurant']);
  }

  openAlertDialog() {
    Swal.fire('Restaurant Updated Successfully..!');
  } */
  message: string;
  selectedFile: any;
  data: any;
  restaurantData: any;
  lastModified: string;
  /* restaurant: Restaurant; */
  restaurant: Restaurant = new Restaurant();
  id: number;
  imagename: string ;
  url: string;
  finalurl: string;
  file: any;
  openHr: number;
  openMin: number;
  isSubmitted = false;
  component: string;
  meridian = true;
  displayURL = 'http://localhost:8080/api/zonions/get';
  imagePath: any;
  // tslint:disable-next-line: variable-name
  open_Time = {
    hour: 10,
    minute: 30
  };
  // tslint:disable-next-line: variable-name
  close_Time = {
    hour: 21,
    minute: 30
  };
  restid: number;
  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute,
              private router: Router,
              private title: Title) {
                this.restaurant = new Restaurant();
  }
  ngOnInit(): void {

      this.title.setTitle('Update Restaurant');
    // tslint:disable-next-line: no-string-literal
      this.restid = this.route.snapshot.params['restid'];
      this.restaurantService.getRestaurantById(this.restid)
      // tslint:disable-next-line: deprecation
      .subscribe(data => {
        this.restaurant = data;
         // tslint:disable-next-line: radix
        this.openHr = parseInt(this.restaurant.openTime.slice(0, 2));
         // tslint:disable-next-line: radix
        this.openMin = parseInt(this.restaurant.openTime.slice(3, 5));
        this.open_Time = { hour: this.openHr, minute: this.openMin};
         // tslint:disable-next-line: radix
        const closeHr: number = parseInt(this.restaurant.closeTime.slice(0, 2));
         // tslint:disable-next-line: radix
        const closeMin: number = parseInt(this.restaurant.closeTime.slice(3, 5));
        this.close_Time = { hour: closeHr, minute: closeMin };
        this.imagePath = `${this.displayURL}/${this.restaurant.restid}/${this.restaurant.name}`;
      }, error => console.log(error));
  }
  updateResto(): void {
    let now = moment();
    this.restaurant.lastModified =  moment().format('MMMM Do YYYY, h:mm:ss a');
    this.restaurantService.updateRestaurant(this.restid, this.restaurant).subscribe(data => {
      this.restaurant = new Restaurant();

      this.backEvent();
    }, error => console.log(error));
  }
  onSubmit(): void {
    this.restaurant.openTime = this.open_Time.hour + ':' + this.open_Time.minute;
    this.restaurant.closeTime = this.close_Time.hour + ':' + this.close_Time.minute;
    this.updateResto();
    this.backEvent();
   
    this.openAlertDialog();
    this.component = 'UpdateRestaurantComponent' ;
  
   /*  window.location.reload(); */
  }
  /* onChange(file: any): void {
      this.file = file;

  }
  updateImage(): void {
    console.log('I am in upload' + this.file);
    this.restaurantService.uploadMenu(this.file, this.id).subscribe((resp: any) => {
      console.log(resp);
      this.isSubmitted = true;
    }, error => {
        if (error.status === 500) {
            this.router.navigate(['error/500']);
          }
    });
  } */
  updateImage() {
    console.log('In onUpload ' + this.selectedFile + 'selected rest id :' + this.restid);
    this.restaurantService.UploadFileFromService(this.selectedFile, this.restid).subscribe((resp: any) => {
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
  backEvent(): void {
    this.router.navigate(['restaurants', 'restaurant']);

  }
  openAlertDialog(){
    Swal.fire('Restaurant Updated Successfully..!');
  }
}
