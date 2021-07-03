
import { Component, OnInit} from '@angular/core';

import {Staff} from "../../../model/accounts/staff";
import {StaffService} from "../../../service/accounts/staff/staff-api.service";
import {Router} from "@angular/router";
import {CarwashService} from "../../../service/accounts/carwash/carwash-api.service";
import {Carwash} from "../../../model/accounts/carwash";
import {ServiceApiService} from "../../../service/business/service/service-api.service";
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
import {UpdateStaffComponent} from "../update-staff/update-staff.component";
import {UpdateCarwashComponent} from "../update-carwash/update-carwash.component";

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
  deleted: Staff = {} as Staff;
  n:number=1;
  suma:number=0;
  result:number=0;
  totalComments:number=0;
  constructor(private carwashStaffApi:CarwashstaffService, private staffApi: StaffService, private router: Router,
              private carWashApi: CarwashService,private serviceApi:ServiceApiService,
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

    });
  }
  openDialogUpdateStaff(idStaff:number){
    const dialogRef = this.dialog.open(UpdateStaffComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Update Staff result: ${result}`);
      dialogRef.componentInstance.updateStaff(this.staffList[idStaff].id);

    });
  }

  openDialogUpdateCarWash(){
    const dialogRef = this.dialog.open(UpdateCarwashComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Update Staff result: ${result}`);
      dialogRef.componentInstance.updateCarWash(this.tokenStorageService.getUser().id);

    });
  }

  openDialogDelete() {
    const d= this.dialog.open(DeletedDone);
    d.afterClosed().subscribe(result =>{
      window.location.reload();
    })
  }

  deleteStaff(id:number){
    this.carwashStaffApi.deleteStaffById(this.staffList[id].id).subscribe(data=>{
      this.deleted = data;
      this.openDialogDelete();
    })
  }
  deleteService(id:number){
    this.serviceApi.deleteServiceById(this.serviceList[id].id).subscribe(data=>{
      this.deleted = data;
      this.openDialogDelete();
    })
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
    this.suma=0;
    for (let n of data) {
      this.suma += n.qualification;
    }

    this.carwashData.qualification=this.suma/data.length;
    this.result=this.suma/data.length
    this.carwashData.qualification= parseFloat(this.result.toFixed(2));
    this.totalComments=data.length;

  }

}
@Component({
  selector: 'delete-done',
  templateUrl: 'delete-done.html',
})
export class DeletedDone {}

@Component({
  selector: 'update-done',
  templateUrl: 'update-done.html',
})
export class UpdateDone {}

@Component({
  selector: 'add-done',
  templateUrl: 'add-done.html',
})
export class AddDone {}
