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
	MatGridListModule,
	MatBadgeModule,
	MatBottomSheetModule,
	MatButtonToggleModule,
	MatChipsModule,
	MatStepperModule,
	MatDividerModule,
	MatExpansionModule,
	MatListModule,
	MatRippleModule,
	MatSidenavModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatToolbarModule,
	MatTreeModule,
	MatFormFieldModule,

} from '@angular/material';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantHomeDisplayComponent } from './restaurant-home-display/restaurant-home-display.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { IgxAvatarModule, IgxButtonModule, IgxCardModule, IgxDialogModule, IgxIconModule, IgxRippleModule, IgxSnackbarModule, IgxToggleModule } from 'igniteui-angular';
import { TimeFormat } from './models/conversionTime.pipe';
import { LanguageComponent } from './language/language.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxInputStarRatingModule } from 'ngx-input-star-rating';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AddFeedbackComponent } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/TestHome/add-feedback/add-feedback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FetchMoreComponent } from './fetch-more/fetch-more.component';
import { FoodMaterialComponent } from './food-material/food-material.component';
import { HomepageComponent } from './homepage/homepage.component';



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
		NgxInputStarRatingModule,
		MatCardModule,
		MatGridListModule,
		CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ScrollingModule,
	MatAutocompleteModule,
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
/* 	BrowserAnimationsModule,
 */    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
		IgxButtonModule,
		IgxIconModule,
		IgxCardModule,
		IgxRippleModule,
		IgxAvatarModule,

	],
	exports: [RouterModule],
	declarations: [
		TimeFormat,
		RestaurantComponent,
		RestaurantHomeDisplayComponent,
		RestaurantDetailsComponent,
		BreadcrumbsComponent,
		LanguageComponent,
		FooterBarComponent,
		AddFeedbackComponent,
		FetchMoreComponent,
		FoodMaterialComponent,
		HomepageComponent
	],
	providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
	],
	entryComponents: [AddFeedbackComponent]
})
export class RestaurantModule {
}
