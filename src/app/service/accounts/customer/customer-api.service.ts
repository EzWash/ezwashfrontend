import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {Customer} from "../../../model/accounts/customer";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  basePath='http://ec2-54-173-107-141.compute-1.amazonaws.com:8080/api/customers'
  httpOptions={headers: new HttpHeaders({'Content-Type':'application/json'})}
  constructor(private http:HttpClient) {}
  //API Error Handling
  handleError(error: HttpErrorResponse): Observable<never>{
    if(error.error instanceof ErrorEvent){
      console.log('An error ocurred: ', error.error.message);
    }
    else{
      console.log('Backend returned code ${error.status}, body was: ${error.error}')
    }
    return throwError('Something happened with request, please try again later')
  }

  //Create Customer
  createCustomer (item:any ):Observable<Customer>{
    return this.http.post<Customer>(this.basePath,JSON.stringify(item),
      this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }

  //Update Customer
  updateCustomer(id: number, item:Customer): Observable<any>{
    return this.http.put<Customer>(`${this.basePath}/${id}`,JSON.stringify(item),this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
}
