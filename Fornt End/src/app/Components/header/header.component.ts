import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: 'ZONIONS';

  constructor(private tokenStorageService: TokenStorageService) { }
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

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
