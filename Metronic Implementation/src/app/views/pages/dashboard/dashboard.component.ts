// Angular
import { Component, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';

import { LayoutConfigService, SparklineChartOptions } from '../../../core/_base/layout';
import { RestaurantService } from '../restaurants/_services/restaurant.service';
import { UserService } from '../restaurants/_services/user.service';

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
	userLength: number;
	restaurantLength: number;
	// tslint:disable-next-line: max-line-length
	constructor(private layoutConfigService: LayoutConfigService, private userService: UserService, private restaurantService: RestaurantService) {
	}

	ngOnInit(): void {
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
			console.log(this.userLength);
		});
	}
	getRestaurant(): any {
		// tslint:disable-next-line: deprecation
		this.restaurantService.getAllRestaurant().subscribe(data => {
			this.restaurantLength = data.length;
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
	public barChartData = [
		{ data: [3, 1], label: 'Total User' },
		{ data: [5], label: 'Total Restaurants' }
	];

}
