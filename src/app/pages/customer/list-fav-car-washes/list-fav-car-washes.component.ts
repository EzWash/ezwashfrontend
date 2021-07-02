import { Component, OnInit } from '@angular/core';
import {CustomercarwashesService} from "../../../service/accounts/customer/customercarwashes-api.service";
import {Carwash} from "../../../model/accounts/carwash";
import {Customer} from "../../../model/accounts/customer";

@Component({
  selector: 'app-list-fav-car-washes',
  templateUrl: './list-fav-car-washes.component.html',
  styleUrls: ['./list-fav-car-washes.component.css']
})
export class ListFavCarWashesComponent implements OnInit {

  carWashList: Carwash[] = [];
  deleted: Customer = {} as Customer;

  constructor(private customerCarWashService: CustomercarwashesService) { }

  ngOnInit(): void {
    this.getLikedList(1);
  }

  getLikedList(id: number){
    this.customerCarWashService.getLinkedList(id).subscribe(data =>{
      this.carWashList = data;
    })
  }

  deleteCarWashFromList(customerId: number, carWashId: number){
    this.customerCarWashService.deleteUserCarWash(customerId,carWashId).subscribe(data=>{
      this.deleted = data;
    })
    this.getLikedList(1) ;
  }

}
