import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenClass } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/core/auth/_services/tokenClass';

const httpOptions = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class oauthService {

  oauthURL = 'http://localhost:8080/api/oauth/';

  constructor(private httpClient: HttpClient) { }

  public google(tokenDto: TokenClass): Observable<TokenClass> {
    return this.httpClient.post<TokenClass>(this.oauthURL + 'google', tokenDto, httpOptions);
  }

  public facebook(tokenDto: TokenClass): Observable<TokenClass> {
    return this.httpClient.post<TokenClass>(this.oauthURL + 'facebook', tokenDto, httpOptions);
  }

}