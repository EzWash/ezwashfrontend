import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TokenStorageService} from "../service/token-storage.service";

const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService){}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>>{
    let authRequest = request;
    const token = this.tokenStorageService.getToken();
    if(token != null){
      authRequest = request.clone({
        headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`)
      })
    }
    return next.handle(authRequest);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
