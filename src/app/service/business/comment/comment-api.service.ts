import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {Comment} from "../../../model/business/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {

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

  //Post Comment And Qualification
  postComment(customerId: number, carWashId: number,comment: { description:string; qualification:number}): Observable<Comment>{
    return this.http.post<Comment>(`${this.basePath}/customers/${customerId}/carwashes/${carWashId}/contracts/1/comments`, JSON.stringify(comment),
                                   this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Comment By CarWash Id
  getCommentByCarWashId(carwashId: number): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.basePath}/carwashes/${carwashId}/comments`,
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


}
