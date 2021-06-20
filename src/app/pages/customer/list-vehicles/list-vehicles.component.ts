import { Component, OnInit } from '@angular/core';
import {Vehicle} from "../../../model/interactions/vehicle";
import {VehicleService} from "../../../service/interactions/vehicle/vehicle.service";

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.css']
})
export class ListVehiclesComponent implements OnInit {

  vehicleList: Vehicle[] = [];
  aux: any;
  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicleList(1);
  }

  getVehicleList(customerId: number) {
    this.vehicleService.getVehicleList(customerId).subscribe(data =>{
      this.vehicleList = data;
    })

  }

  deleteVehicle(vehicleId: number) {
    this.vehicleService.deleteVehicleById(vehicleId).subscribe(res => {});
  }

}
