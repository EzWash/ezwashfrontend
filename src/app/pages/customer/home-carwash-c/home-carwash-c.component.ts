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
import {ServiceApiService} from "../../../service/business/service/service-api.service";
import {CommentApiService} from "../../../service/business/comment/comment-api.service";
import {CustomerService} from "../../../service/accounts/customer/customer-api.service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterStaffComponent} from "../../carwash/register-staff/register-staff.component";
import {RegisterServiceComponent} from "../../carwash/register-service/register-service.component";
import {UpdateServiceComponent} from "../../carwash/update-service/update-service.component";
import {TokenStorageService} from "../../../service/token-storage.service";
import {CartsApiService} from "../../../service/business/carts/carts-api.service";
import {ContractApiService} from "../../../service/business/contract/contract-api.service";
import {Contract} from "../../../model/business/contract";
import {CommentsComponent} from "../comments/comments.component";


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
  posibleId:number;
  star1:number=0;
  star2:number=0;
  star3:number=0;
  star4:number=0;
  star5:number=0;
  contractData: Contract={} as Contract;
  constructor( private contractApi:ContractApiService, private cartApi: CartsApiService, private carwashStaffApi:CarwashstaffService, private staffApi: StaffService, private router: Router,
              private carWashApi: CarwashService,private serviceApi:ServiceApiService,
              private commentApi:CommentApiService,private customerApi: CustomerService,public dialog: MatDialog, public tokenServiceApi: TokenStorageService) {
    this.posibleId = this.tokenServiceApi.getUser().id;
  }

  ngOnInit(): void {


  }

  handleSaveButton(index: number): void{
    const button_heart = document.getElementById(index.toString())
    if (button_heart != null) {


      if (button_heart.textContent === "favorite") {

        this.cartApi.addServiceToCart( this.tokenServiceApi.getUser().id, this.serviceList[index].id).subscribe((res: any) => {

          button_heart.innerText = "check_circle";
        })
      } else {
        this.cartApi.deleteCart(this.tokenServiceApi.getUser().id, this.serviceList[index].id).subscribe((res: any) => {
          button_heart.innerText = "favorite";

        })
      }
    }
  }
  updateCarWashQualification(idCarWash:number,qualification:number):void{
    this.carWashApi.updateCarWashQualification(idCarWash,this.carwashData).subscribe((response:Carwash)=>{
      response.qualification=qualification;
      console.log(response)
    });
  }
  openDialogComment(id:number){
    const dialogRef = this.dialog.open(CommentsComponent);

    dialogRef.afterClosed().subscribe(result => {
      dialogRef.componentInstance.createComment(id)
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
      console.log(data)
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

  createContract(){
    console.log(this.carwashData.id)
    this.contractApi.createContract(this.tokenServiceApi.getUser().id,this.carwashData.id).subscribe((data:Contract)=>{
      this.contractData=data;
    })
    this.contractApi.setListService(this.contractData.id,this.tokenServiceApi.getUser().id);
  }
}
