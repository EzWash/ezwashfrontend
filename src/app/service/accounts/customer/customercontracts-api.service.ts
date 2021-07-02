import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
// @ts-ignore
import {Contract} from "../../../model/business/contract";
import {catchError, retry} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomercontractsService {

  //basePathStart = "http://ec2-3-92-203-155.compute-1.amazonaws.com:8080/api/customers";
  basePathStart='http://localhost:8080/api/customers'
  httpOptions={headers: new HttpHeaders({'Content-Type':'application/json'})}

  constructor(private http:HttpClient) { }
  //API Error Handling
  handleError(error: HttpErrorResponse): Observable<never>{
    if(error.error instanceof ErrorEvent){
      console.log('An error occurred: ', error.error.message);
    }
    else{
      console.log('Backend returned code ${error.status}, body was: ${error.error}')
    }
    return throwError('Something happened with request, please try again later')
  }
  //GET UserContract
  getUserContracts(id: number): Observable<Contract[]>{
    return this.http.get<Contract[]>(`${this.basePathStart}/${id}/contracts`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
