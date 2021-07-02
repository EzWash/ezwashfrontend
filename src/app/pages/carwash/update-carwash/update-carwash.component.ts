import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Carwash} from "../../../model/accounts/carwash";
import {CarwashService} from "../../../service/accounts/carwash/carwash-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../../model/business/service";

@Component({
  selector: 'app-update-carwash',
  templateUrl: './update-carwash.component.html',
  styleUrls: ['./update-carwash.component.css']
})
export class UpdateCarwashComponent implements OnInit {
  @ViewChild('updateCarWashForm',{static:false})
  updateCarWashForm!:NgForm
  carwashID!:number
  carwashData:Carwash={} as Carwash
  isEditMode=false

  constructor(private carWashApi:CarwashService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.carwashID=Number(this.route.params.subscribe(params=>{
      if(params.id){
        const id=params.id;
        console.log(id);
      }
    }))
  }
  navigateToHome():void{
    console.log("CarWash actualizado")
  }
  updateCarWash(idCarWash:number):void{
    this.carWashApi.updateCarWash(idCarWash,this.carwashData).subscribe((response:Carwash)=>{
      console.log(response)
    });
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.updateCarWashForm.resetForm();
  }
  onSubmit():void{
    if(this.updateCarWashForm.form.valid){
      console.log(this.carwashData);
      if(this.isEditMode){
        console.log('Actualizando')
      }else{
        this.updateCarWash(this.carwashID)
      }
    }else{
      console.log('Invalid Data')
    }

  }
}
