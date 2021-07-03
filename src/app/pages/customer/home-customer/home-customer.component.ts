import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from 'src/app/model/geographic/location';
import {CarwashService} from 'src/app/service/accounts/carwash/carwash-api.service';
import {LocationService} from 'src/app/service/geographic/location.service';
import {TokenStorageService} from 'src/app/service/token-storage.service';
import {Carwash} from "../../../model/accounts/carwash";

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css']
})
export class HomeCustomerComponent implements OnInit {
  carwashList: Carwash[] = [];
  minDistance: number = 10;
  customerLocation: Location;
  searchString: string | null;

  constructor(private locationApi: LocationService,
              private carwashApi: CarwashService,
              private tokenService: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute) {
               this.customerLocation = {} as Location;
               this.searchString = null;
             }

  ngOnInit(): void {
    this.searchString = this.route.snapshot.paramMap.get('s');
    console.log(this.searchString);
    if(!!this.searchString)
      this.getCarWashByName();
    else
      this.getLocationByCustomer();
  }

  getLocationByCustomer() {
    this.locationApi.getLocationByCustomer(this.tokenService.getUser().id).subscribe((res: Location) =>{
      this.customerLocation = res;
      this.getNearCarwashes();
    })
  }

  getNearCarwashes(){
    this.carwashApi.getNearCarwashes(this.customerLocation.lattitude, this.customerLocation.longitude, this.minDistance).subscribe((res: any)=>{
      this.carwashList = res.content;
    })
  }

  getCarWashByName(){
    this.carwashApi.getCarWashByName(this.searchString).subscribe((res: any) => {
      console.log(res)
      this.carwashList = res.content;
    },error => {
      console.log("No se encontró");
    })
  }
}
