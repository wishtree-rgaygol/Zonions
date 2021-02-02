import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page400',
//  templateUrl: './error-page400.component.html',
    template:`<h2>
                  400 - Wrong url
               </h2>`,
  styleUrls: ['./error-page400.component.css']
})
export class ErrorPage400Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
