import { Component, OnInit } from '@angular/core';
import {CustomercarwashesService} from "../../../service/accounts/customer/customercarwashes-api.service";
import {Carwash} from "../../../model/accounts/carwash";
import {Customer} from "../../../model/accounts/customer";
import {TokenStorageService} from "../../../service/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {DeletedDone} from "../../carwash/home-car-wash/home-car-wash.component";

@Component({
  selector: 'app-list-fav-car-washes',
  templateUrl: './list-fav-car-washes.component.html',
  styleUrls: ['./list-fav-car-washes.component.css']
})
export class ListFavCarWashesComponent implements OnInit {

  carWashList: Carwash[] = [];
  deleted: Customer = {} as Customer;

  constructor(private customerCarWashService: CustomercarwashesService,private tokenStorageService: TokenStorageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLikedList(this.tokenStorageService.getUser().id);
  }

  getLikedList(id: number){
    this.customerCarWashService.getLinkedList(id).subscribe(data =>{
      this.carWashList = data;
    })
  }

  deleteCarWashFromList(carWashId: number){
    this.customerCarWashService.deleteUserCarWash(this.tokenStorageService.getUser().id,carWashId).subscribe(data=>{
      this.deleted = data;
      this.openDialogDelete();
    })
  }
  openDialogDelete() {
    this.dialog.open(DeletedDone);
    this.ngOnInit();
  }


}
