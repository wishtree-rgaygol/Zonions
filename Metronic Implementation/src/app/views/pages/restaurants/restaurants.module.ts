import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreModule } from '../../../core/core.module';
import { MaterialPreviewModule } from '../../partials/content/general/material-preview/material-preview.module';
import { PartialsModule } from '../../partials/partials.module';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { HomeComponent } from './restaurant-home/restaurant-home.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantsComponent } from './restaurants.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';

import { UserDetailComponent } from './user-details/user-detail.component';
import { DataTablesModule } from 'angular-datatables';
import { BookTableComponent } from './BookTable/book-table.component';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { DeleteConfirmBoxComponent } from './DialogBoxes/delete-confirm-box/delete-confirm-box.component';
import { AlertConfirmBoxComponent } from './DialogBoxes/alert-confirm-box/alert-confirm-box.component';
import { Title } from '@angular/platform-browser';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { IgxButtonModule, IgxDialogModule, IgxIconModule, IgxProgressBarModule, IgxRippleModule, IgxSnackbarModule, IgxToggleModule } from "igniteui-angular";



const routes: Routes = [
	{
		path: '',
		component: RestaurantsComponent,
		data : { breadcrumb: 'Restaurants'},
		children: [
			{
				path: 'restHome',
				component: HomeComponent,
				data : { breadcrumb: 'Active Restaurants'}
			},
			{
				path: 'addRestaurant',
				component: CreateRestaurantComponent,
				data : {breadcrumb: 'Add Restaurant'}
            },
            {
                path: 'restaurant',
                component: RestaurantListComponent,
				data : {breadcrumb: 'Restaurant List'}
			},
			{
				path: 'restUpdate/:restid',
				component: UpdateRestaurantComponent,
				data : {breadcrumb: 'Update Restaurant'}
			},
			{
				path: 'restDetails/:restid',
				component: RestaurantDetailsComponent,
				data : {breadcrumb: ''}
			},
			{
				path: 'users',
				component: UserDetailComponent,
				data : {breadcrumb: 'User details'}
			},
			{
				path: 'booktable',
				component: BookTableComponent,
				data : {breadcrumb: 'Book Table'}
			}

		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		IgxProgressBarModule,
		PartialsModule,
		NgbModule,
		CoreModule,
		MaterialPreviewModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		PerfectScrollbarModule,
		DataTablesModule,
		MatDatepickerModule,
		MatInputModule,
		MatNativeDateModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatListModule,MatRadioModule
		, MatAutocompleteModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatExpansionModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatStepperModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		PerfectScrollbarModule,
		MatTableModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatSortModule,
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		MatToolbarModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatStepperModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		IgxButtonModule,
		IgxDialogModule,
		IgxRippleModule,
		IgxToggleModule,
		IgxIconModule,
		IgxSnackbarModule,
		
	],
	exports: [RouterModule],
	declarations: [
		RestaurantsComponent,
		HomeComponent,
        CreateRestaurantComponent,
		RestaurantListComponent,
		UpdateRestaurantComponent,
		RestaurantDetailsComponent,
		UserDetailComponent,
        BookTableComponent,
        DeleteConfirmBoxComponent,
        AlertConfirmBoxComponent,
        BreadcrumbsComponent
	],
	providers: [ Title],
	entryComponents: [AlertConfirmBoxComponent,DeleteConfirmBoxComponent],
})
export class RestaurantsModule {
}
