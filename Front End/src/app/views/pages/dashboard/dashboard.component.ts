// Angular
import { Component, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';

import { LayoutConfigService, SparklineChartOptions } from '../../../core/_base/layout';
import { Restaurant } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/views/pages/restaurants/_helpers/restaurant';
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/views/pages/restaurants/_services/restaurant.service';
import { UserService } from '../restaurants/_services/user.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import TitleName from '../restaurants/_helpers/TitleName';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	chartOptions1: SparklineChartOptions;
	chartOptions2: SparklineChartOptions;
	chartOptions3: SparklineChartOptions;
	chartOptions4: SparklineChartOptions;
	userLength: any;
	restaurantLength: number;
    restaurant: Restaurant[];
    rest: Observable<Restaurant[]>;
	vCount: number;
	titleName: any = TitleName;
	restaurantName: String;
	user = [];
	resto = [];
	/* barChartData: [{ data: number[]; label: string; }, { data: number[]; label: string; }]; */
	// tslint:disable-next-line: max-line-length
	constructor(private layoutConfigService: LayoutConfigService, private userService: UserService, private restaurantService: RestaurantService, private title: Title) {
	}
	ngOnInit(): void {
		for (let i = 0; i < this.titleName.length; i++) {
			console.log(this.titleName[i].name);
			this.title.setTitle(this.titleName[i].name + '|Dashboard');
		  }
		this.restaurantService.getAllRestaurant().subscribe(data => {
			this.restaurant = data;
			this.rest= data;
			console.log(this.restaurant);
			for ( let i = 0; i < this.restaurant.length - 1; i++) {
				console.log("In for");
				if (this.restaurant[i].visitCount > this.restaurant[i + 1].visitCount) {
					console.log("In if");
					this.vCount = this.restaurant[i].visitCount;
					this.restaurantName = this.restaurant[i].restname;
					
				} else {
					console.log("In else");
					this.vCount = this.restaurant[i + 1].visitCount;
					this.restaurantName = this.restaurant[i + 1].restname;
					
				}
		}
		});
		this.getUsers();
		this.getRestaurant();
		this.chartOptions1 = {
			data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
			color: this.layoutConfigService.getConfig('colors.state.brand'),
			border: 3
		};
		this.chartOptions2 = {
			data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
			color: this.layoutConfigService.getConfig('colors.state.danger'),
			border: 3
		};
	}
	getUsers(): any {
		// tslint:disable-next-line: deprecation
		this.userService.getAllUsers().subscribe(data => {
			this.userLength = data.length;
			this.user.push(this.userLength,1);
			console.log(this.user);
			console.log(this.userLength);
		});
	}
	getRestaurant(): any {
		// tslint:disable-next-line: deprecation
		this.restaurantService.getAllRestaurant().subscribe(data => {
			this.restaurantLength = data.length;
			this.resto.push(this.restaurantLength);
			console.log(this.restaurantLength);
		});
	}
	// tslint:disable-next-line: member-ordering
	public barChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	// tslint:disable-next-line: member-ordering
	public barChartLabels = ['Today'];
	// tslint:disable-next-line: member-ordering
	 public barChartType = 'bar';
 // tslint:disable-next-line: member-ordering
     public barChartLegend = true;
	// tslint:disable-next-line: member-ordering
	barChartData = [
		{ data: this.user, label: 'Total Users' },
		{ data: this.resto, label: 'Total Restaurants' },
	];
}
