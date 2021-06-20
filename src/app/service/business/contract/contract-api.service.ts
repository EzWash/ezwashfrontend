import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Contract} from "../../../model/business/contract";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContractApiService {
  basePath = "http://localhost:8080/api";
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
  //Designate Staff to Contract
  designateStaffToContract(contractId: number, staffId: number): Observable<Contract>{
    return this.http.put<Contract>(`${this.basePath}/contracts/${contractId}/staff/${staffId}`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get Contracts by State
  getContractsByState(state: string, customerId: number): Observable<Contract[]>{
    return this.http.get<Contract[]>(`${this.basePath}/customers/${customerId}/contracts/states/${state}`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  //Get Contracts by State Not
  getContractsByStateNot(state: string, customerId: number): Observable<Contract[]>{
    return this.http.get<Contract[]>(`${this.basePath}/customers/${customerId}/contracts/states/not/${state}`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Update Contract State
  updateContractState(contractId: number, state: string): Observable<Contract>{
    return this.http.put<Contract>(`${this.basePath}/contracts/${contractId}/states/${state}`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }



}
