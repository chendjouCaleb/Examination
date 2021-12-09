import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearDepartmentHomePage} from "./home/YearDepartmentHome.page";
import {YearDepartmentPageLayout} from "./layout/YearDepartmentPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsRibbonModule} from "@ms-fluent/components";
import {YearDepartmentTeacherPage} from "./YearDepartmentTeacher.page";
import {YearTeacherListModule} from "../../../components/year-teacher/List";
import {YearTeacherDetailsPage} from "./YearTeacherDetails.page";
import {YearTeacherDetailsModule, YearTeacherModule, YearTeacherResolver} from "../../../components/year-teacher";
import {SemesterItemModule} from "../../../components/semester/item";

const routes: Routes = [
  {
    path: '', component: YearDepartmentPageLayout, children: [
      {path: '', component: YearDepartmentHomePage, data: {label: 'home'}},
      {path: 'teachers', component: YearDepartmentTeacherPage, data: {label: 'teachers'}},
      {path: 'teachers/:yearTeacherId', data: {label: 'teachers'}, resolve: [ YearTeacherResolver ],
        loadChildren: () => import('./teacher/YearTeacherPage.module').then(m => m.YearTeacherPageModule)
      },

      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, YearTeacherModule,
    YearTeacherListModule, MsActionMenuModule, YearTeacherDetailsModule, BreadcrumbModule, SemesterItemModule],
  declarations: [ YearDepartmentHomePage, YearDepartmentPageLayout, YearDepartmentTeacherPage, YearTeacherDetailsPage]
})
export class YearDepartmentPageModule {

}
