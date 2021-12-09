import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterDepartmentHomePage} from "./home/SemesterDepartmentHome.page";
import {SemesterDepartmentPageLayout} from "./layout/SemesterDepartmentPageLayout";
import {LayoutModule} from "@examination/infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsRibbonModule} from "@ms-fluent/components";
import {SemesterDepartmentTeacherPage} from "./SemesterDepartmentTeacher.page";
import {SemesterTeacherListModule} from "../../../components/semester-teacher/List";
import {SemesterTeacherModule, SemesterTeacherResolver} from "../../../components/semester-teacher";

const routes: Routes = [
  {
    path: '', component: SemesterDepartmentPageLayout, children: [
      {path: '', component: SemesterDepartmentHomePage, data: { label: 'home'}},
      {path: 'teachers', component: SemesterDepartmentTeacherPage, data: { label: 'teachers'}},
      {path: 'teachers/:semesterTeacherId', data: {label: 'teachers'}, resolve: [ SemesterTeacherResolver ],
        loadChildren: () => import('./teacher/SemesterTeacherPage.module').then(m => m.SemesterTeacherPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, SemesterTeacherModule,
    BreadcrumbModule, MsActionMenuModule, SemesterTeacherListModule],
  declarations: [ SemesterDepartmentHomePage, SemesterDepartmentPageLayout, SemesterDepartmentTeacherPage]
})
export class SemesterDepartmentPageModule {

}
