import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hide = true;
  title = 'ezwashfrontend';
  isLoggedIn = false;
  username: string = '';
  constructor(private tokenStorageService: TokenStorageService,
             private router: Router){}

  ngOnInit(): void{
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.username = user.email;
      console.log(user);
    }else{
      this.router.navigate(['/login']);
    }
  }
  logout(): void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
