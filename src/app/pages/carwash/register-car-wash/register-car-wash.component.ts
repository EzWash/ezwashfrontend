import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Carwash} from 'src/app/model/accounts/carwash';
import {CarwashService} from 'src/app/service/accounts/carwash/carwash-api.service';
import {ConfirmedValidator} from './confirmed.validator';

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
  onlyLetterPattern: string = "[a-zA-Z]*";
  phoneNumbersPattern: string = "^9[0-9]{8}";
  rucPattern: string = "[0-9]{11}";
  date: Date;

  constructor(private formBuilder: FormBuilder, private carwashApi: CarwashService) {
    this.date = new Date();
    this.newCarwash = {} as Carwash;
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
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

  onSubmit(){
    let formatDate = this.date.toISOString().match("[0-9]{4}-[0-9]{2}-[0-9]{2}")?.pop();
    this.newCarwash.birth_date = formatDate;
    this.newCarwash.location_id = 3;
    this.carwashApi.createCarwash(this.newCarwash).subscribe((res: Carwash) => {
      console.log(res);
    }).unsubscribe();
  }

}
