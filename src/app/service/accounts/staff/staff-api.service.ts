import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { Staff } from '../../../model/accounts/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  basePath="http://localhost:8080/api/carwashes"
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

  // Update Staff by Id
  updateStaffById(carwashId: number, staffId: number, item: any): Observable<Staff>{
    return this.http.put<Staff>(`${this.basePath}/${carwashId}/staff/${staffId}`,
                               JSON.stringify(item), this.httpOptions)
                               .pipe(retry(2), catchError(this.handleError));
  }

  // Get Staff By CarWash Id
  getStaffByCarWashId(carwashId: number): Observable<Staff[]>{
    return this.http.get<Staff[]>(`${this.basePath}/${carwashId}/staff`,
                               this.httpOptions)
                               .pipe(retry(2), catchError(this.handleError));
  }
}
