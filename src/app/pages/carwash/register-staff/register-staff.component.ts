import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm, Validators} from "@angular/forms";
import {Staff} from "../../../model/accounts/staff";
import {CarwashstaffService} from "../../../service/accounts/carwash/carwashstaff-api.service";
import {ActivatedRoute,Router} from "@angular/router";
import {StaffService} from "../../../service/accounts/staff/staff-api.service";
import {TokenStorageService} from "../../../service/token-storage.service";

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
  staffList:Staff[]=[]
  isEditMode=false
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private carwashstaffService:CarwashstaffService,private staffApi: StaffService, private router:Router,private route:ActivatedRoute, private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.staffID=Number(this.route.params.subscribe(params=>{
      if(params.id){
        const id=params.id;
        console.log(id);
      }
    }))
  }
  navigateToHomeCarWashPage(): void{
    this.router.navigate(['/home-carwash'])
      .then(()=>console.log(this.route.url))
  }
  createStaff():void{
    const newStaff={email:this.staffData.email,gender:this.staffData.gender,first_name:this.staffData.first_name,last_name:this.staffData.last_name,phone_number:this.staffData.phone_number}
    this.carwashstaffService.createEmployee(newStaff,this.tokenStorageService.getUser().id).subscribe(()=>{} )
  }
  onSubmit():void{
    if(this.staffForm.form.valid){
      console.log(this.staffData);
      if(this.isEditMode){
        console.log('Actualizando')
      }else{

      }
    }else{
      console.log('Invalid Data')
    }
  }

}
