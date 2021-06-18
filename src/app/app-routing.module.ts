import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterCustomerComponent} from "./pages/register-customer/register-customer.component";
import {RegisterCarClientComponent} from "./pages/register-car-client/register-car-client.component";


const routes: Routes = [
  {path: 'registerCustomer',component:RegisterCustomerComponent},
  {path:'registerCarCustomer',component:RegisterCarClientComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
