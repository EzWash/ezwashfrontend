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

  // Create Carwash
  createCarwash(item: any): Observable<Carwash> {
    return this.http.post<Carwash>(this.basePath, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  // Get Near Carwashes
  getNearCarwashes(lat: number, long: number, distance: number): Observable<Carwash[]>{
    return this.http.get<Carwash[]>(`${this.basePath}/${lat}/${long}/${distance}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  // Update Carwash by Id
  updateCarWash(id: number, item: any): Observable<Carwash>{
    return this.http.put<Carwash>(`${this.basePath}/${id}`, JSON.stringify(item),
                                  this.httpOptions)
                                  .pipe(retry(2), catchError(this.handleError));
  }

  // Get Carwash by Id
  getCarWashById(id: number): Observable<Carwash>{
    return this.http.get<Carwash>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  // find Carwash by Qualification
  findByQualification(qualification: number): Observable<Carwash[]>{
    return this.http.get<Carwash[]>(`${this.basePath}/qualifications/${qualification}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  // find Carwash by qualification range
  findByQualificationRAnge(quali1:number, quali2: number): Observable<Carwash[]>{
    return this.http.get<Carwash[]>(`${this.basePath}/qualifications/${quali1}/${quali2}`,
                        this.httpOptions)
                        .pipe(retry(2), catchError(this.handleError))
  }

  // get CarWash by Name
  getCarWashByName(name: string): Observable<Carwash[]>{
    return this.http.get<Carwash[]>(`${this.basePath}/name/${name}`,
                                    this.httpOptions)
                                    .pipe(retry(2), catchError(this.handleError));
  }

}
