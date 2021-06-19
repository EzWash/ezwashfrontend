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
  constructor(private customerContractService: CustomercontractsService) {
    this.contractList = [];
  }

  ngOnInit(): void {
    this.getUserContracts(1) ;
  }

  getUserContracts(id: number){
    this.customerContractService.getUserContracts(id).subscribe(data =>{
      console.log(data)
      this.contractList = data;
    })
  }
}
