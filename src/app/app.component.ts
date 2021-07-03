import { Component, HostListener } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  role: string = '';
  screenWidth: number = 0;
  isLessThan500: boolean = false;
  isCustomer: boolean = false;
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void{
    this.onResize();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      this.username = this.tokenStorageService.getUser().name;
      this.role = this.tokenStorageService.getUser().role;
      this.isCustomer = this.tokenStorageService.getUser().role == "CUSTOMER" ? true : false;
      this.onResize();
    }else{
      this.router.navigate(['/login']);
    }
  }
  logout(): void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 500)
      this.isLessThan500 = true;
    else
      this.isLessThan500 = false;
  }
  buttonHome() {
    if(!this.isCustomer)
      this.router.navigate(['/home-carwash']);
    else
      this.router.navigate(['/home-customer']);
  }
  onChangeEvent(event:any){
    const search = event.target.value;
    this.router.navigate(['/home-customer', search]);
  }
}
