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
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { DeleteConfirmBoxComponent } from './DialogBoxes/delete-confirm-box/delete-confirm-box.component';
import { AlertConfirmBoxComponent } from './DialogBoxes/alert-confirm-box/alert-confirm-box.component';



const routes: Routes = [
	{
		path: '',
		component: RestaurantsComponent,
		children: [
			{
				path: 'restHome',
				component: HomeComponent
			},
			{
				path: 'addRestaurant',
				component: CreateRestaurantComponent
            },
            {
                path: 'restaurant',
                component: RestaurantListComponent
			},
			{
				path: 'restUpdate/:restid',
				component: UpdateRestaurantComponent
			},
			{
				path: 'restDetails/:restid',
				component: RestaurantDetailsComponent
			},
			{
				path: 'users',
				component: UserDetailComponent
			},
			{
				path: 'booktable',
				component: BookTableComponent
			}

		]
	}
];

@NgModule({
	imports: [
		CommonModule,
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
        AlertConfirmBoxComponent
	],
	providers: [ ],
	entryComponents: [AlertConfirmBoxComponent,DeleteConfirmBoxComponent],
})
export class RestaurantsModule {
}
