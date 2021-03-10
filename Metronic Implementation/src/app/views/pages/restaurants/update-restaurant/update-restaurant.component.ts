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
@Component({
  selector: 'kt-update-restaurant',
  templateUrl: './update-restaurant.component.html',
})
export class UpdateRestaurantComponent implements OnInit {
  
  restid: number;
  restaurant: Restaurant;
  displayURL = "http://localhost:8080/zonions/get";
  imagePath: any;
  message: string;
  selectedFile: any;

  constructor(private route: ActivatedRoute, private router: Router,
    private restaurantService: RestaurantService, private httpClient: HttpClient,private dialog: MatDialog,private title:Title) { }

  UploadMenu() {
    console.log("In onUpload " + this.selectedFile + "selected rest id :" + this.restid);
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
    this.restid = this.route.snapshot.params['restid'];
    this.restaurantService.getRestaurantById(this.restid)
      .subscribe(data => {
        this.restaurant = data;
        this.imagePath = `${this.displayURL}/${this.restaurant.restid}/${this.restaurant.name}`;
      }, error => console.log(error));
  }

  updateRestaurant() { 
    let now=moment();
    this.restaurant.lastModified=now.format();                 /* <---Actual method for registration(Which call service method) to save Restaurant */ /* Method call from update restaurant form to update the restaurant*/
    this.restaurantService.updateRestaurant(this.restid, this.restaurant)
      .subscribe(data => {
        this.restaurant = new Restaurant();
        this.restaurantList();
        this.openAlertDialog();
      }, error => console.log(error));
  }

  restaurantList() {  /* Method to display all the restaurant again to admin after successfully updated restaurant */
    this.router.navigate(['restaurants', 'restaurant']);
  }

  /* openAlertDialog(): void {
    const dialog: DialogConfig = {
      title: 'Restaurant Updated Successfully',
      close: 'OK'
    };
    this.dialog.open(AlertConfirmBoxComponent, { width: '287px', data: dialog });
  } */
  openAlertDialog(){
    Swal.fire('Restaurant Updated Successfully..!');
  }
}
