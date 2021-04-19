import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import TitleName from '../_helpers/TitleName';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
    selector: 'kt-book-table',
    templateUrl: './book-table.component.html',
    styleUrls: ['./book-table.component.scss']
  })
export class BookTableComponent implements OnInit{
  data: any;
  bookTableData:any;
  titleName: any = TitleName;
  constructor(private bookTableService:RestaurantService,private title:Title,private router: Router)
  {

  }
  bookingForm = new FormGroup({
    restaurantName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    date: new FormControl(new Date()),
    email: new FormControl('', [Validators.required, Validators.email]),
    noOfSeats:new FormControl('', [Validators.required])
  });
  ngOnInit(): void {
    for (let i = 0; i < this.titleName.length; i++) {
			console.log(this.titleName[i].name);
			this.title.setTitle(this.titleName[i].name + '|Book Table');
		  }
  }
  get form(): any {
    return this.bookingForm.controls;
  }
 

  bookSeat(fvalue: any): void {
   /*  console.log(this.bookingForm.value);
    this.data = fvalue;
    this.bookTableService.bookTable(this.bookingForm.value).subscribe(
      (res) => {
        console.log('after adding book Table', res);
        this.bookTableData = res;

      }, error => console.log(error));
      } */
      this.successNotification();
    }
    successNotification(){
      Swal.fire('Hi', 'We have been initiate your request we will inform you once your seat is confirm.', 'success')
    }
    list() {                             /* <---Method call from details Form for come back to Homepage */
      this.router.navigate(['restaurants', 'restHome']);
    }
  }
