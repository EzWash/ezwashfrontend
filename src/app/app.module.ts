import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CarwashService} from './service/accounts/carwash/carwash.service';
import { CarwashstaffService } from './service/accounts/carwash/carwashstaff.service';
import { RegisterCustomerComponent } from './pages/customer/register-customer/register-customer.component';
import {AppRoutingModule} from "./app-routing.module";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import {HomeCarWashComponent} from "./pages/carwash/home-car-wash/home-car-wash.component";
import {RegisterCarClientComponent} from "./pages/customer/register-car-client/register-car-client.component";
import {ScrollingModule} from "@angular/cdk/scrolling";


@NgModule({
  declarations: [
    AppComponent,
    RegisterCustomerComponent,
    HomeCarWashComponent,
    RegisterCarClientComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ScrollingModule
  ],
  providers: [
    CarwashService,

    CarwashstaffService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
