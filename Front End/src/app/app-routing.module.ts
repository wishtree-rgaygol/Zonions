import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardAdminComponent } from './Components/board-admin/board-admin.component';
import { BoardUserComponent } from './Components/board-user/board-user.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { CreateRestaurantComponent } from './Components/Restaurants/create-restaurant/create-restaurant.component';
import { HomeComponent } from './Components/Restaurants/home/home.component';
import { RestaurantDetailsComponent } from './Components/Restaurants/restaurant-details/restaurant-details.component';
import { RestaurantListComponent } from './Components/Restaurants/restaurant-list/restaurant-list.component';
import { UpdateRestaurantComponent } from './Components/Restaurants/update-restaurant/update-restaurant.component';
import { ErrorPage400Component } from './Error/error-page400/error-page400.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create', component: CreateRestaurantComponent},
  { path: 'update/:id', component: UpdateRestaurantComponent},
  { path: 'details/:id', component: RestaurantDetailsComponent},
  { path: 'restaurants', component: RestaurantListComponent},
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent }, 
  { path: '400', component:ErrorPage400Component},
  { path: '**', redirectTo: '/400'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
