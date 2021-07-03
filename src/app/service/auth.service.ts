import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/accounts/user';

const AUTH_API = "https://ezwashteam.azurewebsites.net/api/auth/"

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(credentials: any): Observable<any>{
    return this.http.post(AUTH_API + 'sign-in', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
  register(user: User): Observable<any>{
    return this.http.post(AUTH_API + 'sign-up',
                          JSON.stringify(user), httpOptions);
  }
}
