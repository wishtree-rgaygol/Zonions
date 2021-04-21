import { useAnimation } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {
  CloseScrollStrategy,
  GlobalPositionStrategy,
  IgxDialogComponent,
  IgxOverlayOutletDirective,
  PositionSettings,
  slideInBottom,
  slideOutTop
} from 'igniteui-angular';
import { NGXLogger } from 'ngx-logger';
import { Menu } from './models/menu';
import { Restaurant } from './models/restaurant';
import TitleName from './models/TitleName';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/TestHome/services/restaurant.service';
@Component({
  selector: 'kt-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
 /*  restaurantService: any; */
  url1: string;
  urlArray = [''];
  menuUrl: any;
  index1: number;
  menu: Menu[];
  data: any;
  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal , private logger: NGXLogger, private title: Title, private formBuilder: FormBuilder, private restService: RestaurantService, private router: Router, private translate: TranslateService, private http: HttpClient) { }
  api = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
  titleName: any = TitleName;
  userInfo: any;
  restaurant: Restaurant[];
  restaurantData = new Array<Restaurant>();
  rest: any;
  index: number;
  input = '';
  menuArray: any;
  restaurantId: number;
  searchValue: any;
  menuForm: FormGroup;
  @ViewChild(IgxOverlayOutletDirective, { static: true })
  public outlet: IgxOverlayOutletDirective;

  @ViewChild('dialog1', { read: IgxDialogComponent, static: true })
  public dialog: IgxDialogComponent;

  private _animaitonSettings: PositionSettings = {
    openAnimation: useAnimation(slideInBottom, { params: { fromPosition: 'translateY(100%)' } }),
    closeAnimation: useAnimation(slideOutTop, { params: { toPosition: 'translateY(-100%)' } })
  };
  ngOnInit(): void {
     // tslint:disable-next-line: deprecation
     this.restService.getAllRestaurant().subscribe(resp => {
      this.restaurant = resp;
      this.rest = resp;
     /*  this.restaurantData = []; */
    });
     for (let i = 0; i < this.titleName.length; i++) {
      console.log(this.titleName[i].name);
      this.title.setTitle(this.titleName[i].name + '|Home');
    }
     this.menuForm = this.formBuilder.group({
			menu: new FormControl('')
		  });
     if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      // tslint:disable-next-line: align
      /* this.getApi(this.api); */
    }, (error) => {
      console.log(error);
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
    // tslint:disable-next-line: align
    this._dialogOverlaySettings2 = {
      modal: true,
      outlet: this.outlet,
      scrollStrategy: new CloseScrollStrategy(),
      positionStrategy: new GlobalPositionStrategy(this._animaitonSettings)
    };
  }
  // tslint:disable-next-line: variable-name
  private _dialogOverlaySettings2;

  public openDialog() {
    this._dialogOverlaySettings2.outlet = this.outlet;
    this.dialog.open(this._dialogOverlaySettings2);
  }
   getLocation(Api) {
    return this.http.get(Api).subscribe(data => {
      this.userInfo = data;
      // tslint:disable-next-line: align
      console.log(this.userInfo);
      console.log(this.userInfo.city);
      // tslint:disable-next-line: align
      this.restService.getAllRestaurant().subscribe(resp => {
        this.restaurant = resp;
        this.restaurantData = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.restaurant.length; i++) {
          this.index = this.restaurant[i].restaddress.toLowerCase().indexOf(this.userInfo.city.toLowerCase());
          if (this.index > -1) {
            console.log(this.restaurant[i]);
            this.restaurantData.push(this.restaurant[i]);
          // tslint:disable-next-line: no-shadowed-variable
						// tslint:disable-next-line: align
						this.restService.getMenuById(this.restaurantId).subscribe((data => {
							this.menuArray = data;
							const url = `http://localhost:8080/api/zonions/file`;
							// tslint:disable-next-line: prefer-for-of
							for (let j = 0; j < this.menuArray.length; j++) {
								if (this.menuArray.length) {
									this.url1 = `${url}/${this.restaurantId}/${this.menuArray[j].type}`;
									this.urlArray.push(this.url1);
								}
							}

							this.urlArray.splice(0, 1);
							// tslint:disable-next-line: prefer-for-of
							for (let k = 0; k < this.urlArray.length; k++) {
								this.menuUrl = this.urlArray[k];
							}
							console.log(this.menuUrl);
						}));
          }
        }
      });
    });
  }
  Login() {
    this.router.navigate(['auth', 'login']);
  }
   search() {
    this.getLocation(this.api);
  }

  searchLocation() {
    console.log(this.input);
		// tslint:disable-next-line: prefer-for-of
		// tslint:disable-next-line: align
    console.log('All restaurant' + this.restaurant);
		// tslint:disable-next-line: align
		for (let i = 0; i < this.restaurant.length; i++) {
			console.log(this.restaurant[i]);
			this.index = this.restaurant[i].restaddress.toLowerCase().indexOf(this.input.toLowerCase());
			this.index1 = this.restaurant[i].restname.toLowerCase().indexOf(this.input.toLowerCase());
			if (this.index > -1 || this.index1 > -1) {
				 this.restaurantData = [];
				// tslint:disable-next-line: no-unused-expression
				 console.log(this.restaurant[i]);
				 this.restaurantId = this.restaurant[i].restid;
				 this.restaurantData.push(this.restaurant[i]);
				// tslint:disable-next-line: deprecation
				 this.restService.getMenuById(this.restaurantId).subscribe((data => {
					this.menuArray = data;
					const url = `http://localhost:8080/api/zonions/file`;
					// tslint:disable-next-line: prefer-for-of
					for (let j = 0; j < this.menuArray.length; j++) {
						if (this.menuArray.length) {
							this.url1 = `${url}/${this.restaurantId}/${this.menuArray[j].type}`;
							this.urlArray.push(this.url1);
						}
					}

					this.urlArray.splice(0, 1);
					// tslint:disable-next-line: prefer-for-of
					for (let k = 0; k < this.urlArray.length; k++) {
						this.menuUrl = this.urlArray[k];
					}
					console.log(this.menuUrl);
				}));
			}

		}
      }
      saveMenu(fvalue: any) {

        this.restaurantData = [];
        this.data = fvalue;
        console.log(this.data.menu);
        this.restService.getAllRestaurant().subscribe((data) => {
          console.log(data);
          this.menu = data;
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.menu.length; i++) {
            if (this.menu[i].type === this.data.menu) {
              // tslint:disable-next-line: deprecation
              this.restService.getRestaurantById(this.menu[i].restid).subscribe((response) => {
                this.restaurantData.push(response);
                console.log(this.restaurantData);
                // tslint:disable-next-line: deprecation
                this.restService.getMenuById(this.menu[i].restid).subscribe((res) => {
                  this.menuArray = res;
                  const url = `http://localhost:8080/api/zonions/file`;
              // tslint:disable-next-line: prefer-for-of
                  for (let j = 0; j < this.menuArray.length; j++) {
                if (this.menuArray.length) {
                  this.url1 = `${url}/${this.menu[i].restid}/${this.menuArray[j].type}`;
                  this.urlArray.push(this.url1);
                }
              }
    
                  this.urlArray.splice(0, 1);
              // tslint:disable-next-line: prefer-for-of
                  for (let k = 0; k < this.urlArray.length; k++) {
                this.menuUrl = this.urlArray[k];
              }
                  console.log(this.menuUrl);
                });
              });
            }
          }
        });
      }
    
    

  onSearchClear() {
    this.input = '';
    this.restaurantData = [];
  }
  restaurantDetails(restid: number) {
    this.logger.info('In Restaurant Get By Id Method');
    this.router.navigate(['restaurant', 'restaurantDetail', restid]);
  }
}
