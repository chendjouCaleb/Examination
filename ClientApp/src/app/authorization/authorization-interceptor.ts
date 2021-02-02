import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthorizationManager} from './authorization-manager';
import {environment} from '../../environments/environment';

let count = 0;

@Injectable({providedIn: 'root'})
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private authorizer: AuthorizationManager) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = environment.SERVER_URL;
    console.log("Request url: " + request.urlWithParams);
    console.log(`Request count = ${count++}`);

    if (!this.authorizer.isAuthorized) {
      console.log("Your are not logged");
    }


    if (this.authorizer.isAuthorized && request.url.startsWith(url)) {

      const headers = request.headers.set('Authorization', 'Bearer ' + this.authorizer.accessToken.token);
      request = request.clone({
        headers
      });
      console.log('Authorization header is added.')
    }
    return next.handle(request);
  }
}
