import { Component, OnInit } from '@angular/core';
import {Staff} from "../../../model/accounts/staff";
import {CarwashService} from "../../../service/accounts/carwash/carwash-api.service";
import {Carwash} from "../../../model/accounts/carwash";
import {TokenStorageService} from "../../../service/token-storage.service";
import {Router} from "@angular/router";
import {UpdateServiceComponent} from "../../carwash/update-service/update-service.component";
import {MatDialog} from "@angular/material/dialog";
import {HomeCarwashCComponent} from "../home-carwash-c/home-carwash-c.component";
import {CustomerService} from "../../../service/accounts/customer/customer-api.service";
import {CustomercarwashesService} from "../../../service/accounts/customer/customercarwashes-api.service";
import {Customer} from "../../../model/accounts/customer";

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css']
})
export class HomeCustomerComponent implements OnInit {
  carwashList: Carwash[] = [];
  dataCarWash: Carwash={} as Carwash;

  constructor(private customerApi:CustomercarwashesService, private carwashApi: CarwashService,private tokenServiceApi:TokenStorageService,private router: Router
  ,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllCarWash();

  }

  getAllCarWash() {
    this.carwashApi.getAllCarWash().subscribe((data: Carwash[]) => {
      this.carwashList = data;
    });
  }

  getCarWashById(id: number) {
    this.carwashApi.getCarWashById(this.carwashList[id].id).subscribe((data:Carwash)=>{
      this.dataCarWash=data;
      console.log(data);
    });
  }

  openDialogGetCarWashByid(idCarWash:number){
    const dialogRef = this.dialog.open(HomeCarwashCComponent);

    dialogRef.afterOpened().subscribe(result => {
      console.log(`Get CarWash result: ${result}`);
      dialogRef.componentInstance.getCarWashById(this.carwashList[idCarWash].id);
      dialogRef.componentInstance.getServicesByCarWashId(this.carwashList[idCarWash].id);
      dialogRef.componentInstance.getCommentByCarWashId(this.carwashList[idCarWash].id);
      this.ngOnInit();
    });
  }

  handleSaveButton(index: number): void{
    const button_heart = document.getElementById(index.toString())
    if (button_heart != null) {


      if (button_heart.textContent === "favorite") {

        this.customerApi.addUserCarWash(this.carwashList[index], this.tokenServiceApi.getUser().id, this.carwashList[index].id).subscribe((res: Customer) => {

          button_heart.innerText = "check_circle";
        })
      } else {
        this.customerApi.deleteUserCarWash(this.tokenServiceApi.getUser().id, this.carwashList[index].id).subscribe((res: any) => {
          button_heart.innerText = "favorite";

        })
      }
    }
  }
}
