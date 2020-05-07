import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfButtonModule} from 'fabric-docs';
import {AuthorizationManager} from './authorization-manager';
import {AuthorizedGuard, NoAuthorizedGuard} from './authorization-guard';
import {AuthorizeCallbackComponent} from './authorize-callback.component';
import {AuthorizeRequestComponent} from './authorize-request.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationInterceptor} from "./authorization-interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LayoutModule} from "examination/infrastructure";


const routes: Routes = [
  {path: 'authorize/callback', component: AuthorizeCallbackComponent, canActivate: [NoAuthorizedGuard]},
  {path: 'authorize/request', component: AuthorizeRequestComponent, canActivate: [NoAuthorizedGuard]}
];

@NgModule({
  imports: [CommonModule, MsfButtonModule, LayoutModule, RouterModule.forChild(routes)],
  declarations: [AuthorizeCallbackComponent, AuthorizeRequestComponent],
  providers: [AuthorizationManager, AuthorizedGuard, NoAuthorizedGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}]
})
export class AuthorizationModule {
}
