import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Customer} from "../../../model/accounts/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomercarwashesService {
  basePathStart='http://localhost:8080/api/user'
  basePathEnd='/contracts'
  httpOptions={headers: new HttpHeaders({'Content-Type':'application/json'})}
  constructor(private http:HttpClient) { }
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

  //GET UserContract
  getUserContract (id:number):Observable<Customer>{
    return this.http.get<Customer>()
  }


}
