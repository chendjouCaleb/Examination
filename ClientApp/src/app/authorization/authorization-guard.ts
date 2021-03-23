import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthorizationManager} from './authorization-manager';

@Injectable({providedIn: 'root'})
export class LoadAuthorizationGuard implements CanActivate {
  constructor(private _authManager: AuthorizationManager, private _router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    await this._authManager.getAuthorizationState();
    return true;
  }
}

@Injectable({providedIn: 'root'})
export class AuthorizedGuard implements CanActivate {
  constructor(private _authManager: AuthorizationManager, private _router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const isAuth = await this._authManager.getAuthorizationState();
    if (!isAuth) {
      await this._router.navigateByUrl(`/authorize/request?returnUrl=${state.url}`);
      return false;
    }
    return true;
  }
}

@Injectable({providedIn: 'root'})
export class NoAuthorizedGuard implements CanActivate {
  constructor(private _authManager: AuthorizationManager, private _router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isAuth = await this._authManager.getAuthorizationState();
    if (isAuth) {
      console.log('You are already logged');
      await this._router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}

