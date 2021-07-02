import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Customer} from "../../../model/accounts/customer";

import {catchError, retry} from "rxjs/operators";
// @ts-ignore
import {Carwash} from "../../../model/accounts/carwash";

@Injectable({
  providedIn: 'root'
})
export class CustomercarwashesService {

  //basePathStart='https://ezwashteam.azurewebsites.net/api/customers'
  basePathStart='http://localhost:8080/api/customers'
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

  // addUserCarWash

  addUserCarWash(item: any, userId: number, carwashId: number): Observable<Customer>{
    return this.http.post<Customer>(`${this.basePathStart}/${userId}/carwashes/${carwashId}`, JSON.stringify(item),
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //getLinkedList

  getLinkedList(userId: number): Observable<Carwash[]>{
    return this.http.get<Carwash[]>(`${this.basePathStart}/${userId}/carwashes`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //getCarWashQualification
  getCarWashQualification(carwashId: number): Observable<Carwash>{
    return this.http.get<Carwash>(`${this.basePathStart}/carwashes/${carwashId}/qualification`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //getCarWashCommentList
  getCarWashCommentList(carwashId: number): Observable<Carwash>{
    return this.http.get<Carwash>(`${this.basePathStart}/carwashes/${carwashId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //deleteUserCarWash

  deleteUserCarWash (id:number,carwashId:number):Observable<Customer>{
    return this.http.delete<Customer>(`${this.basePathStart}/${id}/carwashes/${carwashId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
