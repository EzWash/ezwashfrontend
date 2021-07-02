import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Report} from "../../../model/business/report";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  //basePath = "http://ec2-3-92-203-155.compute-1.amazonaws.com:8080/api";
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

  //Create Critical Report
  createCriticalReport(contractId: number, report: Report): Observable<Report>{
    return this.http.post<Report>(`${this.basePath}/contracts/${contractId}/reports`,
      JSON.stringify(report),
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
