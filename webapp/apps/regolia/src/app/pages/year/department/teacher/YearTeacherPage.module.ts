import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearTeacherLayoutPage} from "./YearTeacherLayout.page";
import {YearTeacherHome} from "./Home/YearTeacherHome";
import {ControlModule} from "../../../../../controls";
import {MsActionMenuModule} from "@ms-fluent/components";
import {YearTeacherModule} from "examination/app/components";

const routes: Routes = [
  {
    path: '', component: YearTeacherLayoutPage, children: [
      {path: '', component: YearTeacherHome},
      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ControlModule, MsActionMenuModule,
    YearTeacherModule ],
  declarations: [YearTeacherHome, YearTeacherLayoutPage]
})
export class YearTeacherPageModule {

}
