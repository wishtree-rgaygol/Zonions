import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page400',
  templateUrl: './error-page400.component.html',
  styleUrls: ['./error-page400.component.css']
})
export class ErrorPage400Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  revert(): void{
    this.router.navigate(['/login']);
  }
}
