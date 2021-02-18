import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Breadcrumb, BreadcrumbService } from 'angular-crumbs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: 'ZONIONS';
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  constructor(private tokenStorageService: TokenStorageService,private translateService: TranslateService, private titleService: Title, private breadcrumbService: BreadcrumbService,private router: Router) {

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
    this.breadcrumbService.breadcrumbChanged.subscribe( crumbs => {
      this.titleService.setTitle(this.createTitle(crumbs));
    })
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      if (user.roles === 'ROLE_USER'){
        this.user = true;
      }
      else{
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
  private createTitle(routesCollection: Breadcrumb[]) {
    const title = 'Angular Demo';
    const titles = routesCollection.filter((route) => route.displayName);

    if (!titles.length) { return title; }

    const routeTitle = this.titlesToString(titles);
    return `${routeTitle} ${title}`;
}
private titlesToString(titles) {
  return titles.reduce((prev, curr) => {
      return `${curr.displayName} - ${prev}`;
  }, '');
}
  logout(): void {
    alert("You logged out successfully");
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
