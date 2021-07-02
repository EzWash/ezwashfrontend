
import { Component, OnInit} from '@angular/core';

import {Staff} from "../../../model/accounts/staff";
import {StaffService} from "../../../service/accounts/staff/staff-api.service";
import {Router} from "@angular/router";
import {CarwashService} from "../../../service/accounts/carwash/carwash-api.service";
import {Carwash} from "../../../model/accounts/carwash";
import {ServiceService} from "../../../service/business/service/service.service";
import {Service} from "../../../model/business/service";
import {Comment} from "../../../model/business/comment";
import {CommentApiService} from "../../../service/business/comment/comment-api.service";
import {Customer} from "../../../model/accounts/customer";
import {CustomerService} from "../../../service/accounts/customer/customer-api.service";
import {MatDialog} from '@angular/material/dialog';
import {RegisterStaffComponent } from "../register-staff/register-staff.component";
import {RegisterServiceComponent} from "../register-service/register-service.component";
import {CarwashstaffService} from "../../../service/accounts/carwash/carwashstaff-api.service";
import {UpdateServiceComponent} from "../update-service/update-service.component";
import {TokenStorageService} from "../../../service/token-storage.service";

@Component({
  selector: 'app-home-car-wash',
  templateUrl: './home-car-wash.component.html',

  styleUrls: ['./home-car-wash.component.css'],

})
export class HomeCarWashComponent implements OnInit {
  staffList : Staff[]=[];
  carwashData: Carwash={}as Carwash;
  serviceList : Service[]=[];
  commentList: Comment[]=[];
  customerList: Customer[]=[];
  n:number=1;
  suma:number=0;
  result:number=0;
  totalComments:number=0;
  constructor(private carwashStaffApi:CarwashstaffService, private staffApi: StaffService, private router: Router,
              private carWashApi: CarwashService,private serviceApi:ServiceService,
              private commentApi:CommentApiService,private customerApi: CustomerService,public dialog: MatDialog,private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser().role!="CARWASH"){
      if (!!this.tokenStorageService.getToken())
        this.router.navigate(["/home-customer"]);
      else{
        this.router.navigate((["/login"]));
      }
    }
    this.getServicesByCarWashId(this.tokenStorageService.getUser().id);
    this.getAllStaff(this.tokenStorageService.getUser().id);
    this.getCarWashById(this.tokenStorageService.getUser().id);
    this.getCommentByCarWashId(this.tokenStorageService.getUser().id);

  }
  openDialogRegisterStaff() {
    const dialogRef = this.dialog.open(RegisterStaffComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Register Staff result: ${result}`);
      dialogRef.componentInstance.createStaff();
      this.ngOnInit();
    });

  }
  openDialogRegisterService() {
    const dialogRef = this.dialog.open(RegisterServiceComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Register Service result: ${result}`);
      dialogRef.componentInstance.createService();
      this.ngOnInit();
    });

  }
  openDialogUpdateService(idService:number){
    const dialogRef = this.dialog.open(UpdateServiceComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Update Service result: ${result}`);
      dialogRef.componentInstance.updateService(this.serviceList[idService].id);
      this.ngOnInit();
    });
  }

  getAllStaff(id:number) {
    this.staffApi.getStaffByCarWashId(id).subscribe((data:Staff[]) => {
      this.staffList = data;
    });
  }
  getCarWashById(id: number) {
    this.carWashApi.getCarWashById(id)
      .subscribe((response:Carwash) => {
        this.carwashData = response;

      });

  }
  getServicesByCarWashId(id:number){
    this.serviceApi.getServiceByCarWashId(id).subscribe((data:Service[])=>{
      this.serviceList = data;
    })
  }
  getCommentByCarWashId(id:number){
    this.commentApi.getCommentByCarWashId(id).subscribe((data:Comment[])=>{
      this.commentList = data;
      this.generalCalification(data);
    })
  }
  generalCalification(data:Comment[]){
    for (let n of data) {
      this.suma += n.qualification;
    }
    this.carwashData.qualification=this.suma/data.length;
    this.result=this.suma/data.length
    this.carwashData.qualification= parseFloat(this.result.toFixed(2));
    this.totalComments=data.length;

  }

}
