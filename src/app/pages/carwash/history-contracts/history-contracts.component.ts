import { Component, OnInit } from '@angular/core';
import {CustomercontractsService} from "../../../service/accounts/customer/customercontracts.service";
import {Contract} from "../../../model/business/contract";
import {ContractService} from "../../../service/business/contract/contract.service";
import {CarwashService} from "../../../service/accounts/carwash/carwash.service";
import {Carwash} from "../../../model/accounts/carwash";

@Component({
  selector: 'app-history-contracts',
  templateUrl: './history-contracts.component.html',
  styleUrls: ['./history-contracts.component.css']
})
export class HistoryContractsComponent implements OnInit {

  contractList: Contract[] = [];
  stateTitles: string;
  state: string;
  carWashAux: Carwash = {} as Carwash;
  constructor(private customerContractService: CustomercontractsService, private contractService: ContractService, private carWashService: CarwashService) {
    this.stateTitles = "Pendientes";
    this.state = "finalizados";

  }

  ngOnInit(): void {
    this.getContractsByState("finished", 1) ;
  }

  getUserContracts(id: number){
    this.customerContractService.getUserContracts(id).subscribe(data =>{
      console.log(data)
      this.contractList = data;
    })
  }

  getContractsByState(state: string, id: number){
    this.contractService.getContractsByState(state, id).subscribe(data =>{
      this.contractList = data;
    })
  }


  getContractsByStateNot(state: string, id: number){
    this.contractService.getContractsByStateNot(state, id).subscribe(data =>{
      this.contractList = data;
    })
  }

  getCarWashById(id:number){
    this.carWashService.getCarWashById(id).subscribe(data=> {
      this.carWashAux = data;
    })
  }
}
