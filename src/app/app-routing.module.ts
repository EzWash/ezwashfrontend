import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterCustomerComponent} from "./pages/customer/register-customer/register-customer.component";
import {RegisterCarClientComponent} from "./pages/customer/register-car-client/register-car-client.component";
import {HomeCarWashComponent} from "./pages/carwash/home-car-wash/home-car-wash.component";
import {HistoryContractsComponent} from "./pages/carwash/history-contracts/history-contracts.component";


const routes: Routes = [
  {path: 'registerCustomer',component:RegisterCustomerComponent},
  {path:'registerCarCustomer', component:RegisterCarClientComponent},
  {path: 'homePageCarWash',component:HomeCarWashComponent},
  {path: 'historyContracts', component:HistoryContractsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
