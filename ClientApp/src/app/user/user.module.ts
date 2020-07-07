import {NgModule} from "@angular/core";
import {MsfButtonModule, MsfCheckboxModule, MsfIconModule, MsfModalModule} from "fabric-docs";
import {LayoutModule} from "examination/infrastructure";
import {RouterModule} from "@angular/router";
import {AppFormModule, ControlModule} from "examination/controls";

import {CommonModule} from "@angular/common";
import {UserResolver} from "examination/app/user/user.resolver";
import {UserLayoutComponent} from "examination/app/user/layout/user-layout.component";

@NgModule({
  imports: [CommonModule, RouterModule, MsfModalModule, MsfCheckboxModule, AppFormModule, ControlModule,
    MsfIconModule, MsfButtonModule, LayoutModule],
  declarations: [UserLayoutComponent],
  exports: [UserLayoutComponent],
  providers: [UserResolver]
})
export class UserModule {
}
