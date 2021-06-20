import { Component, Input, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Carwash} from 'src/app/model/accounts/carwash';
import {Location} from 'src/app/model/geographic/location';
import {CarwashService} from 'src/app/service/accounts/carwash/carwash-api.service';
import {LocationService} from 'src/app/service/geographic/location.service';
import {ConfirmedValidator} from './confirmed.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-car-wash',
  templateUrl: './register-car-wash.component.html',
  styleUrls: ['./register-car-wash.component.css']
})
export class RegisterCarWashComponent implements OnInit {
  hide = true;
  hide_confirm = true;
  registerForm: FormGroup;
  newCarwash: Carwash;
  strongPasswordPattern: string = "(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$";
  onlyLetterPattern: string = "^[a-zA-Z_ ]*$";
  wordsAndNumberPattern: string = "^[a-zA-Z0-9_ ]*$";
  phoneNumbersPattern: string = "^9[0-9]{8}";
  rucPattern: string = "[0-9]{11}";
  location: Location;
  date: Date;
  onChange = (_: any) => {};

  constructor(private formBuilder: FormBuilder,
              private carwashApi: CarwashService,
              private locationApi: LocationService,
              private router: Router){
    this.date = new Date();
    this.location = {} as Location;
    this.newCarwash = {} as Carwash;
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(this.wordsAndNumberPattern)]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.pattern(this.strongPasswordPattern)]],
      confirm_password: [null, Validators.required],
      ruc: [null, [Validators.required, Validators.pattern(this.rucPattern)]],
      description: [null, [Validators.required, Validators.maxLength(150)]],
      name_owner: [null, [Validators.required, Validators.pattern(this.onlyLetterPattern)]],
      phone_number: [null, [Validators.required, Validators.pattern(this.phoneNumbersPattern)]],
      birth_date: [null, [Validators.required]],
      location: [null, Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  ngOnInit(): void {
  }

  @Input()
  get value(): number[]{
    const address = this.registerForm.value;
    this.location.address = address.location;
    return []
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void{
    this.onChange(this.value);
  }

  createLocation(){
    this.locationApi.createLocation(this.location).subscribe((res: Location) =>{
        this.newCarwash.location_id = res.id;
        this.carwashApi.createCarwash(this.newCarwash).subscribe((res: Carwash) =>{
            this.router.navigate(['/login']);
        })
    })
  }

  onSubmit(){
    let formatDate = this.date.toISOString().match("[0-9]{4}-[0-9]{2}-[0-9]{2}")?.pop();
    this.newCarwash.birth_date = formatDate;
    this.locationApi.getGeoLocation(this.location.address).subscribe(res => {
        this.location.lattitude = res.results[0].geometry.location.lat;
        this.location.longitude = res.results[0].geometry.location.lng;
        this.createLocation();
    })
  }

}
