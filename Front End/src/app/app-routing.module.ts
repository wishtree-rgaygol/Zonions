import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardAdminComponent } from './Components/board-admin/board-admin.component';
import { BoardUserComponent } from './Components/board-user/board-user.component';
import { LoginComponent } from './Module/entry/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Module/entry/register/register.component';
import { CreateRestaurantComponent } from './Components/Restaurants/create-restaurant/create-restaurant.component';
import { HomeComponent } from './Components/Restaurants/home/home.component';
import { RestaurantDetailsComponent } from './Components/Restaurants/restaurant-details/restaurant-details.component';
import { RestaurantListComponent } from './Components/Restaurants/restaurant-list/restaurant-list.component';
import { UpdateRestaurantComponent } from './Components/Restaurants/update-restaurant/update-restaurant.component';
import { ErrorPage400Component } from './Error/error-page400/error-page400.component';
import { InternalServerErrorComponent } from './Error/internal-server-error/internal-server-error.component';
import { CookiesMessageComponent } from './Components/cookies-message/cookies-message.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,data: { breadcrumb: "Active" }},
  { path: 'details/:id', component: RestaurantDetailsComponent, data: { breadcrumb: "Details" }},
  { path: 'login', component: LoginComponent,  data: { breadcrumb: "Home" }},
  { path: 'register', component: RegisterComponent,data: { breadcrumb: "Register" } },
  { path: 'profile', component: ProfileComponent ,data: { breadcrumb: "Profile" }},
  { path: 'create', component: CreateRestaurantComponent, data: { breadcrumb: "Add" }},
  { path: 'update/:id', component: UpdateRestaurantComponent,data: { breadcrumb: "Update" }},
  { path: 'restaurants', component: RestaurantListComponent,data: { breadcrumb: "List" }},
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '500', component: InternalServerErrorComponent,data: { breadcrumb: "Error" }},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorPage400Component,data: { breadcrumb: "Page not Found" }},
  { path: 'cookies', component: CookiesMessageComponent ,data: { breadcrumb: "Cookies" }}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
