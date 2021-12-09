import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterSchoolHomePage} from "./home/SemesterSchoolHome.page";
import {SemesterSchoolPageLayout} from "./layout/SemesterSchoolPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsButtonModule, MsRibbonModule} from "@ms-fluent/components";
import {
  SemesterAddModule,
  SemesterListModule,
  SemesterTeacherListModule,
  SemesterTeacherModule
} from "@examination/components";
import {MomentModule} from "ngx-moment";
import {SemesterTeachersPage} from "./SemesterTeachers.page";
import {SemesterItemModule} from "../../../components/semester/item";

const routes: Routes = [
  {
    path: '', component: SemesterSchoolPageLayout, children: [
      {path: '', component: SemesterSchoolHomePage, data: { label: 'home'}},
      {path: 'teachers', component: SemesterTeachersPage, data: { label: 'teachers'}},
      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, SemesterAddModule,
    SemesterListModule, SemesterTeacherModule,
    MsRibbonModule, BreadcrumbModule, MsButtonModule, MomentModule, MsActionMenuModule, SemesterTeacherListModule, SemesterItemModule],
  declarations: [ SemesterSchoolHomePage, SemesterSchoolPageLayout, SemesterTeachersPage]
})
export class SemesterSchoolPageModule {

}
