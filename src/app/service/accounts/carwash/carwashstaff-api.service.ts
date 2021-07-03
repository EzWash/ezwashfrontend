import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { Staff } from '../../../model/accounts/staff';
import {Customer} from "../../../model/accounts/customer";

@Injectable({
  providedIn: 'root'
})
export class CarwashstaffService {

  basePath = "https://ezwashteam.azurewebsites.net/api/carwashes"
  httpOptions={ headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  // API Error Handling
  handleError(error: HttpErrorResponse): Observable<never>{
    if(error.error instanceof ErrorEvent){
      console.log("An error occurred: ", error.error.message);
    }else {
      console.log("Backend returned code ${error.status}, body was: ${error.error}");
    }
    return throwError('Something happened with request, please try again later.')
  }

  // Create Employee
  createEmployee(item: any, id: number): Observable<Staff>{
    return this.http.post<Staff>(`${this.basePath}/${id}/staff`, JSON.stringify(item),
                                this.httpOptions)
                                .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Staff
  deleteStaffById(staffId: number): Observable<any>{
    return this.http.delete<any>(`${this.basePath}/${staffId}/staff`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
