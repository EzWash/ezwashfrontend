import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Customer} from "../../../model/accounts/customer";
import {CustomerService} from "../../../service/accounts/customer/customer-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {
  @ViewChild('customerForm',{static:false})
  customerForm!: NgForm;
  customerID!: number
  customerData: Customer = {} as Customer
  isEditMode  =false
  constructor(private customerApi: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.customerID = Number(this.route.params.subscribe(params =>{
      if (params.id){
        const id = params.id;
        console.log (id);
      }
    }))

  }

    navigateToHome(): void{
      this.router.navigate(['/registerCarCustomer'])
        .then(()=>console.log(this.route.url))
    }

  createCustomer(): void{
    const newCustomer = {first_name: this.customerData.first_name,last_name:this.customerData.last_name,
      email:this.customerData.email,phone_number:this.customerData.phone_number,
      gender:this.customerData.gender,location:this.customerData.location,
      username:this.customerData.username, password:this.customerData.password}
    this.customerApi.createCustomer(newCustomer).subscribe(()=>{this.navigateToHome()})
  }

  onSubmit(): void{
    if (this.customerForm.form.valid){
      console.log(this.customerData);
      if (this.isEditMode){
        console.log('Actualizando')
      }else{
        this.createCustomer()
      }
    }else{
      console.log('Invalid Data')
    }
  }
}
