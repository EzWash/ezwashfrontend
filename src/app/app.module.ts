import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarwashComponent } from './component/accounts/carwash/carwash.component';
import { CustomerComponent } from './component/accounts/customer/customer.component';
import { StaffComponent } from './component/accounts/staff/staff.component';
import { CommentComponent } from './component/business/comment/comment.component';
import { ContractComponent } from './component/business/contract/contract.component';
import { ReportComponent } from './component/business/report/report.component';
import { ServiceComponent } from './component/business/service/service.component';
import { LocationComponent } from './component/geographic/location/location.component';
import { CardComponent } from './component/interactions/card/card.component';
import { CardcarwashComponent } from './component/interactions/cardcarwash/cardcarwash.component';
import { CarduserComponent } from './component/interactions/carduser/carduser.component';
import { VehicleComponent } from './component/interactions/vehicle/vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    CarwashComponent,
    CustomerComponent,
    StaffComponent,
    CommentComponent,
    ContractComponent,
    ReportComponent,
    ServiceComponent,
    LocationComponent,
    CardComponent,
    CardcarwashComponent,
    CarduserComponent,
    VehicleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
