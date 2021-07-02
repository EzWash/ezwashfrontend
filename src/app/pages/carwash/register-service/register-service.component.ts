import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Service} from "../../../model/business/service";
import {ServiceService} from "../../../service/business/service/service.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  constructor(private serviceApi:ServiceService,private router:Router,private route:ActivatedRoute) { }

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
    this.serviceApi.createServiceCarWash(1,newService).subscribe(()=>{})
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
