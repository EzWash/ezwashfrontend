import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Comment} from "../../../model/business/comment";
import {catchError, retry} from "rxjs/operators";
import {Service} from "../../../model/business/service";
import {Customer} from "../../../model/accounts/customer";

@Injectable({
  providedIn: 'root'
})
export class CartsApiService {
  basePath = "http://localhost:8080/api"
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse): Observable<never> {
    if(error.error instanceof ErrorEvent) {
      console.log("An error occurred: ",error.error.message);
    }else{
      console.log("Backend returned code ${error.status}, body was: ${error.error}");
    }
    return throwError("Something happened with request, please try again later.")
  }
  //Add Cart
  addServiceToCart(cartId:number,serviceId:number): Observable<any>{
    return this.http.post<any>(`${this.basePath}/carts/${cartId}/services/${serviceId}`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //Get Cart
  getCCart(cartId: number): Observable<Service[]>{
    return this.http.get<Service[]>(`${this.basePath}/customers/${cartId}/carts`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //deleteCart
  deleteCart (cartId:number,serviceId:number):Observable<Service>{
    return this.http.delete<Service>(`${this.basePath}/cart/${cartId}/services/${serviceId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
