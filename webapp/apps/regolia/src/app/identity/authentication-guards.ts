import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthorizationManager} from "examination/app/authorization";
import {Injectable} from "@angular/core";
import {AuthenticationManager} from "examination/app/identity/authentication-manager";

@Injectable({providedIn: 'root'})
export class IsAuthGuard implements CanActivate {
  constructor(private _authManager: AuthenticationManager, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this._authManager.loggedIn();
  }

}

@Injectable({providedIn: 'root'})
export class IsNotAuthGuard implements CanActivate {
  constructor(private _authManager: AuthenticationManager, private _router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isLoggedIn = await this._authManager.loggedIn();
    if(isLoggedIn) {
      await this._router.navigateByUrl('/');
      return false;
    }
    return true;
  }

}
