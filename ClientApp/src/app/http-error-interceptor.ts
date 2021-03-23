import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AlertEmitter} from "examination/controls";

export class HttpErrorHandler implements HttpInterceptor {
  constructor(private _alertEmitter: AlertEmitter) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
  }

}
