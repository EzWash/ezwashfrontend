import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryContractsComponent } from './pages/customer/history-contracts/history-contracts.component';
import { RegisterCarWashComponent } from './pages/carwash/register-car-wash/register-car-wash.component';
import { HomeCustomerComponent } from './pages/customer/home-customer/home-customer.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FavoriteCarwashesComponent} from './pages/customer/favorite-carwashes/favorite-carwashes.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CarwashService } from './service/accounts/carwash/carwash-api.service';
import { CarwashstaffService } from './service/accounts/carwash/carwashstaff-api.service';
import { RegisterCustomerComponent } from './pages/customer/register-customer/register-customer.component';
import { AppRoutingModule} from "./app-routing.module";
import { MatSortModule} from "@angular/material/sort";
import { MatTableModule} from "@angular/material/table";
import { MatPaginatorModule} from "@angular/material/paginator";
import { MatInputModule} from "@angular/material/input";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatGridListModule} from "@angular/material/grid-list";
import { MatCardModule} from "@angular/material/card";
import { MatToolbarModule} from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { MatButtonModule} from "@angular/material/button";
import { MatIconModule} from "@angular/material/icon";
import { HomeCarWashComponent} from "./pages/carwash/home-car-wash/home-car-wash.component";
import { RegisterCarClientComponent} from "./pages/customer/register-car-client/register-car-client.component";
import { ScrollingModule} from "@angular/cdk/scrolling";
import { RegisterServiceComponent } from './pages/carwash/register-service/register-service.component';
import { RegisterStaffComponent } from './pages/carwash/register-staff/register-staff.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { LoginUsersComponent } from './pages/login/login-users/login-users.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { UpdateServiceComponent } from './pages/carwash/update-service/update-service.component';
import { ListVehiclesComponent } from './pages/customer/list-vehicles/list-vehicles.component';
import { ListFavCarWashesComponent } from './pages/customer/list-fav-car-washes/list-fav-car-washes.component';
import {authInterceptorProviders} from './helpers/auth-interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { HomeCarwashCComponent } from './pages/customer/home-carwash-c/home-carwash-c.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { UpdateCarwashComponent } from './pages/carwash/update-carwash/update-carwash.component';
import { RegisterReportComponent } from './pages/customer/register-report/register-report.component';
import { RateServiceComponent } from './pages/customer/rate-service/rate-service.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterCarWashComponent,
    HomeCustomerComponent,
    FavoriteCarwashesComponent,
    NotFoundComponent,
    RegisterCustomerComponent,
    HomeCarWashComponent,
    RegisterCarClientComponent,
    HistoryContractsComponent,
    RegisterServiceComponent,
    RegisterStaffComponent,
    UpdateServiceComponent,
    ListVehiclesComponent,
    ListFavCarWashesComponent,
    LoginUsersComponent,
    HomeCarwashCComponent,
    UpdateCarwashComponent,
    RegisterReportComponent,
    RateServiceComponent


  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
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
        MatSliderModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatMenuModule,
        MatDialogModule,
        MatTooltipModule
    ],

  providers: [
    CarwashService,
    CarwashstaffService,
    MatDatepickerModule,
    CarwashService,
    ScrollingModule,
    CarwashstaffService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
