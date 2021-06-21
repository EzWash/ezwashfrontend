import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Vehicle} from "../../../model/interactions/vehicle";
import {VehicleService} from "../../../service/interactions/vehicle/vehicle.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-register-car-client',
  templateUrl: './register-car-client.component.html',
  styleUrls: ['./register-car-client.component.css']
})


export class RegisterCarClientComponent implements OnInit {
  @ViewChild('vehicleForm',{static:false})
  vehicleForm!: NgForm;
  vehicleID!: number
  dataSource = new MatTableDataSource();
  vehicleData: Vehicle= {} as Vehicle
  isEditMode  =false
  constructor(private vehicleApi: VehicleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.vehicleID = Number(this.route.params.subscribe(params =>{
      if (params.id){
        const id = params.id;
        console.log (id);
      }
    }))

  }

  navigateToHome(): void{
    console.log('Ta bien');
  }

  createVehicle(): void{
    const newVehicle = {brand:this.vehicleData.brand,model:this.vehicleData.model,
      registration_plate:this.vehicleData.registration_plate,location_id: this.vehicleData.location_id}
    this.vehicleApi.createVehicle(1,newVehicle).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }

  onSubmit(): void{
    if (this.vehicleForm.form.valid){
      console.log(this.vehicleData);
      if (this.isEditMode){
        console.log('Actualizando')
      }else{
        this.createVehicle()
      }
    }else{
      console.log('Invalid Data')
    }
  }

}
