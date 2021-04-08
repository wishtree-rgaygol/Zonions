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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
@Component({
  selector: 'kt-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['update-restaurant.component.scss']
})
export class UpdateRestaurantComponent implements OnInit {
  message: string;
  selectedFile: any;
  data: any;
  restaurantData: any;
  lastModified: string;
  /* restaurant: Restaurant; */
  restaurant: Restaurant = new Restaurant();
  id: number;
  imagename: string;
  url: string;
  finalurl: string;
  file: any;
  openHr: number;
  openMin: number;
  isSubmitted = false;
  component: string;
  meridian = true;
  fileURL = 'http://localhost:8080/api/zonions/file';     /* <---URL comes from rest api to display the uploaded menu */
  imagePath: any;
  menuArray: any;
  // tslint:disable-next-line: ban-types
  urlArray = [''];
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
  Imagedata: any;
  menuForm: FormGroup;
  restid: number;
  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute,
    private router: Router,
    private title: Title, private formBuilder: FormBuilder) {
    this.restaurant = new Restaurant();
  }
  ngOnInit(): void {

    this.title.setTitle('Update Restaurant');
    this.menuForm = this.formBuilder.group({
      menu: new FormControl('')
    });

    // tslint:disable-next-line: no-string-literal
    this.restid = this.route.snapshot.params['restid'];
    this.restaurantService.getRestaurantById(this.restid)
      // tslint:disable-next-line: deprecation
      .subscribe(data => {
        this.restaurant = data;
        this.restaurantService.getMenuById(this.restaurant.restid).subscribe(data => {
          this.menuArray = data;
          console.log(this.menuArray);
          console.log('Restaurant id inside menu metho', this.restid);
          const url = 'http://localhost:8080/api/zonions/file';
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.menuArray.length; i++) {
            if (this.menuArray.length) {
              this.url = `${url}/${this.restid}/${this.menuArray[i].type}`;
              this.urlArray.push(this.url);
            }
          }
          this.urlArray.splice(0, 1);
          console.log(this.urlArray.length);
        });
        // tslint:disable-next-line: radix
        this.openHr = parseInt(this.restaurant.openTime.slice(0, 2));
        // tslint:disable-next-line: radix
        this.openMin = parseInt(this.restaurant.openTime.slice(3, 5));
        this.open_Time = { hour: this.openHr, minute: this.openMin };
        // tslint:disable-next-line: radix
        const closeHr: number = parseInt(this.restaurant.closeTime.slice(0, 2));
        // tslint:disable-next-line: radix
        const closeMin: number = parseInt(this.restaurant.closeTime.slice(3, 5));
        this.close_Time = { hour: closeHr, minute: closeMin };
      }, error => console.log(error));
  }
  updateResto(): void {
    let now = moment();
    this.restaurant.lastModified = moment().format('MMMM Do YYYY, h:mm:ss a');
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
    this.component = 'UpdateRestaurantComponent';

  }


  backEvent(): void {
    this.router.navigate(['restaurants', 'restHome']);

  }
  openAlertDialog() {
    Swal.fire('Restaurant Updated Successfully..!');
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
}
