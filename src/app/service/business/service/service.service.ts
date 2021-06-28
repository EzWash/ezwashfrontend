import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Service} from "../../../model/business/service";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  //basePath = "http://ec2-3-92-203-155.compute-1.amazonaws.com:8080/api";
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

  //Create Service
  createServiceCarWash(carWashId: number, service: { price: number; name: string; description: string; is_promotion: number; details: string }): Observable<Service>{
    return this.http.post<Service>(`${this.basePath}/carwashes/${carWashId}/service`,
      JSON.stringify(service),
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get Service by Id
  getServiceById(serviceId: number): Observable<Service>{
    return this.http.get<Service>(`${this.basePath}/service/${serviceId}`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get Service by CarWashId
  getServiceByCarWashId(carWashId: number): Observable<Service[]>{
    return this.http.get<Service[]>(`${this.basePath}/carwashes/${carWashId}/service`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Update Service
  updateService(carWashId: number, serviceId: number, service: { price: number; name: string; description: string; is_promotion: number; details: string }): Observable<Service>{
    return this.http.put<Service>(`${this.basePath}/contracts/${carWashId}/services/${serviceId}`,
      JSON.stringify(service),
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


}
