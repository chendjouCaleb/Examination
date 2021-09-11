import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorizationManager} from './authorization-manager';
import {AuthorizedGuard, LoadAuthorizationGuard, NoAuthorizedGuard} from './authorization-guard';
import {AuthorizeCallbackComponent} from './authorize-callback.component';
import {AuthorizeRequestComponent} from './authorize-request.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationInterceptor} from './authorization-interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LogoutCallback} from './logout-callback';
import {MsButtonModule} from '@ms-fluent/components';


const routes: Routes = [
  {path: 'authorize/callback', component: AuthorizeCallbackComponent },
  {path: 'logout/callback', component: LogoutCallback },
  {path: 'authorize/request', component: AuthorizeRequestComponent, canActivate: [NoAuthorizedGuard]}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MsButtonModule],
  declarations: [AuthorizeCallbackComponent, AuthorizeRequestComponent, LogoutCallback],
  providers: [AuthorizationManager, AuthorizedGuard, NoAuthorizedGuard, LoadAuthorizationGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}]
})
export class AuthorizationModule {
}
