import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: 'ZONIONS';

  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  constructor(private tokenStorageService: TokenStorageService, private translateService: TranslateService ,private router: Router) {

    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');

    const browserlang = this.translateService.getBrowserLang();

    console.log('Browser Language => ', browserlang);

    if (this.supportLanguages.includes(browserlang)) {
      this.translateService.use(browserlang);
    }
  }

  useLang(lang: string) {
    console.log('selected language ==> ', lang);
    this.translateService.use(lang);
  }

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showHomeBoard = false;
  showCreateBoard = false;
  showListBoard = false;
  user = false;
  admin = false;
  username?: string;


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      if (user.roles === 'ROLE_USER') {
        this.user = true;
      }
      else {
        this.admin = true;
      }
      this.roles = user.roles;

      this.showHomeBoard = this.roles.includes('ROLE_USER');
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showCreateBoard = this.roles.includes('ROLE_ADMIN');
      this.showListBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
