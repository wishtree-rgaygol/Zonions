import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  checked: boolean = true;
  isType: boolean;
  type: string = 'password';

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  supportLanguages = ['en', 'fr', 'ta', 'hi'];
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private translateService: TranslateService ,private router:Router) {

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


  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  cookiesEnabled():void{
    let isCookiesEnabled = (navigator.cookieEnabled) ? true :false;
    if(typeof navigator.cookieEnabled ==='undefined' && !isCookiesEnabled)
    {
       document.cookie= 'myTestCookie';
       isCookiesEnabled = (document.cookie.indexOf('myTestCookie')!== -1) ? true :false;
    }
     if(isCookiesEnabled)
     {
       this.forward();
     }  
  }
  forward():void
  {
    this.router.navigate(['/cookies']);
  }
  reloadPage(): void {
    alert("You logged in successfully");
    window.location.reload();
  }
}
