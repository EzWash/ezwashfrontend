import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Staff} from "../../../model/accounts/staff";
import {CarwashstaffService} from "../../../service/accounts/carwash/carwashstaff-api.service";
import {ActivatedRoute,Router} from "@angular/router";

@Component({
  selector: 'app-register-staff',
  templateUrl: './register-staff.component.html',
  styleUrls: ['./register-staff.component.css']
})
export class RegisterStaffComponent implements OnInit {
  @ViewChild('staffForm',{static:false})
  staffForm!:NgForm;
  staffID!:number
  staffData:Staff={} as Staff
  isEditMode=false
  constructor(private staffApi:CarwashstaffService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.staffID=Number(this.route.params.subscribe(params=>{
      if(params.id){
        const id=params.id;
        console.log(id);
      }
    }))
  }
  navigateToHome(): void{
    console.log('Good');
  }
  createStaff():void{
    const newStaff={email:this.staffData.email,gender:this.staffData.gender,first_name:this.staffData.first_name,last_name:this.staffData.last_name,phone_number:this.staffData.phone_number}
    this.staffApi.createEmployee(newStaff,1).subscribe(()=>{this.navigateToHome()})
  }
  onSubmit():void{
    if(this.staffForm.form.valid){
      console.log(this.staffData);
      if(this.isEditMode){
        console.log('Actualizando')
      }else{
        this.createStaff()
      }
    }else{
      console.log('Invalid Data')
    }
  }

}
