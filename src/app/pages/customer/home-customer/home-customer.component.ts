import { Component, OnInit } from '@angular/core';
import {Staff} from "../../../model/accounts/staff";
import {CarwashService} from "../../../service/accounts/carwash/carwash-api.service";
import {Carwash} from "../../../model/accounts/carwash";

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css']
})
export class HomeCustomerComponent implements OnInit {
  carwashList : Carwash[]=[];
  constructor(private carwashApi: CarwashService) { }

  ngOnInit(): void {
  this.getAllCarWash();
  }

  getAllCarWash() {
    this.carwashApi.getAllCarWash().subscribe((data:Carwash[]) => {
      this.carwashList = data;
    });
  }
}
