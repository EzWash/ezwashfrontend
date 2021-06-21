
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



@Component({
  selector: 'app-home-car-wash',
  templateUrl: './home-car-wash.component.html',

  styleUrls: ['./home-car-wash.component.css'],

})

export class HomeCarWashComponent implements OnInit {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  staffList : Staff[]=[];
  carwashData: Carwash={}as Carwash;
  serviceList : Service[]=[];
  commentList: Comment[]=[];
  customerList: Customer[]=[];
  n:number=1;
  constructor(private staffApi: StaffService, private router: Router,
              private carWashApi: CarwashService,private serviceApi:ServiceService,
              private commentApi:CommentApiService,private customerApi: CustomerService,) {

  }

  ngOnInit(): void {
    this.getServicesByCarWashId(this.n);
    this.getAllStaff(this.n);
    this.getCarWashById(this.n);
    this.getCommentByCarWashId(this.n);
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
    })
    console.log(this.commentList[0])
  }
}
