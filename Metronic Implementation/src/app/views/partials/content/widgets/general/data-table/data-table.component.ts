// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
// RXJS
import { tap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
// Crud
import { QueryParamsModel } from '../../../../../../core/_base/crud';
// Layout
import { DataTableItemModel, DataTableService } from '../../../../../../core/_base/layout';
import { DataTableDataSource } from './data-table.data-source';
import { RestaurantService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/views/pages/restaurants/_services/restaurant.service';
import { Restaurant } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/views/pages/restaurants/_helpers/restaurant';
import { Router } from '@angular/router';
import { DeleteConfirmBoxComponent } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/views/pages/restaurants/DialogBoxes/delete-confirm-box/delete-confirm-box.component';
import { AlertConfirmBoxComponent, DialogConfig } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Metronic Implementation/src/app/views/pages/restaurants/DialogBoxes/alert-confirm-box/alert-confirm-box.component';
import Swal from 'sweetalert2';
import { NGXLogger } from 'ngx-logger';
import { IgxFilterOptions } from "igniteui-angular";

@Component({
	selector: 'kt-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
	public search: string;
    get fo() {
        const _fo = new IgxFilterOptions();
        _fo.key = "name";
        _fo.inputValue = this.search;
        return _fo;
    }
	// Public properties
	dataSource: DataTableDataSource;
	displayedColumns = [ 'Restaurant Name', 'Open Time', 'Close Time', 'Last Updated', 'actions' ];
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	selection = new SelectionModel<DataTableItemModel>(true, []);

	/**
	 * Component constructor
	 *
	 * @param dataTableService: DataTableService
	 */
	restaurants: Observable<Restaurant[]>;
	constructor(private restService: RestaurantService,private router: Router,private dialog: MatDialog, private logger: NGXLogger) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.refreshRestaurants();
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => {
					this.loadItems();
				})
			)
			.subscribe();

		// Init DataSource
		this.dataSource = new DataTableDataSource(this.restService);
		// First load
		this.loadItems(true);
	}

	/**
	 * Load items
	 *
	 * @param firstLoad: boolean
	 */
	loadItems(firstLoad: boolean = false) {
		const queryParams = new QueryParamsModel(
			{},
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			firstLoad ? 6 : this.paginator.pageSize
		);
		this.dataSource.loadItems(queryParams);
		this.selection.clear();
	}
	deleteRestaurant(restid: number) {
		this.logger.info('In Restaurant Delete Method');                      /* <---Method call from Display List Form to Delete Restaurant */
		this.restService.deleteRestaurant(restid)
		  .subscribe(
			data => {
			  this.refreshRestaurants();
			  window.location.reload();
			},
			error => console.log(error));
	  }
	 
	  removeRestaurant(restid: number){
		Swal.fire({
		  title: 'Are you sure you want to delete restaurant?',
		  text: 'This process is irreversible.',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Yes, go ahead.',
		  cancelButtonText: 'No, let me think'
		}).then((result) => {
		  if (result.value) {
			this.restService.deleteRestaurant(restid)
			.subscribe(
			  data => {
				this.refreshRestaurants();
				this.openAlertDialog();
			  },
			  error => console.log(error));
		  } else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire(
			  'Cancelled',
			  'Restaurant still in our database.)',
			  'error'
			)
		  }
		})
	  }
	 
	  openAlertDialog(){
		Swal.fire('Restaurant Deleted Successfully..!');
	  }
	  refreshRestaurants() { 
		this.logger.info('In Restaurant List Method');             /* <---Method to Diplay all the Restaurants list again to admin */
		this.restaurants = this.restService.getAllRestaurant();
		
	  }
	  updateRestaurant(restid: number) {                     /* <---Method call from Display List Form to Update Restaurant */
		this.router.navigate(['restaurants', 'restUpdate', restid]);
	  }
	/* UI */

	/**
	 * Returns item status
	 *
	 * @param status: number
	 */
	getItemStatusString(status: number = 0): string {
		switch (status) {
			case 0:
				return 'Selling';
			case 1:
				return 'Sold';
		}
		return '';
	}

	/**
	 * Returens item CSS Class Name by status
	 *
	 * @param status: number
	 */
	getItemCssClassByStatus(status: number = 0): string {
		switch (status) {
			case 0:
				return 'success';
			case 1:
				return 'info';
		}
		return '';
	}

	/**
	 * Returns item condition
	 *
	 * @param condition: number
	 */
	getItemConditionString(condition: number = 0): string {
		switch (condition) {
			case 0:
				return 'New';
			case 1:
				return 'Used';
		}
		return '';
	}

	/**
	 * Returns CSS Class name by condition
	 *
	 * @param condition: number
	 */
	getItemCssClassByCondition(condition: number = 0): string {
		switch (condition) {
			case 0:
				return 'success';
			case 1:
				return 'info';
		}
		return '';
	}

}
