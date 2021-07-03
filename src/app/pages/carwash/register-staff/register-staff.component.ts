import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm, Validators} from "@angular/forms";
import {Staff} from "../../../model/accounts/staff";
import {CarwashstaffService} from "../../../service/accounts/carwash/carwashstaff-api.service";
import {ActivatedRoute,Router} from "@angular/router";
import {StaffService} from "../../../service/accounts/staff/staff-api.service";
import {TokenStorageService} from "../../../service/token-storage.service";
import {AddDone, UpdateDone} from "../home-car-wash/home-car-wash.component";
import {MatDialog} from "@angular/material/dialog";

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-register-staff',
  templateUrl: './register-staff.component.html',
  styleUrls: ['./register-staff.component.css']
})
export class RegisterStaffComponent implements OnInit {
  @ViewChild('staffForm',{static:false})
  staffForm!:NgForm;
  staffID!:number;
  staffData:Staff={} as Staff
  staffList:Staff[]=[]
  isEditMode=false
  selected = 'Masculino';
  email = new FormControl('', [Validators.required, Validators.email]);
  gender = new FormControl('', [Validators.required, Validators.required]);
  constructor(public dialog: MatDialog,private carwashstaffService:CarwashstaffService,private staffApi: StaffService, private router:Router,private route:ActivatedRoute, private tokenStorageService:TokenStorageService) { }

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
    this.carwashstaffService.createEmployee(newStaff,this.tokenStorageService.getUser().id).subscribe((res:Staff)=>{
      console.log(res)
      this.openDialogAdd();
    } )
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
  openDialogAdd() {
    const d= this.dialog.open(AddDone);
    d.afterClosed().subscribe(result =>{
      window.location.reload();
    })
  }
  genderControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  genders: Animal[] = [
    {name: 'M', sound: ''},
    {name: 'F', sound: ''},
    {name: 'O', sound: ''}
  ];
}
