import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Service} from "../../../model/business/service";
import {ServiceService} from "../../../service/business/service/service.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  constructor(private serviceApi:ServiceService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.serviceID=Number(this.route.params.subscribe(params=>{
      if(params.id){
        const id=params.id;
        console.log(id);
      }
    }))
  }
  navigateToHome():void{
    console.log("Servicio actualizado")
  }
  updateService(idService:number):void{
    this.serviceApi.updateService(idService,this.serviceData).subscribe((response:Service)=>{
      console.log(response)
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
