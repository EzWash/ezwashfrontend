import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Service} from "../../../model/business/service";
import {ServiceApiService} from "../../../service/business/service/service-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../service/token-storage.service";
import {AddDone, UpdateDone} from "../home-car-wash/home-car-wash.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register-service',
  templateUrl: './register-service.component.html',
  styleUrls: ['./register-service.component.css']
})
export class RegisterServiceComponent implements OnInit {
  @ViewChild('serviceForm',{static:false})
  serviceForm!:NgForm
  serviceID!:number
  serviceData:Service={} as Service
  isEditMode=false
  constructor(public dialog:MatDialog, private tokenStorageService: TokenStorageService, private serviceApi:ServiceApiService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.serviceID=Number(this.route.params.subscribe(params=>{
      if(params.id){
        const id=params.id;
        console.log(id);
      }
    }))
  }
  navigateToPageHome():void{
    this.router.navigate(['/home-page-car-wash'])
      .then(()=>console.log(this.route.url))
  }
  createService():void{
    const newService={name:this.serviceData.name,description:this.serviceData.description,is_promotion:this.serviceData.is_promotion,price:this.serviceData.price,details:this.serviceData.details}
    this.serviceApi.createServiceCarWash(this.tokenStorageService.getUser().id,newService).subscribe(()=>{
      this.openDialogAdd();
    })
  }
  openDialogAdd() {
    const d= this.dialog.open(AddDone);
    d.afterClosed().subscribe(result =>{
      window.location.reload();
    })
  }
  onSubmit():void{
    if(this.serviceForm.form.valid){
      console.log(this.serviceData);
      if(this.isEditMode){
        console.log('Actualizando')
      }else{

      }
    }else{
      console.log('Invalid Data')
    }
  }

}
