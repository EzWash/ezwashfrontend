import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterCarWashComponent} from './pages/carwash/register-car-wash/register-car-wash.component';


const routes: Routes = [
  { path: 'registerCarwash', component: RegisterCarWashComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
