import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserModule, UserResolver} from "examination/app/user";

import {RouterModule, Routes} from "@angular/router";
import {UserTestsPage} from "examination/app/page/user/tests/user.tests.page";
import {UserHomePage} from "examination/app/page/user/home/user.home.page";
import {ControlModule} from "examination/controls";
import {MomentModule} from "ngx-moment";

const routes: Routes = [
  {path: ':userId/tests', component: UserTestsPage, resolve: [ UserResolver ] },
  {path: ':userId/home', component: UserHomePage, resolve: [ UserResolver ] },
  {path: ':userId', component: UserHomePage, resolve: [ UserResolver ] },
];

@NgModule({
  imports: [ CommonModule, ControlModule, MomentModule, RouterModule.forChild(routes), UserModule],
  declarations: [ UserTestsPage, UserHomePage ]
})
export class UserPageModule {

}
