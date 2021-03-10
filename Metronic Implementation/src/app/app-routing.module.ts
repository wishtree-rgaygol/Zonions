// Angular
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Components
import {BaseComponent} from './views/theme/base/base.component';
import {ErrorPageComponent} from './views/theme/content/error-page/error-page.component';
// Auth
import {AuthGuard} from './core/auth';

const routes: Routes = [
	   {path: 'auth',
	    loadChildren: 'app/views/pages/auth/auth.module#AuthModule'},

	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: 'app/views/pages/dashboard/dashboard.module#DashboardModule',
				data: { title: "Dashboard" }

			},
			{
				path: 'restaurants',
				loadChildren: 'app/views/pages/restaurants/restaurants.module#RestaurantsModule'
			},
			{
				path: 'builder',
				loadChildren: 'app/views/theme/content/builder/builder.module#BuilderModule'
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					type: 'error-v6',
					code: 403,
					title: '403... Access forbidden',
					desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator',
				},
			},
			{
				path: 'error/404',
				component: ErrorPageComponent,
				data: {
					type: 'error-v3',
					code: 404,
					title: 'Page Not Found'
				},
			},
			{
				path: 'error/500',
				component: ErrorPageComponent,
				data: {
					type: 'error-v1',
					code: 500,
					subtitle: 'Internal Server Error'
				},
			},
		 	{path: '', redirectTo: 'restaurants/restHome', pathMatch: 'full'} 
		],
	},

	{path: '**', redirectTo: 'error/404', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
