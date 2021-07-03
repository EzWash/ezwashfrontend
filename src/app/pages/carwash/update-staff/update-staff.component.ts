import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm, Validators} from "@angular/forms";
import {Staff} from "../../../model/accounts/staff";
import {CarwashstaffService} from "../../../service/accounts/carwash/carwashstaff-api.service";
import {StaffService} from "../../../service/accounts/staff/staff-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../service/token-storage.service";
import {Service} from "../../../model/business/service";
import {UpdateDone} from "../home-car-wash/home-car-wash.component";
import {MatDialog} from "@angular/material/dialog";

interface Gender {
  name: string;
  sound: string;
}
@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css']
})
export class UpdateStaffComponent implements OnInit {
  @ViewChild('staffForm',{static:false})
  staffForm!:NgForm;
  staffID!:number
  staffData:Staff={} as Staff
  staffList:Staff[]=[]
  isEditMode=false
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(public dialog:MatDialog, private carwashstaffService:CarwashstaffService,private staffApi: StaffService, private router:Router,private route:ActivatedRoute, private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.staffID=Number(this.route.params.subscribe(params=>{
      if(params.id){
        const id=params.id;
        console.log(id);
      }
    }))
  }

  updateStaff(idStaff:number):void{
    this.staffApi.updateStaffById(this.tokenStorageService.getUser().id,idStaff,this.staffData).subscribe((response:Staff)=>{
      console.log(response)
      this.openDialogUpdate();
    });
  }
  openDialogUpdate() {
    const d= this.dialog.open(UpdateDone);
    d.afterClosed().subscribe(result =>{
      window.location.reload();
    })
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
  genderControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  genders: Gender[] = [
    {name: 'M', sound: ''},
    {name: 'F', sound: ''},
    {name: 'O', sound: ''}
  ];
}
