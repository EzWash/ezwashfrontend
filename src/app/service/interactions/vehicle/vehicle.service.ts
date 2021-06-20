import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable, pipe, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Vehicle } from '../../../model/interactions/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  basePath: String = "http://localhost:8080/api";
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

  // Create Vehicle
  createVehicle(customerId: number, item: any): Observable<Vehicle>{
    return this.http.post<Vehicle>(`${this.basePath}/customers/1/vehicles`, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  // Delete Vehicle
  deleteVehicleById(vehicleId: number): Observable<any>{
    return this.http.delete<any>(`${this.basePath}/vehicles/${vehicleId}/customers`,
                                    this.httpOptions)
                                    .pipe(retry(2), catchError(this.handleError));
  }

  getVehicleList(customerId: number): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.basePath}/customers/${customerId}/vehicles/list`,
      this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }

}
