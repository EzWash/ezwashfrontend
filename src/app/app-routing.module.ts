import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterCustomerComponent} from "./pages/register-customer/register-customer.component";
import {HomeCarWashComponent} from "./pages/home-car-wash/home-car-wash.component";


const routes: Routes = [
  {path: 'registerCustomer',component:RegisterCustomerComponent},
  {path:'homeCarWash',component:HomeCarWashComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
