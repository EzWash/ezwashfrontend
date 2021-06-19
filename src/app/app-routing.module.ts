import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {RegisterCustomerComponent} from "./pages/customer/register-customer/register-customer.component";
import {RegisterCarClientComponent} from "./pages/customer/register-car-client/register-car-client.component";
import {HomeCarWashComponent} from "./pages/carwash/home-car-wash/home-car-wash.component";
import {RegisterServiceComponent} from "./pages/carwash/register-service/register-service.component";
import {RegisterStaffComponent} from "./pages/carwash/register-staff/register-staff.component";
import {UpdateServiceComponent} from "./pages/carwash/update-service/update-service.component";





const routes: Routes = [
  {path: 'registerCustomer',component:RegisterCustomerComponent},
  {path:'registerCarCustomer', component:RegisterCarClientComponent},
  {path: 'homePageCarWash',component:HomeCarWashComponent},
  {path:'registerService',component:RegisterServiceComponent},
  {path: 'registerStaff',component:RegisterStaffComponent},
  {path:'updateService',component:UpdateServiceComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
