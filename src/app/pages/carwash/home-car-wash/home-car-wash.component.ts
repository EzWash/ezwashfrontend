import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from "@angular/cdk/scrolling";
import {NgForm} from "@angular/forms";
import {Staff} from "../../../model/accounts/staff";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StaffService} from "../../../service/accounts/staff/staff.service";
import {Router} from "@angular/router";
import {CarwashService} from "../../../service/accounts/carwash/carwash.service";
import {BehaviorSubject, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {Carwash} from "../../../model/accounts/carwash";
export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(50, 250, 500);
  }
}

@Component({
  selector: 'app-home-car-wash',
  templateUrl: './home-car-wash.component.html',
  styleUrls: ['./home-car-wash.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}]
})

export class HomeCarWashComponent implements OnInit {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  @ViewChild('staffForm', { static: false }) staffForm!: NgForm;
  staffData: Staff;
  staffList : Staff[];
  carwashData: Carwash;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private staffApi: StaffService, private router: Router, private carWashApi: CarwashService) {
    this.staffData = {} as Staff;
    this.staffList =[];
    this.carwashData= {} as Carwash;
  }

  ngOnInit(): void {
    //this.getCarWashById(1);
    this.getAllStaff(1)
  }
  getAllStaff(id:number) {
    this.staffApi.getStaffByCarWashId(id).subscribe(response => {
      this.staffList = response;
    });
    console.log("Hola a todos")
    console.log(this.staffList[0].phone_number)
  }
  getCarWashById(id: number) {
    this.carWashApi.getCarWashById(id)
      .subscribe((response:Carwash) => {
        this.carwashData = response;

      });
    console.log(this.carwashData);
  }
}
