import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Carwash } from '../../../model/accounts/carwash';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarwashService {

  basePath="http://localhost:8080/api/carwashes"
  httpOptions={headers: new HttpHeaders({'Content-Type': 'application/json'})}

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

  getNearCarwashes(lat: number, long: number, distance: number): Observable<Carwash[]>{
    return this.http.get<Carwash[]>(`${this.basePath}/${lat}/${long}/${distance}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

}
