import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterTeacherLayoutPage} from "./SemesterTeacherLayout.page";
import {SemesterTeacherHome} from "./Home/SemesterTeacherHome";
import {ControlModule} from "../../../../../controls";
import {MsActionMenuModule} from "@ms-fluent/components";
import {YearTeacherModule} from "examination/app/components";

const routes: Routes = [
  {
    path: '', component: SemesterTeacherLayoutPage, children: [
      {path: '', component: SemesterTeacherHome},
      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ControlModule, MsActionMenuModule,
    YearTeacherModule ],
  declarations: [SemesterTeacherHome, SemesterTeacherLayoutPage]
})
export class SemesterTeacherPageModule {

}
