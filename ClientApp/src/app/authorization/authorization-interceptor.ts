import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthorizationManager} from "./authorization-manager";
import {environment} from "../../environments/environment";

@Injectable({providedIn: "root"})
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private authorizer: AuthorizationManager ) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const  url = environment.SERVER_URL;

    if (this.authorizer.token && request.url.startsWith(url)) {
      const headers = request.headers.set("Authorization", "Bearer " + this.authorizer.token.accessToken);
      request = request.clone({
        headers
      });
    }
    return next.handle(request);
  }
}
