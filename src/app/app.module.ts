import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CarwashService} from './service/accounts/carwash/carwash.service';
import { CarwashstaffService } from './service/accounts/carwash/carwashstaff.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    CarwashService,
    CarwashstaffService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
