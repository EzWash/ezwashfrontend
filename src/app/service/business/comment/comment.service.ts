import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
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

  //Post Comment And Qualification
  postComment(customerId: number, carWashId: number,comment: Comment): Observable<Comment>{
    return this.http.post<Comment>(`${this.basePath}/customers/${customerId}/carwashes/${carWashId}/comments`, JSON.stringify(comment),
                                   this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
