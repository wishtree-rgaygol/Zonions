import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatAutocompleteModule,
	MatSnackBarModule,
	MatTooltipModule,
	ErrorStateMatcher,
	ShowOnDirtyErrorStateMatcher,

} from '@angular/material';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantHomeDisplayComponent } from './restaurant-home-display/restaurant-home-display.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { IgxButtonModule, IgxDialogModule, IgxIconModule, IgxRippleModule, IgxSnackbarModule, IgxToggleModule } from 'igniteui-angular';
import { TimeFormat } from './models/conversionTime.pipe';
import { LanguageComponent } from './language/language.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
	{
		path: '',
		component: RestaurantComponent,
		children: [
			{
				path: 'home',
				component: RestaurantHomeDisplayComponent,
			},
			{
				path: 'restaurantDetail/:restid',
				component: RestaurantDetailsComponent,
			}


		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		NgbModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		PerfectScrollbarModule,
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
		IgxButtonModule,
		IgxDialogModule,
		IgxRippleModule,
		IgxToggleModule,
		IgxIconModule,
		IgxSnackbarModule,
		TranslateModule.forRoot(),
	],
	exports: [RouterModule],
	entryComponents: [],
	declarations: [
		TimeFormat,
		RestaurantComponent,
		RestaurantHomeDisplayComponent,
		RestaurantDetailsComponent,
		BreadcrumbsComponent,
		LanguageComponent,
		FooterBarComponent
	],
	providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
	 ],
})
export class RestaurantModule {
}