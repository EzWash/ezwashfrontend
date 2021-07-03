import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Service} from "../../../model/business/service";
import {ServiceApiService} from "../../../service/business/service/service-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateDone} from "../home-car-wash/home-car-wash.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {
  @ViewChild('serviceForm',{static:false})
  serviceForm!:NgForm
  serviceID!:number
  serviceData:Service={} as Service
  isEditMode=false
  constructor(public dialog:MatDialog, private serviceApi:ServiceApiService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.serviceID=Number(this.route.params.subscribe(params=>{
      if(params.id){
        const id=params.id;
        console.log(id);
      }
    }))
  }
  openDialogUpdate() {
    const d= this.dialog.open(UpdateDone);
    d.afterClosed().subscribe(result =>{
      window.location.reload();
    })
  }
  updateService(idService:number):void{
    this.serviceApi.updateService(idService,this.serviceData).subscribe((response:Service)=>{
      this.openDialogUpdate();
    });
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.serviceForm.resetForm();
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
