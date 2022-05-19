import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
  MsButtonModule,
  MsCheckboxModule,
  MsCleaveModule,
  MsFormFieldModule,
  MsLabelModule
} from "@ms-fluent/components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginPage} from "./login/login.page";
import {RouterModule, Routes} from "@angular/router";
import {AppFormModule} from "src/controls";
import {RegisterPage} from "./register/register.page";
import {IsAuthGuard, IsNotAuthGuard} from "examination/app/identity";
import {LogoutPage} from "./logout/logout.page";
import {LayoutModule} from "examination/infrastructure";

const routes: Routes = [
  {path: 'register', component: RegisterPage, canActivate: [IsNotAuthGuard]},
  {path: 'login', component: LoginPage, canActivate: [IsNotAuthGuard]},
  {path: 'logout', component: LogoutPage, canActivate: [IsAuthGuard]}
]

@NgModule({
  imports: [CommonModule, MsFormFieldModule, MsButtonModule, MsCheckboxModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes), MsCleaveModule, AppFormModule, MsLabelModule, LayoutModule],
  declarations: [LoginPage, RegisterPage, LogoutPage]
})
export class IdentityPageModule {
}
