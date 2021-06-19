import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CarwashService} from './service/accounts/carwash/carwash.service';
import { CarwashstaffService } from './service/accounts/carwash/carwashstaff.service';
import { HistoryContractsComponent } from './pages/carwash/history-contracts/history-contracts.component';
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    HistoryContractsComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatGridListModule
    ],
  providers: [
    CarwashService,
    CarwashstaffService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
