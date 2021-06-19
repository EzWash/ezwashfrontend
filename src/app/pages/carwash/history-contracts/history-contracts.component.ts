import { Component, OnInit } from '@angular/core';
import {CustomercontractsService} from "../../../service/accounts/customer/customercontracts.service";
import {Contract} from "../../../model/business/contract";

@Component({
  selector: 'app-history-contracts',
  templateUrl: './history-contracts.component.html',
  styleUrls: ['./history-contracts.component.css']
})
export class HistoryContractsComponent implements OnInit {

  contractList: Contract[];
  state: string;
  constructor(private customerContractService: CustomercontractsService) {
    this.contractList = [];
    this.state = "Pendientes";
  }

  ngOnInit(): void {
    this.getUserContracts(2) ;
  }

  getUserContracts(id: number){
    this.customerContractService.getUserContracts(id).subscribe(data =>{
      console.log(data)
      this.contractList = data;
    })
  }
}
