import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
    selector: 'kt-book-table',
    templateUrl: './book-table.component.html',
    styleUrls: ['./book-table.component.scss']
  })
export class BookTableComponent implements OnInit{
  data: any;
  bookTableData:any;
  constructor(private bookTableService:RestaurantService)
  {

  }
  bookingForm = new FormGroup({
    restaurantName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    date: new FormControl(new Date()),
    email: new FormControl('', [Validators.required, Validators.email]),
    noOfSeats:new FormControl('', [Validators.required])
  });
  ngOnInit(): void {}
  get form(): any {
    return this.bookingForm.controls;
  }


  bookSeat(fvalue: any): void {
    console.log(this.bookingForm.value);
    this.data = fvalue;
    this.bookTableService.bookTable(this.bookingForm.value).subscribe(
      (res) => {
        console.log('after adding book Table', res);
        this.bookTableData = res;

      }, error => console.log(error));
      }
  }