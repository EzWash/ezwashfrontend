import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Location} from 'src/app/model/geographic/location';

@Injectable({
  providedIn: 'root'
})
export class LocationApiService {

 // basePath="http://ec2-3-92-203-155.compute-1.amazonaws.com:8080/api/locations"
  basePath = "https://ezwashteam.azurewebsites.net/api/auth/locations"
  googleApiPath="https://maps.googleapis.com/maps/api/geocode/json?address="
  key="&key=AIzaSyCLy1Dk2Eq_FrveeeV3l3VYpYnRrUAOS90"

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

  createLocation(item: any): Observable<Location>{
    return this.http.post<Location>(this.basePath, JSON.stringify(item),
                                   this.httpOptions)
                                   .pipe(retry(2), catchError(this.handleError));
  }

  getGeoLocation(address: string): Observable<any>{
    return this.http.get<any>(`${this.googleApiPath}${address}${this.key}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getLocationByCustomer(customerId: number): Observable<Location>{
    return this.http.get<Location>(`http://localhost:8080/api/customers/${customerId}/locations`)
        .pipe(retry(2), catchError(this.handleError));
  }
}
