import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from 'src/app/model/geographic/location';
import {CarwashService} from 'src/app/service/accounts/carwash/carwash-api.service';
import {Carwash} from "../../../model/accounts/carwash";
import {TokenStorageService} from "../../../service/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {HomeCarwashCComponent} from "../home-carwash-c/home-carwash-c.component";
import {CustomercarwashesService} from "../../../service/accounts/customer/customercarwashes-api.service";
import {Customer} from "../../../model/accounts/customer";
import {LocationApiService} from 'src/app/service/geographic/location-api.service';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css']
})
export class HomeCustomerComponent implements OnInit {
  carwashList: Carwash[] = [];
  minDistance: number = 10;
  customerLocation: Location;
  searchString: string | null;
  dataCarWash: Carwash={} as Carwash;

  constructor(private locationApi: LocationApiService,
              private carwashApi: CarwashService,
              private tokenService: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute,
              private customerApi:CustomercarwashesService,
              public dialog: MatDialog) {
               this.customerLocation = {} as Location;
               this.searchString = null;
             }

  ngOnInit(): void {
    this.searchString = this.route.snapshot.paramMap.get('s');
    console.log(this.searchString);
    if(!!this.searchString)
      this.getCarWashByName();
    else
      this.getLocationByCustomer();
  }

  getLocationByCustomer() {
    this.locationApi.getLocationByCustomer(this.tokenService.getUser().id).subscribe((res: Location) =>{
      this.customerLocation = res;
      this.getNearCarwashes();
    })
  }

  getNearCarwashes(){
    this.carwashApi.getNearCarwashes(this.customerLocation.lattitude, this.customerLocation.longitude, this.minDistance).subscribe((res: any)=>{
      this.carwashList = res.content;
    })
  }

  getCarWashByName(){
    this.carwashApi.getCarWashByName(this.searchString).subscribe((res: any) => {
      console.log(res)
      this.carwashList = res.content;
    },error => {
      console.log("No se encontró");
    })
  }

  getAllCarWash() {
    this.carwashApi.getAllCarWash().subscribe((data: Carwash[]) => {
      this.carwashList = data;
    });
  }

  getCarWashById(id: number) {
    this.carwashApi.getCarWashById(this.carwashList[id].id).subscribe((data:Carwash)=>{
      this.dataCarWash=data;
      console.log(data);
    });
  }

  openDialogGetCarWashByid(idCarWash:number){
    const dialogRef = this.dialog.open(HomeCarwashCComponent);

    dialogRef.afterOpened().subscribe(result => {
      console.log(`Get CarWash result: ${result}`);
      dialogRef.componentInstance.getCarWashById(this.carwashList[idCarWash].id);
      dialogRef.componentInstance.getServicesByCarWashId(this.carwashList[idCarWash].id);
      dialogRef.componentInstance.getCommentByCarWashId(this.carwashList[idCarWash].id);
      this.ngOnInit();
    });
  }

  handleSaveButton(index: number): void{
    const button_heart = document.getElementById(index.toString())
    if (button_heart != null) {


      if (button_heart.textContent === "favorite") {

        this.customerApi.addUserCarWash(this.carwashList[index], this.tokenService.getUser().id, this.carwashList[index].id).subscribe((res: Customer) => {

          button_heart.innerText = "check_circle";
        })
      } else {
        this.customerApi.deleteUserCarWash(this.tokenService.getUser().id, this.carwashList[index].id).subscribe((res: any) => {
          button_heart.innerText = "favorite";

        })
      }
    }
  }
}
