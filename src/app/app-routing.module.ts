import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterCarWashComponent} from './pages/carwash/register-car-wash/register-car-wash.component';
import {FavoriteCarwashesComponent} from './pages/customer/favorite-carwashes/favorite-carwashes.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {RegisterCustomerComponent} from "./pages/customer/register-customer/register-customer.component";
import {RegisterCarClientComponent} from "./pages/customer/register-car-client/register-car-client.component";
import {HomeCarWashComponent} from "./pages/carwash/home-car-wash/home-car-wash.component";
import {RegisterServiceComponent} from "./pages/carwash/register-service/register-service.component";
import {RegisterStaffComponent} from "./pages/carwash/register-staff/register-staff.component";
import {LoginUsersComponent} from "./pages/login/login-users/login-users.component";
import {HistoryContractsComponent} from "./pages/customer/history-contracts/history-contracts.component";
import {UpdateServiceComponent} from "./pages/carwash/update-service/update-service.component";
import {ListFavCarWashesComponent} from "./pages/customer/list-fav-car-washes/list-fav-car-washes.component";
import {ListVehiclesComponent} from "./pages/customer/list-vehicles/list-vehicles.component";


const routes: Routes = [
  { path: 'register-carwash', component: RegisterCarWashComponent },
  {path:'login',component:LoginUsersComponent},
  { path: 'favorite-carwashes', component: FavoriteCarwashesComponent },
  { path: 'registerCustomer',component:RegisterCustomerComponent},
  { path:'registerCarCustomer', component:RegisterCarClientComponent},
  { path: 'homePageCarWash',component:HomeCarWashComponent},
  { path:'registerService',component:RegisterServiceComponent},
  { path: 'registerStaff',component:RegisterStaffComponent},
  { path:'updateService',component:UpdateServiceComponent},
  {path: 'historyContracts', component:HistoryContractsComponent},
  {path: 'listFavCarWashes', component:ListFavCarWashesComponent},
  {path: 'listVehicles', component:ListVehiclesComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
