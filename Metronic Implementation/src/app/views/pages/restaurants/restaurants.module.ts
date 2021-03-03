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
		DataTablesModule
	],
	exports: [RouterModule],
	declarations: [
		RestaurantsComponent,
		HomeComponent,
        CreateRestaurantComponent,
		RestaurantListComponent,
		UpdateRestaurantComponent,
		RestaurantDetailsComponent,
		UserDetailComponent

	],
	providers: [ ],
})
export class RestaurantsModule {
}
