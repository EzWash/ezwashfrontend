import { Component, OnInit } from '@angular/core';
import {Staff} from "../../../model/accounts/staff";
import {Carwash} from "../../../model/accounts/carwash";
import {Service} from "../../../model/business/service";
import {Comment} from "../../../model/business/comment";
import {Customer} from "../../../model/accounts/customer";
import {CarwashstaffService} from "../../../service/accounts/carwash/carwashstaff-api.service";
import {StaffService} from "../../../service/accounts/staff/staff-api.service";
import {Router} from "@angular/router";
import {CarwashService} from "../../../service/accounts/carwash/carwash-api.service";
import {ServiceService} from "../../../service/business/service/service.service";
import {CommentApiService} from "../../../service/business/comment/comment-api.service";
import {CustomerService} from "../../../service/accounts/customer/customer-api.service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterStaffComponent} from "../../carwash/register-staff/register-staff.component";
import {RegisterServiceComponent} from "../../carwash/register-service/register-service.component";
import {UpdateServiceComponent} from "../../carwash/update-service/update-service.component";
import {TokenStorageService} from "../../../service/token-storage.service";


@Component({
  selector: 'app-home-carwash-c',
  templateUrl: './home-carwash-c.component.html',
  styleUrls: ['./home-carwash-c.component.css']
})
export class HomeCarwashCComponent implements OnInit {
  staffList : Staff[]=[];
  carwashData: Carwash={}as Carwash;
  serviceList : Service[]=[];
  commentList: Comment[]=[];
  customerList: Customer[]=[];
  n:number=7;
  suma:number=0;
  result:number=0;
  totalComments:number=0;
  star1:number=0;
  star2:number=0;
  star3:number=0;
  star4:number=0;
  star5:number=0;
  constructor(private carwashStaffApi:CarwashstaffService, private staffApi: StaffService, private router: Router,
              private carWashApi: CarwashService,private serviceApi:ServiceService,
              private commentApi:CommentApiService,private customerApi: CustomerService,public dialog: MatDialog, public tokenServiceApi: TokenStorageService) {

  }

  ngOnInit(): void {
    console.log(this.n)
    this.getServicesByCarWashId(this.n);
    this.getAllStaff(this.n);
    this.getCarWashById(this.n);
    this.getCommentByCarWashId(this.n);

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



  updateCarWashQualification(idCarWash:number,qualification:number):void{
    this.carWashApi.updateCarWashQualification(idCarWash,this.carwashData).subscribe((response:Carwash)=>{
      response.qualification=qualification;
      console.log(response)
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
    this.suma=0
    for (let n of data) {
      this.suma += n.qualification;
    }
    this.result=this.suma/data.length;
    this.result= parseFloat(this.result.toFixed(2));
    this.totalComments=data.length;
    this.updateCarWashQualification(1 ,this.result);
    this.getInformationStar(data);
  }
  getInformationStar(data:Comment[]){
    for (let n of data){
      if ( n.qualification==1){this.star1+=1;}
      if ( n.qualification==2){this.star2+=1;}
      if (n.qualification==3){this.star3+=1;}
      if (n.qualification==4){this.star4+=1;}
      if (n.qualification==5){this.star5+=1;}
      console.log(n.carwash_id);
    }
  }

}
