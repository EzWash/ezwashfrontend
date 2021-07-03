import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Service} from "../../../model/business/service";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {
  //basePath = "http://ec2-3-92-203-155.compute-1.amazonaws.com:8080/api";
  basePath = "https://ezwashteam.azurewebsites.net/api"
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
    return this.http.post<Service>(`${this.basePath}/carwashes/${carWashId}/services`,
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
    return this.http.get<Service[]>(`${this.basePath}/carwashes/${carWashId}/services`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Update Service
  updateService(id: number, item: Service): Observable<Service>{
    return this.http.put<Service>(`${this.basePath}/carwashes/1/services/${id}`,
      JSON.stringify(item),
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Service
  deleteServiceById(serviceId: number): Observable<any>{
    return this.http.delete<any>(`${this.basePath}/carwashes/${serviceId}/services`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
