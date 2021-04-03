// Angular
import { Component, OnInit } from '@angular/core';
// Layout
import { LayoutConfigService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/core/_base/layout/services/layout-config.service';
// Object-Path
import * as objectPath from 'object-path';

@Component({
  selector: 'kt-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss']
})
export class FooterBarComponent implements OnInit {

 // Public properties
 today: number = Date.now();
 fluid: boolean;

 /**
  * Component constructor
  *
  * @param layoutConfigService: LayouConfigService
  */
 constructor(private layoutConfigService: LayoutConfigService) {
 }

 /**
  * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
  */

 /**
  * On init
  */
 ngOnInit(): void {
   const config = this.layoutConfigService.getConfig();

   // footer width fluid
   this.fluid = objectPath.get(config, 'footer.self.width') === 'fluid';
 }

}
