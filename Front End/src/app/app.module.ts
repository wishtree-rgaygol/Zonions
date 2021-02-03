import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { CreateRestaurantComponent } from './Components/Restaurants/create-restaurant/create-restaurant.component';
import { UpdateRestaurantComponent } from './Components/Restaurants/update-restaurant/update-restaurant.component';
import { RestaurantDetailsComponent } from './Components/Restaurants/restaurant-details/restaurant-details.component';
import { RestaurantListComponent } from './Components/Restaurants/restaurant-list/restaurant-list.component';
import { HomeComponent } from './Components/Restaurants/home/home.component';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { BoardUserComponent } from './Components/board-user/board-user.component';
import { BoardAdminComponent } from './Components/board-admin/board-admin.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ErrorPage400Component } from './Error/error-page400/error-page400.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { EntryModule } from './Module/entry/entry.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CreateRestaurantComponent,
    UpdateRestaurantComponent,
    RestaurantDetailsComponent,
    RestaurantListComponent,
    HomeComponent,
    BoardUserComponent,
    BoardAdminComponent,
    ProfileComponent,
    ErrorPage400Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EntryModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => { return new TranslateHttpLoader(http, './assets/i18n/', '.json'); },
        deps: [HttpClient]
      }
    }),
    NgbModule,
    LoggerModule.forRoot(environment.logging) 
    //LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR})
  ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
