import {Component, HostListener, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../../model/accounts/customer";
import {CustomerService} from "../../../service/accounts/customer/customer-api.service";
import {Router} from "@angular/router";
import {Location} from 'src/app/model/geographic/location';
import {LocationApiService} from 'src/app/service/geographic/location-api.service';
import {ConfirmedValidator} from '../../carwash/register-car-wash/confirmed.validator';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {
  hide = true;
  hide_confirm = true;
  registerForm: FormGroup;
  newCustomer: Customer;
  strongPasswordPattern: string = "(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$";
  onlyLetterPattern: string = "^[a-zA-Z_ ]*$";
  wordsAndNumberPattern: string = "^[a-zA-Z0-9_ ]*$";
  phoneNumbersPattern: string = "^9[0-9]{8}";
  date: Date;
  location: Location;
  innerWidth: number = 0;
  onChange = (_: any) => {};
  lessThan800: boolean = false;

  constructor(private customerApi: CustomerService,
              private router: Router,
              private formBuilder: FormBuilder,
              private locationApi: LocationApiService) {
    this.date = new Date();
    this.location = {} as Location;
    this.newCustomer = {} as Customer;
    this.registerForm = this.formBuilder.group({
      first_name: [null, [Validators.required, Validators.pattern(this.onlyLetterPattern)]],
      last_name: [null, [Validators.required, Validators.pattern(this.onlyLetterPattern)]],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.required, Validators.pattern(this.phoneNumbersPattern)]],
      gender: [null, [Validators.required]],
      birth_date: [null, [Validators.required]],
      location: [null, Validators.required],
      password: [null, [Validators.required, Validators.pattern(this.strongPasswordPattern)]],
      confirm_password: [null, Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 800){
      this.lessThan800 = true;
    }else{
      this.lessThan800 = false;
    }
  }


  @Input()
  get value(): number[]{
    const address = this.registerForm.value;
    this.location.address = address.location;
    return [];
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void{
    this.onChange(this.value);
  }

  createLocation(){
    this.locationApi.createLocation(this.location).subscribe((res: Location) => {
      this.newCustomer.location = res.id;
      console.log(this.newCustomer);
      this.customerApi.createCustomer(this.newCustomer).subscribe((res: Customer)=>{
        this.router.navigate(['/login']);
      })
    })
  }

  onSubmit(){
    let formatDate = this.date.toISOString().match("[0-9]{4}-[0-9]{2}-[0-9]{2}")?.pop();
    this.newCustomer.birth_date = formatDate;
    this.locationApi.getGeoLocation(this.location.address).subscribe((res: any) => {
        this.location.lattitude = res.results[0].geometry.location.lat;
        this.location.longitude = res.results[0].geometry.location.lng;
        this.createLocation();
    }, error => {

      console.log("No existe tal ubicación");
    });
  }
}
