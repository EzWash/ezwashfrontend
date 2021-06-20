import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterCarWashComponent} from './pages/carwash/register-car-wash/register-car-wash.component';
import {FavoriteCarwashesComponent} from './pages/customer/favorite-carwashes/favorite-carwashes.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';


const routes: Routes = [
  { path: 'register-carwash', component: RegisterCarWashComponent },
  { path: 'favorite-carwashes', component: FavoriteCarwashesComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
