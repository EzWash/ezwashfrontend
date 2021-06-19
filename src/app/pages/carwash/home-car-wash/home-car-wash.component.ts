import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from "@angular/cdk/scrolling";
import {NgForm} from "@angular/forms";
import {Staff,TodoListResponse} from "../../../model/accounts/staff";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StaffService} from "../../../service/accounts/staff/staff.service";
import {Router} from "@angular/router";
import {CarwashService} from "../../../service/accounts/carwash/carwash.service";
import {BehaviorSubject, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";

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
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['first_name'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isEditMode = false;
  isFiltering = false;

  private todoSubject = new BehaviorSubject<Staff[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private staffApi: StaffService, private router: Router) {
    this.staffData = {} as Staff;
  }
  ngOnInit(): void {
    this.getAllStaff();

  }
  getAllStaff(): void {
    this.staffApi.getStaffByCarWashId(1).subscribe((response: any) => {
      this.dataSource.data = response;
    });
    console.log(this.staffApi.getStaffByCarWashId(1).subscribe((response: any) => {
      this.dataSource.data = response;
    }))
  }

}
