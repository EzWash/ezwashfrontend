import { Injectable } from '@angular/core';
import {User} from '../model/accounts/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  public signOut(): void{
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  //@ts-ignore
  public getUser = () => JSON.parse(window.sessionStorage.getItem(USER_KEY));
}
